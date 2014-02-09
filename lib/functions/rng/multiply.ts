///<reference path="create.ts" />
///<reference path="../../constants/EMPTY_SET.ts" />
///<reference path="../../interfaces/Range.ts" />
module Haeckel.rng
{
	export function multiply(r: Range, factor: number): Range
	{
		if (!isFinite(factor))
		{
			throw new Error("Not a finite number: " + factor + ".");
		}
		if (r.empty)
		{
			return EMPTY_SET;
		}
		if (factor < 0)
		{
			return create(r.max * factor, r.min * factor);
		}
		return create(r.min * factor, r.max * factor);
	}
}