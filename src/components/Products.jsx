import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Sablés - Le produit signature
const sablesDiamant = {
  name: "Nos Sablés",
  subtitle: "Notre produit Signature",
  description:
    "Notre sablé est un petit biscuit au beurre, rond, doré et très gourmand. Le sucre partiellement caramélisé lui donne un aspect brillant sur la tranche. Sa texture est croustillante et son cœur délicieusement fondant. Quelle que soit la saveur, ce sablé ne vous laissera pas indifférent !",
  image: "/products/sables-diamant.jpg",
  saveursSucrees: [
    "Vanille & Fleur de Sel",
    "Tout Chocolat",
    "Praliné de Noisettes",
    "Éclats de Caramel au Beurre Salé",
    "Framboise Cerise",
    "Citron",
    "Confit de Gingembre",
    "Cannelle Spéculos",
    "Pépites de Chocolat",
    "Thé Matcha",
    "Noix de Pécan",
    "Orange",
    "Nature",
    "M&M's®",
    "Daim®",
  ],
  saveursSansGluten: ["Sarrasin Caramel", "Vanille"],
};

// Nos autres douceurs sucrées
const autresDouceurs = [
  {
    name: "Sablés Salés Parmesan & Oignons",
    desc: "Un sablé croustillant pour l'apéritif, au parmesan et oignons",
    image: "/products/sables-diamant.jpg",
    isSale: true,
  },
  {
    name: "Financiers aux Amandes",
    desc: "Moelleux et savoureux, dans la plus pure tradition artisanale",
    image: "/products/financiers-amandes.jpg",
  },
  {
    name: "Moelleux au Chocolat",
    desc: "Un classique qui plaît toujours, version mini pour le café",
    image: "/products/moelleux-chocolat.jpg",
  },
  {
    name: "Madeleines",
    desc: "Nature ou aux éclats de caramel au beurre salé",
    image: "/products/madeleines.jpg",
  },
  {
    name: "Croquants Amandes & Noisettes",
    desc: "De gourmands croquants aux fruits secs dans un biscuit raffiné",
    image: "/products/croquants-noisettes-amandes.jpg",
  },
  {
    name: "Amandises aux 2 Chocolats",
    desc: "Chocolat noir, amandes, oranges confites et chocolat au lait",
    image: "/products/amandises.jpg",
  },
  {
    name: "Fruits Caramélisés",
    desc: "Cacahuètes, amandes, noisettes et noix de pécan caramélisées à la perfection",
    image: "/products/fruits-caramelises.jpg",
  },
  {
    name: "Roulettes Choco-Noisettes",
    desc: "De croustillants rouleaux de gaufrettes enrobés de chocolat et noisettes",
    image: "/products/roulettes.jpg",
  },
];

// Fruits secs aux épices
const fruitsSecs = {
  image: "/products/noix-cajou-curry-paprika.jpg",
  description:
    "De délicieux fruits croquants grillés dans notre chaudron en cuivre, accompagnés d'herbes et d'épices. N'attendez plus pour les goûter, plaisir garanti !",
  formats: ["70g", "150g"],
  varietes: [
    "Amandes à l'Ail Fumé & Fleur de Sel",
    "Noix de Cajou au Romarin & Fleur de Sel",
    "Noix de Cajou Curry & Paprika",
  ],
};

// Tartinables en pots
const tartinables = [
  {
    id: 1,
    name: "Crème de Caramel",
    subtitle: "Au beurre salé",
    description:
      "Alliance délicieuse de crème épaisse et sucre, agrémentée d'une touche de fleur de sel. Parfaite sur vos crêpes ou vos gaufres.",
    image: "/products/creme-caramel.jpg",
  },
  {
    id: 2,
    name: "Tartinables au Chocolat",
    subtitle: "Gourmandise en pot",
    description:
      "Nos délicieuses pâtes à tartiner maison, avec une touche de caramel croquant ou du praliné de noisettes. Petit ou grand format !",
    image: "/products/creme-chocolat.jpg",
  },
];

