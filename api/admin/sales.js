import { db, sendError } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";

// GET    /api/admin/sales          → liste
// PUT    /api/admin/sales          → crée / met à jour (body = vente)
// DELETE /api/admin/sales?id=...   → supprime (et ses commandes)
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    const sql = await db();

    if (req.method === "GET") {
      const rows = await sql`SELECT data FROM sales ORDER BY updated_at DESC`;
      return res.status(200).json(rows.map((r) => r.data));
    }

    if (req.method === "PUT") {
      const sale = req.body;
      if (!sale?.id || !sale?.code || !sale?.name) {
        return res
          .status(400)
          .json({ error: "Vente incomplète (id, code, nom)." });
      }
      const code = String(sale.code).trim().toUpperCase();
      const clash =
        await sql`SELECT id FROM sales WHERE code = ${code} AND id <> ${sale.id}`;
      if (clash.length) {
        return res
          .status(409)
          .json({ error: `Le code ${code} est déjà utilisé.` });
      }
      const data = { ...sale, code };
      await sql`
        INSERT INTO sales (id, code, data, updated_at)
        VALUES (${sale.id}, ${code}, ${JSON.stringify(data)}::jsonb, now())
        ON CONFLICT (id) DO UPDATE
          SET code = EXCLUDED.code, data = EXCLUDED.data, updated_at = now()`;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const id = req.query?.id;
      if (!id) return res.status(400).json({ error: "id manquant." });
      await sql`DELETE FROM sales WHERE id = ${id}`;
      return res.status(204).end();
    }

    return res.status(405).end();
  } catch (err) {
    return sendError(res, err);
  }
}
