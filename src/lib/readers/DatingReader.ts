/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/rng/read.ts"/>
/// <reference path="../interfaces/Dating.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export interface DatingData
	{
		taxa: string[];
		time: number[];
	};

	export class DatingReader
	{
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		readDatings(data: DatingData[], builder: ExtSetBuilder<Dating> = null): ExtSetBuilder<Dating>
		{
			if (!builder)
			{
				builder = new ExtSetBuilder<Dating>();
			}
			var taxaBuilder = new ExtSetBuilder<Taxic>();
			arr.each(data, (d: DatingData) =>
			{
				taxaBuilder.reset();
				arr.each(d.taxa, (name: string) =>
				{
					var taxon = this.nomenclature.nameMap[name];
					if (!taxon || taxon.empty)
					{
						throw new Error('Unrecognized name: \"' + name + '\".');
					}
					taxaBuilder.add(taxon);
				}, this);
				var taxa = taxaBuilder.build(),
					time = rng.read(d.time);
				builder.add(Object.freeze({
					taxa: taxa,
					time: time,
					hash: taxa.hash + '@' + time.hash 
				}));
			}, this);
	        return builder;
		}

		readNomenclature(data: DatingData[], builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			if (!builder)
			{
				builder = new NomenclatureBuilder();
			}
			arr.each(data, (d: DatingData) =>
			{
				arr.each(d.taxa, (name: string) =>
				{
					builder.addName(name);
				});
			});
	        return builder;
		}
	}
}