/// <reference path="../../interfaces/IntSet.ts"/>
module Haeckel.ist
{
	export function create<T>(criterion: (element: T) => boolean): IntSet<T>
	{
		var s: IntSet<T> = {
			criterion: criterion,
			empty: false,
			hash: '{x:f(x);f=' + String(criterion) + '}',
		};
		return Object.freeze(s);
	}
}