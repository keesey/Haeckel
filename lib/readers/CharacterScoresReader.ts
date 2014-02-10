/// <reference path="TempNomenclature.ts"/>
/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../builders/RangeBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/bit/createFromBits.ts"/>
/// <reference path="../functions/bit/read.ts"/>
/// <reference path="../functions/chr/createBit.ts"/>
/// <reference path="../functions/nom/read.ts"/>
/// <reference path="../functions/rng/read.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Character.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Set.ts"/>
module Haeckel
{
	export interface CharacterScoresData
	{
		characterType?: string;
		scores: {
			[name: string]: any[];
		};
	}

	interface CharacterBuilder<S extends Set> extends Builder<Character<S>>
	{
		build(): Character<S>;
		readStates(data: any): void;
		reset(): CharacterBuilder<S>;
	}

	class BitCharacterBuilder implements CharacterBuilder<BitSet>
	{
		private domainBits = 0;
		build()
		{
			return chr.createBit(bit.createFromBits(this.domainBits), true, true);
		}
		readStates(data: any): void
		{
			var states = bit.read(data);
			if (states !== null)
			{
				this.domainBits |= states.bits;
			}
		}
		reset(): BitCharacterBuilder
		{
			this.domainBits = 0;
			return this;
		}
	}

	class RangeCharacterBuilder implements CharacterBuilder<Range>
	{
		private domainBuilder: RangeBuilder;
		constructor()
		{
			this.domainBuilder = new RangeBuilder();
		}
		build()
		{
			return chr.createRange(this.domainBuilder.build(), true, true);
		}
		readStates(data: any): void
		{
			var range = rng.read(data);
			if (range !== null)
			{
				this.domainBuilder.addRange(range);
			}
		}
		reset()
		{
			this.domainBuilder.reset();
			return this;
		}
	}

    function createCharacterBuilder(data: CharacterScoresData): CharacterBuilder<Set>
    {
        if (data.characterType === "range")
        {
            return new RangeCharacterBuilder();
        }
        return new BitCharacterBuilder();
    }

    function readNumChars(data: CharacterScoresData): number
    {
        var num = NaN,
        	name: string, 
        	scores = data.scores;
        for (name in scores)
        {
            if (isNaN(num))
            {
                num = scores[name].length;
			}
            else if (num !== scores[name].length)
            {
                throw new Error("Inconsistent number of characters in matrix.");
            }
        }
        return isNaN(num) ? 0 : num;
    }

    function readCharacters(data: CharacterScoresData, builder: CharacterMatrixBuilder<Set>, numChars: number): Character<Set>[]
    {
        var characterBuilder = createCharacterBuilder(data);
        for (var i = 0; i < numChars; ++i)
        {
            characterBuilder.reset();
            for (var name in data.scores)
            {
                var row = data.scores[name];
                characterBuilder.readStates(row[i]);
            }
            builder.addListed(characterBuilder.build());
        }
        return builder.characterList;
    }

	export class CharacterScoresReader
	{
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		readCharacterMatrix(data: CharacterScoresData, builder: CharacterMatrixBuilder<Set> = null): CharacterMatrixBuilder<Set>
		{
	        var numChars = readNumChars(data);
			if (builder === null)
			{
				builder = new CharacterMatrixBuilder<Set>();
			}
	        var characters = readCharacters(data, builder, numChars),
	        	nomenclature = new TempNomenclature(this.nomenclature);
            for (var name in data.scores)
            {
                var taxon = nomenclature.taxon(name),
                	row: any[] = data.scores[name];
                for (var i = 0; i < numChars; ++i)
                {
                    var character = characters[i];
                    builder.states(taxon, character, character.readStates(row[i]));
                }
            }
	        return builder;
		}

		readNomenclature(data: CharacterScoresData, builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			return nom.read(data.scores, builder)
		}
	}
}