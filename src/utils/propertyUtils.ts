import type { Property } from "../types/property";


export function fmtMoneyPerSqft(v:number){
return `$${v.toLocaleString(undefined,{maximumFractionDigits:0})}/sqft`;
}
export function fmtSqft(v:number){
return `${v.toLocaleString()} sqft`;
}
export function fmtDate(iso:string){
const d = new Date(iso); return d.toLocaleDateString();
}


export function compareIndicator(a:number, b:number, betterIsLower:boolean){
if (a === b) return 'equal';
const better = betterIsLower ? a < b : a > b;
return better ? 'better' : 'worse';
}


export function cityList(data: Property[]): string[] {
return Array.from(new Set(data.map(p => p.address.city))).sort();
}


export function amenityList(data: Property[]): string[] {
const s = new Set<string>();
for (const p of data) for (const a of p.amenities) s.add(a);
return Array.from(s).sort();
}