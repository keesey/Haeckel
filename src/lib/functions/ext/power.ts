/// <reference path="create.ts"/>
/// <reference path="list.ts"/>
/// <reference path="union.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
module Haeckel.ext
{
	function powerList<T>(l: T[]): ExtSet<ExtSet<T>>
	{
		var builder = new ExtSetBuilder<ExtSet<T>>(),
			n = l.length;
		if (n === 0)
		{
			builder.add(EMPTY_SET);
		}
		else
		{
			var first = ext.create<T>([ l[0] ]);
			if (n === 1)
			{
				builder.add(EMPTY_SET);
				builder.add(first);
			}
			else
			{
				ext.each(powerList(l.slice(1, n)), (s: ExtSet<T>) =>
				{
					builder.add(s);
					builder.add(ext.union<T>([ first, s ]));
				});
			}
		}
		return builder.build();
	}

	export function power<T>(s: ExtSet<T>): ExtSet<ExtSet<T>>
	{
		return powerList(list(s));
	}
}