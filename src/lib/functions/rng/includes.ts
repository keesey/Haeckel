/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.rng
{
	export function includes(superset: Range, subset: Range): boolean
	{
		if (subset.empty)
		{
			return true;
		}
		if (superset.empty)
		{
			return false;
		}
		return subset.min >= superset.min && subset.max <= superset.max;
	}
}