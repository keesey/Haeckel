/// <reference path="createFromBits.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function intersect(a: BitSet, b: BitSet): BitSet
	{
		return createFromBits(a.bits & b.bits);
	}
}