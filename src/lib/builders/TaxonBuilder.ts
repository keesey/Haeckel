/// <reference path="ExtSetBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/singleMember.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class TaxonBuilder implements Builder<Taxic>
	{
		private _entitiesBuilder = new ExtSetBuilder<Entity>();

		private _unitsBuilder = new ExtSetBuilder<Taxic>();

		add(taxon: Taxic)
		{
			this._entitiesBuilder.addSet(taxon.entities);
			this._unitsBuilder.addSet(taxon.units);
			return this;
		}

		addSet(taxa: ExtSet<Taxic>)
		{
			ext.each(taxa, (taxon: Taxic) =>
			{
				this._entitiesBuilder.addSet(taxon.entities);
				this._unitsBuilder.addSet(taxon.units);
			}, this);
			return this;
		}

		build(): Taxic
		{
			var units = this._unitsBuilder.build();
			if (units.empty)
			{
				return EMPTY_SET;
			}
			if (units.size === 1)
			{
				return ext.singleMember(units);
			}
			var entities = this._entitiesBuilder.build(),
				n = entities.size,
				uids: string[] = new Array(n),
				i = 0;
			ext.each(entities, (entity: Entity) =>
			{
				uids[i++] = entity.uid;
			});
			uids = uids.sort();
			return Object.freeze({
				empty: false,
				entities: entities,
				hash: '(' + uids.join('|') + ')',
				isUnit: false,
				units: units
			});
		}

		remove(taxon: Taxic)
		{
			this._entitiesBuilder.removeSet(taxon.entities);
			this._unitsBuilder.removeSet(taxon.units);
			return this;
		}

		removeSet(taxa: ExtSet<Taxic>)
		{
			ext.each(taxa, (taxon: Taxic) =>
			{
				this._entitiesBuilder.removeSet(taxon.entities);
				this._unitsBuilder.removeSet(taxon.units);
			}, this);
			return this;
		}

		reset()
		{
			this._entitiesBuilder.reset();
			this._unitsBuilder.reset();
			return this;
		}
	}
}