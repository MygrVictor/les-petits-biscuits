import { useState } from "react";
import { Briefcase, Gift, Users, Building2, CheckCircle2 } from "lucide-react";

const avantages = [
  "Fabrication artisanale garantie, en privilégiant la simplicité et la qualité des matières premières",
  "Production à l'atelier-boutique de Pornic",
  "Savoir-faire local reconnu",
  "Personnalisation de vos commandes pour toutes les occasions",
  "Et surtout… c'est bon ! 😋",
];

const offres = [
  {
    icon: Gift,
    title: "Coffrets & Cartes Cadeaux",
    description:
      "Composez vos coffrets sur mesure ou offrez une carte cadeau pour faire plaisir à coup sûr. Idéal pour toutes les occasions.",
    detail:
      "Boîtes métalliques, paniers garnis, sachets kraft, cartes cadeaux...",
  },
  {
    icon: Users,
    title: "Mariages & Fêtes",
    description:
      "Baptêmes, mariages, anniversaires... Nos biscuits personnalisés subliment vos événements.",
    detail: "Cadeaux d'invités originaux",
  },
  {
    icon: Building2,
    title: "Entreprises, Hôtels & Restaurants",
    description:
      "Séminaires, cadeaux clients, hôtels, restaurants : démarquez-vous avec des douceurs artisanales.",
    detail: "Nous consulter",
  },
  {
    icon: Briefcase,
    title: "Pour plus de gourmandises",
    description:
      "Besoin de biscuits pour un groupe, une association ou un événement ? Nous adaptons nos quantités.",
    detail: "Nous consulter",
  },
];

const coffrets = [
  "/products/coffret1-1.JPG",
  "/products/coffret2-1.JPG",
  "/products/coffret2-2.JPG",
  "/products/cartes-cadeaux.JPG",
];

const references = [
  { name: "CA", logo: "/partenaires/CA.jpg" },
  { name: "Abeille", logo: "/partenaires/abeille.jpg" },
  { name: "Alliance", logo: "/partenaires/allaince.png" },
  { name: "Ambiance", logo: "/partenaires/ambiance.jpg" },
  { name: "Balguerie", logo: "/partenaires/balguerie.png" },
  { name: "Brewen", logo: "/partenaires/brewen.jpg" },
  { name: "Caliceo", logo: "/partenaires/caliceo.jpg" },
  { name: "Capessor", logo: "/partenaires/capessor.jpg" },
  { name: "Chantiers de l'Atlantique", logo: "/partenaires/chantier.jpg" },
  { name: "Ciné", logo: "/partenaires/cine.jpg" },
  { name: "Destination Pornic", logo: "/partenaires/destipornic.jpg" },
  { name: "Écodomaine", logo: "/partenaires/ecodomaine.jpg" },
  { name: "Gressière", logo: "/partenaires/gressiere.jpg" },
  { name: "INP", logo: "/partenaires/inp.png" },
  { name: "La Maison", logo: "/partenaires/lamaison.jpg" },
  { name: "LTP", logo: "/partenaires/ltp.jpg" },
  { name: "Metro", logo: "/partenaires/metro.jpg" },
  { name: "Pays de Retz", logo: "/partenaires/paysderetz.jpg" },
  { name: "Picot", logo: "/partenaires/picot.jpg" },
  { name: "Pornic", logo: "/partenaires/pornic.jpg" },
  { name: "Sweet Garden", logo: "/partenaires/sweetgarden.png" },
  { name: "Technopapier", logo: "/partenaires/technopapier.png" },
  { name: "Vivalto", logo: "/partenaires/vivalto.png" },
];

const Professionnels = () => {
  const [selectedCoffret, setSelectedCoffret] = useState(null);

  return (
    <section
      id="coffrets"
      className="py-24 md:py-32 text-white overflow-hidden"
      style={{ backgroundColor: "#1e3a5f" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header avec effet */}
        <div className="text-center mb-16 relative">
          <span className="font-handwritten text-gold text-2xl">
            Particuliers & Entreprises
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-6">
            Vos Commandes Sur Mesure
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Mariage, anniversaire, événement d'entreprise ou simple envie de
            faire plaisir... Nous réalisons vos commandes personnalisées pour
            toutes les occasions.
          </p>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Accroche manuscrite */}
        <div className="text-center mb-16">
          <p className="font-handwritten text-2xl md:text-3xl text-kraft-300 italic">
            "Un cadeau qui se déguste, un souvenir qui reste"
          </p>
        </div>

        {/* Photos de coffrets */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-16 max-w-3xl mx-auto">
          {coffrets.map((src, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedCoffret(src)}
            >
              <img
                src={src}
                alt={i === 3 ? "Cartes cadeaux" : "Coffret gourmand"}
                className="w-full h-40 md:h-52 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Overlay photo plein écran */}
        {selectedCoffret && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setSelectedCoffret(null)}
          >
            <img
              src={selectedCoffret}
              alt="Coffret gourmand"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}

        {/* Carousel des offres sur mobile */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide mb-16">
          {offres.map((offre, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 snap-start"
            >
              <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                <offre.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">
                {offre.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-2">
                {offre.description}
              </p>
              <p className="font-handwritten text-gold">{offre.detail}</p>
            </div>
          ))}
        </div>

        {/* Grille des offres sur desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-16">
          {offres.map((offre, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold/30 transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                  <offre.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-white mb-2">
                    {offre.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-2">
                    {offre.description}
                  </p>
                  <p className="font-handwritten text-gold text-xl">
                    {offre.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Avantages + CTA */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Avantages */}
          <div className="bg-kraft-50 rounded-2xl p-8 md:p-10">
            <h3 className="font-handwritten text-2xl text-charcoal-900 mb-6">
              Pourquoi nous choisir ?
            </h3>
            <ul className="space-y-4">
              {avantages.map((avantage, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-charcoal-700">{avantage}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Professionnel */}
          <div className="text-center lg:text-left">
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
              Un projet ? Une idée ?
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Parlons-en ensemble ! Nous étudions chaque demande pour vous
              proposer une offre sur mesure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 bg-gold text-charcoal-900 px-8 py-4 rounded-full font-medium hover:bg-gold/90 transition-all hover:scale-105 shadow-lg"
              >
                <span>Demander un devis</span>
                <span className="font-handwritten text-xl">→</span>
              </a>
              <a
                href="tel:0240393056"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 py-4 rounded-full font-medium transition-all border border-white/30 hover:border-white/60 hover:bg-white/5"
              >
                <span>06 82 32 63 18</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bande "Ils nous font confiance" */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-center text-xs text-white/40 uppercase tracking-widest mb-8">
            Ils nous font confiance
          </p>
          <div className="overflow-hidden">
            <div className="flex animate-marquee gap-12 w-max">
              {[...references, ...references, ...references].map(
                (ref, index) => (
                  <div key={index} className="flex-shrink-0">
                    {ref.logo ? (
                      <img
                        src={ref.logo}
                        alt={ref.name}
                        className="h-12 md:h-14 w-auto object-contain"
                        loading="lazy"
                        width="56"
                        height="56"
                      />
                    ) : (
                      <div className="w-20 h-12 md:w-24 md:h-14 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center">
                        <span className="text-white/30 text-[10px] text-center leading-tight">
                          Logo
                        </span>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professionnels;
