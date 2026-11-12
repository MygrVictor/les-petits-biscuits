import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// En dev, sert les fonctions du dossier /api comme le ferait Vercel
const vercelApiDev = () => ({
  name: "vercel-api-dev",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url, "http://localhost");
      if (!url.pathname.startsWith("/api/")) return next();

      const file = path.join(process.cwd(), `${url.pathname}.js`);
      if (
        !file.startsWith(path.join(process.cwd(), "api")) ||
        url.pathname.includes("/_") ||
        !fs.existsSync(file)
      ) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: "Route introuvable." }));
      }

      // Corps JSON
      let raw = "";
      for await (const chunk of req) raw += chunk;
      try {
        req.body = raw ? JSON.parse(raw) : undefined;
      } catch {
        req.body = raw;
      }
      req.query = Object.fromEntries(url.searchParams);

      // Helpers façon Vercel
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
        return res;
      };

      try {
        const mod = await server.ssrLoadModule(file);
        await mod.default(req, res);
      } catch (err) {
        console.error(err);
        if (!res.headersSent) res.status(500).json({ error: "Erreur serveur." });
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  // Charge toutes les variables du .env (y compris sans préfixe VITE_) pour /api uniquement
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    plugins: [react(), vercelApiDev()],
  };
});
