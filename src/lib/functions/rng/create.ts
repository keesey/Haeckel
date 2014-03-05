///<reference path='../../constants/PRECISION.ts' />
///<reference path='../../constants/RANGE_0.ts' />
///<reference path='../../constants/RANGE_0_TO_1.ts' />
///<reference path='../../constants/RANGE_1.ts' />
///<reference path='../../constants/RANGE_INF.ts' />
///<reference path='../../constants/RANGE_NEG_INF.ts' />
///<reference path='../../constants/RANGE_POS_INF.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.rng
{
	export function create(min: number, max: number = NaN): Range
	{
		if (isNaN(min))
		{
			return EMPTY_SET;
		}
		if (max === Infinity)
		{
			if (min === 0)
			{
				return RANGE_POS_INF;
			}
			if (min === -Infinity)
			{
				return RANGE_INF;
			}
		}
		else if (min === -Infinity && max === 0)
		{
			return RANGE_NEG_INF;
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
		if (min === 0)
		{
			if (max === 1)
			{
				return RANGE_0_TO_1;
			}
			if (max === 0)
			{
				return RANGE_0;
			}
		}
		else if (min === 1 && max === 1)
		{
			return RANGE_1;
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