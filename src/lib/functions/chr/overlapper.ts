///<reference path="../arr/each.ts" />
///<reference path="../../interfaces/Set.ts" />
module Haeckel
{
	export function overlapper<S extends Set>(intersect: (a: S, b: S) => S): (a: S, b: S) => boolean
	{
		return function(a: S, b: S): boolean
		{
			if (a === null || b === null)
			{
				return null;
			}
			return !intersect(a, b).empty;
		};
	}
}