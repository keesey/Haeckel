///<reference path='Entity.ts' />
///<reference path='ExtSet.ts' />
///<reference path='Set.ts' />

module Haeckel
{
	export interface Taxic extends Set
	{
		entities: ExtSet<Entity>;
		isUnit: boolean;
		units: ExtSet<Taxic>;
	}

	export function isTaxic(o: Taxic)
	{
		return isSet(o) && typeof o.isUnit === "boolean" && isExtSet(o.entities) && isExtSet(o.units);
	}
}