///<reference path="../arr/each.ts" />
///<reference path="../../interfaces/Set.ts" />
module Haeckel
{
	export function intersector<S extends Set>(intersect: (a: S, b: S) => S, emptySet: S): (sets: S[]) => S
	{
		return function(sets: S[]): S
		{
			var result: S = undefined;
			arr.each(sets, (s: S) =>
			{
				if (s)
				{
					if (result === undefined)
					{
						result = s;
					}
					else
					{
						result = intersect(result, s);
					}
					if (result.empty)
					{
						return false;
					}
				}
			});
			return result || emptySet;
		};
	}
}