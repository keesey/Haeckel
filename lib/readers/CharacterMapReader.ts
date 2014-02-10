/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/nom/read.ts"/>
/// <reference path="../functions/tax/byName.ts"/>
/// <reference path="../interfaces/Character.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Set.ts"/>
module Haeckel
{
	export interface CharacterMapData
	{
		[name: string]: {
			[characterKey: string]: any;
		};
	}

	export class CharacterMapReader<S extends Set>
	{
		characterMap: (key: string) => Character<S>;
		
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		constructor()
		{
			this.characterMap = function(key: string): Character<S> { return null; };
		}

		readCharacterMatrix(data: CharacterMapData, builder?: CharacterMatrixBuilder<S>)
		{
			if (!builder)
			{
				builder = new CharacterMatrixBuilder<S>();
			}
			var name: string;
			for (name in data)
			{
				var taxon = tax.byName(this.nomenclature, name);
				if (taxon && !taxon.empty)
				{
					var scores = data[name],
						characterKey: string;
					for (characterKey in scores)
					{
						var character: Character<S> = this.characterMap(characterKey);
						if (character)
						{
							builder.states(taxon, character, character.readStates(scores[characterKey]));
						}
					}
				}
			}
			return builder;
		}

		readNomenclature(data: any, builder: NomenclatureBuilder = null)
		{
			return nom.read(data, builder)
		}
	}
}