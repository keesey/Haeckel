/// <reference path="TempNomenclature.ts"/>
/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../builders/RangeBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/bit/contains.ts"/>
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
	var BIT_BUILDER: BitCharacterBuilder = null;

	var RANGE_BUILDER: RangeCharacterBuilder = null;

	export interface CharacterData
	{
		name: string;
		states?: string[];
		type?: string;
	}

	export interface CharacterScoresData
	{
		characterType?: string;
		characters?: CharacterData[];
		scores: {
			[name: string]: any[];
		};
	}

	interface CharacterBuilder<S extends Set> extends Builder<Character<S>>
	{
		build(): Character<S>;
		readStateData(data: string[]): void;
		readScore(data: any): void;
		reset(): CharacterBuilder<S>;
	}

	class BitCharacterBuilder implements CharacterBuilder<BitSet>
	{
		private domainBits = 0;
		private labelStates: (states: BitSet) => string;
		build()
		{
			var result = chr.createBit(bit.createFromBits(this.domainBits), true, true);
			if (this.labelStates)
			{
				result.labelStates = this.labelStates;
			}
			return result;
		}
		readStateData(data: string[])
		{
			var n = data.length;
			this.domainBits = (1 << n) - 1;
			this.labelStates = (states: BitSet) =>
			{
				if (!states)
				{
					return '?';
				}
				if (states.empty)
				{
					return '—';
				}
				var labels: string[] = [];
				for (var i = 0; i < n; ++i)
				{
					if (bit.contains(states, i))
					{
						labels.push(data[i]);
					}
				}
				return labels.join(' or ') || '—';
			};
		}
		readScore(data: any)
		{
			var states = bit.read(data);
			if (states !== null)
			{
				this.domainBits |= states.bits;
			}
		}
		reset()
		{
			this.domainBits = 0;
			this.labelStates = null;
			return this;
		}
	}

	class RangeCharacterBuilder implements CharacterBuilder<Range>
	{
		private domainBuilder: RangeBuilder;
		private labelStates: (states: Range) => string;
		constructor()
		{
			this.domainBuilder = new RangeBuilder();
		}
		build()
		{
			var result = chr.createRange(this.domainBuilder.build(), true, true);
			if (this.labelStates)
			{
				result.labelStates = this.labelStates;
			}
			return result;
		}
		readStateData(data: string[])
		{
			function getLabel(value: number): string
			{
				return data[value] || String(value);
			}

			var n = data.length;
			this.domainBuilder.add(0);
			this.domainBuilder.add(n - 1);
			this.labelStates = (states: Range) =>
			{
				if (!states)
				{
					return '?';
				}
				if (states.empty)
				{
					return '—';
				}
				if (states.size === 0)
				{
					return getLabel(states.min);
				}
				return getLabel(states.min) + "–" + getLabel(states.max);
			};
		}
		readScore(data: any)
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
			this.labelStates = null;
			return this;
		}
	}

	function getCharacterBuilder(type: string): CharacterBuilder<Set>
	{
		if (type === 'range')
		{
			if (!RANGE_BUILDER)
			{
				RANGE_BUILDER = new RangeCharacterBuilder();
			}
			return RANGE_BUILDER;
		}
		if (!BIT_BUILDER)
		{
			BIT_BUILDER = new BitCharacterBuilder();
		}
		return BIT_BUILDER;
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
        if (data.characters)
        {
        	if (num !== data.characters.length)
        	{
                throw new Error("Inconsistent number of characters.");
        	}
        }
        return isNaN(num) ? 0 : num;
    }

    function readCharacters(data: CharacterScoresData, builder: CharacterMatrixBuilder<Set>, numChars: number): Character<Set>[]
    {
    	var i = 0;
    	var character: Character<Set>;
    	var characterBuilder: CharacterBuilder<Set>;
    	var characterType: string;
    	if (data.characters)
    	{
	        for ( ; i < numChars; ++i)
	        {
	        	var characterData = data.characters[i];
	        	characterType = (characterData.type || data.characterType) || 'discrete';
	        	characterBuilder = getCharacterBuilder(characterType);
	        	if (characterData.states)
	        	{
		        	characterBuilder.readStateData(characterData.states);
		        }
 	            character = characterBuilder.build();
	            characterBuilder.reset();
	            character.label = characterData.name;
	            character.stateLabels = characterData.states;
	            character.type = characterType;
	            builder.addListed(character);
	        }
    	}
    	else
    	{
    		characterType = data.characterType || 'discrete'
			characterBuilder = getCharacterBuilder(characterType);
	        for ( ; i < numChars; ++i)
	        {
	            for (var name in data.scores)
	            {
	                var row = data.scores[name];
	                characterBuilder.readScore(row[i]);
	            }
	            character = characterBuilder.build();
	            characterBuilder.reset();
	            character.label = '#' + (i + 1);
	            character.type = characterType;
	            builder.addListed(character);
	        }
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