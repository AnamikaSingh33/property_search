"use client";
import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterProps> = ({ onFilterChange }) => {
  // Keep same defaults as App.tsx
  const defaultFilters = {
    search: "",
    type: "",
    priceRange: [0, 100],
    sizeRange: [0, 120000],
    location: "",
    amenities: [] as string[],
  };

  const [search, setSearch] = useState(defaultFilters.search);
  const [type, setType] = useState(defaultFilters.type);
  const [priceRange, setPriceRange] = useState<number[]>(
    defaultFilters.priceRange
  );
  const [sizeRange, setSizeRange] = useState<number[]>(
    defaultFilters.sizeRange
  );
  const [location, setLocation] = useState(defaultFilters.location);
  const [amenities, setAmenities] = useState<string[]>(
    defaultFilters.amenities
  );
  const [sortBy, setSortBy] = useState("");


  const allAmenities = ["gym", "pool", "garden", "parking", "wifi"];

  const handleAmenityChange = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  // const applyFilters = () => {
  //   const filters = { search, type, priceRange, sizeRange, location, amenities };
  //   console.log("FilterPanel: applying filters:", filters); // debug
  //   onFilterChange(filters);
  // };

  const clearFilters = () => {
    setSearch(defaultFilters.search);
    setType(defaultFilters.type);
    setPriceRange(defaultFilters.priceRange);
    setSizeRange(defaultFilters.sizeRange);
    setLocation(defaultFilters.location);
    setAmenities(defaultFilters.amenities);
    onFilterChange(defaultFilters); // send the full default shape
  };

  return (
    <aside className="w-full md:w-80 h-screen sticky top-0 overflow-y-auto bg-white shadow-lg border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg text-sm"
          placeholder="Search by name or address..."
        />
      </div>
      <div className="mb-6">
  <label className="block text-sm font-semibold">Sort By</label>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="w-full mt-2 p-3 border rounded-lg text-sm"
  >
    <option value="">None</option>
    <option value="price">Price</option>
    <option value="size">Size</option>
    <option value="date">Date Listed</option>
  </select>
</div>


      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Property Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg text-sm"
        >
          <option value="">All</option>
          <option value="office">Office</option>
          <option value="retail">Retail</option>
          <option value="industrial">Industrial</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Price Range ($/sqft)</label>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full mt-3"
        />
        <p className="text-sm text-gray-600 mt-1">
          Up to <span className="font-medium">${priceRange[1]}</span>/sqft
        </p>
      </div>

      {/* Size Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Size Range (sqft)</label>
        <input
          type="range"
          min="0"
          max="120000"
          value={sizeRange[1]}
          onChange={(e) => setSizeRange([0, Number(e.target.value)])}
          className="w-full mt-3"
        />
        <p className="text-sm text-gray-600 mt-1">
          Up to <span className="font-medium">{sizeRange[1].toLocaleString()}</span> sqft
        </p>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg text-sm"
          placeholder="Enter city..."
        />
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Amenities</label>
        <div className="flex flex-wrap gap-2 mt-3">
          {allAmenities.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => handleAmenityChange(a)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                amenities.includes(a)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={clearFilters}
          className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-400 hover:bg-gray-100"
        >
          Clear
        </button>
     <button
  onClick={() =>
    onFilterChange({
      search,
      type,
      priceRange,
      sizeRange,
      location,
      amenities,
      sortBy,  // <-- make sure you have sortBy in state
    })
  }
  className="flex-1 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
>
  Apply
</button>

      </div>
    </aside>
  );
};

export default FilterPanel;
