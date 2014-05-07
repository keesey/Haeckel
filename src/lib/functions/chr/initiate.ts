///<reference path="../guid4.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/Set.ts" />
module Haeckel.chr
{
	export function initiate<S extends Set>(
		domain: S,
		label: string,
		labelStates: (s: S) => string,
		stateLabels: string[],
		type?: string): Character<S> // Should generally not be used outside of Haeckel.chr
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
			label: label,
			labelStates: labelStates,
			overlap: null,
			readStates: null,
			stateLabels: stateLabels ? Object.freeze(stateLabels.concat()) : undefined,
			type: type,
			uid: uid,
			writeStates: null
		};
	}
}