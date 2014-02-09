///<reference path='Set.ts' />

module Haeckel
{
	export interface ExtSet<T> extends Set
	{
		hashMap: { [hash: string]: T; };
		size: number;
	}

	export function isExtSet(o: ExtSet<any>)
	{
		return isSet(o) && typeof o.hashMap === "object" && typeof o.size === "number";
	}
}