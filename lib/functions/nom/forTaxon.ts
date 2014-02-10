/// <reference path="../hash.ts"/>
/// <reference path="../ext/each.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/Nomenclature.ts"/>
/// <reference path="../../interfaces/Taxic.ts"/>
module Haeckel.nom
{
	export function forTaxon(nomenclature: Nomenclature, taxon: Taxic): ExtSet<string>
	{
		if (taxon.empty)
		{
			return EMPTY_SET;
		}
		var builder = new ExtSetBuilder<string>(),
			h = taxon.hash;
		ext.each(nomenclature.names, function(name: string)
		{
			if (h === hash(nomenclature.nameMap[name]))
			{
				builder.add(name);
			}
		});
		return builder.build();
	}
}