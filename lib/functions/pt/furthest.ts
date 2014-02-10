/// <reference path="distance.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function furthest(source: Point, points: Point[]): Point
	{
		var n = points.length;
		if (n === 0)
		{
			return null;
		}
		if (n === 1)
		{
			return points[0];
		}
		var result = points[0],
			resultDistance = distance(source, result),
			i = 1;
		while (i < n)
		{
			var p = points[i++],
				d = distance(source, p);
			if (resultDistance < d)
			{
				result = p;
				resultDistance = d;
			}
		}
		return result;
	}
}