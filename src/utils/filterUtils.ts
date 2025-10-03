import type { Property, PropertyType } from "../types/property";

export interface Filters {
  q: string;
  types: PropertyType[];
  cities: string[];
  amenities: string[];
  sort: 'price' | 'size' | 'date';
  sortDir: 'asc' | 'desc';
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
}

export const defaultFilters: Filters = {
  q: '',
  types: [],
  cities: [],
  amenities: [],
  sort: 'date',
  sortDir: 'desc',
};

export function applyFilters(input: Property[], f: Filters): Property[] {
  let out = input;

  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      `${p.address.city}, ${p.address.state}`.toLowerCase().includes(q)
    );
  }

  if (f.types.length) out = out.filter(p => f.types.includes(p.type));

if (f.priceMin != null) {
  const min = f.priceMin;
  out = out.filter(p => p.price_per_sqft >= min);
}

if (f.priceMax != null) {
  const max = f.priceMax;
  out = out.filter(p => p.price_per_sqft <= max);
}

if (f.sizeMin != null) {
  const min = f.sizeMin;
  out = out.filter(p => p.total_sqft >= min);
}

if (f.sizeMax != null) {
  const max = f.sizeMax;
  out = out.filter(p => p.total_sqft <= max);
}


  if (f.cities.length) out = out.filter(p => f.cities.includes(p.address.city));
  if (f.amenities.length) out = out.filter(p => f.amenities.every(a => p.amenities.includes(a)));

  out = [...out].sort((a, b) => {
    switch (f.sort) {
      case 'price':
        return cmp(a.price_per_sqft, b.price_per_sqft, f.sortDir);
      case 'size':
        return cmp(a.total_sqft, b.total_sqft, f.sortDir);
      case 'date':
        return cmp(Date.parse(a.date_listed), Date.parse(b.date_listed), f.sortDir);
      default:
        return 0; // ✅ ensures all cases return
    }
  });

  return out;
}

function cmp(a: number, b: number, dir: 'asc' | 'desc') {
  return dir === 'asc' ? a - b : b - a;
}
