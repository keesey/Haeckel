/// <reference path="readCoords.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
module Haeckel.geo
{
	export function readRegion(data: number[][]): GeoCoords[]
	{
		var region: GeoCoords[] = [];
		for (var i = 0, n = data.length; i < n; ++i)
		{
			var coords = readCoords(data[i]);
			if (coords !== null)
			{
				region.push(coords);
			}
		}
		return region;
	}
}