/// <reference path="contains.ts"/>
/// <reference path="../pt/create.ts"/>
/// <reference path="../../constants/PRECISION.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
/// <reference path="../../interfaces/Ray.ts"/>
module Haeckel.ray
{
	export function intersectSegment(ray: Ray, segment: Point[]): Point[]
	{
		if (!(segment.length >= 2))
		{
			throw new Error("Not a line segment: " + segment + '.');
		}
		if (ray.empty)
		{
			return [];
		}
		if (contains(ray, segment[0]))
		{
			if (contains(ray, segment[1]))
			{
				return segment;
			}
			return [ segment[0] ];
		}
		else if (contains(ray, segment[1]))
		{
			return [ segment[1] ];
		}
		var x0 = segment[0].x,
			x1 = segment[1].x,
			y0 = segment[0].y,
			y1 = segment[1].y,
			a1 = Math.sin(ray.angle),
			b1 = -Math.cos(ray.angle),
			c1 = a1 * ray.origin.x + b1 * ray.origin.y,
			a2 = y1 - y0,
			b2 = x0 - x1,
			c2 = a2 * x0 + b2 * y0,
			det = a1 * b2 - a2 * b1;
		if (Math.round(det * PRECISION) / PRECISION === 0)
		{
			return [];
		}
		var point = pt.create((b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det);
		if (point.x >= Math.min(x0, x1) - 1 / PRECISION
			&& point.x <= Math.max(x0, x1) + 1 / PRECISION
			&& point.y >= Math.min(y0, y1) - 1 / PRECISION
			&& point.y <= Math.max(y0, y1) + 1 / PRECISION
			&& contains(ray, point))
		{
			return [ point ];
		}
		return [];
	}
}