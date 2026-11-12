// Données de démonstration (ventes + commandes)

const p = (productId, name, basePrice, image, discountType, discountValue) => ({
  id: productId,
  productId,
  name,
  basePrice,
  image,
  discountType,
  discountValue,
});

const PRODUCTS = {
  sablesVanille: [
    "sables-vanille",
    "Sablés Vanille & Fleur de Sel",
    24,
    "/products/sables-vanille-fleur-de-sel.png",
  ],
  sablesSucres: [
    "sables-sucres",
    "Sablés Sucrés",
    30,
    "/products/sables-sucres.webp",
  ],
  madeleines: ["madeleines", "Madeleines", 18, "/products/madeleines.jpg"],
  financiers: [
    "financiers",
    "Financiers aux Amandes",
    26,
    "/products/financiers.jpg",
  ],
  amandises: [
    "amandises",
    "Amandises aux 2 Chocolats",
    22,
    "/products/amandises.jpg",
  ],
  caramel: [
    "creme-caramel",
    "Crème de Caramel",
    16,
    "/products/creme-caramel.png",
  ],
  cajou: [
    "noixdecajou",
    "Noix de Cajou au Romarin",
    12,
    "/products/noixdecajou.jpg",
  ],
  sablesSales: [
    "sables-sales",
    "Sablés Salés",
    20,
    "/products/sables-sales.jpg",
  ],
  moelleux: [
    "moelleux-chocolat",
    "Moelleux au Chocolat",
    19,
    "/products/moelleux.jpg",
  ],
  croquants: [
    "croquants-amandes-noisettes",
    "Croquants Amandes & Noisettes",
    21,
    "/products/croquants.jpg",
  ],
  fruitsCaramelises: [
    "fruits-caramelises",
    "Fruits Caramélisés",
    17,
    "/products/fruitscaramelises.jpg",
  ],
  roulettes: [
    "roulettes-choco-noisettes",
    "Roulettes Choco-Noisettes",
    18,
    "/products/roulettes.jpg",
  ],
  pateChoco: [
    "pate-choco-noisettes",
    "Pâte à Tartiner Choco-Noisettes",
    15,
    "/products/creme-choco-noisettes.png",
  ],
  amandesAil: [
    "amandes-ail-fume",
    "Amandes à l'Ail Fumé & Fleur de Sel",
    14,
    "/products/amandes-a-lail-fume.png",
  ],
  cajouCurry: [
    "noix-cajou-curry",
    "Noix de Cajou Curry & Paprika",
    13,
    "/products/noix-de-cajou-au-curry.png",
  ],
  sablesCitron: [
    "sables-citron",
    "Sablés Citron",
    24,
    "/products/sablés-citron.jpg",
  ],
  sablesOrange: [
    "sables-orange",
    "Sablés Orange",
    24,
    "/products/sables-orange.png",
  ],
};

const prod = (key, type, value) => p(...PRODUCTS[key], type, value);

