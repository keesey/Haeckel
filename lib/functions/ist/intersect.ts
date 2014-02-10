///<reference path="create.ts"/>
///<reference path="../equal.ts"/>
///<reference path="../../constants/EMPTY_SET.ts"/>
///<reference path="../../interfaces/IntSet.ts"/>
module Haeckel.ist
{
	export function intersect<T>(a: IntSet<T>, b: IntSet<T>): IntSet<T>
	{
		if (a.empty || b.empty)
		{
			return EMPTY_SET;
		}
		if (equal(a, b))
		{
			return a;
		}
		return create(function(element: T)
		{
			return a.criterion(element) && b.criterion(element)
		});
	}
}