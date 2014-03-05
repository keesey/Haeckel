/// <reference path="../pt/create.ts"/>
/// <reference path="../../interfaces/Vector.ts"/>
module Haeckel.vec
{
	export function point(v: Vector)
	{
		return pt.create(Math.cos(v.angle) * v.distance, Math.sin(v.angle) * v.distance);
	}
}