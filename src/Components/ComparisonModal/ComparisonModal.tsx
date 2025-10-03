import React from "react";
import type { Property } from "../../types/property";
import { fmtMoneyPerSqft, fmtSqft, fmtDate } from "../../utils/propertyUtils";

type Props = {
  properties: Property[];
  onClose: () => void;
};

const ComparisonModal: React.FC<Props> = ({ properties, onClose }) => {
  if (properties.length < 2) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-11/12 max-w-5xl max-h-[90vh] overflow-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Compare Properties</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Feature</th>
                {properties.map((p) => (
                  <th key={p.id} className="p-2 border-b text-left">
                    <div className="flex flex-col">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="h-24 w-full object-cover rounded mb-2"
                      />
                      <span className="font-medium">{p.title}</span>
                      <span className="text-xs text-zinc-500">{p.type}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-medium border-b">Location</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-2 border-b">
                    {p.address.city}, {p.address.state}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 font-medium border-b">Price / sqft</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-2 border-b">
                    {fmtMoneyPerSqft(p.price_per_sqft)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 font-medium border-b">Total Sqft</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-2 border-b">
                    {fmtSqft(p.total_sqft)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 font-medium border-b">Year Built</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-2 border-b">
                    {p.year_built ?? "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 font-medium border-b">Listed</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-2 border-b">
                    {fmtDate(p.date_listed)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 font-medium border-b">Amenities</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-2 border-b">
                    <div className="flex flex-wrap gap-1">
                      {p.amenities.slice(0, 4).map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-xs"
                        >
                          {a}
                        </span>
                      ))}
                      {p.amenities.length > 4 && (
                        <span className="text-xs text-zinc-500">
                          +{p.amenities.length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
