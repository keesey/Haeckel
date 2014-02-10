/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function contains(r: Rectangle, p: Point): boolean
	{
		return r.x <= p.x && r.y <= p.y && r.x2 >= p.x && r.y2 >= p.y;
	}
}