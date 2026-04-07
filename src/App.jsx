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
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [showTop, setShowTop] = useState(false);

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
      <Header />
      <main role="main">
        <Hero />
        <QuiSommesNous />
        <Products />
        <Testimonials />
        <Professionnels />
        <Contact />
      </main>
      <Footer />
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
