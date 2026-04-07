import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Sablés - Le produit signature
const sablesDiamant = {
  name: "Nos Sablés Sucrés",
  subtitle: "Notre produit Signature",
  description:
    "Notre sablé est un petit biscuit au beurre, rond, doré et très gourmand. Le sucre partiellement caramélisé lui donne un aspect brillant sur la tranche. Sa texture est croustillante et son cœur délicieusement fondant. Quelle que soit la saveur, ce sablé ne vous laissera pas indifférent !",
  image: "/products/sables-sucres.jpg",
  saveursSucrees: [
    {
      name: "Vanille & Fleur de Sel",
      image: "/products/sables)vanille-fleur-de-sel.png",
    },
    { name: "Tout Chocolat", image: null },
    { name: "Praliné de Noisettes", image: null },
    { name: "Éclats de Caramel au Beurre Salé", image: null },
    { name: "Framboise Cerise", image: null },
    { name: "Citron", image: "/products/sablés-citron.jpg" },
    { name: "Confit de Gingembre", image: null },
    { name: "Cannelle Spéculos", image: null },
    {
      name: "Pépites de Chocolat",
      image: "/products/sables-pepites-de)chocolat.png",
    },
    { name: "Thé Matcha", image: null },
    { name: "Noix de Pécan", image: "/products/sables-noix-de-pecan.png" },
    { name: "Orange", image: "/products/sables-orange.png" },
    { name: "Nature", image: null },
    { name: "M&M's®", image: "/products/sables-m&ms.png" },
    { name: "Daim®", image: "/products/sables-aux-daims.png" },
  ],
  saveursSansGluten: [
    {
      name: "Sarrasin Caramel",
      image: "/products/biscuits-sarasin-caramel.png",
    },
    { name: "Vanille", image: null },
  ],
};

// Nos autres douceurs sucrées
// Sablés salés pour l'apéritif
const sablesSales = {
  name: "Nos Sablés Salés",
  subtitle: "Pour l'apéritif",
  description:
    "Nos sablés salés sont des biscuits croustillants et savoureux, parfaits pour accompagner vos apéritifs. Fabriqués avec des ingrédients de qualité, ils raviront vos papilles avec leurs saveurs originales.",
  image: "/products/sables-sales.jpg",
  saveurs: [
    "Parmesan & Oignons",
    "Comté & Noix",
    "Olive & Romarin",
    "Tomate & Basilic",
  ],
};

const autresDouceurs = [
  {
    name: "Financiers aux Amandes",
    desc: "Moelleux et savoureux, dans la plus pure tradition artisanale",
    image: "/products/financiers.jpg",
    formats: ["100g", "200g"],
  },
  {
    name: "Moelleux au Chocolat",
    desc: "Un classique qui plaît toujours, version mini pour le café",
    image: "/products/moelleux.jpg",
    formats: ["100g", "200g"],
  },
  {
    name: "Madeleines",
    desc: "Nature ou aux éclats de caramel au beurre salé",
    image: "/products/madeleines.jpg",
    formats: ["100g"],
  },
  {
    name: "Croquants Amandes & Noisettes",
    desc: "De gourmands croquants aux fruits secs dans un biscuit raffiné",
    image: "/products/croquants.jpg",
    formats: ["100g"],
  },
  {
    name: "Amandises aux 2 Chocolats",
    desc: "Chocolat noir, amandes, oranges confites et chocolat au lait",
    image: "/products/amandises.jpg",
    formats: ["80g"],
  },
  {
    name: "Fruits Caramélisés",
    desc: "Cacahuètes, amandes, noisettes et noix de pécan caramélisées à la perfection",
    image: "/products/fruitscaramelises.jpg",
    formats: ["25g", "50g", "150g"],
  },
  {
    name: "Roulettes Choco-Noisettes",
    desc: "De croustillants rouleaux de gaufrettes enrobés de chocolat et noisettes",
    image: "/products/roulettes.jpg",
    formats: ["80g", "Vrac"],
  },
];

