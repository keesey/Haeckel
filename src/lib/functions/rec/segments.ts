/// <reference path="../pt/create.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function segments(rects: Rectangle[]): Point[][]
	{
		var segments: Point[][] = [];
		for (var i = 0, n = rects.length; i < n; ++i)
		{
			var rect = rects[i];
			if (!rect.empty)
			{
				segments.push([ pt.create(rect.x, rect.y), pt.create(rect.x2, rect.y) ]);
				segments.push([ pt.create(rect.x2, rect.y), pt.create(rect.x2, rect.y2) ]);
				segments.push([ pt.create(rect.x2, rect.y2), pt.create(rect.x, rect.y2) ]);
				segments.push([ pt.create(rect.x, rect.y2), pt.create(rect.x, rect.y) ]);
			}
		}
		return segments;
	}
}