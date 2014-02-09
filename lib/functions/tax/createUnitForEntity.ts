///<reference path='../ext/create.ts' />
///<reference path='../../interfaces/Entity.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	export function createUnitForEntity(entity: Entity): Taxic // Use with caution.
	{
		var taxon: Taxic = {
			empty: false,
			entities: ext.create([ entity ]),
			hash: '(' + entity.uid + ')',
			isUnit: true,
			units: null
		};
		taxon.units = ext.create([ taxon ]);
		return Object.freeze(taxon);
	}
}