export const initialSales = [
  {
    id: "cse-airbus-2026",
    name: "CSE Airbus – Fêtes de fin d'année",
    subtitle: "Offre réservée aux salariés",
    code: "AIRBUS26",
    logo: "/logonav.webp",
    coverImage: "/products/sables-vanille-fleur-de-sel.png",
    startDate: "2026-10-15T08:00",
    endDate: "2026-11-15T23:59",
    description:
      "Commandez vos biscuits artisanaux pour les fêtes : tout sera livré directement sur votre lieu de travail.",
    messageClosed:
      "La vente CSE est terminée. Les colis seront distribués à la date prévue.",
    status: "active",
    pickup: {
      type: "company",
      place: "CSE Airbus – Bâtiment M30, salle du CSE",
      address: "2 rond-point Émile Dewoitine, 31700 Blagnac",
      schedule: "Jeudi 4 décembre 2026, 11h30 – 14h00",
      instructions:
        "Présentez votre numéro de commande ou votre badge salarié.",
    },
    products: [
      prod("sablesVanille", "percentage", 20),
      prod("madeleines", "percentage", 20),
      prod("financiers", "percentage", 20),
      prod("caramel", "percentage", 15),
    ],
  },
  {
    id: "ecole-jules-ferry-2026",
    name: "Kermesse école Jules Ferry",
    subtitle: "Au profit de l'association des parents",
    code: "JULESFERRY",
    logo: "/logonav.webp",
    coverImage: "/products/madeleines.jpg",
    startDate: "2026-10-10T08:00",
    endDate: "2026-10-31T20:00",
    description:
      "Une partie de chaque commande est reversée à l'APE pour financer les sorties scolaires.",
    messageClosed:
      "Les commandes sont closes. Merci pour votre soutien à l'école !",
    status: "active",
    pickup: {
      type: "company",
      place: "École élémentaire Jules Ferry – préau",
      address: "15 rue Jules Ferry, 31000 Toulouse",
      schedule: "Vendredi 7 novembre 2026, 16h30 – 18h00 (sortie des classes)",
      instructions:
        "Les colis sont nominatifs, au nom de l'enfant si précisé en message.",
    },
    products: [
      prod("madeleines", "amount", 3),
      prod("sablesSucres", "amount", 5),
      prod("amandises", "amount", 3),
    ],
  },
  {
    id: "atelier-noel-2026",
    name: "Vente privée Noël – Atelier",
    subtitle: "Avant-première pour nos fidèles",
    code: "NOELPETITS",
    logo: "/logonav.webp",
    coverImage: "/products/creme-caramel.png",
    startDate: "2026-11-20T09:00",
    endDate: "2026-12-15T23:59",
    description:
      "Nos créations de Noël en avant-première, à retirer à l'atelier.",
    messageClosed: "La vente de Noël est terminée. Rendez-vous l'an prochain !",
    status: "active",
    pickup: {
      type: "workshop",
      place: "Atelier Les Petits Biscuits",
      address: "8 rue des Gourmands, 31000 Toulouse",
      schedule: "Du 17 au 23 décembre 2026, 10h – 19h",
      instructions: "Retrait possible par un tiers avec le numéro de commande.",
    },
    products: [
      prod("caramel", "percentage", 18),
      prod("amandises", "percentage", 12),
      prod("sablesSales", "amount", 3),
      prod("financiers", "percentage", 10),
    ],
  },
  {
    id: "fidelite-livraison-2026",
    name: "Club fidélité – Livraison",
    subtitle: "Livré chez vous partout en France",
    code: "FIDELITE26",
    logo: "/logonav.webp",
    coverImage: "/products/noixdecajou.jpg",
    startDate: "2026-10-01T00:00",
    endDate: "2026-11-30T23:59",
    description:
      "Une sélection de gourmandises sucrées et salées livrée directement à votre porte.",
    messageClosed: "Cette vente fidélité est clôturée.",
    status: "active",
    pickup: {
      type: "delivery",
      place: "",
      address: "",
      schedule: "",
      instructions:
        "Expédition sous 5 jours ouvrés après la fin de la vente, en Colissimo suivi.",
    },
    products: [
      prod("cajou", "percentage", 25),
      prod("sablesSales", "percentage", 15),
      prod("sablesSucres", "amount", 5),
    ],
  },
  {
    id: "ete-2026",
    name: "Vente d'été 2026",
    subtitle: "Édition terminée",
    code: "ETE2026",
    logo: "/logonav.webp",
    coverImage: "/products/sables-sucres.webp",
    startDate: "2026-06-01T00:00",
    endDate: "2026-07-15T23:59",
    description: "Les saveurs de l'été à prix doux.",
    messageClosed: "La vente d'été est terminée. Merci à tous !",
    status: "active",
    pickup: {
      type: "workshop",
      place: "Atelier Les Petits Biscuits",
      address: "8 rue des Gourmands, 31000 Toulouse",
      schedule: "Samedi 19 juillet 2026, 9h – 13h",
      instructions: "",
    },
    products: [
      prod("sablesSucres", "percentage", 10),
      prod("cajou", "percentage", 10),
    ],
  },
  {
    id: "cadeaux-entreprise-2026",
    name: "Coffrets entreprise – fin d'année",
    subtitle: "Précommandes B2B",
    code: "COFFRETS26",
    logo: "/logonav.webp",
    coverImage: "/products/cofffet1-2.jpg",
    startDate: "2026-10-20T08:00",
    endDate: "2026-11-30T23:59",
    description:
      "Une sélection premium pour les coffrets cadeaux de fin d'année.",
    messageClosed: "La campagne coffrets est terminée.",
    status: "active",
    pickup: {
      type: "workshop",
      place: "Atelier Les Petits Biscuits",
      address: "8 rue des Gourmands, 31000 Toulouse",
      schedule: "Retrait du 8 au 20 décembre 2026, 9h30 – 18h30",
      instructions:
        "Prévoir un véhicule adapté pour les retraits de plus de 10 coffrets.",
    },
    products: [
      prod("sablesVanille", "percentage", 12),
      prod("financiers", "percentage", 10),
      prod("amandises", "percentage", 10),
      prod("pateChoco", "amount", 2),
      prod("caramel", "amount", 2),
      prod("croquants", "percentage", 8),
    ],
  },
  {
    id: "aperitif-fetes-2026",
    name: "Apéritif des fêtes – édition salée",
    subtitle: "Collection salée & fruits secs",
    code: "APEROLPB",
    logo: "/logonav.webp",
    coverImage: "/products/noix-de-cajou-au-curry.png",
    startDate: "2026-11-01T08:00",
    endDate: "2026-12-05T23:59",
    description:
      "Tout le nécessaire pour les apéros de fin d'année : salés et fruits secs.",
    messageClosed: "La vente apéritif est terminée.",
    status: "active",
    pickup: {
      type: "delivery",
      place: "",
      address: "",
      schedule: "",
      instructions: "Expédition hebdomadaire, avec suivi, chaque mercredi.",
    },
    products: [
      prod("sablesSales", "percentage", 15),
      prod("amandesAil", "percentage", 15),
      prod("cajouCurry", "percentage", 12),
      prod("cajou", "percentage", 10),
      prod("fruitsCaramelises", "amount", 2),
    ],
  },
  {
    id: "douceurs-hiver-2026",
    name: "Douceurs d'hiver",
    subtitle: "Édition limitée gourmandise",
    code: "HIVER26",
    logo: "/logonav.webp",
    coverImage: "/products/roulettes.jpg",
    startDate: "2026-11-10T08:00",
    endDate: "2026-12-22T23:59",
    description:
      "Une sélection de douceurs sucrées inspirées de la saison hivernale.",
    messageClosed: "La vente Douceurs d'hiver est terminée.",
    status: "active",
    pickup: {
      type: "company",
      place: "Point retrait partenaires – Hall B",
      address: "18 boulevard des Minimes, 31200 Toulouse",
      schedule: "Vendredi 23 décembre 2026, 12h – 17h",
      instructions: "Présentez le numéro de commande pour retrait.",
    },
    products: [
      prod("sablesCitron", "percentage", 10),
      prod("sablesOrange", "percentage", 10),
      prod("moelleux", "amount", 3),
      prod("madeleines", "amount", 2),
      prod("roulettes", "percentage", 10),
      prod("pateChoco", "percentage", 8),
    ],
  },
];

