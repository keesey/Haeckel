/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/COUNT_CHARACTER.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/GEO_CHARACTER.ts"/>
/// <reference path="../constants/OCCURRENCE_CHARACTER.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/nom/read.ts"/>
/// <reference path="../functions/tax/byName.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Set.ts"/>
/// <reference path="../interfaces/OccurrenceData.ts"/>
module Haeckel
{
	export interface OccurrencesData
	{
		[name: string]: OccurrenceData;
	};

	export class OccurrencesReader
	{
		private defaultUnitNames: { [taxonHash: string]: string; } = {};

		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		addDefaultUnits(data: OccurrencesData, nomenclatureBuilder: NomenclatureBuilder): boolean
		{
			var nomenclature = nomenclatureBuilder.build();

			function createDefaultUnitName(hyperonym: string): string
			{
				var base: string = hyperonym + ' indet.';
				var result = base;
				var index = 0;
				while (nomenclature.nameMap[result])
				{
					result = base + ' ' + (++index);
				}
				return result;
			}

			var name: string;
			var added: boolean = false;
	        for (name in data)
	        {
				var taxon = tax.byName(nomenclature, name);
				if (!taxon.empty && !taxon.isUnit)
				{
					var unitName = createDefaultUnitName(name);
					this.defaultUnitNames[taxon.hash] = unitName;
					nomenclatureBuilder.hyponymize(name, unitName);
					data[unitName] = data[name];
					delete data[name];
					added = true;
				}
	        }
	        return added;
		}

		readCharacterMatrix(data: OccurrencesData, builder: CharacterMatrixBuilder<Set> = null, nomenclature: Nomenclature = null): CharacterMatrixBuilder<Set>
		{
			if (builder === null)
			{
				builder = new CharacterMatrixBuilder<Set>();
			}
	        for (var name in data)
	        {
				var taxon = tax.byName(this.nomenclature, name);
				if (taxon !== null && !taxon.empty)
				{
					if (!taxon.isUnit)
					{
						taxon = tax.byName(this.nomenclature, this.defaultUnitNames[taxon.hash]);
						if (!taxon)
						{
							throw new Error("Cannot find default unit for \"" + name + "\". Did you call OccurrencesReader.addDefaultUnits()?");
						}
					}
					var states = OCCURRENCE_CHARACTER.readStates(data[name]);
					if (states !== null)
					{
						ext.each(states, (occurrence: Occurrence) =>
						{
							builder.states(taxon, COUNT_CHARACTER, occurrence.count);
							builder.states(taxon, GEO_CHARACTER, occurrence.geo);
							builder.states(taxon, TIME_CHARACTER, occurrence.time);
						});
						builder.states(taxon, OCCURRENCE_CHARACTER, states);
					}
				}
	        }
	        return builder;
		}

		readNomenclature(data: OccurrencesData, builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			return nom.read(data, builder);
		}
	}
}