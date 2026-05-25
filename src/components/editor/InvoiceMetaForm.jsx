import Section from "./Section";
import { Field, Select, TextArea, TextInput } from "./Field";
import { useInvoiceDraftStore } from "../../stores/useInvoiceDraftStore";

const CURRENCIES = [
  { code: "INR", label: "INR (₹)" },
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
];

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function InvoiceMetaForm() {
  const invoiceNumber = useInvoiceDraftStore((s) => s.invoiceNumber);
  const invoiceDateISO = useInvoiceDraftStore((s) => s.invoiceDateISO);
  const currency = useInvoiceDraftStore((s) => s.currency);
  const taxPercent = useInvoiceDraftStore((s) => s.taxPercent);
  const discountPercent = useInvoiceDraftStore((s) => s.discountPercent);
  const notes = useInvoiceDraftStore((s) => s.notes);
  const terms = useInvoiceDraftStore((s) => s.terms);
  const setField = useInvoiceDraftStore((s) => s.setField);
  const newInvoiceFromCounter = useInvoiceDraftStore((s) => s.newInvoiceFromCounter);

  return (
    <Section
      title="Invoice"
      right={
        <button
          type="button"
          onClick={newInvoiceFromCounter}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
        >
          New invoice
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Invoice number">
          <TextInput
            value={invoiceNumber ?? ""}
            onChange={(e) => setField("invoiceNumber", e.target.value)}
            placeholder="e.g. 42"
          />
        </Field>

        <Field label="Invoice date">
          <TextInput
            type="date"
            value={invoiceDateISO ?? ""}
            onChange={(e) => setField("invoiceDateISO", e.target.value)}
          />
        </Field>

        <Field label="Currency">
          <Select value={currency} onChange={(e) => setField("currency", e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tax %">
            <TextInput
              type="number"
              step="0.01"
              min="0"
              value={taxPercent ?? 0}
              onChange={(e) => setField("taxPercent", toNumber(e.target.value))}
            />
          </Field>
          <Field label="Discount %">
            <TextInput
              type="number"
              step="0.01"
              min="0"
              value={discountPercent ?? 0}
              onChange={(e) => setField("discountPercent", toNumber(e.target.value))}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Notes">
            <TextArea
              rows={3}
              value={notes ?? ""}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder="Optional notes shown on the invoice"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Payment terms">
            <TextArea
              rows={3}
              value={terms ?? ""}
              onChange={(e) => setField("terms", e.target.value)}
              placeholder="Optional terms (e.g. Net 15, due date, etc.)"
            />
          </Field>
        </div>
      </div>
    </Section>
  );
}

