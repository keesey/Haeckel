///<reference path="create.ts" />
///<reference path="overlap.ts" />
///<reference path="../../constants/EMPTY_SET.ts" />
///<reference path="../../interfaces/Range.ts" />
module Haeckel.rng
{
	export function intersect(a: Range, b: Range): Range
	{
		if (!a || !b || !overlap(a, b))
		{
			return EMPTY_SET;
		}
		if (a.hash === b.hash)
		{
			return a;
		}
		return create(Math.max(a.min, b.min), Math.min(a.max, b.max));
	}
}