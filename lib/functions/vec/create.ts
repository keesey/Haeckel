/// <reference path="../trg/normalize.ts"/>
/// <reference path="../../interfaces/Vector.ts"/>
module Haeckel.vec
{
	export function create(radians: number, distance: number): Vector
	{
		radians = trg.normalize(radians);
        if (isNaN(distance))
		{
            distance = 0;
		}
		return Object.freeze({
			angle: radians,
			distance: distance,
			hash: "(" + String(radians) + "->" + String(distance) + ")"
		});
	}
}