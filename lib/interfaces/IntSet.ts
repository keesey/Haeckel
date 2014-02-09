///<reference path='Set.ts' />

module Haeckel
{
	export interface IntSet<T> extends Set
	{
		criterion: (element: T) => boolean;
	}
	
	export function isIntSet(o: IntSet<any>)
	{
		return isSet(o) && typeof o.criterion === "function";
	}
}