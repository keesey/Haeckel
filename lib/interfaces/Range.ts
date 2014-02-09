///<reference path='Set.ts' />

module Haeckel
{
	export interface Range extends Set
	{
		max: number;
		mean: number;
		min: number;
		size: number;
	}

	export function isRange(o: Range)
	{
		return isSet(o) && typeof o.max === "number" && typeof o.min === "number" && typeof o.mean === "number" && typeof o.size === "number";
	}
}