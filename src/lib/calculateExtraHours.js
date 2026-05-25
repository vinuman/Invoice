/**
 * Extra billable hours needed so that after a tax deduction on income,
 * net equals (original labor pay + AI reimbursement).
 *
 * ((rate * hours + aiCost) / (rate * (1 - taxRate))) - hours
 */
export function calculateExtraHours(rate, hours, taxRate, aiCost) {
  const r = Number(rate);
  const h = Number(hours);
  const t = Number(taxRate);
  const ai = Number(aiCost);

  if (!Number.isFinite(r) || r <= 0) return null;
  if (!Number.isFinite(h) || h < 0) return null;
  if (!Number.isFinite(t) || t < 0 || t >= 1) return null;
  if (!Number.isFinite(ai) || ai < 0) return null;

  return (r * h + ai) / (r * (1 - t)) - h;
}

export function calculateTotalHoursAfterCoverage(rate, hours, taxRate, aiCost) {
  const extra = calculateExtraHours(rate, hours, taxRate, aiCost);
  if (extra === null) return null;
  return Number(hours) + extra;
}
