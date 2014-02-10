/// <reference path="../ext/each.ts"/>
/// <reference path="../tax/includes.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/Nomenclature.ts"/>
/// <reference path="../../interfaces/Taxic.ts"/>
module Haeckel.nom
{
	export function forSubtaxa(nomenclature: Nomenclature, taxon: Taxic): ExtSet<string>
	{
		if (taxon.empty)
		{
			return EMPTY_SET;
		}
		var builder = new ExtSetBuilder<string>();
		ext.each(nomenclature.names, (name: string) =>
		{
			var nameTaxon = nomenclature.nameMap[name];
			if (tax.includes(taxon, nameTaxon))
			{
				builder.add(name);
			}
		});
		return builder.build();
	}
}