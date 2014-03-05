///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function each<T>(set: ExtSet<T>, f: (element: T) => any, thisObject: any = null)
	{
		if (set.size === Infinity)
		{
			throw new Error('Cannot traverse domain sets.');
		}
		for (var h in set.hashMap)
		{
			if (f.call(thisObject, set.hashMap[h]) === false)
			{
				return;
			}
		}
	}
}