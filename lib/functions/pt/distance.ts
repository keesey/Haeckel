/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function distance(a: Point, b: Point): number
	{
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	}
}