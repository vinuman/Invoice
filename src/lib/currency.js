const FALLBACK_SYMBOL_BY_CURRENCY = { INR: "₹", USD: "$", EUR: "€" };

export function formatMoney(currency, value) {
  const n = Number(value);
  const safe = Number.isFinite(n) ? n : 0;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safe);
  } catch {
    const symbol = FALLBACK_SYMBOL_BY_CURRENCY[currency] ?? "";
    return `${symbol}${safe.toFixed(2)}`;
  }
}

