///<reference path='Point.ts' />
///<reference path='Set.ts' />

module Haeckel
{
	export interface Ray extends Set
	{
		angle: number;
		origin: Point;
	}

	export function isRay(o: any)
	{
		return isSet(o) && typeof o.angle === "number" && isPoint(o.origin);
	}
}