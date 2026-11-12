// Vérifie auprès de SumUp le statut d'un checkout et met à jour la commande en base
import { db, sendError } from "../_lib/db.js";

export default async function handler(req, res) {
  const { SUMUP_API_KEY } = process.env;
  const id = req.query?.id;
  if (!SUMUP_API_KEY)
    return res.status(500).json({ error: "SumUp n'est pas configuré." });
  if (!id || !/^[\w-]+$/.test(id))
    return res.status(400).json({ error: "Identifiant invalide." });

  try {
    const sql = await db();
    const rows = await sql`SELECT data FROM orders WHERE checkout_id = ${id}`;
    if (!rows.length)
      return res.status(404).json({ error: "Commande introuvable." });
    let order = rows[0].data;

    const response = await fetch(`https://api.sumup.com/v0.1/checkouts/${id}`, {
      headers: { Authorization: `Bearer ${SUMUP_API_KEY}` },
    });
    const data = await response.json();
    if (!response.ok)
      return res.status(502).json({ error: "Checkout introuvable." });

    const paidAmountOk =
      Math.abs(Number(data.amount) - Number(order.total)) < 0.01;

    if (data.status === "PAID" && paidAmountOk && order.status !== "Payée") {
      order = {
        ...order,
        status: "Payée",
        paidAt: new Date().toISOString(),
        payment: {
          ...order.payment,
          transactionCode:
            data.transaction_code ||
            data.transactions?.[0]?.transaction_code ||
            null,
        },
      };
      await sql`UPDATE orders SET status = 'Payée', data = ${JSON.stringify(order)}::jsonb
                WHERE checkout_id = ${id}`;
    } else if (data.status === "FAILED" && order.status === "En attente") {
      order = { ...order, status: "Échouée" };
      await sql`UPDATE orders SET status = 'Échouée', data = ${JSON.stringify(order)}::jsonb
                WHERE checkout_id = ${id}`;
    }

    return res.status(200).json({
      status: order.status === "Payée" ? "PAID" : data.status,
      order: order.status === "Payée" ? order : null,
    });
  } catch (err) {
    return sendError(res, err);
  }
}
