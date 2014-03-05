///<reference path='create.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.rng
{
	export function combine(ranges: Range[]): Range
	{
		var min = NaN,
			max = NaN,
			n = ranges.length;
		for (var i = 0; i < n; ++i)
		{
			var r = ranges[i];
			if (!r)
			{
				continue;
			}
			if (isNaN(min) || r.min < min)
			{
				min = r.min;
			}
			if (isNaN(max) || r.max > max)
			{
				max = r.max;
			}
		}
		if (isNaN(min))
		{
			return null;
		}
		return create(min, max);
	}
}