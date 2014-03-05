/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function prIncludes(superset: BitSet, subset: BitSet): boolean
	{
		return superset.bits !== subset.bits
			&& (superset.bits & subset.bits) === subset.bits;
	}
}