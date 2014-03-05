///<reference path='Set.ts' />

module Haeckel
{
	export interface WeightedStates<S extends Set>
	{
		states: S;
		weight: number;
	}

	export function isWeightedStates(o: any)
	{
		return typeof o === "object" && (o.states === null || isSet(o.states)) && typeof o.weight === "number";
	}
}