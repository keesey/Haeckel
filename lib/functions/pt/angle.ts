/// <reference path="../trg/normalize.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function angle(a: Point, b: Point)
	{
		return trg.normalize(Math.atan2(b.y - a.y, b.x - a.x));
	}
}