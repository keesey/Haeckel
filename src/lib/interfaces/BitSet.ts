///<reference path='Set.ts' />

module Haeckel
{
	export interface BitSet extends Set
	{
		bits: number;
	}

	export function isBitSet(o: BitSet)
	{
		return isSet(o) && typeof o.bits === "number";
	}
}