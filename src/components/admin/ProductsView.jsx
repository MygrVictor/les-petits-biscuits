import { useState } from "react";
import { Plus, Pencil, Trash2, ImagePlus, Search, X } from "lucide-react";
import {
  cardClass,
  inputClass,
  labelClass,
  formatMoney,
  CATEGORIES,
} from "./adminUtils";
import { ImageCropInput } from "./ImageCropModal";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  basePrice: "",
  category: "sucre",
  image: "/products/sables-sucres.webp",
};

const ProductForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const price = Number(form.basePrice);
    if (!form.name.trim() || !price || price <= 0 || !form.image) {
      return setError("Nom, prix (> 0) et photo sont obligatoires.");
    }
    onSave({
      ...form,
      id: form.id || `prod-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      basePrice: price,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#1a365d]">
            {initial.id ? "Modifier le produit" : "Nouveau produit"}
          </h2>
          <button type="button" onClick={onCancel} aria-label="Fermer">
            <X size={20} className="text-[#5c7188]" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <ImageCropInput
            aspect={1}
            onChange={(v) => set("image", v)}
            className="group relative block h-[120px] overflow-hidden rounded-xl border border-dashed border-[#dfe7ef] bg-[#faf7f2]"
          >
            <img
              src={form.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition group-hover:opacity-100">
              <ImagePlus size={22} />
            </span>
          </ImageCropInput>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nom *</label>
              <input
                autoFocus
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputClass}
                placeholder="Sablés au citron"
              />
            </div>
            <div>
              <label className={labelClass}>Prix de base (€) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.basePrice}
                onChange={(e) => set("basePrice", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Catégorie *</label>
            <div className="flex gap-2">
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("category", key)}
                  className={`flex-1 rounded-xl border-2 py-2 text-sm font-medium transition ${
                    form.category === key
                      ? "border-[#f5a623] bg-[#fffaf0] text-[#1a365d]"
                      : "border-[#dfe7ef] text-[#5c7188]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputClass}
              placeholder="Boîte de 200 g, pur beurre…"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#dfe7ef] px-4 py-2.5 text-sm font-semibold text-[#1e3a5f]"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#f5a623] px-4 py-2.5 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f4b644]"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

const ProductsView = ({ catalog, setCatalog, sales }) => {
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const usageCount = (productId) =>
    sales.filter((s) =>
      (s.products || []).some((p) => (p.productId || p.id) === productId),
    ).length;

  const save = (product) => {
    setCatalog((prev) => {
      const i = prev.findIndex((p) => p.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = product;
        return next;
      }
      return [product, ...prev];
    });
    setEditing(null);
  };

  const remove = (product) => {
    const used = usageCount(product.id);
    const msg = used
      ? `« ${product.name} » est utilisé dans ${used} vente(s). Il restera dans ces ventes mais ne sera plus proposé. Supprimer du catalogue ?`
      : `Supprimer « ${product.name} » du catalogue ?`;
    if (window.confirm(msg)) {
      setCatalog((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const filtered = catalog.filter(
    (p) =>
      (category === "all" || (p.category || "sucre") === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={cardClass}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl text-[#1a365d]">
          {catalog.length} produit{catalog.length > 1 ? "s" : ""} au catalogue
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-[#dfe7ef] bg-[#f8fafc] p-1">
            {[["all", "Tous"], ...Object.entries(CATEGORIES)].map(
              ([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    category === key
                      ? "bg-[#1e3a5f] text-white"
                      : "text-[#5c7188] hover:text-[#1a365d]"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c7188]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="rounded-xl border border-[#dfe7ef] bg-white py-2 pl-9 pr-3 text-sm text-[#1a365d] outline-none focus:border-[#f5a623]"
            />
          </div>
          <button
            type="button"
            onClick={() => setEditing(emptyForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f4b644]"
          >
            <Plus size={16} /> Nouveau produit
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#dfe7ef] p-6 text-center text-sm text-[#36506d]">
          Aucun produit.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((product) => {
            const used = usageCount(product.id);
            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#e7edf4] bg-white"
              >
                <div className="flex aspect-square items-center justify-center bg-[#faf7f2] p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-[#1a365d]">
                      {product.name}
                    </h3>
                    <span className="shrink-0 font-semibold text-[#1e3a5f]">
                      {formatMoney(product.basePrice)}
                    </span>
                  </div>
                  {product.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-[#5c7188]">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-[#5c7188]">
                      {used
                        ? `Dans ${used} vente${used > 1 ? "s" : ""}`
                        : "Dans aucune vente"}
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditing(product)}
                        className="rounded-lg border border-[#dfe7ef] p-1.5 text-[#1e3a5f] hover:bg-[#f3f8ff]"
                        aria-label="Modifier"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(product)}
                        className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {editing && (
        <ProductForm
          key={editing.id || "new"}
          initial={{ ...emptyForm, ...editing }}
          onSave={save}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default ProductsView;
