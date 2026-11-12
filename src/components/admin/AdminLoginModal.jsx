import { useState } from "react";
import { X, Lock } from "lucide-react";
import { api, SESSION_KEY, getToken } from "../../lib/api";

// Vérification côté serveur (/api/admin/login) : le mot de passe n'est plus dans le bundle.
export { SESSION_KEY };
export const isAdminAuthenticated = () => Boolean(getToken());

const AdminLoginModal = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { token } = await api("/api/admin/login", {
        method: "POST",
        body: { username: username.trim(), password },
      });
      sessionStorage.setItem(SESSION_KEY, token);
      onSuccess();
    } catch (err) {
      setError(err.message);
      setPassword("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif text-xl text-[#1a365d]">
            <Lock size={18} className="text-[#f5a623]" />
            Accès administrateur
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#5c7188] hover:text-[#1a365d]"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <label className="mb-1 block text-sm font-medium text-[#1a365d]">
          Identifiant
        </label>
        <input
          autoFocus
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-xl border border-[#dfe7ef] bg-[#f8fafc] px-4 py-2.5 text-[#1a365d] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20"
        />

        <label className="mb-1 block text-sm font-medium text-[#1a365d]">
          Mot de passe
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-[#dfe7ef] bg-[#f8fafc] px-4 py-2.5 text-[#1a365d] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-xl bg-[#1e3a5f] py-2.5 text-sm font-semibold text-white hover:bg-[#24476f] disabled:opacity-60"
        >
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginModal;
