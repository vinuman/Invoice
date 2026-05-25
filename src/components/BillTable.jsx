import { useMemo } from "react";
import PropTypes from "prop-types";
import { formatMoney } from "../lib/currency";
import { computeInvoiceTotals } from "../lib/invoiceMath";

const BillTable = ({ items, currency, taxPercent = 0, discountPercent = 0 }) => {
  const totals = useMemo(
    () => computeInvoiceTotals({ items, taxPercent, discountPercent }),
    [items, taxPercent, discountPercent]
  );

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-amber-800">
              Description
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-amber-800">
              Hours
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-amber-800">
              Rate
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-amber-800">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {(items || []).map((item) => (
            <tr key={item.id} className="break-inside-avoid border-b border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-800">{item.description}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{Number(item.hours || 0)}</td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {formatMoney(currency, item.rate || 0)}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {formatMoney(currency, Number(item.rate || 0) * Number(item.hours || 0))}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-300">
            <td className="px-4 py-2 text-sm font-semibold text-gray-900">Subtotal</td>
            <td className="px-4 py-2 text-sm font-semibold text-gray-900" colSpan="2">
              {totals.totalHours}
            </td>
            <td className="px-4 py-2 text-sm font-bold text-gray-900">
              {formatMoney(currency, totals.subtotal)}
            </td>
          </tr>

          {Number(taxPercent || 0) ? (
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm font-semibold text-gray-900">
                Tax ({Number(taxPercent || 0)}%)
              </td>
              <td className="px-4 py-2 text-sm font-semibold text-gray-900" colSpan="2"></td>
              <td className="px-4 py-2 text-sm font-bold text-gray-900">
                {formatMoney(currency, totals.taxAmount)}
              </td>
            </tr>
          ) : null}

          {Number(discountPercent || 0) ? (
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm font-semibold text-gray-900">
                Discount ({Number(discountPercent || 0)}%)
              </td>
              <td className="px-4 py-2 text-sm font-semibold text-gray-900" colSpan="2"></td>
              <td className="px-4 py-2 text-sm font-bold text-gray-900">
                -{formatMoney(currency, totals.discountAmount)}
              </td>
            </tr>
          ) : null}

          <tr className="border-t border-gray-300">
            <td className="px-4 py-2 text-sm font-semibold text-gray-900">Total</td>
            <td className="px-4 py-2 text-sm font-semibold text-gray-900" colSpan="2"></td>
            <td className="px-4 py-2 text-base font-extrabold text-gray-900">
              {formatMoney(currency, totals.total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

BillTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      hours: PropTypes.number,
      rate: PropTypes.number,
    })
  ),
  currency: PropTypes.string,
  taxPercent: PropTypes.number,
  discountPercent: PropTypes.number,
};

export default BillTable;
