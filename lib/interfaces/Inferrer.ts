///<reference path='Set.ts' />
///<reference path='WeightedStates.ts' />

module Haeckel
{
	export interface Inferrer<S extends Set>
	{
		average: (statesList: WeightedStates<S>[]) => S;
	}

	export function isInferrer(o: any)
	{
		return typeof o === "object" && typeof o.average === "function";
	}
}