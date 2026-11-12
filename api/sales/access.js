import { db, sendError } from "../_lib/db.js";
import { saleState, publicSale } from "../_lib/pricing.js";

// POST /api/sales/access { code } → vente publique si le code est valide et actif
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const code = String(req.body?.code || "")
    .trim()
    .toUpperCase();
  if (!code)
    return res.status(400).json({ error: "Veuillez saisir un code d’accès." });

  await new Promise((r) => setTimeout(r, 250)); // freine l'énumération de codes
  try {
    const sql = await db();
    const rows = await sql`SELECT data FROM sales WHERE code = ${code}`;
    if (!rows.length) {
      return res
        .status(404)
        .json({ error: "Ce code n’existe pas ou n’est plus valide." });
    }
    const sale = rows[0].data;
    const state = saleState(sale);
    if (state === "future") {
      const date = new Date(sale.startDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return res
        .status(403)
        .json({ error: `Cette vente ouvrira le ${date}. Revenez vite !` });
    }
    if (state === "closed") {
      return res.status(403).json({
        error: sale.messageClosed || "Cette vente privée est terminée.",
      });
    }
    return res.status(200).json(publicSale(sale));
  } catch (err) {
    return sendError(res, err);
  }
}
