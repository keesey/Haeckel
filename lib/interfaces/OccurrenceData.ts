///<reference path='GeoData.ts' />
module Haeckel
{
	export interface OccurrenceData
	{
		count?: any; // number or number[]
		geo?: GeoData;
		time?: any; // number or number[]
	}
}