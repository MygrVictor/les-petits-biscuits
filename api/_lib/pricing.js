// Calculs de prix côté serveur (source de vérité pour le paiement)
export const round2 = (n) => Math.round(n * 100) / 100;

export const discountedPrice = (p) => {
  const base = Number(p.basePrice) || 0;
  const value = Number(p.discountValue) || 0;
  if (p.discountType === "percentage") {
    return base * (1 - Math.min(100, Math.max(0, value)) / 100);
  }
  return Math.max(0, base - value);
};

export const saleState = (sale) => {
  const now = Date.now();
  if (now < new Date(sale.startDate).getTime()) return "future";
  if (now > new Date(sale.endDate).getTime()) return "closed";
  return "active";
};

// Données exposées au public (pas de code ni d'infos internes inutiles)
export const publicSale = (sale) => {
  const { code, ...rest } = sale;
  return rest;
};