// Fruits secs aux épices
const fruitsSecs = {
  image: "/products/noixdecajou.jpg",
  description:
    "De délicieux fruits croquants grillés dans notre chaudron en cuivre, accompagnés d'herbes et d'épices. N'attendez plus pour les goûter, plaisir garanti !",
  formats: ["70g", "150g"],
  varietes: [
    {
      name: "Amandes à l'Ail Fumé & Fleur de Sel",
      image: "/products/amandes-a-lail-fume.png",
    },
    { name: "Noix de Cajou au Romarin & Fleur de Sel", image: null },
    {
      name: "Noix de Cajou Curry & Paprika",
      image: "/products/noix-de-cajou-au-curry.png",
    },
  ],
};

// Tartinables en pots
const tartinables = [
  {
    id: 1,
    name: "Crème de Caramel",
    subtitle: "Gourmandise à tartiner",
    description:
      "Alliance délicieuse de crème épaisse et sucre, agrémentée d'une touche de fleur de sel. Parfaite sur vos crêpes ou vos gaufres.",
    image: "/products/creme-caramel.png",
    formats: ["80g", "240g"],
  },
  {
    id: 2,
    name: "Pâte à Tartiner Choco-Noisettes",
    subtitle: "Gourmandise à tartiner",
    description:
      "Notre délicieuse pâte à tartiner maison au chocolat et noisettes, avec une touche de praliné irrésistible. Petit ou grand format !",
    image: "/products/creme-choco-noisettes.png",
    formats: ["80g", "240g"],
  },
];

