/// <reference path="../precisionEqual.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function equal(a: Point, b: Point): boolean
	{
		return precisionEqual(a.x, b.x) && precisionEqual(a.y, b.y);
	}
}