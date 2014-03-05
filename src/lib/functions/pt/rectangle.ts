/// <reference path="../rec/createFromCoords.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.pt
{
	export function rectangle(shape: Point[]): Rectangle
	{
		var n = shape.length;
		if (n === 0)
		{
			return EMPTY_SET;
		}
		var p = shape[0],
			x = p.x,
			y = p.y,
			x2 = x,
			y2 = y;
		for (var i = 1, n = shape.length; i < n; ++i)
		{
			p = shape[i];
			x = Math.min(x, p.x);
			y = Math.min(y, p.y);
			x2 = Math.max(x2, p.x);
			y2 = Math.max(y2, p.y);
		}
		return rec.createFromCoords(x, y, x2, y2);
	}
}