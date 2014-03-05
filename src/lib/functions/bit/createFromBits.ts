/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function createFromBits(bits: number): BitSet
	{
		if (bits === 0)
		{
			return EMPTY_SET;
		}
		return Object.freeze({
			bits: bits,
			empty: false,
			hash: "{bits:" + bits.toString(16) + "}"
		});
	}
}