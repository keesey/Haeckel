/// <reference path="createCoords.ts"/>
/// <reference path="toPoint3D.ts"/>
/// <reference path="../ext/each.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
module Haeckel.geo
{
	export function center(regions: ExtSet<GeoCoords[]>): GeoCoords;
	export function center(region: GeoCoords[]): GeoCoords;
	export function center(r: any): GeoCoords
	{
		function processList(coordsList: GeoCoords[])
		{
			for (var i = 0, n2 = coordsList.length; i < n2; ++i)
			{
				var p3 = toPoint3D(coordsList[i]);
				x += p3.x;
				y += p3.y;
				z += p3.z;
			}
			n += n2;
		}

		var x = 0,
			y = 0,
			z = 0,
			n = 0;
		if (isExtSet(r))
		{
			ext.each(<ExtSet<GeoCoords[]>> r, processList);
		}
		else if (Array.isArray(r))
		{
			processList(<GeoCoords[]> r);
		}
		if (n === 0)
		{
			return null;
		}
		x /= n;
		y /= n;
		z /= n;
		var lon = Math.atan2(y, x),
			lat = Math.atan2(z, Math.sqrt(x * x + y * y));
		return createCoords(lat * 180 / Math.PI, lon * 180 / Math.PI);
	}
}