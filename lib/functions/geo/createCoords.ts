/// <reference path="../../interfaces/GeoCoords.ts"/>
module Haeckel.geo
{
	export function createCoords(lat: number, lon: number): GeoCoords
	{
		if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90)
		{
			throw new Error("Invalid coordinates: " + String(lat) + ", " + String(lon) + ".");
		}
		while (lon <= -180)
		{
			lon += 360;
		}
		while (lon > 180)
		{
			lon -= 360;
		}
		return Object.freeze({
			hash: "(geo:" + lat + ":" + lon + ")",
			lat: lat,
			lon: lon
		});
	}
}