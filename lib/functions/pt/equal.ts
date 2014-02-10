/// <reference path="../../constants/PRECISION.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	function precisionEqual(a: number, b: number): boolean
	{
		return Math.round(a * PRECISION) / PRECISION === Math.round(b * PRECISION) / PRECISION;
	}

	export function equal(a: Point, b: Point): boolean
	{
		return precisionEqual(a.x, b.x) && precisionEqual(a.y, b.y);
	}
}