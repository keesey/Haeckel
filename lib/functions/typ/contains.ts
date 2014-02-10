/// <reference path="../../interfaces/TypeSet.ts"/>
module Haeckel.typ
{
	export function contains<T>(set: TypeSet<T>, element: T): boolean
	{
		return !set.empty;
	}
}