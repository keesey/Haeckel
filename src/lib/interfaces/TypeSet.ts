///<reference path='Set.ts' />

module Haeckel
{
	export interface TypeSet<T> extends Set
	{
		contains: (element: T) => boolean;
	}
	
	export function isTypeSet(o: TypeSet<any>)
	{
		return isSet(o) && typeof o.contains === "function";
	}
}