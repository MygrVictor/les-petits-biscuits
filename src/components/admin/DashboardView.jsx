import {
  cardClass,
  formatMoney,
  formatDate,
  getSaleStatus,
} from "./adminUtils";
import { getProductionTotals, getSaleOrders } from "./productionUtils";
import RevenuePanel from "./RevenuePanel";
import { ChefHat, Package, Clock3, BadgeEuro, Sparkles } from "lucide-react";

const DashboardView = ({ sales, orders, onNavigate }) => {
  const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const activeSales = sales.filter(
    (s) => getSaleStatus(s).label === "En cours",
  );
  const activeProduction = activeSales
    .map((sale) => {
      const totals = getProductionTotals(sale, orders);
      const saleOrders = getSaleOrders(sale.id, orders);
      return {
        sale,
        ...totals,
        ordersCount: saleOrders.length,
      };
    })
    .sort((a, b) => new Date(a.sale.endDate) - new Date(b.sale.endDate));

  const unitsTotal = activeProduction.reduce((sum, s) => sum + s.units, 0);
  const linesTotal = activeProduction.reduce((sum, s) => sum + s.lines, 0);

  const metrics = [
    { label: "Ventes totales", value: sales.length },
    { label: "Ventes en cours", value: activeSales.length },
    { label: "Commandes", value: orders.length },
    { label: "CA total", value: formatMoney(revenue) },
  ];

  const latestOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a2a44] via-[#243b63] to-[#b8822d] p-6 text-white shadow-[0_16px_45px_rgba(26,42,68,0.30)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.12em]">
              <Sparkles size={12} /> Pilotage opérationnel
            </div>
            <h2 className="mt-3 font-serif text-3xl leading-tight">
              Vue production des ventes privées
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/85">
              Tout est centralisé : volumes à produire, commandes en cours et
              chiffre d’affaires, sans recompter commande par commande.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("sales")}
            className="rounded-xl bg-white/18 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
          >
            Ouvrir les ventes
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/75">
              <ChefHat size={14} /> Production totale
            </div>
            <div className="mt-1 text-2xl font-semibold">{unitsTotal} u</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/75">
              <Package size={14} /> Références actives
            </div>
            <div className="mt-1 text-2xl font-semibold">{linesTotal}</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/75">
              <Clock3 size={14} /> Ventes en cours
            </div>
            <div className="mt-1 text-2xl font-semibold">
              {activeSales.length}
            </div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/75">
              <BadgeEuro size={14} /> CA cumulé
            </div>
            <div className="mt-1 text-2xl font-semibold">
              {formatMoney(revenue)}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className={cardClass}>
            <div className="text-xs uppercase tracking-[0.12em] text-[#5c7188]">
              {m.label}
            </div>
            <div className="mt-3 font-serif text-3xl text-[#1a365d]">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      <RevenuePanel sales={sales} orders={orders} />

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#1a365d]">
            Plan de fabrication par vente
          </h2>
          <span className="rounded-full bg-[#f3f8ff] px-3 py-1 text-xs font-semibold text-[#1e3a5f]">
            {activeProduction.length} vente
            {activeProduction.length > 1 ? "s" : ""}
          </span>
        </div>
        {activeProduction.length === 0 ? (
          <p className="text-sm text-[#36506d]">
            Aucune vente en cours à produire.
          </p>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {activeProduction.map(
              ({
                sale,
                summary,
                units,
                lines,
                ordersCount,
                revenue: saleRevenue,
              }) => (
                <article
                  key={sale.id}
                  className="rounded-xl border border-[#e7edf4] bg-[#fbfdff] p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-[#1a365d]">
                        {sale.name}
                      </h3>
                      <p className="text-xs text-[#5c7188]">
                        Clôture le {formatDate(sale.endDate)}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#eef7ee] px-2.5 py-1 text-xs font-medium text-[#1f6f43]">
                      {getSaleStatus(sale).label}
                    </span>
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-white px-3 py-2 text-[#36506d]">
                      <div>Commandes</div>
                      <div className="mt-0.5 text-base font-semibold text-[#1a365d]">
                        {ordersCount}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 text-[#36506d]">
                      <div>À produire</div>
                      <div className="mt-0.5 text-base font-semibold text-[#1a365d]">
                        {units} unité{units > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 text-[#36506d]">
                      <div>Références actives</div>
                      <div className="mt-0.5 text-base font-semibold text-[#1a365d]">
                        {lines}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 text-[#36506d]">
                      <div>CA vente</div>
                      <div className="mt-0.5 text-base font-semibold text-[#1a365d]">
                        {formatMoney(saleRevenue)}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {summary
                      .filter((item) => item.quantity > 0)
                      .slice(0, 5)
                      .map((item) => (
                        <li
                          key={`${sale.id}-${item.name}`}
                          className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
                        >
                          <span className="truncate pr-3 text-[#36506d]">
                            {item.name}
                          </span>
                          <span className="font-semibold text-[#1a365d]">
                            × {item.quantity}
                          </span>
                        </li>
                      ))}
                  </ul>
                </article>
              ),
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#1a365d]">
              Ventes en cours
            </h2>
            <button
              type="button"
              onClick={() => onNavigate("sales")}
              className="text-sm font-medium text-[#f5a623] hover:underline"
            >
              Tout voir
            </button>
          </div>
          {activeSales.length === 0 ? (
            <p className="text-sm text-[#36506d]">Aucune vente en cours.</p>
          ) : (
            <ul className="divide-y divide-[#edf2f7]">
              {activeSales.map((sale) => (
                <li key={sale.id} className="flex items-center gap-3 py-3">
                  <img
                    src={sale.coverImage}
                    alt=""
                    className="h-10 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[#1a365d]">
                      {sale.name}
                    </div>
                    <div className="text-xs text-[#5c7188]">
                      Jusqu'au {formatDate(sale.endDate)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#36506d]">
                      {getSaleOrders(sale.id, orders).length} cmd
                    </div>
                    <div className="text-xs font-semibold text-[#1e3a5f]">
                      {getProductionTotals(sale, orders).units} u à produire
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#1a365d]">
              Dernières commandes
            </h2>
            <button
              type="button"
              onClick={() => onNavigate("orders")}
              className="text-sm font-medium text-[#f5a623] hover:underline"
            >
              Tout voir
            </button>
          </div>
          {latestOrders.length === 0 ? (
            <p className="text-sm text-[#36506d]">Aucune commande.</p>
          ) : (
            <ul className="divide-y divide-[#edf2f7]">
              {latestOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div>
                    <div className="font-medium text-[#1a365d]">
                      {order.customerName}
                    </div>
                    <div className="text-xs text-[#5c7188]">
                      {order.id} ·{" "}
                      {new Date(order.date).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <span className="font-semibold text-[#1e3a5f]">
                    {formatMoney(order.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
