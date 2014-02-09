///<reference path='intersect.ts' />
///<reference path='../equal.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../constants/RANGE_0.ts' />
///<reference path='../../constants/RANGE_0_TO_1.ts' />
///<reference path='../../constants/RANGE_1.ts' />
///<reference path='../../interfaces/ExtSet.ts' />
///<reference path='../../interfaces/Range.ts' />
module Haeckel.ext
{
	export function distance<T>(a: ExtSet<T>, b: ExtSet<T>): Range
	{
		if (a === null || b === null)
		{
			return EMPTY_SET;
		}
		if (equal(a, b) || a.size === Infinity || b.size === Infinity)
		{
			return a.size === 1 ? RANGE_0 : RANGE_0_TO_1;
		}
		return intersect(a, b).empty ? RANGE_1 : RANGE_0_TO_1;
	}
}