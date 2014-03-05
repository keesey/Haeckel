/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.rng
{
	export function prIncludes(superset: Range, subset: Range): boolean
	{
		if (subset.empty)
		{
			return !superset.empty;
		}
		if (superset.empty || equal(superset, subset))
		{
			return false;
		}
		return (subset.min >= superset.min && subset.max <= superset.max);
	}
}