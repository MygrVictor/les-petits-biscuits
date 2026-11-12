// Connexion Postgres (Neon) — variable requise : DATABASE_URL
import { neon } from "@neondatabase/serverless";

let sqlClient = null;
let schemaReady = null;

export const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL n'est pas configurée.");
  }
  if (!sqlClient) sqlClient = neon(process.env.DATABASE_URL);
  return sqlClient;
};

// Crée les tables au premier appel (idempotent)
export const db = async () => {
  const sql = getSql();
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS sales (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        sale_id TEXT REFERENCES sales(id) ON DELETE CASCADE,
        status TEXT NOT NULL,
        checkout_id TEXT UNIQUE,
        total NUMERIC(10,2) NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
      await sql`CREATE INDEX IF NOT EXISTS orders_sale_idx ON orders(sale_id)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
  return sql;
};

export const sendError = (res, err, status = 500) => {
  console.error(err);
  return res
    .status(status)
    .json({ error: err?.publicMessage || "Erreur serveur." });
};
