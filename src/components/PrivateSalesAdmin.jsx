import { useState } from "react";
import AdminSidebar from "./admin/AdminSidebar";
import DashboardView from "./admin/DashboardView";
import SalesListView from "./admin/SalesListView";
import SaleEditor from "./admin/SaleEditor";
import OrdersView from "./admin/OrdersView";
import ProductsView from "./admin/ProductsView";
import { PRODUCT_LIBRARY } from "./admin/adminUtils";

const VIEW_TITLES = {
  dashboard: { kicker: "Général", title: "Tableau de bord" },
  orders: { kicker: "Général", title: "Commandes" },
  products: { kicker: "Catalogue", title: "Produits" },
  sales: { kicker: "Ventes privées", title: "Toutes les ventes" },
  "sale-editor": { kicker: "Ventes privées", title: "Créer une vente" },
};

const PrivateSalesAdmin = ({
  sales,
  setSales,
  orders = [],
  setOrders = () => {},
  catalog: catalogProp,
  setCatalog: setCatalogProp,
}) => {
  // Catalogue : géré par App si fourni, sinon localement
  const [localCatalog, setLocalCatalog] = useState(PRODUCT_LIBRARY);
  const catalog = catalogProp ?? localCatalog;
  const setCatalog = setCatalogProp ?? setLocalCatalog;
  const [activeView, setActiveView] = useState("dashboard");
  const [editingSale, setEditingSale] = useState(null);
  // clé pour réinitialiser l'éditeur à chaque ouverture
  const [editorKey, setEditorKey] = useState(0);

  const navigate = (view) => {
    if (view === "sale-editor") {
      setEditingSale(null);
      setEditorKey((k) => k + 1);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEditor = (sale) => {
    setEditingSale(sale);
    setEditorKey((k) => k + 1);
    setActiveView("sale-editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveSale = (payload) => {
    setSales((prev) => {
      const idx = prev.findIndex((s) => s.id === payload.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [payload, ...prev];
    });
    setEditingSale(null);
    setActiveView("sales");
  };

  const deleteSale = (saleId) => {
    setSales((prev) => prev.filter((s) => s.id !== saleId));
    setOrders((prev) => prev.filter((o) => o.saleId !== saleId));
  };

  const header =
    activeView === "sale-editor" && editingSale
      ? { kicker: "Ventes privées", title: `Modifier « ${editingSale.name} »` }
      : VIEW_TITLES[activeView];

  return (
    <div className="min-h-screen bg-[#f4f6f9] pt-16">
      <AdminSidebar
        activeView={activeView}
        onNavigate={navigate}
        counts={{
          sales: sales.length,
          orders: orders.length,
          products: catalog.length,
        }}
      />

      <div className="pb-20 lg:pb-10 lg:pl-64">
        <header className="sticky top-16 z-10 border-b border-[#e7edf4] bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5a623]">
              {header.kicker}
            </p>
            <h1 className="mt-1 font-serif text-3xl text-[#1a365d]">
              {header.title}
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8">
          {activeView === "dashboard" && (
            <DashboardView
              sales={sales}
              orders={orders}
              onNavigate={navigate}
            />
          )}
          {activeView === "orders" && (
            <OrdersView sales={sales} orders={orders} />
          )}
          {activeView === "sales" && (
            <SalesListView
              sales={sales}
              orders={orders}
              onEdit={openEditor}
              onDelete={deleteSale}
              onCreate={() => navigate("sale-editor")}
            />
          )}
          {activeView === "products" && (
            <ProductsView
              catalog={catalog}
              setCatalog={setCatalog}
              sales={sales}
            />
          )}
          {activeView === "sale-editor" && (
            <SaleEditor
              key={editorKey}
              initialSale={editingSale}
              catalog={catalog}
              onAddToCatalog={(p) => setCatalog((prev) => [p, ...prev])}
              onGoToCatalog={() => navigate("products")}
              onSave={saveSale}
              onCancel={() => navigate("sales")}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default PrivateSalesAdmin;
