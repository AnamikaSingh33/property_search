import React from "react";
import type { Property } from "../../types/property";


interface ComparisonBarProps {
  selected: Property[];
  onCompare: () => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ selected, onCompare }) => {
if (selected.length < 2) return null; // don’t render if no properties

  return (
    <div className="fixed bottom-6 right-6">
        <span>{selected.length} selected</span>
      <button
        onClick={onCompare}
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Compare 
      </button>
    </div>
  );
};

export default ComparisonBar;
