import { checkCredentials, createToken } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { username, password } = req.body || {};
  // petit délai pour freiner le brute-force
  await new Promise((r) => setTimeout(r, 400));
  try {
    if (
      !checkCredentials(String(username || "").trim(), String(password || ""))
    ) {
      return res
        .status(401)
        .json({ error: "Identifiant ou mot de passe incorrect." });
    }
    return res.status(200).json({ token: createToken() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Authentification non configurée." });
  }
}
