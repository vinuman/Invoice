import Section from "./Section";
import { Field, TextInput } from "./Field";
import { useInvoiceDraftStore } from "../../stores/useInvoiceDraftStore";

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function LineItemsEditor() {
  const lineItems = useInvoiceDraftStore((s) => s.lineItems);
  const addLineItem = useInvoiceDraftStore((s) => s.addLineItem);
  const updateLineItem = useInvoiceDraftStore((s) => s.updateLineItem);
  const removeLineItem = useInvoiceDraftStore((s) => s.removeLineItem);

  return (
    <Section
      title="Line items"
      right={
        <button
          type="button"
          onClick={addLineItem}
          className="rounded-md bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700"
        >
          Add row
        </button>
      }
    >
      <div className="space-y-3">
        {lineItems.map((it) => (
          <div
            key={it.id}
            className="grid grid-cols-1 gap-3 rounded-md border border-gray-200 p-3 sm:grid-cols-12"
          >
            <div className="sm:col-span-6">
              <Field label="Description">
                <TextInput
                  value={it.description ?? ""}
                  onChange={(e) => updateLineItem(it.id, { description: e.target.value })}
                  placeholder="Work description"
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Hours">
                <TextInput
                  type="number"
                  step="0.25"
                  min="0"
                  value={it.hours ?? 0}
                  onChange={(e) => updateLineItem(it.id, { hours: toNumber(e.target.value) })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Rate">
                <TextInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={it.rate ?? 0}
                  onChange={(e) => updateLineItem(it.id, { rate: toNumber(e.target.value) })}
                />
              </Field>
            </div>
            <div className="flex items-end sm:col-span-2">
              <button
                type="button"
                onClick={() => removeLineItem(it.id)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {lineItems.length === 0 ? (
          <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">
            No line items yet.
          </div>
        ) : null}
      </div>
    </Section>
  );
}

