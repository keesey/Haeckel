/// <reference path="../hash.ts"/>
/// <reference path="../../interfaces/TypeSet.ts"/>
module Haeckel.typ
{
 	export function create<T>(typeObject: any): TypeSet<T>
	{
		var s: TypeSet<T> = {
			contains: (x: T) => true,
			empty: false,
			hash: '{x:' + hash(typeObject) + '(x)}',
		};
		return Object.freeze(s);
	}
}