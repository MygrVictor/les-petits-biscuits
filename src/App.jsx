import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuiSommesNous from "./components/About";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Professionnels from "./components/Partners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivateSales from "./components/PrivateSales";
import PrivateSalesAdmin from "./components/PrivateSalesAdmin";
import { isAdminAuthenticated } from "./components/admin/AdminLoginModal";
import { Analytics } from "@vercel/analytics/react";
import { useSyncedCollection } from "./lib/api";

function App() {
  const [showTop, setShowTop] = useState(false);
  const [showPrivateSales, setShowPrivateSales] = useState(false);
  const [showPrivateSalesAdmin, setShowPrivateSalesAdmin] = useState(false);
  const adminActive = showPrivateSalesAdmin && isAdminAuthenticated();
  const [sales, setSales, salesState] = useSyncedCollection(
    "/api/admin/sales",
    adminActive,
  );
  const [orders, , ordersState] = useSyncedCollection(
    "/api/admin/orders",
    adminActive,
  );
  const [catalog, setCatalog, catalogState] = useSyncedCollection(
    "/api/admin/products",
    adminActive,
  );
  // Les commandes sont en lecture seule côté admin (mise à jour locale uniquement)
  const setOrders = ordersState.setLocal;
  const syncError = salesState.error || ordersState.error || catalogState.error;

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-kraft-50">
      <Header
        showPrivateSales={showPrivateSales}
        setShowPrivateSales={setShowPrivateSales}
        showPrivateSalesAdmin={showPrivateSalesAdmin}
        setShowPrivateSalesAdmin={setShowPrivateSalesAdmin}
      />
      <main role="main">
        {adminActive ? (
          <>
            {syncError && (
              <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg">
                {syncError}
              </div>
            )}
            <PrivateSalesAdmin
              sales={sales}
              setSales={setSales}
              orders={orders}
              setOrders={setOrders}
              catalog={catalog}
              setCatalog={setCatalog}
            />
          </>
        ) : showPrivateSales ? (
          <PrivateSales />
        ) : (
          <>
            <Hero />
            <QuiSommesNous />
            <Products />
            <Testimonials />
            <Professionnels />
            <Contact />
          </>
        )}
      </main>
      {!showPrivateSalesAdmin && <Footer />}
      <Analytics />

      {/* Bouton retour en haut */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut de page"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#1e3a5f",
            border: "2px solid #d4a84b",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
          className="flex hover:scale-110 transition-transform"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}

export default App;
