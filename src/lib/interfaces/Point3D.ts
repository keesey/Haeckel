///<reference path='Point.ts' />

module Haeckel
{
	export interface Point3D extends Point
	{
		z: number;
	}

	export function isPoint3D(o: Point3D)
	{
		return isPoint(o) && typeof o.z === 'number';
	}
}