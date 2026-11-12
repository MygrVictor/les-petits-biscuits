import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../lib/api";

// Apple Pay / Google Pay (Swift Checkout). Clé PUBLIQUE sup_pk_… : peut être exposée.
const SUMUP_PUBLIC_KEY = import.meta.env.VITE_SUMUP_PUBLIC_KEY;
const SWIFT_SDK_URL = "https://js.sumup.com/swift-checkout/v1/sdk.js";

const loadSwiftSdk = () =>
  new Promise((resolve, reject) => {
    if (window.SumUp?.SwiftCheckout) return resolve(window.SumUp);
    const script = document.createElement("script");
    script.src = SWIFT_SDK_URL;
    script.async = true;
    script.onload = () => resolve(window.SumUp);
    script.onerror = () => reject(new Error("Swift Checkout indisponible."));
    document.body.appendChild(script);
  });

const SUMUP_SDK_URL = "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js";

const loadSumUpSdk = () =>
  new Promise((resolve, reject) => {
    if (window.SumUpCard) return resolve(window.SumUpCard);
    const existing = document.querySelector(`script[src="${SUMUP_SDK_URL}"]`);
    const script = existing || document.createElement("script");
    script.addEventListener("load", () => resolve(window.SumUpCard));
    script.addEventListener("error", () =>
      reject(new Error("Impossible de charger SumUp.")),
    );
    if (!existing) {
      script.src = SUMUP_SDK_URL;
      script.async = true;
      document.body.appendChild(script);
    }
  });
import {
  Lock,
  CalendarRange,
  ArrowLeft,
  ShoppingBag,
  Clock,
  Minus,
  Plus,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Truck,
} from "lucide-react";

const money = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const getDiscountedPrice = (product) => {
  if (product.discountType === "percentage") {
    return product.basePrice * (1 - product.discountValue / 100);
  }
  return Math.max(0, product.basePrice - product.discountValue);
};

const getDiscountPercent = (product) =>
  product.discountType === "percentage"
    ? product.discountValue
    : Math.round(
        ((product.basePrice - getDiscountedPrice(product)) /
          product.basePrice) *
          100,
      );

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emptyCustomer = { name: "", email: "", phone: "", note: "", address: "" };

const PICKUP_LABELS = {
  company: "Retrait sur le lieu de l'organisation",
  workshop: "Retrait à l'atelier",
  delivery: "Livraison à domicile",
};

const PickupInfo = ({ pickup, compact = false }) => {
  if (!pickup) return null;
  return (
    <div className="flex gap-3 rounded-2xl border border-[#f5a623]/30 bg-[#fffaf0] p-4 text-sm text-[#36506d]">
      <Truck size={20} className="mt-0.5 shrink-0 text-[#f5a623]" />
      <div className="space-y-0.5">
        <div className="font-semibold text-[#1a365d]">
          {PICKUP_LABELS[pickup.type]}
        </div>
        {pickup.place && <div>{pickup.place}</div>}
        {pickup.address && <div>{pickup.address}</div>}
        {pickup.schedule && (
          <div className="font-medium text-[#1e3a5f]">{pickup.schedule}</div>
        )}
        {!compact && pickup.instructions && (
          <div className="pt-1 text-xs text-[#5c7188]">
            {pickup.instructions}
          </div>
        )}
      </div>
    </div>
  );
};
const inputClass =
  "w-full rounded-xl border border-[#dfe7ef] bg-white px-4 py-3 text-base text-[#1a365d] outline-none transition focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20";

