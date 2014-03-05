/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function contains(shape: Point[], p: Point): boolean
	{
		var c = false,
			n = shape.length,
			i = 0,
			j = n - 1;
		for ( ; i < n; j = i++)
		{
			var a = shape[i],
				b = shape[j];
			if ((a.y >= p.y) != (b.y >= p.y) &&
				p.x <= (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)
			{
				c = !c;
			}
		}
		return c;
	}
}