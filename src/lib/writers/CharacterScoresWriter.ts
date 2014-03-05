/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/arr/forAll.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/nom/forTaxon.ts"/>
/// <reference path="../interfaces/Character.ts"/>
/// <reference path="../interfaces/CharacterMatrix.ts"/>
/// <reference path="../interfaces/BitSet.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Set.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../readers/CharacterScoresReader.ts"/>
module Haeckel
{
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
			function getCharacterType()
			{
				if (arr.forAll(matrix.characterList, (character: Character<any>) => isRange(character.domain)))
				{
					return "range";
				}
				if (arr.forAll(matrix.characterList, (character: Character<any>) => isBitSet(character.domain) || isExtSet(character.domain)))
				{
					return "discrete";
				}
				throw new Error("Characters are not of a consistent recognized type; cannot be written as a scored matrix.");
			}

			var result: CharacterScoresData =
			{
				characterType: getCharacterType(),
				scores: {}
			};

			arr.each(matrix.characterList, (character: Character<any>) =>
			{
				if (typeof character.writeStates !== "function")
				{
					console.warn('Character has no method for writing. Output will be null.', character);
				}
			});

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