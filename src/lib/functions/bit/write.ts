/// <reference path="../../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function write(set: BitSet): any
	{
		if (set === null || set === undefined)
		{
			return undefined;
		}
		var result: number[] = [];
		if (!set.empty)
		{
			for (var i = 0; i <= BIT_MEMBER_MAX; ++i)
			{
				if (set.bits & (1 << i))
				{
					result.push(i);
				}
			}
		}
		if (result.length === 1)
		{
			return result[0];
		}
		return result;
	}
}