/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
module Haeckel.ext
{
	export function where<T>(set: ExtSet<T>, f: (element: T) => boolean, thisObject: any = null): ExtSet<T>
	{
		if (set.size === Infinity)
		{
			throw new Error('Cannot traverse domain sets.');
		}
		var builder = new ExtSetBuilder<T>();
		for (var h in set.hashMap)
		{
			var element = set.hashMap[h];
			if (f.call(thisObject, element))
			{
				builder.add(element);
			}
		}
		return builder.build();
	}
}