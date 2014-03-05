/// <reference path="../../interfaces/ExtSet.ts"/>
module Haeckel.ext
{
	export function forSome<T>(set: ExtSet<T>, f: (element: T) => boolean, thisObject: any = null): boolean
	{
		if (set.size === Infinity)
		{
			throw new Error('Cannot traverse domain sets.');
		}
		for (var h in set.hashMap)
		{
			if (f.call(thisObject, set.hashMap[h]))
			{
				return true;
			}
		}
		return false;
	}
}