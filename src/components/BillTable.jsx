import React from "react";

const BillTable = ({ data }) => {
  return (
    <>
      <div>
        <table className="min-w-full bg-white border border-gray-400">
          <thead>
            <tr className=" text-white">
              <th className="px-4 py-2 text-left text-sm font-semibold text-amber-800  border-b border-gray-400">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-amber-800 border-b border-gray-400">
                Hours
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-amber-800 border-b border-gray-400">
                Rate
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-amber-800 border-b border-gray-400">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="px-4 py-2 text-sm text-gray-700">
                  Web Development
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.hours}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  &#8377;{item.rate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  &#8377;{item.rate * item.hours}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-400">
              <td className="px-4 py-2 text-sm font-semibold text-gray-800">
                Total
              </td>
              <td
                className="px-4 py-2 text-sm font-semibold text-gray-800"
                colSpan="2"
              >
                {data.reduce((total, item) => total + item.hours, 0)}
              </td>
              <td className="px-4 py-2 text-sm font-bold  text-gray-700">
                &#8377;
                {data.reduce(
                  (total, item) => total + item.rate * item.hours,
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default BillTable;
