/// <reference path="contains.ts"/>
/// <reference path="../pt/create.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function includes(a: Rectangle, b: Rectangle): boolean
	{
		return contains(a, pt.create(b.x, b.y)) && contains(a, pt.create(b.x2, b.y2));
	}
}