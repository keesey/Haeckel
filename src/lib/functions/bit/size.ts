/// <reference path="../../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function size(s: BitSet): number
	{
		var size = 0;
		for (var i = 0; i <= BIT_MEMBER_MAX; ++i)
		{
			if (s.bits & (1 << i))
			{
				size++;
			}
		}
		return size;
	}
}