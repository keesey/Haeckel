///<reference path='../../interfaces/Character.ts' />
///<reference path='../../interfaces/Taxic.ts' />
///<reference path='../../interfaces/Set.ts' />
module Haeckel.chr
{
	export function hashMapStates<S extends Set>(map: { [hash: string]: S; }, taxon: Taxic, character: Character<S>): S
	{
		if (!taxon || taxon.empty)
		{
			return null;
		}
		var states: S = null;
		if (taxon.isUnit)
		{
			states = map[taxon.hash + '@' + character.hash];
			if (states === undefined)
			{
				return null;
			}
			return states;
		}
		var statesList: S[] = [];
		ext.each(taxon.units, (unit: Taxic) =>
		{
			statesList.push(hashMapStates(map, unit, character));
		});
		return character.combine(statesList);
	}
}