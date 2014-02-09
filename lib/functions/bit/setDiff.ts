/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function setDiff(minuend: BitSet, subtrahend: BitSet): BitSet
	{
		return createFromBits((minuend.bits ^ subtrahend.bits) & minuend.bits);
	}
}