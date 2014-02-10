/// <reference path="../equal.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function overlap(a: Rectangle, b: Rectangle): boolean
	{
		if (equal(a, b))
		{
			return true;
		}
        return !(a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top);
	}
}