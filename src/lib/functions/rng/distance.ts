///<reference path="overlap.ts" />
///<reference path="../equal.ts" />
///<reference path="../../constants/EMPTY_SET.ts" />
///<reference path="../../interfaces/Range.ts" />
module Haeckel.rng
{
	export function distance(a: Range, b: Range): Range
	{
		if (a === null || b === null)
		{
			return EMPTY_SET;
		}
		if (a.empty || b.empty)
		{
			return EMPTY_SET;
		}
		if (equal(a, b))
		{
			return create(0, a.size);
		}
		var minToMax = Math.abs(a.min - b.max),
			maxToMin = Math.abs(a.max - b.min);
		if (overlap(a, b))
		{
			return create(0, Math.max(maxToMin, minToMax));
		}
		return create(Math.min(maxToMin, minToMax), Math.max(maxToMin, minToMax));
	}
}