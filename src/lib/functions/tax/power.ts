/// <reference path="create.ts"/>
/// <reference path="../ext/each.ts"/>
/// <reference path="../ext/power.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../interfaces/Entity.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/Taxic.ts"/>
module Haeckel.tax
{
	export function power<T>(taxon: Taxic): ExtSet<Taxic>
	{
		var entitySets = ext.power(taxon.entities),
			builder = new ExtSetBuilder<Taxic>();
		ext.each(entitySets, (s: ExtSet<Entity>) =>
		{
			builder.add(tax.create(s));
		});
		return builder.build();
	}
}