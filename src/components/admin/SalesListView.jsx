import { Fragment, useState } from "react";
import { Pencil, Trash2, Plus, ChefHat, ChevronDown } from "lucide-react";
import {
  cardClass,
  formatDate,
  formatMoney,
  getSaleStatus,
} from "./adminUtils";
import {
  getProductionSummary,
  getProductionTotals,
  getSaleOrders,
} from "./productionUtils";

const ProductionPanel = ({ sale, orders }) => {
  const summary = getProductionSummary(sale, orders);
  const totalUnits = summary.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="rounded-xl border border-[#f5a623]/30 bg-[#fffaf0] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-serif text-lg text-[#1a365d]">
          <ChefHat size={18} className="text-[#f5a623]" />À préparer
        </div>
        <span className="text-sm font-semibold text-[#1e3a5f]">
          {totalUnits} unité{totalUnits > 1 ? "s" : ""} au total
        </span>
      </div>
      {summary.length === 0 ? (
        <p className="text-sm text-[#36506d]">
          Aucun produit dans cette vente.
        </p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {summary.map((p) => (
            <li
              key={p.name}
              className="flex items-center gap-3 rounded-lg bg-white px-3 py-2"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  className="h-9 w-9 rounded-md object-cover"
                />
              )}
              <div className="flex-1">
                <div className="text-sm font-medium text-[#1a365d]">
                  {p.name}
                </div>
                <div className="text-xs text-[#5c7188]">
                  {formatMoney(p.total)}
                </div>
              </div>
              <span
                className={`min-w-[3rem] rounded-full px-3 py-1 text-center text-sm font-bold ${
                  p.quantity > 0
                    ? "bg-[#1e3a5f] text-[#f5a623]"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                × {p.quantity}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SalesListView = ({ sales, orders, onEdit, onDelete, onCreate }) => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className={cardClass}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl text-[#1a365d]">
          {sales.length} vente{sales.length > 1 ? "s" : ""}
        </h2>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f4b644]"
        >
          <Plus size={16} /> Nouvelle vente
        </button>
      </div>

      {sales.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#dfe7ef] p-6 text-center text-sm text-[#36506d]">
          Aucune vente créée pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#edf2f7] text-xs uppercase tracking-[0.1em] text-[#5c7188]">
                <th className="py-3 pr-4">Vente</th>
                <th className="py-3 pr-4">Code</th>
                <th className="py-3 pr-4">Période</th>
                <th className="py-3 pr-4">Produits</th>
                <th className="py-3 pr-4">Commandes</th>
                <th className="py-3 pr-4">À préparer</th>
                <th className="py-3 pr-4">Statut</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7] text-[#36506d]">
              {sales.map((sale) => {
                const status = getSaleStatus(sale);
                const isOpen = openId === sale.id;
                const totals = getProductionTotals(sale, orders);
                const saleOrders = getSaleOrders(sale.id, orders);
                return (
                  <Fragment key={sale.id}>
                    <tr>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={sale.coverImage}
                            alt=""
                            className="h-10 w-16 rounded-lg object-cover"
                          />
                          <span className="font-medium text-[#1a365d]">
                            {sale.name}
                          </span>
                        </div>
                        <div className="mt-1.5 text-xs text-[#5c7188]">
                          À préparer :
                          <span className="ml-1 font-semibold text-[#1e3a5f]">
                            {totals.units} unité{totals.units > 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs">
                        {sale.code}
                      </td>
                      <td className="py-3 pr-4 text-xs">
                        {formatDate(sale.startDate)} →{" "}
                        {formatDate(sale.endDate)}
                      </td>
                      <td className="py-3 pr-4">
                        {sale.products?.length || 0}
                      </td>
                      <td className="py-3 pr-4">{saleOrders.length}</td>
                      <td className="py-3 pr-4">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-[#f5a623]/40 bg-[#fffaf0] px-3 py-1.5 text-xs font-semibold text-[#1e3a5f]">
                          <ChefHat size={14} />
                          {totals.lines} réf. · {totals.units} u
                        </div>
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : sale.id)}
                          className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-[#5c7188] hover:text-[#1a365d]"
                        >
                          Détail
                          <ChevronDown
                            size={14}
                            className={`transition ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(sale)}
                            className="rounded-lg border border-[#dfe7ef] p-2 text-[#1e3a5f] hover:bg-[#f3f8ff]"
                            aria-label="Modifier"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Supprimer « ${sale.name} » et ses commandes ?`,
                                )
                              ) {
                                onDelete(sale.id);
                              }
                            }}
                            className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            aria-label="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td colSpan={8} className="pb-4">
                          <ProductionPanel sale={sale} orders={orders} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesListView;
