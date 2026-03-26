const QuiSommesNous = () => {
  return (
    <section
      id="atelier"
      className="py-20 md:py-28 bg-[#fdfcfa]"
      aria-label="Qui sommes-nous - L'atelier Les Petits Biscuits"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Collage de photos à gauche */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Photo principale - grande */}
            <div className="absolute top-0 left-0 w-[65%] h-[60%] z-10">
              <img
                src="/alain.png"
                alt="Alain, artisan biscuitier fondateur des Petits Biscuits à Pornic"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="lazy"
                width="400"
                height="500"
              />
            </div>

            {/* Photo secondaire - en bas à droite */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[50%] z-20">
              <img
                src="/emanuelle.png"
                alt="Emanuelle à la boutique Les Petits Biscuits - accueil chaleureux à Pornic"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                loading="lazy"
                width="400"
                height="400"
              />
            </div>

            {/* Élément décoratif */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl -z-10"
              style={{ backgroundColor: "#1e3a5f" }}
            ></div>
          </div>

          {/* Texte à droite */}
          <div className="lg:pl-4">
            <h2
              className="font-artisan text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
              style={{ color: "#1e3a5f" }}
            >
              Qui sommes-nous ?
            </h2>

            <p
              className="font-artisan text-xl md:text-2xl mb-6 font-medium italic"
              style={{ color: "#1e3a5f" }}
            >
              Une âme gourmande, une histoire de famille qui se transmet de
              génération en génération.
            </p>

            <div
              className="font-artisan space-y-5 text-lg md:text-xl leading-relaxed"
              style={{ color: "#1e3a5f" }}
            >
              <p>
                Le goût du bon et du fait maison, c'est ce qui anime
                <strong> Les Petits Biscuits</strong>, niché dans une ruelle
                pittoresque du cœur historique de Pornic.
              </p>
              <p>
                Ici, tout est fabriqué à la main,{" "}
                <strong>
                  sans colorant, sans conservateur, ni arôme artificiel
                </strong>
                . Juste des ingrédients nobles et beaucoup d'amour.
              </p>
            </div>

            {/* Citation */}
            <div className="mt-8 p-6 rounded-xl">
              <p
                className="font-handwritten text-xl md:text-2xl leading-relaxed"
                style={{ color: "#f5a623" }}
              >
                "J'ai plongé pour la première fois mes mains dans la farine chez
                ma grand-mère. Diplômé d'une école spécialisant ses ingénieurs
                dans l'agro-alimentaire, j'ai principalement effectué ma
                carrière dans des fonctions de direction de site en biscuiterie.
                Aujourd'hui, avec cette même passion, j'élabore mes recettes et
                fabrique mes biscuits."
              </p>
              <p className="mt-3 text-sm text-white/80">— Alain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuiSommesNous;
