///<reference path='../ext/create.ts' />
///<reference path='../ext/each.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../interfaces/Entity.ts' />
///<reference path='../../interfaces/ExtSet.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	function createUnitForEntity(entity: Entity): Taxic
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

	export function create(entities: ExtSet<Entity>): Taxic // Use with caution.
	{
		if (entities.empty)
		{
			return EMPTY_SET;
		}
		var n = entities.size,
			uids: string[] = new Array(n),
			i = 0,
			units = new ExtSetBuilder<Taxic>();
		ext.each(entities, (entity: Entity) =>
		{
			uids[i++] = entity.uid;
			units.add(createUnitForEntity(entity));
		});
		uids = uids.sort();
		return Object.freeze({
			empty: false,
			entities: entities,
			hash: '(' + uids.join('|') + ')',
			isUnit: entities.size === 1,
			units: units.build()
		});
	}
}