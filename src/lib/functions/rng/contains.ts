/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.rng
{
	export function contains(r: Range, n: number): boolean
	{
		if (r.empty)
		{
			return false;
		}
		return n >= r.min && n <= r.max;
	}
}