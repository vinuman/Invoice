import { useMemo } from "react";
import Section from "./Section";
import { Field, TextInput } from "./Field";
import { useInvoiceDraftStore } from "../../stores/useInvoiceDraftStore";
import { formatMoney } from "../../lib/currency";
import {
  calculateExtraHours,
  calculateTotalHoursAfterCoverage,
} from "../../lib/calculateExtraHours";

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatHours(value) {
  if (value === null || !Number.isFinite(value)) return "—";
  return value.toFixed(2);
}

export default function TaxCoverageCalculator() {
  const currency = useInvoiceDraftStore((s) => s.currency);
  const coverageRate = useInvoiceDraftStore((s) => s.coverageRate);
  const coverageHours = useInvoiceDraftStore((s) => s.coverageHours);
  const coverageTaxPercent = useInvoiceDraftStore((s) => s.coverageTaxPercent);
  const coverageAiCost = useInvoiceDraftStore((s) => s.coverageAiCost);
  const setField = useInvoiceDraftStore((s) => s.setField);

  const rate = toNumber(coverageRate);
  const hours = toNumber(coverageHours);
  const taxRate = toNumber(coverageTaxPercent) / 100;
  const aiCost = toNumber(coverageAiCost);

  const result = useMemo(() => {
    const extraHours = calculateExtraHours(rate, hours, taxRate, aiCost);
    const totalHours = calculateTotalHoursAfterCoverage(rate, hours, taxRate, aiCost);
    const baseBill = rate * hours;
    const grossAfterExtra =
      extraHours !== null ? rate * (hours + extraHours) + aiCost : null;
    const netIfBilledBase = baseBill * (1 - taxRate);
    const targetNet = baseBill + aiCost;

    return {
      extraHours,
      totalHours,
      baseBill,
      grossAfterExtra,
      netIfBilledBase,
      targetNet,
      invalid:
        rate <= 0 ||
        hours < 0 ||
        coverageTaxPercent < 0 ||
        coverageTaxPercent >= 100 ||
        aiCost < 0,
    };
  }, [rate, hours, taxRate, aiCost, coverageTaxPercent]);

  return (
    <Section title="Tax & AI coverage (planner)">
      <p className="mb-3 text-xs text-gray-600">
        How many extra hours to bill so that after a{" "}
        <span className="font-medium">{coverageTaxPercent || 0}%</span> tax on income you still
        keep your labor pay plus AI costs. Not shown on the printed invoice.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Hourly rate">
          <TextInput
            type="number"
            step="0.01"
            min="0"
            value={coverageRate ?? 0}
            onChange={(e) => setField("coverageRate", toNumber(e.target.value))}
          />
        </Field>

        <Field label="Hours worked">
          <TextInput
            type="number"
            step="0.25"
            min="0"
            value={coverageHours ?? 0}
            onChange={(e) => setField("coverageHours", toNumber(e.target.value))}
          />
        </Field>

        <Field label="Tax deduction %">
          <TextInput
            type="number"
            step="0.01"
            min="0"
            max="99.99"
            value={coverageTaxPercent ?? 0}
            onChange={(e) => setField("coverageTaxPercent", toNumber(e.target.value))}
          />
        </Field>

        <Field label="AI cost to reimburse">
          <TextInput
            type="number"
            step="0.01"
            min="0"
            value={coverageAiCost ?? 0}
            onChange={(e) => setField("coverageAiCost", toNumber(e.target.value))}
          />
        </Field>
      </div>

      <div className="mt-4 rounded-md border border-amber-200 bg-amber-50/60 p-3 text-sm text-gray-900">
        {result.invalid ? (
          <div className="text-gray-700">
            Enter a positive hourly rate, hours ≥ 0, tax between 0–99.99%, and AI cost ≥ 0.
          </div>
        ) : (
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-600">Base bill (rate × hours)</dt>
              <dd className="font-semibold">{formatMoney(currency, result.baseBill)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-600">
                Net if you only bill base (after tax)
              </dt>
              <dd className="font-semibold">{formatMoney(currency, result.netIfBilledBase)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-600">Target (labor + AI)</dt>
              <dd className="font-semibold">{formatMoney(currency, result.targetNet)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-600">Extra hours to add</dt>
              <dd className="text-lg font-bold text-amber-800">
                {formatHours(result.extraHours)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-gray-600">Total hours to bill</dt>
              <dd className="text-lg font-bold text-amber-800">
                {formatHours(result.totalHours)}{" "}
                <span className="text-sm font-normal text-gray-600">
                  ({formatHours(hours)} worked + {formatHours(result.extraHours)} extra)
                </span>
              </dd>
            </div>
            {result.grossAfterExtra !== null ? (
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-gray-600">
                  Bill at total hours (labor only, before client tax)
                </dt>
                <dd className="font-semibold">
                  {formatMoney(currency, rate * (result.totalHours ?? 0))}
                  <span className="ml-2 text-xs font-normal text-gray-600">
                    + {formatMoney(currency, aiCost)} AI on invoice separately if needed
                  </span>
                </dd>
              </div>
            ) : null}
          </dl>
        )}

        <p className="mt-3 font-mono text-[11px] text-gray-500">
          extraHours = ((rate×hours + aiCost) / (rate×(1 − taxRate))) − hours
        </p>
      </div>
    </Section>
  );
}