const Products = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [douceurIndex, setDouceurIndex] = useState(0);
  const [douceurPerSlide, setDouceurPerSlide] = useState(3);
  const [tartinableIndex, setTartinableIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [sablePreview, setSablePreview] = useState(null);
  const [fruitsSecsPreview, setFruitsSecsPreview] = useState(null);

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
    <section id="creations" className="py-16 md:py-32 bg-kraft-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre section */}
        <div className="text-center mb-12 md:mb-20">
          <span className="font-handwritten text-gold text-2xl">
            Faits avec amour
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-900 mt-2">
            Nos Créations
          </h2>
          <p className="mt-6 text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Chaque gourmandise est fabriquée dans notre atelier de Pornic 
          </p>
          <div className="w-16 h-0.5 bg-kraft-400 mx-auto mt-6"></div>
        </div>

        {/* Produit Signature - Sablés Diamant */}
        <div className="mb-10 md:mb-16">
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
              {/* Image avec preview au clic sur saveur */}
              <div className="lg:w-2/5 relative overflow-hidden">
                <img
                  src={sablePreview || sablesDiamant.image}
                  alt="Sablés Diamant - biscuits artisanaux Les Petits Biscuits Pornic"
                  className="w-full h-64 md:h-72 lg:h-full object-contain bg-kraft-50 rounded-l-none lg:rounded-l-2xl transition-all duration-500"
                  loading="lazy"
                />
              </div>

              {/* Contenu */}
              <div className="lg:w-3/5 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
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
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-xs font-medium text-charcoal-600">
                    Formats :
                  </span>
                  {["50g", "100g", "200g", "Vrac*"].map((poids) => (
                    <span
                      key={poids}
                      className="px-2 py-0.5 rounded-md text-xs font-semibold border border-brand-yellow/50 text-charcoal-800"
                      style={{ backgroundColor: "rgba(245,166,35,0.12)" }}
                    >
                      {poids}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-charcoal-400 -mt-3 mb-4 italic">
                  * Vrac disponible selon les saveurs
                </p>

                {/* Liste des saveurs */}
                <div>
                  {/* Mobile : scroll horizontal */}
                  <div className="md:hidden">
                    <p className="font-semibold text-charcoal-800 text-sm mb-2">
                      🍪 Nos saveurs :
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                      {sablesDiamant.saveursSucrees.map((saveur, index) =>
                        saveur.image ? (
                          <span
                            key={index}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-serif transition-all duration-300 cursor-pointer inline-flex items-center gap-1 ${
                              sablePreview === saveur.image
                                ? "bg-brand-yellow/30 border-brand-yellow text-charcoal-900 shadow-md"
                                : "bg-kraft-50 border-kraft-200 text-charcoal-800"
                            }`}
                            onClick={() =>
                              setSablePreview(
                                sablePreview === saveur.image
                                  ? null
                                  : saveur.image,
                              )
                            }
                          >
                            <span>📷</span> {saveur.name}
                          </span>
                        ) : (
                          <span
                            key={index}
                            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-kraft-50 border border-kraft-200 text-xs font-serif text-charcoal-800"
                          >
                            {saveur.name}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  {/* Desktop : tags classiques */}
                  <p className="hidden md:block font-semibold text-charcoal-800 text-sm mb-2">
                    🍪 Nos saveurs :
                  </p>
                  <div className="hidden md:flex flex-wrap gap-1.5 mb-4">
                    {sablesDiamant.saveursSucrees.map((saveur, index) =>
                      saveur.image ? (
                        <span
                          key={index}
                          className={`relative px-3 py-1 rounded-full border text-xs font-serif transition-all duration-300 cursor-pointer inline-flex items-center gap-1 ${
                            sablePreview === saveur.image
                              ? "bg-brand-yellow/30 border-brand-yellow text-charcoal-900 shadow-md"
                              : "bg-kraft-50 border-kraft-200 text-charcoal-800 hover:bg-brand-yellow/20 hover:border-brand-yellow/60 hover:shadow-md"
                          }`}
                          onClick={() =>
                            setSablePreview(
                              sablePreview === saveur.image
                                ? null
                                : saveur.image,
                            )
                          }
                        >
                          <span>📷</span> {saveur.name}
                        </span>
                      ) : (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-kraft-50 border border-kraft-200 text-xs font-serif text-charcoal-800 transition-all duration-300"
                        >
                          {saveur.name}
                        </span>
                      ),
                    )}
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
                  {/* Mobile : scroll horizontal sans gluten */}
                  <div className="md:hidden">
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                      {sablesDiamant.saveursSansGluten.map((saveur, index) =>
                        saveur.image ? (
                          <span
                            key={index}
                            className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-serif transition-all duration-300 cursor-pointer inline-flex items-center gap-1"
                            style={{
                              borderColor: "#4ade80",
                              color: "#14532d",
                              backgroundColor:
                                sablePreview === saveur.image
                                  ? "rgba(74,222,128,0.3)"
                                  : "rgba(74,222,128,0.15)",
                            }}
                            onClick={() =>
                              setSablePreview(
                                sablePreview === saveur.image
                                  ? null
                                  : saveur.image,
                              )
                            }
                          >
                            <span>📷</span> {saveur.name}
                          </span>
                        ) : (
                          <span
                            key={index}
                            className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-serif"
                            style={{
                              borderColor: "#4ade80",
                              color: "#14532d",
                              backgroundColor: "rgba(74,222,128,0.15)",
                            }}
                          >
                            {saveur.name}
                          </span>
                        ),
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-medium text-charcoal-500">
                        Format :
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-semibold border"
                        style={{
                          borderColor: "#4ade80",
                          color: "#14532d",
                          backgroundColor: "rgba(74,222,128,0.1)",
                        }}
                      >
                        100g
                      </span>
                    </div>
                  </div>
                  {/* Desktop : tags classiques sans gluten */}
                  <div className="hidden md:flex flex-wrap gap-1.5">
                    {sablesDiamant.saveursSansGluten.map((saveur, index) =>
                      saveur.image ? (
                        <span
                          key={index}
                          className={`relative px-3 py-1 rounded-full border text-xs font-serif transition-all duration-300 cursor-pointer inline-flex items-center gap-1 ${
                            sablePreview === saveur.image
                              ? "shadow-md"
                              : "hover:shadow-md"
                          }`}
                          style={{
                            borderColor: "#4ade80",
                            color: "#14532d",
                            backgroundColor:
                              sablePreview === saveur.image
                                ? "rgba(74,222,128,0.3)"
                                : "rgba(74,222,128,0.15)",
                          }}
                          onClick={() =>
                            setSablePreview(
                              sablePreview === saveur.image
                                ? null
                                : saveur.image,
                            )
                          }
                        >
                          <span>📷</span> {saveur.name}
                        </span>
                      ) : (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full border text-xs font-serif transition-all duration-300"
                          style={{
                            borderColor: "#4ade80",
                            color: "#14532d",
                            backgroundColor: "rgba(74,222,128,0.15)",
                          }}
                        >
                          {saveur.name}
                        </span>
                      ),
                    )}
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 mt-3">
                    <span className="text-xs font-medium text-charcoal-500">
                      Format sans gluten :
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-semibold border"
                      style={{
                        borderColor: "#4ade80",
                        color: "#14532d",
                        backgroundColor: "rgba(74,222,128,0.1)",
                      }}
                    >
                      100g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nos Autres Douceurs - Carousel */}
        <div className="mb-14 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
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
                      <div
                        className="relative bg-kraft-100 overflow-hidden cursor-pointer group"
                        onMouseEnter={() =>
                          setHoveredImage({ src: item.image, alt: item.name })
                        }
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-64 md:h-72 object-contain md:object-cover md:object-top bg-kraft-50 transition-all duration-300"
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
                      <div className="p-4 md:p-6">
                        <h4 className="font-serif text-lg md:text-xl text-charcoal-900 mb-2 group-hover:text-gold transition-colors duration-300">
                          {item.name}
                        </h4>
                        <p className="text-charcoal-500 text-sm leading-relaxed mb-2">
                          {item.desc}
                        </p>
                        {item.formats && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.formats.map((f) => (
                              <span
                                key={f}
                                className="px-2 py-0.5 rounded text-xs font-semibold border"
                                style={{
                                  borderColor: "#d4a84b",
                                  color: "#8a6d48",
                                  backgroundColor: "rgba(212,168,75,0.1)",
                                }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
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

        {/* Section Nos Salés */}
        <div className="mb-14 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="font-handwritten text-3xl text-charcoal-800">
              Nos Salés
            </h3>
            <p className="text-charcoal-500 mt-2">
              Pour l'apéritif et le grignotage
            </p>
          </div>

          {/* Sablés Salés */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-10">
            {/* Badge */}
            <div
              className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#1e3a5f" }}
            >
              <span className="text-white text-sm font-medium">
                🧂 Gamme Apéritif
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-2/5 relative overflow-hidden">
                <img
                  src={sablesSales.image}
                  alt="Sablés salés apéritif - Les Petits Biscuits Pornic"
                  className="w-full h-64 md:h-72 lg:h-full object-contain md:object-cover md:object-top bg-kraft-50"
                  loading="lazy"
                />
              </div>

              {/* Contenu */}
              <div className="lg:w-3/5 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <span className="font-handwritten text-gold text-xl">
                  {sablesSales.subtitle}
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-charcoal-900 mt-1 mb-3">
                  {sablesSales.name}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-5">
                  {sablesSales.description}
                </p>

                {/* Formats */}
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-xs font-medium text-charcoal-600">
                    Formats :
                  </span>
                  {["100g"].map((poids) => (
                    <span
                      key={poids}
                      className="px-2 py-0.5 rounded-md text-xs font-semibold border"
                      style={{
                        borderColor: "#1e3a5f",
                        color: "#1e3a5f",
                        backgroundColor: "rgba(30,58,95,0.08)",
                      }}
                    >
                      {poids}
                    </span>
                  ))}
                </div>

                {/* Saveurs */}
                {/* Mobile : menu déroulant */}
                <div className="md:hidden">
                  <p className="font-semibold text-charcoal-800 text-sm mb-2">
                    🧀 Nos saveurs :
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {sablesSales.saveurs.map((saveur, index) => (
                      <span
                        key={index}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-serif"
                        style={{
                          borderColor: "#1e3a5f",
                          color: "#1e3a5f",
                          backgroundColor: "rgba(30,58,95,0.05)",
                        }}
                      >
                        {saveur}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Desktop : tags classiques */}
                <p className="hidden md:block font-semibold text-charcoal-800 text-sm mb-2">
                  🧀 Nos saveurs :
                </p>
                <div className="hidden md:flex flex-wrap gap-1.5">
                  {sablesSales.saveurs.map((saveur, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full border text-xs font-serif transition-all duration-300"
                      style={{
                        borderColor: "#1e3a5f",
                        color: "#1e3a5f",
                        backgroundColor: "rgba(30,58,95,0.05)",
                      }}
                    >
                      {saveur}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fruits Secs aux Épices */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row">
              {/* Image avec preview au clic sur variété */}
              <div className="md:w-2/5 relative overflow-hidden">
                <img
                  src={fruitsSecsPreview || fruitsSecs.image}
                  alt="Fruits secs aux épices - Les Petits Biscuits Pornic"
                  className="w-full h-64 md:h-full object-contain bg-kraft-50 transition-all duration-500"
                  loading="lazy"
                />
              </div>

              {/* Contenu */}
              <div className="md:w-3/5 p-5 md:p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-handwritten text-3xl text-charcoal-800 mb-4">
                  Fruits Secs aux Épices
                </h3>
                <p className="text-charcoal-500 leading-relaxed mb-6">
                  {fruitsSecs.description}
                </p>

                {/* Mobile : scroll horizontal variétés */}
                <div className="md:hidden">
                  <p className="font-semibold text-charcoal-800 text-sm mb-2">
                    🥜 Nos variétés :
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {fruitsSecs.varietes.map((variete, index) =>
                      variete.image ? (
                        <span
                          key={index}
                          className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-serif transition-all duration-300 cursor-pointer inline-flex items-center gap-1"
                          style={{
                            borderColor: "#1e3a5f",
                            color: "#1e3a5f",
                            backgroundColor:
                              fruitsSecsPreview === variete.image
                                ? "rgba(30,58,95,0.2)"
                                : "rgba(30,58,95,0.1)",
                          }}
                          onClick={() =>
                            setFruitsSecsPreview(
                              fruitsSecsPreview === variete.image
                                ? null
                                : variete.image,
                            )
                          }
                        >
                          <span>📷</span> {variete.name}
                        </span>
                      ) : (
                        <span
                          key={index}
                          className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-serif"
                          style={{
                            borderColor: "#1e3a5f",
                            color: "#1e3a5f",
                            backgroundColor: "rgba(30,58,95,0.1)",
                          }}
                        >
                          {variete.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                {/* Desktop : tags classiques variétés */}
                <p className="hidden md:block font-semibold text-charcoal-800 mb-3">
                  Nos variétés :
                </p>
                <div className="hidden md:flex flex-wrap gap-2 mb-6">
                  {fruitsSecs.varietes.map((variete, index) =>
                    variete.image ? (
                      <span
                        key={index}
                        className={`relative px-4 py-2 rounded-full border text-sm font-serif transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 ${
                          fruitsSecsPreview === variete.image
                            ? "shadow-md"
                            : "hover:shadow-md"
                        }`}
                        style={{
                          borderColor: "#1e3a5f",
                          color: "#1e3a5f",
                          backgroundColor:
                            fruitsSecsPreview === variete.image
                              ? "rgba(30,58,95,0.2)"
                              : "rgba(30,58,95,0.1)",
                        }}
                        onClick={() =>
                          setFruitsSecsPreview(
                            fruitsSecsPreview === variete.image
                              ? null
                              : variete.image,
                          )
                        }
                      >
                        <span>📷</span> {variete.name}
                      </span>
                    ) : (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full border text-sm font-serif transition-all duration-300"
                        style={{
                          borderColor: "#1e3a5f",
                          color: "#1e3a5f",
                          backgroundColor: "rgba(30,58,95,0.1)",
                        }}
                      >
                        {variete.name}
                      </span>
                    ),
                  )}
                </div>

                {/* Formats */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-charcoal-600">
                    Formats :
                  </span>
                  {fruitsSecs.formats.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-md text-xs font-semibold border text-white"
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
        </div>

        {/* Tartinables */}
        <div className="mb-14 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
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
                        className="w-full h-64 md:h-80 object-contain p-4 bg-kraft-50"
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
                      <p className="text-charcoal-600 text-sm leading-relaxed mb-3">
                        {product.description}
                      </p>
                      {product.formats && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium text-charcoal-500">
                            Formats :
                          </span>
                          {product.formats.map((f) => (
                            <span
                              key={f}
                              className="px-2 py-0.5 rounded-md text-xs font-semibold border"
                              style={{
                                borderColor: "#d4a84b",
                                color: "#8a6d48",
                                backgroundColor: "rgba(212,168,75,0.1)",
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
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
        <div className="text-center mt-10 md:mt-16">
          <a
            href="#coffrets"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#1e3a5f" }}
          >
            <span>Découvrir nos coffrets sur mesure</span>
            <span className="font-handwritten text-xl text-gold">→</span>
          </a>
        </div>
      </div>

      {/* Preview flottante au survol */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-500 ease-out ${
          hoveredImage ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {hoveredImage && (
          <div className="bg-white rounded-2xl shadow-2xl p-3 max-w-sm">
            <img
              src={hoveredImage.src}
              alt={hoveredImage.alt}
              className="w-full rounded-xl object-contain max-h-[50vh]"
            />
            <p className="text-center text-charcoal-700 mt-2 font-serif text-sm">
              {hoveredImage.alt}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
