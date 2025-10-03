export interface Address {
street: string;
city: string;
state: string;
zip: string;
}


export type PropertyType = 'office' | 'retail' | 'industrial' | 'warehouse';


export interface Property {
id: string;
title: string;
type: PropertyType;
price_per_sqft: number;
total_sqft: number;
address: Address;
images: string[];
amenities: string[];
date_listed: string; // ISO
year_built?: number;
description: string;
}
export type SelectedPropertyIds = string[];