// ---------- Commandes ----------
const saleById = Object.fromEntries(initialSales.map((s) => [s.id, s]));

const unit = (product) =>
  product.discountType === "percentage"
    ? Number((product.basePrice * (1 - product.discountValue / 100)).toFixed(2))
    : product.basePrice - product.discountValue;

let counter = 1001;
const order = (saleId, customerName, email, date, lines, extra = {}) => {
  const sale = saleById[saleId];
  const items = lines.map(([productId, quantity]) => {
    const product = sale.products.find((x) => x.id === productId);
    const unitPrice = unit(product);
    return {
      productId,
      name: product.name,
      quantity,
      unitPrice,
      total: Number((unitPrice * quantity).toFixed(2)),
    };
  });
  return {
    id: `CMD-${counter++}`,
    saleId,
    saleName: sale.name,
    customerName,
    customerEmail: email,
    customerPhone: "06 12 34 56 78",
    status: "Payée",
    date,
    pickup: sale.pickup,
    total: Number(items.reduce((s, i) => s + i.total, 0).toFixed(2)),
    items,
    ...extra,
  };
};

export const initialOrders = [
  order(
    "cse-airbus-2026",
    "Sophie Martin",
    "sophie.martin@airbus.com",
    "2026-10-16T09:12",
    [
      ["sables-vanille", 2],
      ["madeleines", 1],
    ],
  ),
  order(
    "cse-airbus-2026",
    "Karim Benali",
    "karim.benali@airbus.com",
    "2026-10-17T12:45",
    [["financiers", 3]],
  ),
  order(
    "cse-airbus-2026",
    "Julie Roux",
    "julie.roux@airbus.com",
    "2026-10-19T18:03",
    [
      ["sables-vanille", 1],
      ["creme-caramel", 2],
      ["madeleines", 2],
    ],
  ),
  order(
    "cse-airbus-2026",
    "Marc Lefèvre",
    "marc.lefevre@airbus.com",
    "2026-10-21T08:30",
    [["madeleines", 4]],
  ),
  order(
    "ecole-jules-ferry-2026",
    "Claire Dubois",
    "claire.dubois@gmail.com",
    "2026-10-12T20:10",
    [
      ["madeleines", 2],
      ["amandises", 1],
    ],
    { note: "Pour Léo, CM1" },
  ),
  order(
    "ecole-jules-ferry-2026",
    "Thomas Petit",
    "thomas.petit@gmail.com",
    "2026-10-14T21:40",
    [
      ["sables-sucres", 1],
      ["madeleines", 3],
    ],
    { note: "Pour Emma, CE2" },
  ),
  order(
    "ecole-jules-ferry-2026",
    "Nadia Haddad",
    "nadia.h@outlook.fr",
    "2026-10-20T07:55",
    [["amandises", 2]],
  ),
  order(
    "fidelite-livraison-2026",
    "Lucie Bernard",
    "lucie.bernard@gmail.com",
    "2026-10-05T14:20",
    [
      ["noixdecajou", 3],
      ["sables-sales", 2],
    ],
    { deliveryAddress: "4 avenue Foch, 75116 Paris" },
  ),
  order(
    "fidelite-livraison-2026",
    "Pierre Garnier",
    "p.garnier@free.fr",
    "2026-10-18T10:05",
    [["sables-sucres", 2]],
    { deliveryAddress: "22 quai des Chartrons, 33000 Bordeaux" },
  ),
  order("ete-2026", "Anne Morel", "anne.morel@gmail.com", "2026-06-12T11:00", [
    ["sables-sucres", 2],
    ["noixdecajou", 1],
  ]),
  order(
    "cadeaux-entreprise-2026",
    "Marine Clément",
    "marine.clement@entreprise.fr",
    "2026-10-24T10:18",
    [
      ["sables-vanille", 6],
      ["financiers", 6],
      ["pate-choco-noisettes", 4],
    ],
  ),
  order(
    "cadeaux-entreprise-2026",
    "Guillaume Renaud",
    "g.renaud@entreprise.fr",
    "2026-10-27T16:42",
    [
      ["amandises", 8],
      ["creme-caramel", 5],
      ["croquants-amandes-noisettes", 4],
    ],
  ),
  order(
    "aperitif-fetes-2026",
    "Élodie Baron",
    "elodie.baron@gmail.com",
    "2026-11-04T12:14",
    [
      ["sables-sales", 3],
      ["amandes-ail-fume", 3],
      ["noix-cajou-curry", 2],
    ],
    { deliveryAddress: "14 rue Voltaire, 44000 Nantes" },
  ),
  order(
    "aperitif-fetes-2026",
    "Vincent Masure",
    "vincent.masure@outlook.fr",
    "2026-11-08T09:30",
    [
      ["fruits-caramelises", 4],
      ["noixdecajou", 2],
      ["sables-sales", 2],
    ],
    { deliveryAddress: "6 avenue du Prado, 13008 Marseille" },
  ),
  order(
    "douceurs-hiver-2026",
    "Chloé Mercier",
    "chloe.mercier@gmail.com",
    "2026-11-12T18:06",
    [
      ["sables-citron", 2],
      ["sables-orange", 2],
      ["roulettes-choco-noisettes", 2],
    ],
  ),
  order(
    "douceurs-hiver-2026",
    "Arthur Simon",
    "arthur.simon@orange.fr",
    "2026-11-14T13:22",
    [
      ["moelleux-chocolat", 3],
      ["madeleines", 3],
      ["pate-choco-noisettes", 2],
    ],
  ),
];
