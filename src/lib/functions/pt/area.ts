/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function area(shape: Point[]): number
	{
		var n = shape.length;
		if (n <= 2)
		{
			return 0;
		}
		var area = 0,
			a = shape[n - 1];
		for (var i = 0; i < n; ++i)
		{
			var b = shape[i];
			area += (b.x - a.x) * (a.y + b.y) / 2;
			a = b;
		}
		return Math.abs(area);
	}
}