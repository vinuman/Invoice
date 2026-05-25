import React, { useMemo } from "react";
import BillTable from "../BillTable";
import { useSenderProfilesStore } from "../../stores/useSenderProfilesStore";
import { useClientProfilesStore } from "../../stores/useClientProfilesStore";
import { useInvoiceDraftStore } from "../../stores/useInvoiceDraftStore";

function formatDisplayDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).replace(
    ",",
    ""
  );
}

export default function InvoicePreview() {
  const activeSenderId = useSenderProfilesStore((s) => s.activeSenderId);
  const sendersById = useSenderProfilesStore((s) => s.sendersById);
  const activeClientId = useClientProfilesStore((s) => s.activeClientId);
  const clientsById = useClientProfilesStore((s) => s.clientsById);

  const invoiceNumber = useInvoiceDraftStore((s) => s.invoiceNumber);
  const invoiceDateISO = useInvoiceDraftStore((s) => s.invoiceDateISO);
  const currency = useInvoiceDraftStore((s) => s.currency);
  const taxPercent = useInvoiceDraftStore((s) => s.taxPercent);
  const discountPercent = useInvoiceDraftStore((s) => s.discountPercent);
  const notes = useInvoiceDraftStore((s) => s.notes);
  const terms = useInvoiceDraftStore((s) => s.terms);
  const lineItems = useInvoiceDraftStore((s) => s.lineItems);

  const sender = activeSenderId ? sendersById[activeSenderId] : null;
  const client = activeClientId ? clientsById[activeClientId] : null;

  const dateText = useMemo(() => formatDisplayDate(invoiceDateISO), [invoiceDateISO]);

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 print:shadow-none print:ring-0">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <address className="not-italic leading-relaxed text-gray-900">
            <span className="text-xl font-medium text-amber-800">{sender?.name || "—"}</span>
            <br />
            {(sender?.addressLines || []).map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </address>

          <div className="mt-6 space-y-1 text-sm text-gray-900">
            <div>
              <span className="text-sm font-semibold text-amber-800">PAN: </span>
              {sender?.pan || "—"}
            </div>
            <div>
              <span className="text-sm font-semibold text-amber-800">Bank Acc: </span>
              {sender?.bankAccount || "—"}
            </div>
            <div>
              <span className="text-sm font-semibold text-amber-800">IFSC code: </span>
              {sender?.ifsc || "—"}
            </div>
            <div>
              <span className="text-sm font-semibold text-amber-800">UPI ID: </span>
              {sender?.upiId || "—"}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-base font-semibold text-amber-800">To:</div>
            <div className="text-3xl font-bold text-amber-800">{client?.companyName || "—"}</div>
            <address className="mt-1 not-italic leading-relaxed text-gray-900">
              {(client?.addressLines || []).map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
              {client?.gstin ? (
                <div className="mt-1">
                  <span className="font-semibold text-gray-900">GSTIN:</span> {client.gstin}
                </div>
              ) : null}
            </address>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-3xl font-bold text-amber-800 underline">Invoice</div>
          <div className="mt-2 text-sm text-gray-900">
            <div>
              <span className="font-semibold">Invoice #:</span> {invoiceNumber || "—"}
            </div>
            <div>
              <span className="font-semibold">Date:</span> {dateText || "—"}
            </div>
            <div>
              <span className="font-semibold">Currency:</span> {currency}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <BillTable
          items={lineItems}
          currency={currency}
          taxPercent={taxPercent}
          discountPercent={discountPercent}
        />
      </div>

      {(notes || terms) && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {notes ? (
            <div className="rounded-md border border-gray-200 p-3">
              <div className="text-xs font-semibold text-gray-800">Notes</div>
              <div className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{notes}</div>
            </div>
          ) : null}
          {terms ? (
            <div className="rounded-md border border-gray-200 p-3">
              <div className="text-xs font-semibold text-gray-800">Payment terms</div>
              <div className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{terms}</div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