/* ---------- Compte à rebours ---------- */
const useCountdown = (endDate) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(endDate).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Countdown = ({ endDate }) => {
  const t = useCountdown(endDate);
  const units = [
    ["j", t.days],
    ["h", t.hours],
    ["min", t.minutes],
    ["s", t.seconds],
  ];
  return (
    <div className="flex items-center gap-2">
      <Clock size={16} className="text-[#f5a623]" />
      <span className="text-xs uppercase tracking-[0.14em] text-white/70">
        Se termine dans
      </span>
      <div className="flex gap-1.5">
        {units.map(([label, value]) => (
          <span
            key={label}
            className="rounded-lg bg-white/10 px-2 py-1 font-mono text-sm font-semibold text-white"
          >
            {String(value).padStart(2, "0")}
            <span className="ml-0.5 text-[10px] text-white/60">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ---------- Sélecteur de quantité ---------- */
const QuantityStepper = ({ value, onChange, size = "md" }) => {
  const btn = size === "sm" ? "h-7 w-7" : "h-10 w-10";
  return (
    <div className="inline-flex items-center rounded-full border border-[#dfe7ef] bg-white p-1">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className={`${btn} flex items-center justify-center rounded-full text-[#1e3a5f] transition hover:bg-[#f3f8ff]`}
        aria-label="Retirer un"
      >
        <Minus size={14} />
      </button>
      <span className="min-w-[2rem] text-center text-sm font-semibold text-[#1a365d]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={`${btn} flex items-center justify-center rounded-full bg-[#1e3a5f] text-white transition hover:bg-[#24476f]`}
        aria-label="Ajouter un"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

/* ---------- Composant principal ---------- */
const PrivateSales = () => {
  const [code, setCode] = useState("");
  const [checkingCode, setCheckingCode] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const [step, setStep] = useState("shop"); // shop | checkout | done
  const [customer, setCustomer] = useState(emptyCustomer);
  const [customerError, setCustomerError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [sumupCheckout, setSumupCheckout] = useState(null); // { id, orderId }
  const sumupCardRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, currentSale]);

  const basketItems = useMemo(
    () =>
      currentSale
        ? currentSale.products
            .filter((p) => (quantities[p.id] || 0) > 0)
            .map((p) => ({ ...p, quantity: quantities[p.id] }))
        : [],
    [currentSale, quantities],
  );

  const basketCount = basketItems.reduce((s, p) => s + p.quantity, 0);
  const basketTotal = basketItems.reduce(
    (s, p) => s + getDiscountedPrice(p) * p.quantity,
    0,
  );
  const basketSavings = basketItems.reduce(
    (s, p) => s + (p.basePrice - getDiscountedPrice(p)) * p.quantity,
    0,
  );

  const setQuantity = (productId, next) =>
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, Math.min(99, next)),
    }));

  const resetAll = () => {
    setCurrentSale(null);
    setQuantities({});
    setStep("shop");
    setCustomer(emptyCustomer);
    setCustomerError("");
    setCode("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) return setError("Veuillez saisir un code d’accès.");

    setCheckingCode(true);
    try {
      const sale = await api("/api/sales/access", {
        method: "POST",
        body: { code: normalized },
      });
      setError("");
      setCurrentSale({ ...sale, code: normalized });
      setQuantities({});
      setStep("shop");
    } catch (err) {
      setError(err.message);
    } finally {
      setCheckingCode(false);
    }
  };

  // La commande est créée et validée par le serveur ; on affiche sa version.
  const finalizeOrder = (order) => {
    setLastOrder(order);
    setSumupCheckout(null);
    setIsPaying(false);
    setStep("done");
  };

  const closeSumUp = () => {
    try {
      sumupCardRef.current?.unmount();
    } catch {
      /* ignore */
    }
    sumupCardRef.current = null;
    setSumupCheckout(null);
    setIsPaying(false);
  };

  // Monte le widget carte SumUp quand un checkout est créé
  useEffect(() => {
    if (!sumupCheckout) return undefined;
    let cancelled = false;

    loadSumUpSdk()
      .then((SumUpCard) => {
        if (cancelled) return;
        sumupCardRef.current = SumUpCard.mount({
          id: "sumup-card",
          checkoutId: sumupCheckout.id,
          locale: "fr-FR",
          currency: "EUR",
          amount: basketTotal.toFixed(2),
          email: customer.email.trim(),
          showSubmitButton: true,
          onResponse: async (type, body) => {
            if (type === "error" || type === "fail") {
              setCustomerError(
                body?.message || "Le paiement a échoué. Veuillez réessayer.",
              );
              return;
            }
            if (type !== "success") return;
            // Vérification serveur du statut réel
            try {
              const r = await fetch(
                `/api/sumup/status?id=${encodeURIComponent(sumupCheckout.id)}`,
              );
              const data = await r.json();
              if (data.status === "PAID" && data.order) {
                finalizeOrder(data.order);
              } else {
                setCustomerError(
                  "Le paiement n’a pas été confirmé. Veuillez réessayer.",
                );
                closeSumUp();
              }
            } catch {
              setCustomerError("Impossible de vérifier le paiement.");
              closeSumUp();
            }
          },
        });
      })
      .catch((err) => {
        setCustomerError(err.message);
        closeSumUp();
      });

    return () => {
      cancelled = true;
      try {
        sumupCardRef.current?.unmount();
      } catch {
        /* ignore */
      }
      sumupCardRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sumupCheckout]);

  // Boutons Apple Pay / Google Pay (si clé publique + wallet dispo sur l'appareil)
  useEffect(() => {
    if (!sumupCheckout || !SUMUP_PUBLIC_KEY) return undefined;
    let cancelled = false;
    const container = () => document.querySelector("#sumup-swift");

    loadSwiftSdk()
      .then(async (SumUp) => {
        if (cancelled) return;
        const client = new SumUp.SwiftCheckout(SUMUP_PUBLIC_KEY);
        const paymentRequest = client.paymentRequest({
          countryCode: "FR",
          locale: "fr-FR",
          total: {
            label: "Les Petits Biscuits",
            amount: { currency: "EUR", value: basketTotal.toFixed(2) },
          },
        });
        if (!(await paymentRequest.canMakePayment()) || cancelled) return;
        const paymentMethods = await paymentRequest.availablePaymentMethods();
        if (cancelled || !container()) return;

        const buttons = client.elements({ label: "buy" });
        buttons.onSubmit((event) => {
          paymentRequest
            .show(event)
            .then((paymentResponse) =>
              client.processCheckout(sumupCheckout.id, paymentResponse),
            )
            .then(async () => {
              // Le serveur reste la source de vérité
              const data = await api(
                `/api/sumup/status?id=${encodeURIComponent(sumupCheckout.id)}`,
              );
              if (data.status === "PAID" && data.order) {
                finalizeOrder(data.order);
              } else {
                setCustomerError("Le paiement n’a pas été confirmé.");
              }
            })
            .catch((error) => {
              if (
                error instanceof
                SumUp.SwiftCheckout.Errors.PaymentRequestCancelledError
              )
                return;
              setCustomerError(
                error?.message || "Le paiement a échoué. Veuillez réessayer.",
              );
            });
        });
        buttons.mount({ paymentMethods, container: container() });
      })
      .catch(() => {
        /* Swift indisponible : le formulaire carte reste utilisable */
      });

    return () => {
      cancelled = true;
      const el = container();
      if (el) el.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sumupCheckout]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const name = customer.name.trim();
    const email = customer.email.trim();
    if (!name || !email || !customer.phone.trim()) {
      return setCustomerError("Nom, e-mail et téléphone sont obligatoires.");
    }
    if (!EMAIL_REGEX.test(email)) {
      return setCustomerError("L’adresse e-mail n’est pas valide.");
    }
    const isDelivery = currentSale.pickup?.type === "delivery";
    if (isDelivery && !customer.address.trim()) {
      return setCustomerError("L’adresse de livraison est obligatoire.");
    }
    setCustomerError("");
    setIsPaying(true);

    try {
      // Seules les quantités sont envoyées : le serveur recalcule le prix
      const data = await api("/api/sumup/checkout", {
        method: "POST",
        body: {
          code: currentSale.code,
          items: basketItems.map((p) => ({
            productId: p.id,
            quantity: p.quantity,
          })),
          customer,
        },
      });
      if (!data?.id) throw new Error("Impossible d’initialiser le paiement.");
      setSumupCheckout({ id: data.id, orderId: data.orderId });
    } catch (err) {
      setCustomerError(err.message);
      setIsPaying(false);
    }
  };

  /* ===== Écran 1 : saisie du code ===== */
  if (!currentSale) {
    return (
      <div className="min-h-screen bg-kraft-50 pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_50px_rgba(30,58,95,0.08)] md:grid md:grid-cols-2">
            <div className="relative h-56 md:h-auto">
              <img
                src="/boutique.webp"
                alt="La boutique Les Petits Biscuits"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#1e3a5f]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-2xl">
                  Bienvenue chez Les Petits Biscuits
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Réservé à nos clients et partenaires.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1e3a5f] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#f5a623]">
                <Lock size={14} />
                Accès réservé
              </div>

              <h1 className="font-serif text-4xl text-[#1a365d]">
                Vente privée
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#36506d]">
                Saisissez le code qui vous a été communiqué pour découvrir
                l’offre exclusive.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <label
                  htmlFor="sale-code"
                  className="mb-2 block text-sm font-medium text-[#1a365d]"
                >
                  Code d’accès
                </label>
                <input
                  id="sale-code"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  placeholder="EX : PETITS2026"
                  className="w-full rounded-xl border border-[#dfe7ef] bg-[#f8fafc] px-4 py-3.5 text-center font-mono text-lg uppercase tracking-[0.25em] text-[#1a365d] outline-none transition focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20"
                />
                {error && (
                  <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={checkingCode}
                  className="mt-4 w-full rounded-xl bg-[#1e3a5f] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24476f] disabled:opacity-60"
                >
                  {checkingCode ? "Vérification…" : "Accéder à la vente"}
                </button>
              </form>

              <ul className="mt-8 space-y-3 border-t border-[#edf2f7] pt-6 text-sm text-[#36506d]">
                <li className="flex items-center gap-3">
                  <Gift size={16} className="text-[#f5a623]" />
                  Remises exclusives sur une sélection de créations
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#f5a623]" />
                  Paiement sécurisé
                </li>
                <li className="flex items-center gap-3">
                  <Truck size={16} className="text-[#f5a623]" />
                  Retrait ou livraison selon les modalités de la vente
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ===== Écran 3 : confirmation ===== */
  if (step === "done" && lastOrder) {
    return (
      <div className="min-h-screen bg-kraft-50 pt-28 pb-16">
        <div className="mx-auto max-w-xl px-6">
          <div className="rounded-[28px] bg-white p-8 text-center shadow-[0_20px_50px_rgba(30,58,95,0.08)] md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef7ee]">
              <CheckCircle2 size={34} className="text-[#1f6f43]" />
            </div>
            <h1 className="mt-5 font-serif text-3xl text-[#1a365d]">
              Merci {lastOrder.customerName.split(" ")[0]} !
            </h1>
            <p className="mt-2 text-[#36506d]">
              Votre commande <strong>{lastOrder.id}</strong> est confirmée. Un
              récapitulatif sera envoyé à {lastOrder.customerEmail}.
            </p>

            <ul className="mt-6 divide-y divide-[#edf2f7] rounded-xl border border-[#edf2f7] text-left text-sm">
              {lastOrder.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between px-4 py-3 text-[#36506d]"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-[#1e3a5f]">
                    {money.format(item.total)}
                  </span>
                </li>
              ))}
              <li className="flex justify-between bg-[#f8fafc] px-4 py-3 font-semibold text-[#1a365d]">
                <span>Total payé</span>
                <span>{money.format(lastOrder.total)}</span>
              </li>
            </ul>

            {lastOrder.pickup && (
              <div className="mt-6 text-left">
                <PickupInfo pickup={lastOrder.pickup} />
                {lastOrder.deliveryAddress && (
                  <p className="mt-2 text-sm text-[#36506d]">
                    Livré à : {lastOrder.deliveryAddress}
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={resetAll}
              className="mt-8 rounded-xl bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#24476f]"
            >
              Terminer
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ===== Écran 2 : boutique / validation ===== */
  return (
    <div className="min-h-screen bg-kraft-50 pt-24 pb-28 lg:pb-16">
      {/* Bandeau de la vente */}
      <div className="relative">
        <img
          src={currentSale.coverImage}
          alt=""
          className="h-56 w-full object-cover md:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-[#1e3a5f]/60 to-[#1e3a5f]/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-6 pb-6">
            <button
              type="button"
              onClick={step === "checkout" ? () => setStep("shop") : resetAll}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              <ArrowLeft size={16} />
              {step === "checkout" ? "Retour aux produits" : "Changer de code"}
            </button>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5a623]">
                  {currentSale.subtitle}
                </p>
                <h1 className="mt-1 font-serif text-3xl text-white md:text-4xl">
                  {currentSale.name}
                </h1>
              </div>
              <Countdown endDate={currentSale.endDate} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_360px]">
        <div>
          {step === "shop" ? (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-2xl text-[#36506d]">
                  {currentSale.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs text-[#5c7188]">
                  <CalendarRange size={14} />
                  Jusqu’au {formatDate(currentSale.endDate)}
                </span>
              </div>

              {currentSale.pickup && (
                <div className="mb-6">
                  <PickupInfo pickup={currentSale.pickup} />
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {currentSale.products.map((product) => {
                  const qty = quantities[product.id] || 0;
                  return (
                    <article
                      key={product.id}
                      className={`group overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(30,58,95,0.06)] ring-2 transition ${
                        qty > 0 ? "ring-[#f5a623]" : "ring-transparent"
                      }`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-[#f5a623] px-2.5 py-1 text-xs font-bold text-[#1e3a5f]">
                          -{getDiscountPercent(product)}%
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl text-[#1a365d]">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-[#5c7188]">
                            {product.description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div>
                            <span className="text-2xl font-bold text-[#1e3a5f]">
                              {money.format(getDiscountedPrice(product))}
                            </span>
                            <span className="ml-2 text-sm text-[#7187a1] line-through">
                              {money.format(product.basePrice)}
                            </span>
                          </div>
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, 1)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24476f]"
                            >
                              <Plus size={15} />
                              Ajouter
                            </button>
                          ) : (
                            <QuantityStepper
                              value={qty}
                              onChange={(v) => setQuantity(product.id, v)}
                            />
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <form
              id="checkout-form"
              onSubmit={handleCheckout}
              className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(30,58,95,0.06)] md:p-8"
            >
              <h2 className="font-serif text-2xl text-[#1a365d]">
                Vos coordonnées
              </h2>
              <p className="mt-1 text-sm text-[#5c7188]">
                Pour vous confirmer la commande et organiser le retrait.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[#1a365d]">
                    Nom et prénom *
                  </label>
                  <input
                    autoComplete="name"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, name: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1a365d]">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, email: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1a365d]">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, phone: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                {currentSale.pickup?.type === "delivery" && (
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-[#1a365d]">
                      Adresse de livraison *
                    </label>
                    <input
                      autoComplete="street-address"
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, address: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                )}
                {currentSale.pickup && (
                  <div className="md:col-span-2">
                    <PickupInfo pickup={currentSale.pickup} />
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[#1a365d]">
                    Message (facultatif)
                  </label>
                  <textarea
                    rows={3}
                    value={customer.note}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, note: e.target.value }))
                    }
                    placeholder="Allergies, message cadeau…"
                    className={inputClass}
                  />
                </div>
              </div>
              {customerError && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {customerError}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Panier (sticky desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(30,58,95,0.06)]">
            <div className="flex items-center gap-2 font-serif text-xl text-[#1a365d]">
              <ShoppingBag size={18} className="text-[#f5a623]" />
              Votre panier
            </div>

            {basketItems.length === 0 ? (
              <p className="mt-4 text-sm text-[#5c7188]">
                Votre panier est vide. Ajoutez des produits pour commencer.
              </p>
            ) : (
              <>
                <ul className="mt-4 space-y-3">
                  {basketItems.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium leading-tight text-[#1a365d]">
                          {p.name}
                        </div>
                        <div className="mt-1">
                          <QuantityStepper
                            size="sm"
                            value={p.quantity}
                            onChange={(v) => setQuantity(p.id, v)}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#1e3a5f]">
                        {money.format(getDiscountedPrice(p) * p.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-1 border-t border-[#edf2f7] pt-4 text-sm">
                  <div className="flex justify-between text-[#1f6f43]">
                    <span>Économies</span>
                    <span>-{money.format(basketSavings)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-[#1a365d]">
                    <span>Total</span>
                    <span>{money.format(basketTotal)}</span>
                  </div>
                </div>

                {step === "shop" ? (
                  <button
                    type="button"
                    onClick={() => setStep("checkout")}
                    className="mt-5 w-full rounded-xl bg-[#f5a623] py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#f4b644]"
                  >
                    Valider mon panier
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isPaying}
                    className="mt-5 w-full rounded-xl bg-[#f5a623] py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#f4b644] disabled:opacity-60"
                  >
                    {isPaying
                      ? "Paiement en cours…"
                      : `Payer ${money.format(basketTotal)}`}
                  </button>
                )}
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#5c7188]">
                  <ShieldCheck size={13} /> Paiement sécurisé SumUp
                </p>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Barre panier mobile */}
      {basketItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e7edf4] bg-white px-4 py-3 shadow-[0_-10px_30px_rgba(30,58,95,0.08)] lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[#5c7188]">
                {basketCount} article{basketCount > 1 ? "s" : ""}
              </div>
              <div className="text-lg font-semibold text-[#1a365d]">
                {money.format(basketTotal)}
              </div>
            </div>
            {step === "shop" ? (
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="rounded-xl bg-[#f5a623] px-5 py-3 text-sm font-semibold text-[#1e3a5f]"
              >
                Valider mon panier
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={isPaying}
                className="rounded-xl bg-[#f5a623] px-5 py-3 text-sm font-semibold text-[#1e3a5f] disabled:opacity-60"
              >
                {isPaying ? "Paiement…" : "Payer"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modale paiement SumUp */}
      {sumupCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e3a5f]/60 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#1a365d]">
                Paiement {money.format(basketTotal)}
              </h2>
              <button
                type="button"
                onClick={closeSumUp}
                className="text-sm text-[#5c7188] hover:text-[#1a365d]"
              >
                Annuler
              </button>
            </div>
            {customerError && (
              <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {customerError}
              </p>
            )}
            <div id="sumup-swift" className="mb-3 empty:hidden" />
            <div id="sumup-card" />
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#5c7188]">
              <ShieldCheck size={13} /> Paiement sécurisé SumUp
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateSales;
