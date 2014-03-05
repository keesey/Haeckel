///<reference path='../../builders/ExtSetBuilder.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function union<T>(sets: ExtSet<T>[]): ExtSet<T>
	{
		var n = sets.length;
		if (n === 0)
		{
			return null;
		}
		if (n === 1)
		{
			return sets[0];
		}
		var builder = new ExtSetBuilder<T>();
		for (var i = 0; i < n; ++i)
		{
			var set = sets[i];
			if (set)
			{
				if (set.size === Infinity)
				{
					return set;
				}
				builder.addSet(set);
			}
		}
		return builder.build();
	}
}