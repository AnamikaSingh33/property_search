import type { Property } from '../../types/property';
import PropertyCard from '../PropertyCard/PropertyCard';


interface Props {
    items: Property[];
    selected: Set<string>;
    onToggleSelect: (id: string) => void;
    view: 'grid' | 'list';
}


export default function PropertyGrid({ items, selected, onToggleSelect, view }: Props) {
    if (view === 'list') {
        // Simple list (virtualization is handled in ListView component below if needed)
        return (
            <div className="space-y-3">
                {items.map(p => (
                    <PropertyCard key={p.id} p={p} selected={selected.has(p.id)} onToggleSelect={onToggleSelect} view="list" />
                ))}
            </div>
        );
    }
    // Grid view with responsive columns
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map(p => (
                <PropertyCard key={p.id} p={p} selected={selected.has(p.id)} onToggleSelect={onToggleSelect} view="grid" />
            ))}
        </div>
    );
}