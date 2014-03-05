/// <reference path="intersectSegment.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Ray.ts"/>
module Haeckel.ray
{
	export function intersectSegments(ray: Ray, segments: Point[][]): Point[]
	{
		var points: Point[] = [];
		for (var i = 0, n = segments.length; i < n; ++i)
		{
			points = points.concat(intersectSegment(ray, segments[i]));
		}
		return points;
	}
}