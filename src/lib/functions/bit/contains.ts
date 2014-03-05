/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function contains(s: BitSet, n: number): boolean
	{
		return (s.bits & (1 << n)) !== 0;
	}
}