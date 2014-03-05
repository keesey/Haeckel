/// <reference path="area.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function weight(shape: Point[], area: number = NaN): number
	{
		switch (shape.length)
		{
			case 0:
			{
				return 0;
			}
			case 1:
			{
				return 1;
			}
			case 2:
			{
				var a = shape[0],
					b = shape[1],
					x = a.x - b.x,
					y = a.y - b.y;
				return Math.sqrt(x * x + y * y);
			}
			default:
			{
				if (isNaN(area))
				{
					return pt.area(shape);
				}
				return area;
			}
		}
	}
}