/// <reference path="../precisionEqual.ts"/>
/// <reference path="../pt/angle.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Ray.ts"/>
module Haeckel.ray
{
	export function contains(ray: Ray, p: Point): boolean
	{
		if (isNaN(p.x) || isNaN(p.y) || ray.empty)
		{
			return false;
		}
		return precisionEqual(ray.angle, pt.angle(ray.origin, p));
	}
}