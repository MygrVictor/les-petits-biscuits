import { useState, useEffect } from "react";
import { Menu, X, Settings, ArrowLeft, LogOut } from "lucide-react";
import AdminLoginModal, {
  isAdminAuthenticated,
  SESSION_KEY,
} from "./admin/AdminLoginModal";

const Header = ({
  showPrivateSales,
  setShowPrivateSales,
  showPrivateSalesAdmin,
  setShowPrivateSalesAdmin,
}) => {
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

  const handlePrivateAccess = () => {
    setShowPrivateSalesAdmin(false);
    setShowPrivateSales(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackHome = () => {
    setShowPrivateSales(false);
    setShowPrivateSalesAdmin(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openAdmin = () => {
    setShowPrivateSales(false);
    setShowPrivateSalesAdmin(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminAccess = () => {
    setIsMenuOpen(false);
    if (isAdminAuthenticated()) openAdmin();
    else setIsLoginOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    handleBackHome();
  };

  // Lien d'ancre : revient d'abord sur le site si on est sur la vente privée
  const handleAnchorClick = (event, href) => {
    setIsMenuOpen(false);
    if (showPrivateSales) {
      event.preventDefault();
      setShowPrivateSales(false);
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const linkStyle = (isActive) => ({
    color: "#f5a623",
    opacity: isActive ? 1 : 0.85,
  });

  if (showPrivateSalesAdmin) {
    return (
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b border-white/10 bg-[#1e3a5f]">
        <div className="flex h-full items-center px-6 lg:w-64 lg:border-r lg:border-white/10">
          <div>
            <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.2em] text-white/50">
              Admin
            </p>
            <p className="mt-1 font-serif text-lg leading-none text-[#f5a623]">
              Back office
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 px-6">
          <button
            type="button"
            onClick={handleBackHome}
            className="inline-flex items-center gap-2 rounded-full border border-[#f5a623]/60 px-4 py-2 text-sm font-semibold text-[#f5a623] transition hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            Retour site
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-1"
      style={{ backgroundColor: "#1e3a5f" }}
    >
      {/* Engrenage admin collé au bord droit de l'écran */}
      <button
        type="button"
        onClick={handleAdminAccess}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 p-1.5 text-[#f5a623]/60 transition hover:rotate-45 hover:text-[#f5a623] md:block"
        aria-label="Administration"
        title="Administration"
      >
        <Settings size={18} />
      </button>

      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <button
          type="button"
          onClick={
            showPrivateSales || showPrivateSalesAdmin
              ? handleBackHome
              : () => (window.location.href = "#")
          }
          className="group flex items-center justify-self-start"
          aria-label="Accueil - Les Petits Biscuits"
        >
          <img
            src="/logonav.webp"
            alt="Les Petits Biscuits - Retour à l'accueil"
            className="h-14 w-auto"
            width="200"
            height="135"
          />
        </button>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = !showPrivateSales && activeLink === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="relative font-serif text-base tracking-wide transition-all duration-300 hover:opacity-100 pb-1 group"
                style={linkStyle(isActive)}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: "#f5a623",
                    width: isActive ? "100%" : "0%",
                  }}
                />
              </a>
            );
          })}

          <button
            type="button"
            onClick={handlePrivateAccess}
            className="relative font-serif text-base tracking-wide transition-all duration-300 hover:opacity-100 pb-1 group"
            style={linkStyle(showPrivateSales)}
          >
            Vente privée
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
              style={{
                backgroundColor: "#f5a623",
                width: showPrivateSales ? "100%" : "0%",
              }}
            />
          </button>
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
          isMenuOpen ? "max-h-[22rem] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#1e3a5f" }}
      >
        <div className="flex flex-col items-center gap-1 py-4 px-6">
          {[...navLinks, { href: "#vente-privee", label: "Vente privée" }].map(
            (link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === "#vente-privee") {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    handlePrivateAccess();
                  } else {
                    handleAnchorClick(e, link.href);
                  }
                }}
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
            ),
          )}

          <button
            type="button"
            onClick={handleAdminAccess}
            className="mt-2 p-2 text-[#f5a623]/60"
            aria-label="Administration"
          >
            <Settings size={20} />
          </button>

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

      {isLoginOpen && (
        <AdminLoginModal
          onClose={() => setIsLoginOpen(false)}
          onSuccess={() => {
            setIsLoginOpen(false);
            openAdmin();
          }}
        />
      )}
    </header>
  );
};

export default Header;
