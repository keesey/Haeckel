/// <reference path="../trg/normalize.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Ray.ts"/>
module Haeckel.ray
{
	export function create(origin: Point, angle: number): Ray
	{
		if (!isPoint(origin) || isNaN(origin.x) || isNaN(origin.y) || isNaN(angle))
		{
			return EMPTY_SET;
		}
		angle = trg.normalize(angle);
		return Object.freeze({
			angle: angle,
			hash: "(" + origin.hash + "->" + angle + ")",
			origin: origin
		});
	}
}