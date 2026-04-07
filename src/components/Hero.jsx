import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[30vh] flex flex-col lg:flex-row">
      {/* Partie Gauche - Logo image sur fond jaune */}
      <div
        className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20 pb-10 lg:pt-24"
        style={{ backgroundColor: "#FEB441" }}
      >
        {/* Logo image */}
        <div className="mb-4">
          <img
            src="/logo.webp"
            alt="Les Petits Biscuits - Biscuiterie artisanale à Pornic, Loire-Atlantique"
            className="w-full max-w-xs md:max-w-sm lg:max-w-lg mx-auto"
            width="600"
            height="590"
          />
        </div>

        {/* Accroche - H1 pour le SEO */}
        <h1
          className="text-center text-xl md:text-2xl lg:text-3xl max-w-md leading-relaxed mb-6 font-handwritten italic"
          style={{ color: "#1e3a5f" }}
        >
          Simplicité, Authenticité, Savoir-faire artisanal, Convivialité
        </h1>

        {/* CTA */}
        <a
          href="#creations"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
          style={{ backgroundColor: "#1e3a5f", color: "#f5a623" }}
        >
          <span>Découvrir nos gourmandises</span>
          <span className="font-handwritten text-xl">↓</span>
        </a>
      </div>

      {/* Partie Droite - Photo de la boutique */}
      <div className="w-full lg:w-1/2 h-[35vh] lg:h-auto lg:min-h-[60vh] relative">
        <img
          src="/boutique.webp"
          alt="Boutique Les Petits Biscuits, 11 rue de l'Église à Pornic - biscuiterie artisanale"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          width="800"
          height="1066"
        />
        {/* Overlay subtil */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/10"></div>

        {/* Badge flottant */}
        <div
          className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 p-2.5 lg:p-4 rounded-xl shadow-xl text-center"
          style={{ backgroundColor: "#1e3a5f" }}
        >
          <p
            className="font-handwritten text-sm lg:text-lg"
            style={{ color: "#f5a623" }}
          >
            Fabrication
          </p>
          <p className="text-white text-[10px] lg:text-xs tracking-wide">
            100% Artisanale
          </p>
          <p className="text-white/70 text-[8px] lg:text-[10px] mt-0.5">
            11 rue de l'Église
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
