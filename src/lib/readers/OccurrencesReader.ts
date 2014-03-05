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
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		readCharacterMatrix(data: OccurrencesData, builder: CharacterMatrixBuilder<Set> = null): CharacterMatrixBuilder<Set>
		{
			if (builder === null)
			{
				builder = new CharacterMatrixBuilder<Set>();
			}
			var nonUnitNames: string[] = [];
	        for (var name in data)
	        {
				var taxon = tax.byName(this.nomenclature, name);
				if (taxon !== null && !taxon.empty)
				{
					if (!taxon.isUnit)
					{
						nonUnitNames.push(name);
					}
					else
					{
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
	        }
	        var n = nonUnitNames.length;
	        if (n > 0)
	        {
	        	var message = "Occurrence data can only be scored for taxonomic units. The ";
	        	if (n === 1)
	        	{
	        		message += 'taxon named "' + nonUnitNames[0] + '" is not a unit.';
	        	}
	        	else
	        	{
	        		message += 'taxa named "' + nonUnitNames.slice(0, n - 1).join('", "') + '" and "' + nonUnitNames[n - 1] + '" are not units.';
	        	}
	        	throw new Error(message);
	        }
	        return builder;
		}

		readNomenclature(data: OccurrencesData, builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			return nom.read(data, builder);
		}
	}
}