/// <reference path="ExtSetBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/chr/definedUnits.ts"/>
/// <reference path="../functions/dst/get.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/intersect.ts"/>
/// <reference path="../functions/ext/setDiff.ts"/>
/// <reference path="../functions/tax/setDiff.ts"/>
/// <reference path="../functions/tax/union.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/CharacterMatrix.ts"/>
/// <reference path="../interfaces/DistanceMatrix.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Set.ts"/>
/// <reference path="../interfaces/WeightedStates.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/DAGSolver.ts"/>
module Haeckel
{
	export class CharacterMatrixBuilder<S extends Set> implements Builder<CharacterMatrix<S>>
	{
		private _characterList: Character<S>[] = [];

		private _characterMatrix: CharacterMatrix<S>;

		private _characters = new ExtSetBuilder<Character<S>>();

		private _distanceMatrix: DistanceMatrix<Taxic>;

		private _hashMap: { [hash: string]: S; } = {};

		private _solver: DAGSolver<Taxic>;

		private _taxon: Taxic = EMPTY_SET;

		private _infer(timesRun: number)
		{
			if (timesRun >= 2)
			{
				return;
			}
			this._characterMatrix = this.build();
			var changes = 0;
			ext.each(this._characterMatrix.characters, (character: Character<S>) =>
			{
				changes += this._inferCharacter(character);
			}, this);
			if (changes > 0)
			{
				this._infer(timesRun + 1);
			}
		}

		private _inferCharacter(character: Character<S>)
		{
			if (!character.inferrer)
			{
				return 0;
			}
			var defUnits = chr.definedUnits(this._characterMatrix, character),
				changes = 0;
			ext.each(ext.setDiff(this._solver.vertices, defUnits), (unit: Taxic) =>
			{
				changes += this._inferUnit(character, defUnits, unit);
			}, this);
			return changes;
		}

		private _inferUnit(character: Character<S>, definedUnits: ExtSet<Taxic>, unit: Taxic)
		{
			var allStates: WeightedStates<S>[] = [],
				defprcs = ext.intersect(this._solver.prcs(unit), definedUnits),
				weightedStates = this._weightedStates(character, defprcs, unit);
			allStates.push({states: character.inferrer.average(weightedStates), weight: 1});
			var defsucs = ext.intersect(this._solver.sucs(unit), definedUnits);
			weightedStates = this._weightedStates(character, defsucs, unit);
			allStates.push({states: character.inferrer.average(weightedStates), weight: 1});
			var states: S = character.inferrer.average(allStates);
			if (states !== null && !equal(states, this.states(unit, character)))
			{
				this.states(unit, character, states);
				return 1;
			}
			return 0;
		}

		private _runInference()
		{
			if (this._solver === null)
			{
				return;
			}
            if (this._distanceMatrix === null)
            {
				this._distanceMatrix = this._solver.toDistanceMatrix();
			}
			this._infer(0);
		}

		private _weightedStates(character: Character<S>, units: ExtSet<Taxic>, focus: Taxic): WeightedStates<S>[]
		{
			var result: WeightedStates<S>[] = [];
			ext.each(units, function(unit: Taxic)
			{
				var d = dst.get(this._distanceMatrix, focus, unit).mean;
				result.push({
					states: chr.states(this._characterMatrix, unit, character),
					weight: (isFinite(d) && d !== 0) ? (1 / d) : NaN
				});
			}, this);
			return result;
		}

		get characterList():Character<S>[]
		{
			return this._characterList.concat();
		}

		get taxon(): Taxic
		{
			return this._taxon;
		}

		add(character: Character<S>)
		{
	        this._characters.add(character);
	        return this;
		}

		addListed(character: Character<S>)
		{
	        if (this._characters.contains(character))
	        {
				throw new Error("Can't add a listed character twice: " + character + ".");
			}
	        this._characterList.push(character);
	        this._characters.add(character);
	        return this;
		}

		addMatrix(matrix: CharacterMatrix<S>)
		{
			arr.each(matrix.characterList, this.addListed, this);
			ext.each(matrix.taxon.units, (unit: Taxic) =>
			{
				ext.each(matrix.characters, (character: Character<S>) =>
				{
					this.states(unit, character, chr.states(matrix, unit, character));
				}, this);
			}, this);
			return this;
		}

		build(): CharacterMatrix<S>
		{
			var hashMap: { [key: string]: S; } = {};
			for (var key in this._hashMap)
			{
				hashMap[key] = this._hashMap[key];
			}
			return Object.freeze({
				characters: this._characters.build(),
				characterList: Object.freeze(this._characterList.concat()),
				hashMap: Object.freeze(hashMap),
				taxon: this._taxon
			});
		}

		inferStates(solver: DAGSolver<Taxic>, distanceMatrix: DistanceMatrix<Taxic> = null)
		{
			try
			{
				this._distanceMatrix = (distanceMatrix === null) ? solver.toDistanceMatrix() : distanceMatrix;
				this._solver = solver;
				this._runInference();
			}
			finally
			{
				this._characterMatrix = null;
				this._distanceMatrix = null;
				this._solver = null;
			}
	        return this;
		}

		removeCharacter(character: Character<S>)
		{
			if (this._characters.contains(character))
			{
				this._characters.remove(character);
				this._characterList.splice(this._characterList.indexOf(character), 1);
				var h = '@' + character.hash,
					n = h.length,
					key: string;
				for (key in this._hashMap)
				{
					if (key.substr(key.length - n) === h)
					{
						delete this._hashMap[key];
					}
				}
			}
			return this;
		}

		removeStates(taxon: Taxic, character: Character<S>)
		{
			ext.each(taxon.units, (unit: Taxic) =>
			{
				delete this._hashMap[unit.hash + '@' + character.hash];
			});
			return this;
		}

		removeTaxon(taxon: Taxic)
		{
			if (taxon.empty)
			{
				return this;
			}
			var t = this._taxon;
			this._taxon = tax.setDiff(this._taxon, taxon);
			if (!equal(t, this._taxon))
			{
				ext.each(taxon.units, function(unit: Taxic)
				{
					var h = unit.hash + '@',
						n = h.length,
						key: string;
					for (key in this._hashMap)
					{
						if (key.substr(0, n) === h)
						{
							delete this._hashMap[key];
						}
					}
				}, this);
			}
			return this;
		}

		reset()
		{
			this._characters.reset();
			this._characterList = [];
			this._hashMap = {};
			this._taxon = EMPTY_SET;
			return this;
		}

		states(taxon: Taxic, character: Character<S>): S;
		states(taxon: Taxic, character: Character<S>, states: S): CharacterMatrixBuilder<S>;
		states(taxon: Taxic, character: Character<S>, states: S = null): any
		{
			if (states === null)
			{
				return chr.hashMapStates(this._hashMap, taxon, character);
			}
			this.add(character);
			var keyEnd = '@' + character.hash,
				map = this._hashMap;
			ext.each(taxon.units, (unit: Taxic) =>
			{
				var key = unit.hash + keyEnd,
					value: S = map[key];
				if (value !== undefined)
				{
					states = character.combine([ states, value ]);
				}
				map[key] = states;
			}, this);
			this._taxon = tax.union([ this._taxon, taxon ]);
			return this;
		}
	}
}