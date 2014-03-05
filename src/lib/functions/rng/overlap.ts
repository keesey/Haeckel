///<reference path="../../interfaces/Range.ts" />
module Haeckel.rng
{
	export function overlap(a: Range, b: Range): boolean
	{
		return !a.empty && !b.empty && !(b.min > a.max || b.max < a.min);
	}
}