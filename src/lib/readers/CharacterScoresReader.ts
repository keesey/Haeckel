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
		label: string;
		build(): Character<S>;
		readStateData(data: string[]): void;
		readScore(data: any): void;
		reset(): CharacterBuilder<S>;
	}

	class AbstractCharacterBuilder<S extends Set> implements CharacterBuilder<S>
	{
		label: string = null;
		labelStates: (states: S) => string;
		stateLabels: string[];
		build(): Character<S>
		{
			return null;
		}
		readScore(data: any): void
		{
		}
		readStateData(data: string[])
		{
			this.stateLabels = data.concat();
		}
		reset(): CharacterBuilder<S>
		{
			this.label = null;
			this.labelStates = null;
			this.stateLabels = null;
			return this;
		}
	}

	class BitCharacterBuilder extends AbstractCharacterBuilder<BitSet>
	{
		private domainBits = 0;
		build()
		{
			return chr.createBit(bit.createFromBits(this.domainBits), true, true, this.label, this.labelStates, this.stateLabels);
		}
		readScore(data: any)
		{
			var states = bit.read(data);
			if (states !== null)
			{
				this.domainBits |= states.bits;
			}
		}
		readStateData(data: string[])
		{
			super.readStateData(data);
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
		reset()
		{
			super.reset();
			this.domainBits = 0;
			return this;
		}
	}

	class RangeCharacterBuilder extends AbstractCharacterBuilder<Range>
	{
		private domainBuilder: RangeBuilder;
		constructor()
		{
			super();
			this.domainBuilder = new RangeBuilder();
		}
		build()
		{
			return chr.createRange(this.domainBuilder.build(), true, true, this.label, this.labelStates, this.stateLabels);
		}
		readScore(data: any)
		{
			var range = rng.read(data);
			if (range !== null && !range.empty)
			{
				this.domainBuilder.addRange(range);
			}
		}
		readStateData(data: string[])
		{
			function getLabel(value: number): string
			{
				return data[value] || String(value);
			}

			super.readStateData(data);
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
		reset()
		{
			super.reset();
			this.domainBuilder.reset();
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
    	var characterBuilder: CharacterBuilder<Set>;
    	var characterType: string;
    	if (data.characters)
    	{
	        for ( ; i < numChars; ++i)
	        {
	        	var characterData = data.characters[i];
	        	characterType = (characterData.type || data.characterType) || 'discrete';
	        	characterBuilder = getCharacterBuilder(characterType);
	        	characterBuilder.label = characterData.name;
	        	if (characterData.states)
	        	{
		        	characterBuilder.readStateData(characterData.states);
		        }
	            builder.addListed(characterBuilder.build());
	            characterBuilder.reset();
	        }
    	}
    	else
    	{
    		characterType = data.characterType || 'discrete'
			characterBuilder = getCharacterBuilder(characterType);
	        for ( ; i < numChars; ++i)
	        {
	            characterBuilder.label = '#' + (i + 1);
	            for (var name in data.scores)
	            {
	                var row = data.scores[name];
	                characterBuilder.readScore(row[i]);
	            }
	            builder.addListed(characterBuilder.build());
	            characterBuilder.reset();
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