const Products = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [douceurIndex, setDouceurIndex] = useState(0);
  const [douceurPerSlide, setDouceurPerSlide] = useState(3);
  const [tartinableIndex, setTartinableIndex] = useState(0);

  useEffect(() => {
    const updatePerSlide = () => {
      if (window.innerWidth < 640) setDouceurPerSlide(1);
      else if (window.innerWidth < 1024) setDouceurPerSlide(2);
      else setDouceurPerSlide(3);
    };
    updatePerSlide();
    window.addEventListener("resize", updatePerSlide);
    return () => window.removeEventListener("resize", updatePerSlide);
  }, []);

  const maxDouceurIndex = Math.max(0, autresDouceurs.length - douceurPerSlide);

  const nextDouceur = useCallback(() => {
    setDouceurIndex((prev) => (prev >= maxDouceurIndex ? 0 : prev + 1));
  }, [maxDouceurIndex]);

  const prevDouceur = useCallback(() => {
    setDouceurIndex((prev) => (prev <= 0 ? maxDouceurIndex : prev - 1));
  }, [maxDouceurIndex]);

  // Tartinables carousel
  const maxTartinableIndex = tartinables.length - 1;

  const nextTartinable = useCallback(() => {
    setTartinableIndex((prev) => (prev >= maxTartinableIndex ? 0 : prev + 1));
  }, [maxTartinableIndex]);

  const prevTartinable = useCallback(() => {
    setTartinableIndex((prev) => (prev <= 0 ? maxTartinableIndex : prev - 1));
  }, [maxTartinableIndex]);

  // Autoplay douceurs
  useEffect(() => {
    const timer = setInterval(nextDouceur, 4000);
    return () => clearInterval(timer);
  }, [nextDouceur]);

  // Autoplay tartinables
  useEffect(() => {
    const timer = setInterval(nextTartinable, 10000);
    return () => clearInterval(timer);
  }, [nextTartinable]);

  return (
    <section id="creations" className="py-24 md:py-32 bg-kraft-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre section */}
        <div className="text-center mb-20">
          <span className="font-handwritten text-gold text-2xl">
            Faits avec amour
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mt-2">
            Nos Créations
          </h2>
          <p className="mt-6 text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Chaque gourmandise est fabriquée dans notre atelier de Pornic,
            <span className="font-handwritten text-gold text-xl">
              {" "}
              sans artifice ni conservateur
            </span>
            .
          </p>
          <div className="w-16 h-0.5 bg-kraft-400 mx-auto mt-6"></div>
        </div>

        {/* Produit Signature - Sablés Diamant */}
        <div className="mb-16">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Badge signature */}
            <div
              className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#1e3a5f" }}
            >
              <Star size={16} className="fill-brand-yellow text-brand-yellow" />
              <span className="text-white text-sm font-medium">
                Produit Signature
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image statique */}
              <div className="lg:w-2/5 relative overflow-hidden">
                <img
                  src={sablesDiamant.image}
                  alt="Sablés Diamant - biscuits artisanaux Les Petits Biscuits Pornic"
                  className="w-full h-56 lg:h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:bg-gradient-to-l"></div>
              </div>

              {/* Contenu */}
              <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                <span className="font-handwritten text-gold text-xl">
                  {sablesDiamant.subtitle}
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-charcoal-900 mt-1 mb-3">
                  {sablesDiamant.name}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                  {sablesDiamant.description}
                </p>

                {/* Formats disponibles */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-sm font-medium text-charcoal-600">
                    Formats :
                  </span>
                  {["50g", "100g", "200g"].map((poids) => (
                    <span
                      key={poids}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 border-brand-yellow/50 text-charcoal-800"
                      style={{ backgroundColor: "rgba(245,166,35,0.12)" }}
                    >
                      {poids}
                    </span>
                  ))}
                </div>

                {/* Liste des saveurs */}
                <div>
                  <p className="font-semibold text-charcoal-800 text-sm mb-2">
                    🍪 Nos saveurs :
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {sablesDiamant.saveursSucrees.map((saveur, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-kraft-50 border border-kraft-200 text-xs font-serif text-charcoal-800 hover:bg-brand-yellow/10 hover:border-brand-yellow/40 transition-all duration-300"
                      >
                        {saveur}
                      </span>
                    ))}
                  </div>

                  <p className="font-semibold text-charcoal-800 text-sm mb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      className="w-7 h-7 flex-shrink-0"
                    >
                      <circle
                        cx="32"
                        cy="32"
                        r="30"
                        fill="#dcfce7"
                        stroke="#4ade80"
                        strokeWidth="2"
                      />
                      <path
                        d="M32 12 c0 0-2 8-2 16 c0 4 1 7 2 9 c1-2 2-5 2-9 c0-8-2-16-2-16z"
                        fill="#15803d"
                      />
                      <path
                        d="M26 18 c0 0 4 2 6 6 M38 18 c0 0-4 2-6 6"
                        stroke="#15803d"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M24 20 c0 0 5 3 8 8 M40 20 c0 0-5 3-8 8"
                        stroke="#15803d"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M22 24 c0 0 6 3 10 9 M42 24 c0 0-6 3-10 9"
                        stroke="#15803d"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line
                        x1="16"
                        y1="48"
                        x2="48"
                        y2="16"
                        stroke="#dc2626"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <text
                        x="32"
                        y="54"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="bold"
                        fill="#15803d"
                      >
                        SANS GLUTEN
                      </text>
                    </svg>
                    Également disponibles sans gluten :
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sablesDiamant.saveursSansGluten.map((saveur, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full border text-xs font-serif transition-all duration-300"
                        style={{
                          borderColor: "#4ade80",
                          color: "#14532d",
                          backgroundColor: "rgba(74,222,128,0.1)",
                        }}
                      >
                        {saveur}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nos Autres Douceurs - Carousel */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="font-handwritten text-3xl text-charcoal-800">
              Nos Autres Douceurs
            </h3>
            <p className="text-charcoal-500 mt-2">
              Biscuits et gourmandises à partager
            </p>
          </div>

          <div className="relative">
            {/* Flèche gauche */}
            <button
              onClick={prevDouceur}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-brand-yellow/10 transition-colors border border-kraft-200"
              aria-label="Douceur précédente"
            >
              <ChevronLeft size={20} className="text-charcoal-700" />
            </button>

            {/* Carousel container */}
            <div className="overflow-hidden mx-6 md:mx-8">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${douceurIndex * (100 / douceurPerSlide)}%)`,
                }}
              >
                {autresDouceurs.map((item, index) => (
                  <article
                    key={index}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / douceurPerSlide}%` }}
                  >
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                      {/* Image */}
                      <div className="relative bg-kraft-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-52 md:h-60 object-cover"
                          loading="lazy"
                        />
                        {item.isSale && (
                          <div
                            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: "#1e3a5f" }}
                          >
                            Gamme salée
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="p-5 md:p-6">
                        <h4 className="font-serif text-lg md:text-xl text-charcoal-900 mb-2 group-hover:text-gold transition-colors duration-300">
                          {item.name}
                        </h4>
                        <p className="text-charcoal-500 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Flèche droite */}
            <button
              onClick={nextDouceur}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-brand-yellow/10 transition-colors border border-kraft-200"
              aria-label="Douceur suivante"
            >
              <ChevronRight size={20} className="text-charcoal-700" />
            </button>
          </div>

          {/* Dots indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxDouceurIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setDouceurIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === douceurIndex
                    ? "w-8 bg-brand-yellow"
                    : "w-2 bg-kraft-300 hover:bg-kraft-400"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Fruits Secs aux Épices */}
        <div className="mb-24 bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-2/5 relative">
              <img
                src={fruitsSecs.image}
                alt="Fruits secs aux épices - Les Petits Biscuits Pornic"
                className="w-full h-64 md:h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Contenu */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-handwritten text-3xl text-charcoal-800 mb-4">
                Fruits Secs aux Épices
              </h3>
              <p className="text-charcoal-500 leading-relaxed mb-6">
                {fruitsSecs.description}
              </p>

              <p className="font-semibold text-charcoal-800 mb-3">
                Nos variétés :
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {fruitsSecs.varietes.map((variete, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full border text-sm font-serif transition-all duration-300"
                    style={{
                      borderColor: "#1e3a5f",
                      color: "#1e3a5f",
                      backgroundColor: "rgba(30,58,95,0.05)",
                    }}
                  >
                    {variete}
                  </span>
                ))}
              </div>

              {/* Formats */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-charcoal-600">
                  Formats :
                </span>
                {fruitsSecs.formats.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 text-white"
                    style={{
                      backgroundColor: "#1e3a5f",
                      borderColor: "#1e3a5f",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tartinables */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="font-handwritten text-3xl text-charcoal-800">
              Tartinables
            </h3>
            <p className="text-charcoal-500 mt-2">
              Nos délicieuses pâtes à tartiner artisanales, préparées avec soin
              dans notre atelier.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Carousel intérieur */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-1000 ease-out"
                style={{
                  transform: `translateX(-${tartinableIndex * 100}%)`,
                }}
              >
                {tartinables.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-full flex flex-col md:flex-row"
                  >
                    {/* Image */}
                    <div className="md:w-1/2 relative overflow-hidden bg-kraft-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 md:h-80 object-contain p-4"
                        loading="lazy"
                      />
                      {/* Badge pot */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                        <span
                          className="text-xs font-medium"
                          style={{ color: "#1e3a5f" }}
                        >
                          🫙 En pot
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <span className="font-handwritten text-gold text-xl">
                        {product.subtitle}
                      </span>
                      <h4 className="font-serif text-2xl text-charcoal-900 mt-1 mb-3">
                        {product.name}
                      </h4>
                      <p className="text-charcoal-600 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flèches */}
            <button
              onClick={prevTartinable}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-brand-yellow/10 transition-colors border border-kraft-200"
              aria-label="Tartinable précédent"
            >
              <ChevronLeft size={18} className="text-charcoal-700" />
            </button>
            <button
              onClick={nextTartinable}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-brand-yellow/10 transition-colors border border-kraft-200"
              aria-label="Tartinable suivant"
            >
              <ChevronRight size={18} className="text-charcoal-700" />
            </button>

            {/* Dots en bas */}
            <div className="flex justify-center gap-2 pb-5">
              {tartinables.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTartinableIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === tartinableIndex
                      ? "w-8 bg-brand-yellow"
                      : "w-2 bg-kraft-300 hover:bg-kraft-400"
                  }`}
                  aria-label={`Tartinable ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA vers commandes sur mesure */}
        <div className="text-center mt-16">
          <a
            href="#professionnels"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#1e3a5f" }}
          >
            <span>Découvrir nos coffrets sur mesure</span>
            <span className="font-handwritten text-xl text-gold">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
