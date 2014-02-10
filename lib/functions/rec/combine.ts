/// <reference path="createFromCoords.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function combine(rectangles: Rectangle[]): Rectangle
	{
		var n = rectangles.length; 
		if (n === 0)
		{
			return EMPTY_SET;
		}
		if (n === 1)
		{
			return rectangles[0];
		}
		var x = NaN,
			y = NaN,
			x2 = NaN,
			y2 = NaN;
		for (var i = 0; i < n; ++i)
		{
			var r = rectangles[i];
			if (!r.empty)
			{
				x = isNaN(x) ? r.x : Math.min(x, r.x);
				y = isNaN(y) ? r.y : Math.min(y, r.y);
				x2 = isNaN(x2) ? r.x2 : Math.max(x2, r.x2);
				y2 = isNaN(y2) ? r.y2 : Math.max(y2, r.y2);
			}
		}
		if (isNaN(x) || isNaN(y) || isNaN(x2) || isNaN(y2))
		{
			return EMPTY_SET;
		}
		return createFromCoords(x, y, x2, y2);
	}
}