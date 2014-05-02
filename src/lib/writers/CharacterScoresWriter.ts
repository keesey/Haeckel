/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/nom/forTaxon.ts"/>
/// <reference path="../interfaces/Character.ts"/>
/// <reference path="../interfaces/CharacterMatrix.ts"/>
/// <reference path="../interfaces/Set.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../readers/CharacterScoresReader.ts"/>
module Haeckel
{
	var INDEX_LABEL_REGEX = /^#\d+$/;

	export class CharacterScoresWriter
	{
		nomenclature = EMPTY_NOMENCLATURE;

		// :TODO: Merge with DistanceMatrixWriter.getName()
		private getName(taxon: Taxic): string
		{
			if (taxon.empty)
			{
				return null;
			}
			var names = nom.forTaxon(this.nomenclature, taxon);
			if (names.empty)
			{
				return null;
			}
			var list = ext.list(names);
			list.sort();
			return list[0];
		}

		write(matrix: CharacterMatrix<Set>): CharacterScoresData
		{
			var result: CharacterScoresData =
			{
				scores: {}
			};

			var allRange = true;
			var listCharacters = false;

			for (var i = 0, n = matrix.characterList.length; i < n; ++i)
			{
				var character = matrix.characterList[i];
				if (typeof character.writeStates !== "function")
				{
					console.warn('Character has no method for writing. Output will be null.', character.label);
				}
				allRange = allRange && character.type === 'range';
				listCharacters = listCharacters || (typeof character.label === 'string' && !INDEX_LABEL_REGEX.test(character.label));
				if (!allRange && listCharacters)
				{
					break;
				}
			}

			result.characterType = allRange ? 'range' : 'discrete';

			if (listCharacters)
			{
				result.characters = new Array<CharacterData>(n);
				for (i = 0; i < n; ++i)
				{
					var character = matrix.characterList[i];
					var charData: CharacterData = {
						name: character.label
					};
					if (character.stateLabels)
					{
						charData.states = character.stateLabels;
					}
					if (character.type !== result.characterType)
					{
						charData.type = character.type;
					}
					result.characters[i] = charData;
				}
			}

			ext.each(matrix.taxon.units, (unit: Taxic) =>
			{
				var name = this.getName(unit),
					row: Set[] = [];
				if (name === null)
				{
					console.warn('Unnamed taxon; cannot write.', unit);
					return;
				}
				arr.each(matrix.characterList, (character: Character<Set>) =>
				{
					if (typeof character.writeStates !== "function")
					{
						row.push(null);
					}
					else
					{
						var states = chr.states(matrix, unit, character);
						row.push(character.writeStates(states));
					}
				});
				result.scores[name] = row;
			}, this);
			return result;
		}
	}
}