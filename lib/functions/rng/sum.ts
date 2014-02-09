///<reference path='create.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.rng
{
	export function sum(ranges: Range[]): Range
	{
		var min: number = NaN,
			max: number = NaN;
		for (var i = 0, n = ranges.length; i < n; ++i)
		{
			var r = ranges[i];
			if (r.empty)
			{
				continue;
			}
			if (isNaN(min))
			{
				min = r.min;
			}
			else
			{
				min += r.min;
			}
			if (isNaN(max))
			{
				max = r.max;
			}
			else
			{
				max += r.max;
			}
		}
		return create(min, max);
	}
}