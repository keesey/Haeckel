/// <reference path="create.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function add(a: Point, b: Point)
	{
		return create(a.x + b.x, a.y + b.y);
	}
}