/// <reference path="create.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/IntSet.ts"/>
module Haeckel.ist
{
	export function union<T>(sets: IntSet<T>[]): IntSet<T>
	{
		var n = sets.length;
		if (n === 0)
		{
			return EMPTY_SET;
		}
		if (n === 1)
		{
			return sets[0];
		}
		return create((element: T) =>
		{
			for (var i = 0; i < n; ++i)
			{
				if (sets[i].criterion(element))
				{
					return true;
				}
			}
			return false;
		});
	}
}