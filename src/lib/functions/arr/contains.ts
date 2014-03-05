///<reference path="../equal.ts" />
module Haeckel.arr
{
	export function contains<T>(list: T[], element: T): boolean
	{
		for (var i = 0, n = list.length; i < n; ++i)
		{
			if (equal(list[i], element))
			{
				return true;
			}
		}
		return false;
	}
}
