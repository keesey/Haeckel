/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
module Haeckel.ext
{
	export function map<X, Y>(set: ExtSet<X>, f: (element: X) => Y, thisObject: any = null): ExtSet<Y>
	{
		if (set.size === Infinity)
		{
			throw new Error('Cannot traverse domain sets.');
		}
		var builder = new ExtSetBuilder<Y>(),
			h: string;
		for (h in set.hashMap)
		{
			builder.add(f.call(thisObject, set.hashMap[h]));
		}
		return builder.build();
	}
}