/// <reference path="ExtSetBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/chr/definedUnits.ts"/>
/// <reference path="../functions/dst/get.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/intersect.ts"/>
/// <reference path="../functions/ext/list.ts"/>
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

		private _hashMap: { [hash: string]: S; } = {};

		private _taxon: Taxic = EMPTY_SET;

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

		inferStates(solver: DAGSolver<Taxic>, outgroup: Taxic)
		{
			var builder = this;
			var sourceward: Taxic[];
			var sinkward: Taxic[];
			var sources = solver.sources;

			function inferCharacter(character: Character<S>)
			{
				var states: { [taxonHash: string]: S; } = {};
				var outgroupStates = builder.states(outgroup, character);

				function forwardPass()
				{
					function process(node: Taxic)
					{
						var hash = node.hash;
						if (states[hash] === undefined)
						{
							var scoredStates = builder.states(node, character);
							if (scoredStates)
							{
								states[hash] = scoredStates;
							}
							else
							{
								var children = solver.imSucs(node);
								if (!children.empty)
								{
									var imSucStates: S[] = [];
									ext.each(solver.imSucs(node), (imSuc: Taxic) =>
									{
										imSucStates.push(states[imSuc.hash]);
									});
									var nodeStates = character.intersect(imSucStates);
									if (nodeStates.empty)
									{
										nodeStates = character.combine(imSucStates);
									}
									states[hash] = nodeStates;
								}
							}
						}
					}

					arr.each(sourceward, process);
				}

				function backwardPass()
				{
					function process(node: Taxic)
					{
						if (builder.states(node, character))
						{
							return;
						}
						var nodeStates = states[node.hash];
						var parentIntersect: S;
						if (nodeStates && nodeStates.empty)
						{
							builder.states(node, character, nodeStates);
						}
						else 
						{
							var stateList: S[] = [ nodeStates ];
							if (nodeStates && ext.contains(sources, node))
							{
								stateList.push(outgroupStates);
							}
							else
							{
								ext.each(solver.imPrcs(node), (parent: Taxic) => stateList.push(builder.states(parent, character)));
							}
							var nodeStates = character.intersect(stateList);
							if (nodeStates.empty)
							{
								nodeStates = character.combine(stateList);
							}
							builder.states(node, character, nodeStates);
						}
					}

					arr.each(sinkward, process);
				}

				forwardPass();
				backwardPass();
			}

			function initLevels()
			{
				function process(taxon: Taxic, level: number)
				{
					var hash = taxon.hash;
					var existing = levels[hash];
					if (isNaN(existing))
					{
						levels[hash] = level;
					}
					else
					{
						level = levels[hash] = Math.max(level, existing);
					}
					ext.each(solver.imSucs(taxon), (child: Taxic) => process(child, level + 1));
				}

				var levels: { [taxonHash: string]: number; } = {};
				ext.each(solver.sources, (source: Taxic) => process(source, 0));
				sourceward = ext.list(solver.vertices);
				sourceward.sort((a: Taxic, b: Taxic) =>
				{
					return levels[a.hash] - levels[b.hash];
				});
				sinkward = sourceward.concat();
				sinkward.reverse();
			}

			try
			{
				initLevels();
				arr.each(this._characterList, inferCharacter);
			}
			finally
			{
				this._characterMatrix = null;
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