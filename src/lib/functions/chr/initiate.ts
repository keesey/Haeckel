///<reference path="../guid4.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/Set.ts" />
module Haeckel.chr
{
	export function initiate<S extends Set>(domain: S): Character<S> // Should generally not be used outside of Haeckel.chr
	{
		if (domain.empty)
		{
			throw new Error("Can't have a character with an empty domain.");
		}
		var uid = guid4();
		return {
			combine: null,
			domain: domain,
			hash: uid,
			readStates: null,
			uid: uid,
			writeStates: null
		};
	}
}