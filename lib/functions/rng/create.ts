///<reference path='../../constants/PRECISION.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.rng
{
	export function create(min: number, max: number = NaN): Range
	{
		if (isNaN(min))
		{
			return EMPTY_SET;
		}
		min = Math.round(min * PRECISION) / PRECISION;
		if (isNaN(max))
		{
			max = min;
		}
		else
		{
			max = Math.round(max * PRECISION) / PRECISION;
		}
		if (!(min <= max))
		{
			throw new Error(String(min) + " is not less than or equal to " + String(max) + ".");
		}
		return Object.freeze({
			empty: false,
			hash: "[" + min + "..." + max + "]",
			max: max,
			mean: (max + min) / 2,
			min: min,
			size: max - min
		});
	}
}