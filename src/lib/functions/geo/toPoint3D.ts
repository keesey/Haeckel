/// <reference path="../../constants/DEG_TO_RAD.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
/// <reference path="../../interfaces/Point3D.ts"/>
module Haeckel.geo
{
	export function toPoint3D(coords: GeoCoords, radius: number = 1): Point3D
	{
		var lat = coords.lat * DEG_TO_RAD,
			lon = coords.lon * DEG_TO_RAD,
			cosLat = Math.cos(lat);
		if (radius === 1)
		{
			return pt.create3D(cosLat * Math.cos(lon), cosLat * Math.sin(lon), Math.sin(lat));
		}
		cosLat *= radius;
		return pt.create3D(cosLat * Math.cos(lon), cosLat * Math.sin(lon), Math.sin(lat) * radius);
	}
}