import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Phone,
  Mail,
  Send,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ⚠️ CONFIGURATION EMAILJS — À remplir avec vos identifiants
// Créez un compte gratuit sur https://www.emailjs.com/
// 1. Service ID : Dashboard > Email Services > Ajoutez votre service Gmail/Outlook
// 2. Template ID : Dashboard > Email Templates > Créez un template
// 3. Public Key : Dashboard > Account > General > Public Key
const EMAILJS_SERVICE_ID = "service_i2kiti6";
const EMAILJS_TEMPLATE_ID = "template_qi8w4ey";
const EMAILJS_PUBLIC_KEY = "MZFKELW6532SW3SeF";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Particulier gourmand",
    message: "",
  });
  const [sendStatus, setSendStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setSendStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "Particulier gourmand",
        message: "",
      });
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setSendStatus(null), 5000);
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      setSendStatus("error");
      setTimeout(() => setSendStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-white"
      aria-label="Contact et localisation"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-handwritten text-gold text-2xl">
            Venez nous voir
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mt-2 mb-6">
            Nous Trouver
          </h2>
          <p className="text-charcoal-600 max-w-xl mx-auto">
            Notre atelier-boutique vous accueille au cœur du vieux Pornic.
          </p>
          <div className="w-16 h-0.5 bg-kraft-400 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Infos Pratiques - 2 colonnes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Adresse */}
            <div className="bg-kraft-50 rounded-2xl p-6 border border-kraft-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal-900 mb-2">
                    L'Atelier
                  </h3>
                  <p className="text-charcoal-700">11 rue de l'Église</p>
                  <p className="text-charcoal-600">44210 Pornic</p>
                  <p className="font-handwritten text-gold text-xl mt-2">
                    Cœur historique
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-kraft-50 rounded-2xl p-6 border border-kraft-200">
              <div className="space-y-4">
                <a
                  href="tel:0240393056"
                  className="flex items-center gap-4 group"
                  aria-label="Appeler le 02 40 39 30 56"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-charcoal-900 group-hover:text-gold transition-colors font-medium">
                      02 40 39 30 56
                    </p>
                    <p className="text-sm text-charcoal-500">Boutique</p>
                  </div>
                </a>
                <a
                  href="tel:0682326318"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                    <MessageCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-charcoal-900 group-hover:text-gold transition-colors font-medium">
                      06 82 32 63 18
                    </p>
                    <p className="text-sm text-charcoal-500">
                      Alain —{" "}
                      <span className="italic">
                        il ne mord pas, il croque ! 🍪
                      </span>
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:contact@lpbiscuits.fr"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-charcoal-900 group-hover:text-gold transition-colors font-medium">
                      contact@lpbiscuits.fr
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/lespetitsbiscuitspornic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                    <Facebook className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-charcoal-900 group-hover:text-gold transition-colors font-medium">
                      @lespetitsbiscuitspornic
                    </p>
                    <p className="text-sm text-charcoal-500">Facebook</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Horaires */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ backgroundColor: "#1e3a5f" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-lg">Horaires</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Mar - Sam</span>
                  <span>9h30-12h30 / 14h-18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Dimanche</span>
                  <span>9h-13h</span>
                </div>
                <div className="flex justify-between text-gold">
                  <span>Lundi</span>
                  <span>Fermé</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10"></div>
              </div>
            </div>
          </div>

          {/* Formulaire - 3 colonnes */}
          <div className="lg:col-span-3">
            <div className="bg-kraft-50 rounded-2xl p-8 border border-kraft-200">
              <h3 className="font-handwritten text-2xl text-charcoal-900 mb-6">
                Envoyez-nous un petit mot
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal-700 mb-2"
                    >
                      Votre nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-kraft-300 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal-700 mb-2"
                    >
                      Votre email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-kraft-300 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-charcoal-700 mb-2"
                  >
                    Vous êtes...
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-kraft-300 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                  >
                    <option value="Particulier gourmand">
                      Particulier gourmand
                    </option>
                    <option value="Professionnel gourmand">
                      Professionnel gourmand
                    </option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-charcoal-700 mb-2"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-kraft-300 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition resize-none"
                    placeholder="Bonjour, je souhaiterais..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendStatus === "sending"}
                  className={`w-full text-white px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-3 shadow-lg ${
                    sendStatus === "sending"
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-[1.02] hover:opacity-90"
                  }`}
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  {sendStatus === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer mon message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                {/* Messages de statut */}
                {sendStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm animate-fade-in">
                    <CheckCircle size={18} />
                    <span>Message envoyé avec succès !</span>
                  </div>
                )}
                {sendStatus === "error" && (
                  <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in">
                    <AlertCircle size={18} />
                    <span>
                      Erreur lors de l'envoi. Essayez à nouveau ou
                      contactez-nous par téléphone.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
