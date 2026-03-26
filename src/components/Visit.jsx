import { MapPin, Clock, Sun } from "lucide-react";

const Visit = () => {
  return (
    <section id="visite" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mb-6">
            Rendez-nous visite à Pornic
          </h2>
          <p className="text-lg text-chocolate/70 leading-relaxed">
            Nous nous ferons un plaisir de répondre à vos questions et de vous
            faire goûter nos produits.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
              alt="Atelier-Boutique Les Petits Biscuits Pornic"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>

          {/* Info Cards */}
          <div className="grid gap-6">
            {/* Address */}
            <div className="bg-cream rounded-xl p-6 flex gap-5 items-start">
              <div className="bg-biscuit-500 text-white p-3 rounded-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-chocolate mb-2">
                  Atelier-Boutique
                </h3>
                <p className="text-chocolate/70">
                  11 Rue de l'Église
                  <br />
                  44210 Pornic
                  <br />
                  Loire-Atlantique, France
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-cream rounded-xl p-6 flex gap-5 items-start">
              <div className="bg-biscuit-500 text-white p-3 rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-chocolate mb-2">
                  Horaires
                </h3>
                <p className="text-chocolate/70">
                  Mar – Sam : 9h30 – 19h00
                  <br />
                  Dimanche : 10h00 – 13h00
                  <br />
                  Lundi : Fermé
                </p>
              </div>
            </div>

            {/* Terrace */}
            <div className="bg-cream rounded-xl p-6 flex gap-5 items-start">
              <div className="bg-biscuit-500 text-white p-3 rounded-lg">
                <Sun size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-chocolate mb-2">
                  Terrasse
                </h3>
                <p className="text-chocolate/70">
                  Profitez de notre terrasse
                  <br />
                  ensoleillée pour savourer
                  <br />
                  nos créations sur place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visit;
