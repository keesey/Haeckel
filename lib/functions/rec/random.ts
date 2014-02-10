/// <reference path="../pt/create.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function random(r: Rectangle, random?: () => number): Point
	{
		if (!random)
		{
			random = Math.random;
		}
		return pt.create(r.x + (r.x2 - r.x) * random(), r.y + (r.y2 - r.y) * random());
	}
}