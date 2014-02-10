/// <reference path="../../interfaces/ExtSet.ts"/>
module Haeckel.ext
{
	export function prIncludes<T>(a: ExtSet<T>, b: ExtSet<T>): boolean
	{
		if (a.hash === b.hash)
		{
			return false;
		}
		if (b.size >= a.size)
		{
			return false;
		}
		if (a.size === Infinity)
		{
			return b.size !== Infinity;
		}
		for (var h in b.hashMap)
		{
			if (a.hashMap[h] === undefined)
			{
				return false;
			}
		}
		return true;
	}
}