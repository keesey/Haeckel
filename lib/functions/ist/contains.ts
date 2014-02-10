/// <reference path="../../interfaces/IntSet.ts"/>
module Haeckel.ist
{
	export function contains<T>(set: IntSet<T>, element: T): boolean
	{
		return set.criterion(element);
	}
}