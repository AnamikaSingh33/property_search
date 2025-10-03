import { useMemo } from 'react';
import type { Property } from '../types/property';
import { type Filters, applyFilters } from '../utils/filterUtils';


export function usePropertyFilter(all: Property[], f: Filters){
return useMemo(()=>applyFilters(all, f), [all, f.q, f.types.join(','), f.priceMin, f.priceMax, f.sizeMin, f.sizeMax, f.cities.join(','), f.amenities.join(','), f.sort, f.sortDir]);
}