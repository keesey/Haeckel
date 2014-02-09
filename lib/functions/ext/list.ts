///<reference path='../hash.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function list<T>(set: ExtSet<T>): T[]
	{
		if (set.size === Infinity)
		{
			throw new Error('Cannot traverse domain sets.');
		}
		if (set === null || set == undefined)
		{
			return undefined;
		}
		if (set.empty)
		{
			return [];
		}
		var l: T[] = new Array(set.size),
			i = 0,
			h: string;
		for (h in set.hashMap)
		{
			l[i++] = set.hashMap[h];
		}
		return l;
	}
}