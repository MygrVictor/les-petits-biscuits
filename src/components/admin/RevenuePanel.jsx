import { useMemo, useState } from "react";
import { cardClass, formatMoney } from "./adminUtils";

const PERIODS = [
  { id: "all", label: "Tout" },
  { id: "7d", label: "7 jours" },
  { id: "30d", label: "30 jours" },
  { id: "month", label: "Ce mois" },
  { id: "year", label: "Cette année" },
  { id: "custom", label: "Personnalisé" },
];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const getRange = (period, customFrom, customTo) => {
  const now = new Date();
  switch (period) {
    case "7d":
      return [startOfDay(new Date(now - 6 * 86400000)), now];
    case "30d":
      return [startOfDay(new Date(now - 29 * 86400000)), now];
    case "month":
      return [new Date(now.getFullYear(), now.getMonth(), 1), now];
    case "year":
      return [new Date(now.getFullYear(), 0, 1), now];
    case "custom":
      return [
        customFrom ? new Date(customFrom) : null,
        customTo ? new Date(`${customTo}T23:59:59`) : null,
      ];
    default:
      return [null, null];
  }
};

const selectClass =
  "rounded-xl border border-[#dfe7ef] bg-white px-3 py-2 text-sm text-[#1a365d] outline-none focus:border-[#f5a623]";

const RevenuePanel = ({ sales, orders }) => {
  const [saleId, setSaleId] = useState("all");
  const [period, setPeriod] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => {
    const [start, end] = getRange(period, from, to);
    return orders.filter((o) => {
      if (saleId !== "all" && o.saleId !== saleId) return false;
      const d = new Date(o.date);
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
  }, [orders, saleId, period, from, to]);

  const revenue = filtered.reduce((s, o) => s + Number(o.total || 0), 0);
  const count = filtered.length;
  const average = count ? revenue / count : 0;
  const units = filtered.reduce(
    (s, o) =>
      s + (o.items || []).reduce((a, i) => a + Number(i.quantity || 0), 0),
    0,
  );

  // CA par vente
  const bySale = useMemo(() => {
    const map = new Map();
    filtered.forEach((o) => {
      const entry = map.get(o.saleId) || { revenue: 0, count: 0 };
      entry.revenue += Number(o.total || 0);
      entry.count += 1;
      map.set(o.saleId, entry);
    });
    return [...map.entries()]
      .map(([id, v]) => ({
        id,
        name: sales.find((s) => s.id === id)?.name || "Vente supprimée",
        ...v,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filtered, sales]);

  const kpis = [
    {
      label: "Chiffre d'affaires",
      value: formatMoney(revenue),
      highlight: true,
    },
    { label: "Commandes", value: count },
    { label: "Panier moyen", value: formatMoney(average) },
    { label: "Unités vendues", value: units },
  ];

  return (
    <section className={cardClass}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-serif text-xl text-[#1a365d]">
          Chiffre d'affaires
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={saleId}
            onChange={(e) => setSaleId(e.target.value)}
            className={selectClass}
          >
            <option value="all">Toutes les ventes</option>
            {sales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap rounded-xl border border-[#dfe7ef] bg-[#f8fafc] p-1">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  period === p.id
                    ? "bg-[#1e3a5f] text-white"
                    : "text-[#5c7188] hover:text-[#1a365d]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {period === "custom" && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#5c7188]">
          Du
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={selectClass}
          />
          au
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={selectClass}
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className={`rounded-xl p-4 ${
              k.highlight ? "bg-[#1e3a5f] text-white" : "bg-[#f8fafc]"
            }`}
          >
            <div
              className={`text-xs uppercase tracking-[0.12em] ${
                k.highlight ? "text-[#f5a623]" : "text-[#5c7188]"
              }`}
            >
              {k.label}
            </div>
            <div
              className={`mt-2 font-serif text-2xl ${
                k.highlight ? "text-white" : "text-[#1a365d]"
              }`}
            >
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {count === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-[#dfe7ef] p-6 text-center text-sm text-[#5c7188]">
          Aucune commande sur cette sélection.
        </p>
      ) : (
        <div className="mt-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#1a365d]">
              Par vente
            </h3>
            <ul className="space-y-3">
              {bySale.map((s) => (
                <li key={s.id}>
                  <div className="mb-1 flex justify-between gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setSaleId(s.id)}
                      className="truncate text-left text-[#1a365d] hover:text-[#f5a623]"
                      title="Filtrer sur cette vente"
                    >
                      {s.name}
                    </button>
                    <span className="shrink-0 font-semibold text-[#1e3a5f]">
                      {formatMoney(s.revenue)}
                      <span className="ml-1 text-xs font-normal text-[#5c7188]">
                        ({s.count} cmd)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#edf2f7]">
                    <div
                      className="h-full rounded-full bg-[#1e3a5f]"
                      style={{ width: `${(s.revenue / revenue) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default RevenuePanel;
