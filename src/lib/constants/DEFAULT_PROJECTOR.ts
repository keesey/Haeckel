/// <reference path="../functions/pt/create.ts"/>
/// <reference path="../interfaces/GeoCoords.ts"/>
/// <reference path="../interfaces/Point.ts"/>
module Haeckel
{
	export function DEFAULT_PROJECTOR(coords: GeoCoords): Point
	{
		return pt.create((coords.lon + 180) / 360, (90 - coords.lat) / 180);
	}
}