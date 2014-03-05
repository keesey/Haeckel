/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.rng
{
	export function compare(a: Range, b: Range): number
	{
		if (a.empty)
		{
			return b.empty ? NaN : -1;
		}
		if (b.empty)
		{
			return 1;
		}
		return a.mean - b.mean;
	}
}