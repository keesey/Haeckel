/// <reference path="createFromCoords.ts"/>
/// <reference path="overlap.ts"/>
/// <reference path="../equal.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function intersect(a: Rectangle, b: Rectangle): Rectangle
	{
		if (equal(a, b))
		{
			return a;
		}
		if (!overlap(a, b))
		{
			return EMPTY_SET;
		}
		return createFromCoords(
			Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.min(a.x2, b.x2),
            Math.min(a.y2, b.y2)
		);
	}
}