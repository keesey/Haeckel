///<reference path='../../interfaces/Set.ts' />
///<reference path='../../interfaces/WeightedStates.ts' />
module Haeckel.chr
{
	export function normalizeWeights<S extends Set>(statesList: WeightedStates<S>[]): WeightedStates<S>[]
	{
		var n = statesList.length;
		if (n === 0)
		{
			return statesList;
		}
		var i: number,
			total = 0,
			weightedStates: WeightedStates<S>,
			result: WeightedStates<S>[] = new Array(n); 
		for (i = 0; i < n; ++i)
		{
			weightedStates = statesList[i];
			var weight = weightedStates.weight;
			if (isFinite(weight))
			{
				total += weight;
			}
			result[i] = {states: weightedStates.states, weight: weight};
		}
		var noWeights = total === 0 || !isFinite(weightedStates.weight);
        for (i = 0; i < n; ++i)
		{
			weightedStates = result[i];
			if (noWeights)
			{
				weightedStates.weight = 0;
			}
			else
			{
				weightedStates.weight /= total;
			}
			Object.freeze(weightedStates);
		}
		return Object.freeze(result);
	}
}