export const getSaleOrders = (saleId, orders = []) =>
  orders.filter((order) => order.saleId === saleId);

// Agrège les quantités commandées par référence pour une vente
export const getProductionSummary = (sale, orders = []) => {
  const products = sale.products || [];
  const summary = new Map();
  const keyOf = (p) => p.productId || p.id || p.name;

  products.forEach((product) => {
    summary.set(keyOf(product), {
      name: product.name,
      image: product.image,
      quantity: 0,
      total: 0,
    });
  });

  getSaleOrders(sale.id, orders).forEach((order) => {
    (order.items || []).forEach((item) => {
      const match = products.find(
        (p) => p.id === item.productId || p.productId === item.productId,
      );
      const key = match ? keyOf(match) : item.productId || item.name;
      const entry = summary.get(key) || {
        name: item.name,
        image: null,
        quantity: 0,
        total: 0,
      };
      entry.quantity += Number(item.quantity || 0);
      entry.total += Number(item.total || 0);
      summary.set(key, entry);
    });
  });

  return [...summary.values()].sort((a, b) => b.quantity - a.quantity);
};

export const getProductionTotals = (sale, orders = []) => {
  const summary = getProductionSummary(sale, orders);
  const units = summary.reduce((sum, item) => sum + item.quantity, 0);
  const revenue = summary.reduce((sum, item) => sum + item.total, 0);
  return {
    summary,
    units,
    revenue,
    lines: summary.filter((item) => item.quantity > 0).length,
  };
};
