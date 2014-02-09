/// <reference path="intersect.ts"/>
/// <reference path="size.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../constants/RANGE_0.ts"/>
/// <reference path="../../constants/RANGE_0_TO_1.ts"/>
/// <reference path="../../constants/RANGE_1.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.bit
{

	export function distance(a: BitSet, b: BitSet): Range
	{
		if (a === null || b === null)
		{
			return EMPTY_SET;
		}
		if (a.bits === b.bits)
		{
			return size(a) === 1 ? RANGE_0 : RANGE_0_TO_1;
		}
		return intersect(a, b).empty ? RANGE_1 : RANGE_0_TO_1;
	}
}