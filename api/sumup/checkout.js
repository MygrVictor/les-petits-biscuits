// Crée une commande "En attente" + un checkout SumUp.
// Le montant est recalculé ici à partir de la base : le navigateur n'envoie que des quantités.
// Variables requises : DATABASE_URL, SUMUP_API_KEY, SUMUP_MERCHANT_CODE
import crypto from "node:crypto";
import { db, sendError } from "../_lib/db.js";
import { discountedPrice, round2, saleState } from "../_lib/pricing.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, max = 300) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

const saleAbbr = (sale) =>
  String(sale?.code || sale?.id || "VENTE")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 10) || "VENTE";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { SUMUP_API_KEY, SUMUP_MERCHANT_CODE } = process.env;
  if (!SUMUP_API_KEY || !SUMUP_MERCHANT_CODE) {
    return res.status(500).json({ error: "SumUp n'est pas configuré." });
  }

  const { code, items, customer = {} } = req.body || {};
  const name = clean(customer.name, 120);
  const email = clean(customer.email, 160);
  const phone = clean(customer.phone, 40);
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Nom, e-mail et téléphone sont obligatoires." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ error: "L’adresse e-mail n’est pas valide." });
  }
  if (!Array.isArray(items) || !items.length || items.length > 50) {
    return res.status(400).json({ error: "Panier vide." });
  }

  try {
    const sql = await db();
    const rows = await sql`SELECT data FROM sales WHERE code = ${String(
      code || "",
    )
      .trim()
      .toUpperCase()}`;
    if (!rows.length)
      return res.status(404).json({ error: "Vente introuvable." });
    const sale = rows[0].data;
    if (saleState(sale) !== "active") {
      return res.status(403).json({ error: "Cette vente n’est pas ouverte." });
    }

    const isDelivery = sale.pickup?.type === "delivery";
    const address = clean(customer.address, 300);
    if (isDelivery && !address) {
      return res
        .status(400)
        .json({ error: "L’adresse de livraison est obligatoire." });
    }

    // Recalcul du panier depuis la vente en base
    const lines = [];
    for (const { productId, quantity } of items) {
      const product = sale.products?.find((p) => p.id === productId);
      const qty = Math.floor(Number(quantity));
      if (!product || !Number.isFinite(qty) || qty < 1 || qty > 99) {
        return res.status(400).json({ error: "Panier invalide." });
      }
      const unit = round2(discountedPrice(product));
      lines.push({
        productId: product.id,
        name: product.name,
        quantity: qty,
        unitPrice: unit,
        total: round2(unit * qty),
      });
    }
    const total = round2(lines.reduce((s, l) => s + l.total, 0));
    if (total <= 0) return res.status(400).json({ error: "Montant invalide." });

    // Format attendu : CMD-ABREVIATIONVENTE-01
    const abbr = saleAbbr(sale);
    const [{ orderCount }] = await sql`
      SELECT COUNT(*)::int AS "orderCount"
      FROM orders
      WHERE sale_id = ${sale.id}`;
    const orderNumber = String(Number(orderCount || 0) + 1).padStart(2, "0");
    const orderId = `CMD-${abbr}-${orderNumber}`;
    const checkoutReference = `${orderId}-${crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()}`;

    const sumupRes = await fetch("https://api.sumup.com/v0.1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUMUP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkout_reference: checkoutReference,
        amount: total,
        currency: "EUR",
        merchant_code: SUMUP_MERCHANT_CODE,
        description: `${sale.name} – ${orderId}`.slice(0, 250),
        personal_details: { email },
      }),
    });
    const checkout = await sumupRes.json();
    if (!sumupRes.ok) {
      console.error("SumUp checkout error", checkout);
      return res
        .status(502)
        .json({ error: "Erreur SumUp lors de la création du paiement." });
    }

    const order = {
      id: orderId,
      saleId: sale.id,
      saleName: sale.name,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      note: clean(customer.note, 1000),
      pickup: sale.pickup || null,
      deliveryAddress: isDelivery ? address : "",
      status: "En attente",
      payment: {
        provider: "SumUp",
        checkoutId: checkout.id,
        transactionCode: null,
      },
      date: new Date().toISOString(),
      total,
      items: lines,
    };

    await sql`
      INSERT INTO orders (id, sale_id, status, checkout_id, total, data)
      VALUES (${orderId}, ${sale.id}, ${order.status}, ${checkout.id}, ${total}, ${JSON.stringify(order)}::jsonb)`;

    return res.status(200).json({ id: checkout.id, orderId, total });
  } catch (err) {
    return sendError(res, err);
  }
}
