import { create } from "zustand";
import { persist } from "zustand/middleware";
import { newId } from "../lib/id";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const defaultLineItems = [
  { id: newId("item"), description: "QA Testing, Hey Possible", hours: 8.5, rate: 650 },
  { id: newId("item"), description: "QA Testing, Tejomed", hours: 2, rate: 600 },
];

export const useInvoiceDraftStore = create(
  persist(
    (set, get) => ({
      nextInvoiceNumber: 1,
      invoiceNumber: "1",
      invoiceDateISO: todayISO(),

      currency: "INR",
      taxPercent: 0,
      discountPercent: 0,
      notes: "",
      terms: "",

      // Tax & AI coverage planner (editor only, not on invoice PDF)
      coverageRate: 20,
      coverageHours: 10,
      coverageTaxPercent: 10,
      coverageAiCost: 24,

      lineItems: defaultLineItems,

      setField: (key, value) => set({ [key]: value }),

      addLineItem: () =>
        set((state) => ({
          lineItems: [
            { id: newId("item"), description: "", hours: 0, rate: 0 },
            ...state.lineItems,
          ],
        })),

      updateLineItem: (id, patch) =>
        set((state) => ({
          lineItems: state.lineItems.map((it) => (it.id === id ? { ...it, ...patch } : it)),
        })),

      removeLineItem: (id) =>
        set((state) => ({ lineItems: state.lineItems.filter((it) => it.id !== id) })),

      newInvoiceFromCounter: () => {
        const { nextInvoiceNumber } = get();
        set({
          invoiceNumber: String(nextInvoiceNumber),
          nextInvoiceNumber: nextInvoiceNumber + 1,
          invoiceDateISO: todayISO(),
          taxPercent: 0,
          discountPercent: 0,
          notes: "",
          terms: "",
          lineItems: [{ id: newId("item"), description: "", hours: 0, rate: 0 }],
        });
      },
    }),
    {
      name: "invoice_draft_v1",
      version: 1,
    }
  )
);

