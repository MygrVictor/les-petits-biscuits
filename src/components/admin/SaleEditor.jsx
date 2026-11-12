import { useState } from "react";
import { Plus, Trash2, ImagePlus } from "lucide-react";
import {
  emptyProduct,
  emptySale,
  emptyPickup,
  PICKUP_TYPES,
  getDiscountedPrice,
  inputClass,
  labelClass,
  cardClass,
} from "./adminUtils";
import { ImageCropInput } from "./ImageCropModal";

const Section = ({ step, title, description, children }) => (
  <section className={cardClass}>
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-sm font-semibold text-[#f5a623]">
        {step}
      </div>
      <div>
        <h2 className="font-serif text-xl text-[#1a365d]">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-[#5c7188]">{description}</p>
        )}
      </div>
    </div>
    {children}
  </section>
);

const ImageField = ({
  label,
  src,
  onChange,
  aspect = 1,
  round = false,
  maxSize = 800,
  rounded = "rounded-xl",
  size = "h-14 w-14",
}) => (
  <div>
    <label className={labelClass}>{label}</label>
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#dfe7ef] bg-[#f8fafc] p-3">
      <img
        src={src}
        alt={label}
        className={`${size} ${rounded} object-cover`}
      />
      <ImageCropInput
        aspect={aspect}
        round={round}
        maxSize={maxSize}
        onChange={onChange}
        className="inline-flex items-center gap-2 rounded-lg border border-[#1e3a5f] bg-white px-3 py-2 text-sm font-medium text-[#1e3a5f]"
      >
        <ImagePlus size={16} />
        Changer
      </ImageCropInput>
    </div>
  </div>
);

const toSaleProduct = (product) => ({
  ...product,
  id: `${product.id}-${Date.now()}`,
  productId: product.id,
  discountType: "percentage",
  discountValue: 10,
});

