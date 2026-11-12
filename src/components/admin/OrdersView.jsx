import { useState } from "react";
import { cardClass, formatMoney } from "./adminUtils";

const OrdersView = ({ sales, orders }) => {
  const [saleFilter, setSaleFilter] = useState("all");

  const saleName = (id) => sales.find((s) => s.id === id)?.name || "—";
  const filtered =
    saleFilter === "all"
      ? orders
      : orders.filter((o) => o.saleId === saleFilter);

  return (
    <div className={cardClass}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl text-[#1a365d]">
          {filtered.length} commande{filtered.length > 1 ? "s" : ""}
        </h2>
        <select
          value={saleFilter}
          onChange={(e) => setSaleFilter(e.target.value)}
          className="rounded-xl border border-[#dfe7ef] bg-white px-3 py-2 text-sm text-[#1a365d]"
        >
          <option value="all">Toutes les ventes</option>
          {sales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#dfe7ef] p-6 text-center text-sm text-[#36506d]">
          Aucune commande.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#edf2f7] text-xs uppercase tracking-[0.1em] text-[#5c7188]">
                <th className="py-3 pr-4">Commande</th>
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Vente</th>
                <th className="py-3 pr-4">Articles</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Statut</th>
                <th className="py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7] text-[#36506d]">
              {filtered.map((order) => (
                <tr key={order.id} className="align-top">
                  <td className="py-3 pr-4 font-medium text-[#1a365d]">
                    {order.id}
                  </td>
                  <td className="py-3 pr-4">{order.customerName}</td>
                  <td className="py-3 pr-4">{saleName(order.saleId)}</td>
                  <td className="py-3 pr-4">
                    {(order.items || []).map((item) => (
                      <div key={`${order.id}-${item.productId}`}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 pr-4">
                    {new Date(order.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-[#fff3d8] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8a5f12]">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold text-[#1e3a5f]">
                    {formatMoney(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersView;
