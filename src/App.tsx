import  { useState, useMemo } from "react";
import rawData from "./data/properties.json";
import PropertyGrid from "./Components/PropertyGrid/PropertyGrid";
import FilterPanel from "./Components/FilterPanel/FilterPanel";
import type { Property } from "./types/property";
import ComparisonBar from "./Components/ComparisonBar/ComparisonBar";
import ComparisonModal from "./Components/ComparisonModal/ComparisonModal";

// Normalize dataset
const propertiesData: Property[] = rawData.map((p) => ({
  ...p,
  type: p.type as Property["type"], // cast string → union type
}));

function App() {
  // Filters
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    priceRange: [0, 1000],
    sizeRange: [0, 100000],
    location: "",
    amenities: [] as string[],
    sortBy: "",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  // Comparison modal state
  const [showCompare, setShowCompare] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Filtering logic
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((p: Property) => {
      let matches = true;

      if (
        filters.search &&
        !p.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        matches = false;
      }
      if (filters.type && p.type !== filters.type) {
        matches = false;
      }
      if (
        filters.priceRange &&
        (p.price_per_sqft < filters.priceRange[0] ||
          p.price_per_sqft > filters.priceRange[1])
      ) {
        matches = false;
      }
      if (
        filters.sizeRange &&
        (p.total_sqft < filters.sizeRange[0] ||
          p.total_sqft > filters.sizeRange[1])
      ) {
        matches = false;
      }
      if (
        filters.location &&
        !p.address.city.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        matches = false;
      }
      if (
        filters.amenities?.length > 0 &&
        !filters.amenities.every((a: string) => p.amenities.includes(a))
      ) {
        matches = false;
      }

      return matches;
    });
  }, [filters]);

  // Sorting
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];
    if (filters.sortBy === "price") {
      sorted.sort((a, b) => a.price_per_sqft - b.price_per_sqft);
    } else if (filters.sortBy === "size") {
      sorted.sort((a, b) => a.total_sqft - b.total_sqft);
    } else if (filters.sortBy === "date") {
      sorted.sort(
        (a, b) =>
          new Date(b.date_listed).getTime() - new Date(a.date_listed).getTime()
      );
    }
    return sorted;
  }, [filteredProperties, filters.sortBy]);

  // Pagination
  const paginatedProperties = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedProperties.slice(start, start + itemsPerPage);
  }, [sortedProperties, page]);

  // Toggle selection
  const onToggleSelect = (id: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Get selected property objects
  const selectedProps = sortedProperties.filter((p) => selected.has(p.id));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row gap-6 p-6">
      <FilterPanel onFilterChange={setFilters} />

      <div className="flex-1">
        <PropertyGrid
          items={paginatedProperties}
          selected={selected}
          onToggleSelect={onToggleSelect}
          view="grid"
        />

        {/* Pagination controls */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1">Page {page}</span>
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() =>
              setPage((p) =>
                sortedProperties.length > p * itemsPerPage ? p + 1 : p
              )
            }
            disabled={sortedProperties.length <= page * itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>

      {/* Comparison Bar + Modal */}
      <ComparisonBar
        selected={selectedProps}
        onCompare={() => setShowCompare(true)}
      />

      {showCompare && (
        <ComparisonModal
          properties={selectedProps}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}

export default App;