const SaleEditor = ({
  initialSale,
  catalog = [],
  onAddToCatalog = () => {},
  onSave,
  onCancel,
}) => {
  const isEdit = Boolean(initialSale?.id);
  const [form, setForm] = useState(
    initialSale
      ? {
          ...initialSale,
          products: initialSale.products || [],
          pickup: { ...emptyPickup, ...(initialSale.pickup || {}) },
        }
      : emptySale,
  );
  const [libraryId, setLibraryId] = useState("");
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [error, setError] = useState("");

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setPickup = (key, value) =>
    setForm((prev) => ({ ...prev, pickup: { ...prev.pickup, [key]: value } }));

  const updateProduct = (id, key, value) =>
    setForm((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === id ? { ...p, [key]: value } : p,
      ),
    }));

  const removeProduct = (id) =>
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));

  const availableProducts = catalog.filter(
    (c) => !form.products.some((p) => (p.productId || p.id) === c.id),
  );

  const addLibraryProduct = () => {
    const product = catalog.find((p) => p.id === libraryId);
    if (!product) return;
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, toSaleProduct(product)],
    }));
    setLibraryId("");
  };

  const addCustomProduct = () => {
    const name = newProduct.name.trim();
    const description = newProduct.description.trim();
    const basePrice = Number(newProduct.basePrice);
    if (!name || !description || !basePrice || !newProduct.image) {
      setError(
        "Tous les champs du produit sont obligatoires : titre, description, prix et image.",
      );
      return;
    }
    const id = `prod-${Date.now()}`;
    const catalogProduct = {
      id,
      name,
      description,
      basePrice,
      image: newProduct.image,
    };
    onAddToCatalog(catalogProduct);
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, toSaleProduct(catalogProduct)],
    }));
    setNewProduct(emptyProduct);
    setIsCustomOpen(false);
    setError("");
  };

  const validate = () => {
    const required = [
      form.name,
      form.code,
      form.subtitle,
      form.startDate,
      form.endDate,
      form.description,
      form.coverImage,
    ];
    if (required.some((f) => !f || !String(f).trim()))
      return "Tous les champs de la vente sont obligatoires : nom, code, sous-titre, dates, description et photo de couverture.";
    if (new Date(form.endDate) <= new Date(form.startDate))
      return "La date de fin doit être postérieure à la date de début.";
    if (
      form.pickup.type !== "delivery" &&
      (!form.pickup.address.trim() || !form.pickup.schedule.trim())
    )
      return "Indiquez l'adresse et la date/horaires de récupération des colis.";
    if (!form.products.length)
      return "Vous devez ajouter au moins un produit à la vente.";
    return "";
  };

  const handleSave = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onSave({ ...form, id: form.id || `sale-${Date.now()}` });
  };

  return (
    <div className="space-y-6 pb-24">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Section
        step="1"
        title="Informations générales"
        description="Nom, code d'accès et description de la vente."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass}>Nom de la vente</label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={inputClass}
              placeholder="Vente privée Automne 2026"
            />
          </div>
          <div>
            <label className={labelClass}>Code d’accès</label>
            <input
              value={form.code}
              onChange={(e) => setField("code", e.target.value)}
              className={inputClass}
              placeholder="PETITS2026"
            />
          </div>
          <div>
            <label className={labelClass}>Sous-titre</label>
            <input
              value={form.subtitle}
              onChange={(e) => setField("subtitle", e.target.value)}
              className={inputClass}
              placeholder="Offre réservée aux clients privilégiés"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className={inputClass}
              placeholder="Des créations sélectionnées avec une remise exclusive."
            />
          </div>
        </div>
      </Section>

      <Section
        step="2"
        title="Calendrier"
        description="Période d'ouverture et message affiché après la clôture."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Date de début</label>
            <input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) => setField("startDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Date de fin</label>
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => setField("endDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Message de fin de vente</label>
            <input
              value={form.messageClosed}
              onChange={(e) => setField("messageClosed", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      <Section
        step="3"
        title="Récupération des commandes"
        description="Mode unique imposé à tous les clients de cette vente."
      >
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          {Object.entries(PICKUP_TYPES).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => setPickup("type", type)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                form.pickup.type === type
                  ? "border-[#f5a623] bg-[#fffaf0] text-[#1a365d]"
                  : "border-[#dfe7ef] bg-white text-[#5c7188] hover:border-[#c9d6e3]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {form.pickup.type !== "delivery" && (
            <>
              <div>
                <label className={labelClass}>
                  {form.pickup.type === "company"
                    ? "Organisation / lieu"
                    : "Nom du lieu"}
                </label>
                <input
                  value={form.pickup.place}
                  onChange={(e) => setPickup("place", e.target.value)}
                  className={inputClass}
                  placeholder={
                    form.pickup.type === "company"
                      ? "CSE Airbus – Bâtiment A, accueil"
                      : "Atelier Les Petits Biscuits"
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Adresse *</label>
                <input
                  value={form.pickup.address}
                  onChange={(e) => setPickup("address", e.target.value)}
                  className={inputClass}
                  placeholder="12 rue de l'Exemple, 31000 Toulouse"
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Date et horaires de retrait *
                </label>
                <input
                  value={form.pickup.schedule}
                  onChange={(e) => setPickup("schedule", e.target.value)}
                  className={inputClass}
                  placeholder="Jeudi 12 décembre, 12h – 14h"
                />
              </div>
            </>
          )}
          <div className="md:col-span-2">
            <label className={labelClass}>Instructions pour les clients</label>
            <textarea
              rows={2}
              value={form.pickup.instructions}
              onChange={(e) => setPickup("instructions", e.target.value)}
              className={inputClass}
              placeholder={
                form.pickup.type === "delivery"
                  ? "Livraison sous 5 jours ouvrés après la fin de la vente."
                  : "Présentez votre numéro de commande au stand."
              }
            />
          </div>
        </div>
      </Section>

      <Section
        step="4"
        title="Visuels"
        description="Photo de couverture de la page de vente."
      >
        <div className="grid gap-5">
          <ImageField
            label="Photo de couverture"
            src={form.coverImage}
            onChange={(v) => setField("coverImage", v)}
            aspect={16 / 9}
            maxSize={1600}
            size="h-14 w-[100px]"
          />
        </div>
      </Section>

      <Section
        step="5"
        title="Produits & remises"
        description="Choisissez dans le catalogue ou créez un produit (il sera ajouté au catalogue)."
      >
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <select
            value={libraryId}
            onChange={(e) => setLibraryId(e.target.value)}
            className="flex-1 rounded-xl border border-[#dfe7ef] bg-white px-3 py-2.5 text-sm text-[#1a365d]"
          >
            <option value="">
              {availableProducts.length
                ? "Choisir un produit du catalogue…"
                : "Tous les produits du catalogue sont déjà ajoutés"}
            </option>
            {availableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.basePrice} €
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addLibraryProduct}
            disabled={!libraryId}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#24476f] disabled:opacity-40"
          >
            <Plus size={16} /> Ajouter
          </button>
          <button
            type="button"
            onClick={() => setIsCustomOpen((v) => !v)}
            className="rounded-xl border border-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f3f8ff]"
          >
            Nouveau produit
          </button>
        </div>

        {isCustomOpen && (
          <div className="mb-5 rounded-xl border border-[#e7edf4] bg-[#f7fafc] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Titre</label>
                <input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, name: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Mini coffret assorti"
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Prix de base (€)</label>
                <input
                  type="number"
                  min="0"
                  value={newProduct.basePrice}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, basePrice: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <ImageField
                label="Photo"
                src={newProduct.image}
                onChange={(v) => setNewProduct((p) => ({ ...p, image: v }))}
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setNewProduct(emptyProduct);
                  setIsCustomOpen(false);
                }}
                className="rounded-xl border border-[#dfe7ef] bg-white px-4 py-2 text-sm font-semibold text-[#1e3a5f]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={addCustomProduct}
                className="rounded-xl bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#1e3a5f]"
              >
                Créer et ajouter à la vente
              </button>
            </div>
          </div>
        )}

        {form.products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#dfe7ef] bg-[#f8fafc] p-6 text-center text-sm text-[#36506d]">
            Aucun produit ajouté pour le moment.
          </p>
        ) : (
          <ul className="divide-y divide-[#edf2f7] rounded-xl border border-[#e7edf4]">
            {form.products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col gap-4 p-4 md:flex-row md:items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-[#1a365d]">
                    {product.name}
                  </div>
                  <div className="text-xs text-[#5c7188]">
                    {product.basePrice} € →{" "}
                    <span className="font-semibold text-[#1f6f43]">
                      {getDiscountedPrice(product).toFixed(2)} €
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={product.discountType}
                    onChange={(e) =>
                      updateProduct(product.id, "discountType", e.target.value)
                    }
                    className="rounded-lg border border-[#dfe7ef] bg-white px-2 py-2 text-sm text-[#1a365d]"
                  >
                    <option value="percentage">%</option>
                    <option value="amount">€</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    max={
                      product.discountType === "percentage"
                        ? 100
                        : product.basePrice
                    }
                    value={product.discountValue}
                    onChange={(e) =>
                      updateProduct(
                        product.id,
                        "discountValue",
                        Number(e.target.value),
                      )
                    }
                    className="w-20 rounded-lg border border-[#dfe7ef] bg-white px-2 py-2 text-sm text-[#1a365d]"
                  />
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    aria-label="Retirer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Barre d'actions collante */}
      <div className="fixed bottom-14 left-0 right-0 z-20 border-t border-[#e7edf4] bg-white/95 backdrop-blur lg:bottom-0 lg:left-64">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3">
          <span className="text-sm text-[#5c7188]">
            {form.products.length} produit{form.products.length > 1 ? "s" : ""}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-[#dfe7ef] bg-white px-5 py-2.5 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f3f8ff]"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-[#f5a623] px-5 py-2.5 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f4b644]"
            >
              {isEdit ? "Enregistrer les modifications" : "Créer la vente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleEditor;
