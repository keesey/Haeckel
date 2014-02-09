///<reference path="../arr/each.ts" />
///<reference path="../../interfaces/Set.ts" />
module Haeckel
{
	export function combiner<S extends Set>(union: (sets: S[]) => S): (sets: S[]) => S
	{
		return function(sets: S[]): S
		{
			var notNull: S[] = [];
			arr.each(sets, (s: S) =>
			{
				if (s)
				{
					notNull.push(s);
				}
			});
			return union(notNull);
		};
	}
}