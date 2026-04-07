import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Détecter la section active
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveLink(navLinks[i].href);
          return;
        }
      }
      setActiveLink("");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#atelier", label: "L'Atelier" },
    { href: "#creations", label: "Nos Créations" },
    { href: "#coffrets", label: "Coffrets" },
    { href: "#contact", label: "Nous Trouver" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-1"
      style={{ backgroundColor: "#1e3a5f" }}
    >
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center"
          aria-label="Accueil - Les Petits Biscuits"
        >
          <img
            src="/logonav.png"
            alt="Les Petits Biscuits - Retour à l'accueil"
            className="h-14 w-auto"
            width="56"
            height="56"
          />
        </a>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-serif text-base tracking-wide transition-all duration-300 hover:opacity-100 pb-1 group"
              style={{
                color: "#f5a623",
                opacity: activeLink === link.href ? 1 : 0.85,
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                style={{
                  backgroundColor: "#f5a623",
                  width: activeLink === link.href ? "100%" : "0%",
                }}
              />
            </a>
          ))}
        </div>

        {/* Menu Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 transition-colors"
          style={{ color: "#f5a623" }}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#1e3a5f" }}
      >
        <div className="flex flex-col items-center gap-1 py-4 px-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-serif hover:opacity-70 w-full text-center py-2 transition-all duration-500"
              style={{
                color: "#f5a623",
                transitionDelay: isMenuOpen ? `${index * 80}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(-12px)",
              }}
            >
              {link.label}
            </a>
          ))}
          {/* Ligne décorative */}
          <div
            className="mt-2 h-px transition-all duration-700 ease-out"
            style={{
              backgroundColor: "#f5a623",
              width: isMenuOpen ? "60%" : "0%",
              opacity: isMenuOpen ? 0.3 : 0,
              transitionDelay: isMenuOpen ? "300ms" : "0ms",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
