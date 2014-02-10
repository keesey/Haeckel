/// <reference path="create.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function createFromPoints(a: Point, b: Point): Rectangle
	{
		var x = Math.min(a.x, b.x),
			y = Math.min(a.y, b.y),
			width = Math.max(a.x, b.x) - x,
			height = Math.max(a.y, b.y) - y;
		return create(x, y, width, height);
	}
}