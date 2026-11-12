// Authentification admin côté serveur (jeton signé HMAC, valable 12 h)
// Variables requises : ADMIN_USER, ADMIN_PASSWORD, ADMIN_SECRET (longue chaîne aléatoire)
import crypto from "node:crypto";

const TTL_MS = 12 * 60 * 60 * 1000;

const secret = () => {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16)
    throw new Error("ADMIN_SECRET manquant ou trop court.");
  return s;
};

const sign = (payload) =>
  crypto.createHmac("sha256", secret()).update(payload).digest("base64url");

const safeEqual = (a, b) => {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
};

export const checkCredentials = (user, password) =>
  Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD) &&
  safeEqual(user, process.env.ADMIN_USER) &&
  safeEqual(password, process.env.ADMIN_PASSWORD);

export const createToken = () => {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
};

export const verifyToken = (token) => {
  if (!token || typeof token !== "string") return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload)))
    return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
};

// Renvoie true si autorisé, sinon répond 401 et renvoie false
export const requireAdmin = (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (verifyToken(token)) return true;
  res.status(401).json({ error: "Non autorisé." });
  return false;
};
