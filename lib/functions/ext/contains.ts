///<reference path='../hash.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function contains<T>(set: ExtSet<T>, element: T): boolean
	{
		if (set.size === Infinity)
		{
			return true;
		}
		return set.hashMap[hash(element)] !== undefined;
	}
}