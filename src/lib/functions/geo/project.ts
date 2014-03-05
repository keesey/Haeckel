/// <reference path="../ext/each.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.geo
{
	export function project(regions: ExtSet<GeoCoords[]>, projector: (coords: GeoCoords) => Point): Point[][]
	{
		var shapes: Point[][] = [];
		ext.each(regions, (region: GeoCoords[]) =>
		{
			var shape: Point[] = [];
			arr.each(region, (coords: GeoCoords) => shape.push(projector(coords)));
			shapes.push(shape);
		});
		return shapes;
	}
}