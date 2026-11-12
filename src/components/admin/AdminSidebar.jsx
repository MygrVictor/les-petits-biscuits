import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  PlusCircle,
  Cookie,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    group: "Général",
  },
  { id: "orders", label: "Commandes", icon: Package, group: "Général" },
  { id: "products", label: "Produits", icon: Cookie, group: "Catalogue" },
  {
    id: "sales",
    label: "Toutes les ventes",
    icon: ShoppingBag,
    group: "Ventes privées",
  },
  {
    id: "sale-editor",
    label: "Créer une vente",
    icon: PlusCircle,
    group: "Ventes privées",
  },
];

const AdminSidebar = ({ activeView, onNavigate, counts = {} }) => {
  const groups = [...new Set(NAV_ITEMS.map((item) => item.group))];

  return (
    <>
      {/* Desktop : sidebar fixe */}
      <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 flex-col border-r border-white/10 bg-[#1e3a5f] text-white lg:flex">
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {groups.map((group) => (
            <div key={group} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {group}
              </p>
              <ul className="space-y-1">
                {NAV_ITEMS.filter((item) => item.group === group).map(
                  ({ id, label, icon: Icon }) => {
                    const isActive = activeView === id;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => onNavigate(id)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                            isActive
                              ? "bg-[#f5a623] text-[#1e3a5f]"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon size={17} />
                          <span className="flex-1 text-left">{label}</span>
                          {counts[id] !== undefined && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] ${
                                isActive ? "bg-[#1e3a5f]/15" : "bg-white/10"
                              }`}
                            >
                              {counts[id]}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-4 text-xs text-white/40">
          Les Petits Biscuits
        </div>
      </aside>

      {/* Mobile : barre d'onglets fixe en bas */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-white/10 bg-[#1e3a5f] lg:hidden">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${
              activeView === id ? "text-[#f5a623]" : "text-white/70"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
};

export default AdminSidebar;
