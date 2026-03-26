const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kraft-100 border-t border-kraft-300">
      {/* Citation finale */}
      <div className="py-12 text-center" style={{ backgroundColor: "#1e3a5f" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-handwritten text-2xl md:text-3xl text-kraft-300 mb-4">
            "On sent l'odeur du biscuit depuis la rue de l'Église..."
          </p>
          <p className="text-white/60 text-sm">Venez goûter, vous verrez !</p>
        </div>
      </div>

      {/* Footer principal */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Slogan */}
          <div className="text-center md:text-left">
            <p className="text-charcoal-600 text-sm">
              <span className="text-gold">Simplicité</span> •{" "}
              <span className="text-gold">Authenticité</span> •{" "}
              <span className="text-gold">Savoir-faire</span>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-charcoal-500 text-sm">
              © {currentYear} Les Petits Biscuits
            </p>
            <address className="text-xs text-charcoal-400 mt-1 not-italic">
              11 rue de l'Église, 44210 Pornic
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
