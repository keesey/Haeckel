///<reference path='Model.ts' />

module Haeckel
{
	export interface GeoCoords extends Model
	{
		lat: number;
		lon: number;
	}

	export function isGeoCoords(o: GeoCoords)
	{
		return isModel(o) && typeof(o.lat) === "number" && typeof(o.lon) === "number";
	}
}
