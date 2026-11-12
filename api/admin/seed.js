import { db, sendError } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { initialSales, initialOrders } from "../../src/data/demoData.js";
import { PRODUCT_LIBRARY } from "../../src/components/admin/adminUtils.js";

// POST /api/admin/seed → importe ventes + catalogue + commandes de démo si la base est vide
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== "POST") return res.status(405).end();
  try {
    const sql = await db();
    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM sales`;
    const [{ pcount }] =
      await sql`SELECT COUNT(*)::int AS pcount FROM products`;
    const [{ ocount }] = await sql`SELECT COUNT(*)::int AS ocount FROM orders`;

    let sales = 0;
    let products = 0;
    let orders = 0;
    if (count === 0) {
      for (const s of initialSales) {
        const code = String(s.code).toUpperCase();
        await sql`INSERT INTO sales (id, code, data)
                  VALUES (${s.id}, ${code}, ${JSON.stringify({ ...s, code })}::jsonb)
                  ON CONFLICT DO NOTHING`;
        sales += 1;
      }
    }
    if (pcount === 0) {
      for (const p of PRODUCT_LIBRARY) {
        await sql`INSERT INTO products (id, data)
                  VALUES (${p.id}, ${JSON.stringify(p)}::jsonb)
                  ON CONFLICT DO NOTHING`;
        products += 1;
      }
    }
    if (ocount === 0) {
      for (const o of initialOrders) {
        const checkoutId = o.payment?.checkoutId || null;
        await sql`INSERT INTO orders (id, sale_id, status, checkout_id, total, data)
                  VALUES (${o.id}, ${o.saleId}, ${o.status || "Payée"}, ${checkoutId}, ${Number(o.total || 0)}, ${JSON.stringify(o)}::jsonb)
                  ON CONFLICT DO NOTHING`;
        orders += 1;
      }
    }
    return res.status(200).json({ sales, products, orders });
  } catch (err) {
    return sendError(res, err);
  }
}
