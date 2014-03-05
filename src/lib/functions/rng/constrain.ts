/// <reference path="create.ts"/>
/// <reference path="../equal.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.rng
{
	export function constrain(original: Range, constraint: Range): Range
	{
		if (constraint.empty || original.empty)
		{
			return EMPTY_SET;
		}
		if (equal(original, constraint))
		{
			return original;
		}
		var min = Math.max(constraint.min, original.min),
			max = Math.min(constraint.max, original.max);
		if (max < min)
		{
			return EMPTY_SET;
		}
		return create(min, max);
	}
}