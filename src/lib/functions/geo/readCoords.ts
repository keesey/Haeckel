/// <reference path="createCoords.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
module Haeckel.geo
{
	export function readCoords(data: number[]): GeoCoords
	{
		if (data.length >= 2)
		{
			return createCoords(data[0], data[1]);
		}
		return null;
	}
}