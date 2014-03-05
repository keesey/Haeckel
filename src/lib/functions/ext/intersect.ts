///<reference path='contains.ts' />
///<reference path='each.ts' />
///<reference path='../equal.ts' />
///<reference path='../../builders/ExtSetBuilder.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function intersect<T>(a: ExtSet<T>, b: ExtSet<T>): ExtSet<T>
	{
		if (a.empty || b.empty)
		{
			return EMPTY_SET;
		}
		if (equal(a, b))
		{
			return a;
		}
		if (a.size === Infinity)
		{
			return a;
		}
		if (b.size === Infinity)
		{
			return b;
		}
		var builder = new ExtSetBuilder<T>();
		if (a.size <= b.size)
		{
			each(a, function(element: T)
			{
				if (contains(b, element))
				{
					builder.add(element);
				}
			});
		}
		else
		{
			each(b, function(element: T)
			{
				if (contains(a, element))
				{
					builder.add(element);
				}
			});
		}
		return builder.build();
	}
}