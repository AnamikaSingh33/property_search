import { memo } from 'react';
import type { Property } from '../../types/property';
import { fmtDate, fmtMoneyPerSqft, fmtSqft } from '../../utils/propertyUtils';


type Props = {
p: Property;
selected: boolean;
onToggleSelect: (id:string)=>void;
view: 'grid' | 'list';
}


function Card({ p, selected, onToggleSelect, view }: Props){
return (
<div className={`rounded-xl border bg-white dark:bg-zinc-900 shadow-sm hover:shadow transition p-3 relative ${selected? 'ring-2 ring-blue-500' : ''}`}>
<label className="absolute top-2 left-2 flex items-center gap-2 text-sm">
<input type="checkbox" checked={selected} onChange={()=>onToggleSelect(p.id)} className="size-4"/>
</label>
<img src={p.images[0]} alt={p.title} className={`w-full ${view==='grid'?'h-40':'h-32'} object-cover rounded-md mb-3`} loading="lazy" />
<div className="flex items-center justify-between">
<h3 className="font-semibold line-clamp-1">{p.title}</h3>
<span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">{p.type}</span>
</div>
<div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
<div>{p.address.city}, {p.address.state}</div>
<div className="mt-1 flex gap-3">
<span>{fmtMoneyPerSqft(p.price_per_sqft)}</span>
<span>•</span>
<span>{fmtSqft(p.total_sqft)}</span>
</div>
<div className="mt-1 text-xs">Listed {fmtDate(p.date_listed)}</div>
</div>
<div className="mt-2 flex flex-wrap gap-1">
{p.amenities.slice(0,3).map(a=> <span key={a} className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{a}</span>)}
{p.amenities.length>3 && <span className="text-xs text-zinc-500">+{p.amenities.length-3}</span>}
</div>
</div>
);
}
export default memo(Card);