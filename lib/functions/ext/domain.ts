///<reference path='../../interfaces/ExtSet.ts' />
module Haeckel.ext
{
	export function domain<T>(hash: string): ExtSet<T>
	{
		return Object.freeze({
			empty: false,
			hash: hash,
			hashMap: <{ [hash: string]: T; }> Object.freeze({}), // Technically invalid.
			size: Infinity
		});
	}
}