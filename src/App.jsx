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

      {/* Bouton retour en haut */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-gold"
          style={{ backgroundColor: "#1e3a5f" }}
          aria-label="Retour en haut de page"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}

export default App;
