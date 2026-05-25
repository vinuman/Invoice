function toNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

export function round2(value) {
  return Math.round(toNumber(value) * 100) / 100;
}

export function computeInvoiceTotals({ items, taxPercent = 0, discountPercent = 0 }) {
  const safeItems = Array.isArray(items) ? items : [];
  const totalHours = safeItems.reduce((sum, it) => sum + toNumber(it.hours), 0);
  const subtotal = safeItems.reduce((sum, it) => sum + toNumber(it.rate) * toNumber(it.hours), 0);

  const taxAmount = subtotal * (toNumber(taxPercent) / 100);
  const discountAmount = subtotal * (toNumber(discountPercent) / 100);
  const total = subtotal + taxAmount - discountAmount;

  return {
    totalHours: round2(totalHours),
    subtotal: round2(subtotal),
    taxAmount: round2(taxAmount),
    discountAmount: round2(discountAmount),
    total: round2(total),
  };
}

