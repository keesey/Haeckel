/// <reference path="createFromBits.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function union(sets: BitSet[]): BitSet
	{
		var n = sets.length;
		if (n === 0)
		{
			return null;
		}
		if (n === 1)
		{
			return sets[0];
		}
		var bits = 0;
		for (var i = 0; i < n; ++i)
		{
			bits |= sets[i].bits;
		}
		return createFromBits(bits);
	}
}