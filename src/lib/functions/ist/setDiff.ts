///<reference path="create.ts"/>
///<reference path="../equal.ts"/>
///<reference path="../../constants/EMPTY_SET.ts"/>
///<reference path="../../interfaces/IntSet.ts"/>
module Haeckel.ist
{
	export function setDiff<T>(minuend: IntSet<T>, subtrahend: IntSet<T>): IntSet<T>
	{
		if (minuend.empty)
		{
			return EMPTY_SET;
		}
		if (subtrahend.empty)
		{
			return minuend;
		}
		if (equal(minuend, subtrahend))
		{
			return EMPTY_SET;
		}
		return create(function(element: T)
		{
			return minuend.criterion(element) && !subtrahend.criterion(element)
		});
	}
}