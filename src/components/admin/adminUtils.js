const BASE_LIBRARY = [
  {
    id: "sables-sucres",
    name: "Sablés Sucrés",
    basePrice: 30,
    image: "/products/sables-sucres.webp",
  },
  {
    id: "sables-vanille",
    name: "Sablés Vanille & Fleur de Sel",
    basePrice: 24,
    image: "/products/sables-vanille-fleur-de-sel.png",
  },
  {
    id: "madeleines",
    name: "Madeleines",
    basePrice: 18,
    image: "/products/madeleines.jpg",
  },
  {
    id: "financiers",
    name: "Financiers aux Amandes",
    basePrice: 26,
    image: "/products/financiers.jpg",
  },
  {
    id: "amandises",
    name: "Amandises aux 2 Chocolats",
    basePrice: 22,
    image: "/products/amandises.jpg",
  },
  {
    id: "creme-caramel",
    name: "Crème de Caramel",
    basePrice: 16,
    image: "/products/creme-caramel.png",
  },
  {
    id: "noixdecajou",
    name: "Noix de Cajou au Romarin",
    basePrice: 12,
    image: "/products/noixdecajou.jpg",
  },
  {
    id: "sables-sales",
    name: "Sablés Salés",
    basePrice: 20,
    image: "/products/sables-sales.jpg",
  },
  {
    id: "moelleux-chocolat",
    name: "Moelleux au Chocolat",
    basePrice: 19,
    image: "/products/moelleux.jpg",
  },
  {
    id: "croquants-amandes-noisettes",
    name: "Croquants Amandes & Noisettes",
    basePrice: 21,
    image: "/products/croquants.jpg",
  },
  {
    id: "fruits-caramelises",
    name: "Fruits Caramélisés",
    basePrice: 17,
    image: "/products/fruitscaramelises.jpg",
  },
  {
    id: "roulettes-choco-noisettes",
    name: "Roulettes Choco-Noisettes",
    basePrice: 18,
    image: "/products/roulettes.jpg",
  },
  {
    id: "pate-choco-noisettes",
    name: "Pâte à Tartiner Choco-Noisettes",
    basePrice: 15,
    image: "/products/creme-choco-noisettes.png",
  },
  {
    id: "amandes-ail-fume",
    name: "Amandes à l'Ail Fumé & Fleur de Sel",
    basePrice: 14,
    image: "/products/amandes-a-lail-fume.png",
  },
  {
    id: "noix-cajou-curry",
    name: "Noix de Cajou Curry & Paprika",
    basePrice: 13,
    image: "/products/noix-de-cajou-au-curry.png",
  },
  {
    id: "sables-citron",
    name: "Sablés Citron",
    basePrice: 24,
    image: "/products/sablés-citron.jpg",
  },
  {
    id: "sables-orange",
    name: "Sablés Orange",
    basePrice: 24,
    image: "/products/sables-orange.png",
  },
];

export const CATEGORIES = { sucre: "Sucré", sale: "Salé" };

const SALTY_IDS = [
  "noixdecajou",
  "sables-sales",
  "amandes-ail-fume",
  "noix-cajou-curry",
  "fruits-caramelises",
];

export const PRODUCT_LIBRARY = BASE_LIBRARY.map((p) => ({
  ...p,
  category: SALTY_IDS.includes(p.id) ? "sale" : "sucre",
}));

export const emptyProduct = {
  name: "",
  description: "",
  basePrice: "",
  image: "/products/sables-sucres.webp",
};

export const PICKUP_TYPES = {
  company: "Retrait sur le lieu de l'organisation",
  workshop: "Retrait à l'atelier",
  delivery: "Livraison à domicile",
};

export const emptyPickup = {
  type: "company",
  place: "",
  address: "",
  schedule: "",
  instructions: "",
};

export const emptySale = {
  id: "",
  name: "",
  subtitle: "",
  code: "",
  coverImage: "/products/sables-sucres.webp",
  startDate: "",
  endDate: "",
  description: "",
  messageClosed: "Cette vente privée est maintenant terminée.",
  status: "active",
  pickup: emptyPickup,
  products: [],
};

export const getDiscountedPrice = (product) => {
  if (product.discountType === "percentage") {
    return product.basePrice * (1 - product.discountValue / 100);
  }
  return Math.max(0, product.basePrice - product.discountValue);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatMoney = (value) =>
  `${Number(value || 0)
    .toFixed(2)
    .replace(".", ",")} €`;

export const getSaleStatus = (sale) => {
  const now = new Date();
  if (sale.startDate && new Date(sale.startDate) > now)
    return { label: "À venir", className: "bg-blue-50 text-blue-700" };
  if (sale.endDate && new Date(sale.endDate) < now)
    return { label: "Terminée", className: "bg-gray-100 text-gray-600" };
  return { label: "En cours", className: "bg-[#eef7ee] text-[#1f6f43]" };
};

export const readFileAsDataURL = (file, callback) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
};

export const inputClass =
  "w-full rounded-xl border border-[#dfe7ef] bg-[#f8fafc] px-4 py-3 text-base text-[#1a365d] outline-none transition focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20";

export const labelClass = "mb-2 block text-sm font-medium text-[#1a365d]";

export const cardClass =
  "rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(30,58,95,0.06)]";
