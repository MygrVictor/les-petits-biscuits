import { useState, useRef, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie-Claire",
    location: "Pornic",
    rating: 5,
    text: "Une vraie découverte ! Les sablés diamant sont une tuerie, on sent vraiment le fait maison. Alain est passionné et ça se ressent dans chaque biscuit. Je recommande les yeux fermés !",
    date: "Février 2026",
  },
  {
    id: 2,
    name: "Jean-Philippe",
    location: "Nantes",
    rating: 5,
    text: "Je fais le déplacement depuis Nantes exprès pour leurs financiers aux amandes. Un pur délice ! La boutique est charmante et l'accueil toujours chaleureux.",
    date: "Janvier 2026",
  },
  {
    id: 3,
    name: "Sophie",
    location: "Saint-Nazaire",
    rating: 5,
    text: "Offerts en cadeau à ma famille, tout le monde a adoré ! Le packaging est soigné et les biscuits délicieux. La crème de caramel au beurre salé est à tomber.",
    date: "Décembre 2025",
  },
  {
    id: 4,
    name: "François",
    location: "Pornic",
    rating: 5,
    text: "Client régulier depuis l'ouverture. On ne trouve nulle part ailleurs des biscuits d'une telle qualité. Le rapport qualité-prix est excellent pour de l'artisanal.",
    date: "Mars 2026",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  // Grouper les avis par paires pour le desktop
  const slides = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    slides.push(testimonials.slice(i, i + 2));
  }

  const maxIndex = testimonials.length - 1; // mobile: 1 par slide
  const maxSlide = slides.length - 1; // desktop: 2 par slide

  const goTo = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    resetAutoPlay();
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);
  return (
    <section id="avis" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre section */}
        <div className="text-center mb-16">
          <span className="font-handwritten text-brand-yellow text-2xl">
            Ils ont goûté, ils adorent
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mt-2">
            Avis Clients
          </h2>
          <p className="mt-6 text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            La satisfaction de nos clients est notre plus belle récompense.
            Découvrez ce qu'ils pensent de nos gourmandises.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Flèches de navigation */}
          <button
            onClick={goPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg border border-kraft-200 transition-all hover:bg-brand-yellow/10 hover:border-brand-yellow"
            style={{ color: "#1e3a5f" }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg border border-kraft-200 transition-all hover:bg-brand-yellow/10 hover:border-brand-yellow"
            style={{ color: "#1e3a5f" }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Container du carousel - Mobile: 1 avis par slide */}
          <div className="overflow-hidden mx-4 md:mx-8 md:hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-kraft-50 rounded-2xl p-6 relative shadow-sm">
                    <Quote
                      size={30}
                      className="absolute top-5 right-5 text-brand-yellow/30"
                    />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-brand-yellow text-brand-yellow"
                        />
                      ))}
                    </div>
                    <p className="text-charcoal-700 leading-relaxed mb-6 italic text-sm">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-charcoal-900 text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-charcoal-500">
                          {testimonial.location}
                        </p>
                      </div>
                      <span className="text-xs text-charcoal-400">
                        {testimonial.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Container du carousel - Desktop: 2 avis par slide */}
          <div className="overflow-hidden mx-8 hidden md:block">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${Math.floor(currentIndex / 2) * 100}%)`,
              }}
            >
              {slides.map((pair, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                  <div className="grid grid-cols-2 gap-6">
                    {pair.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="bg-kraft-50 rounded-2xl p-8 relative shadow-sm"
                      >
                        <Quote
                          size={36}
                          className="absolute top-5 right-5 text-brand-yellow/30"
                        />
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className="fill-brand-yellow text-brand-yellow"
                            />
                          ))}
                        </div>
                        <p className="text-charcoal-700 leading-relaxed mb-6 italic">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-charcoal-900">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-charcoal-500">
                              {testimonial.location}
                            </p>
                          </div>
                          <span className="text-xs text-charcoal-400">
                            {testimonial.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicateurs - Mobile */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-400 ${
                  currentIndex === index
                    ? "w-8 h-3 bg-brand-yellow"
                    : "w-3 h-3 bg-kraft-300 hover:bg-kraft-400"
                }`}
              />
            ))}
          </div>

          {/* Dots indicateurs - Desktop (par paire) */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index * 2)}
                className={`rounded-full transition-all duration-400 ${
                  Math.floor(currentIndex / 2) === index
                    ? "w-8 h-3 bg-brand-yellow"
                    : "w-3 h-3 bg-kraft-300 hover:bg-kraft-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Note moyenne + lien Google */}
        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/maps/place/Les+Petits+Biscuits/@47.1167,-2.1000,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#1e3a5f" }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-brand-yellow text-brand-yellow"
                />
              ))}
            </div>
            <span className="text-white font-semibold">
              Voir tous les avis sur Google →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
