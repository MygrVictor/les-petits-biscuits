import { db, sendError } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";

// GET /api/admin/orders?all=1  → commandes (payées par défaut, toutes avec all=1)
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== "GET") return res.status(405).end();
  try {
    const sql = await db();
    const rows =
      req.query?.all === "1"
        ? await sql`SELECT data FROM orders ORDER BY created_at DESC`
        : await sql`SELECT data FROM orders WHERE status = 'Payée' ORDER BY created_at DESC`;
    return res.status(200).json(rows.map((r) => r.data));
  } catch (err) {
    return sendError(res, err);
  }
}
