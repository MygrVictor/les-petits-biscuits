import { db, sendError } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";

// GET    /api/admin/products
// PUT    /api/admin/products          (body = produit)
// DELETE /api/admin/products?id=...
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    const sql = await db();

    if (req.method === "GET") {
      const rows =
        await sql`SELECT data FROM products ORDER BY updated_at DESC`;
      return res.status(200).json(rows.map((r) => r.data));
    }

    if (req.method === "PUT") {
      const product = req.body;
      if (!product?.id || !product?.name) {
        return res.status(400).json({ error: "Produit incomplet." });
      }
      await sql`
        INSERT INTO products (id, data, updated_at)
        VALUES (${product.id}, ${JSON.stringify(product)}::jsonb, now())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
      return res.status(200).json(product);
    }

    if (req.method === "DELETE") {
      const id = req.query?.id;
      if (!id) return res.status(400).json({ error: "id manquant." });
      await sql`DELETE FROM products WHERE id = ${id}`;
      return res.status(204).end();
    }

    return res.status(405).end();
  } catch (err) {
    return sendError(res, err);
  }
}
