///<reference path='create.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.rng
{
	export function add(r: Range, value: number): Range
	{
		if (!isFinite(value))
		{
			throw new Error("Not a finite number: " + value + ".");
		}
		if (r.empty)
		{
			return EMPTY_SET;
		}
		return create(r.min + value, r.max + value);
	}
}