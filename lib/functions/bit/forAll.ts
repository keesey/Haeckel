/// <reference path="../../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function forAll(s: BitSet, f: (value: number) => boolean, thisObject: any = null): boolean
	{
		for (var i = 0; i <= BIT_MEMBER_MAX; ++i)
		{
			if ((s.bits & (1 << i)) !== 0)
			{
				if (!f.call(thisObject, i))
				{
					return false;
				}
			}
		}
		return true;
	}
}