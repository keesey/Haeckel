/// <reference path="DAGSolver.ts"/>
/// <reference path="SolverCache.ts"/>
/// <reference path="../builders/DAGBuilder.ts"/>
/// <reference path="../builders/TaxonBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/tax/includes.ts"/>
/// <reference path="../functions/tax/intersect.ts"/>
/// <reference path="../functions/tax/setDiff.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class PhyloSolver
	{
		private _cache = new SolverCache();
		
		private _dagSolver: DAGSolver<Taxic>;

		private _graph: Digraph<Taxic>;

		private _taxonBuilder = new TaxonBuilder();

		get dagSolver()
		{
			return this._dagSolver;
		}

		get graph()
		{
			return this._graph;
		}

		get universal(): Taxic
		{
			var key = "universal";
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			result = this._taxonBuilder
				.addSet(this._graph.vertices)
				.build();
			this._taxonBuilder.reset();
			return this._cache.set(key, result);
		}

		constructor(graph: Digraph<Taxic>);
		constructor(builder: DAGBuilder<Taxic>);
		constructor(solver: DAGSolver<Taxic>);
		constructor(x: any)
		{
			function toUnitGraph(graph: Digraph<Taxic>): Digraph<Taxic>
			{
				var builder = new DAGBuilder<Taxic>();
				ext.each(graph.vertices, function(taxon: Taxic)
				{
					builder.addVertices(taxon.units);
				});
				ext.each(graph.arcs, function(arc: Taxic[])
				{
					ext.each(arc[0].units, function(head: Taxic)
					{
						ext.each(arc[1].units, function(tail: Taxic)
						{
							builder.addArc(head, tail);
						});
					});
				});
				return builder.build();
			}

			var dagSolver: DAGSolver<Taxic>,
				graph: Digraph<Taxic>;
			if (x instanceof DAGSolver)
			{
				dagSolver = <DAGSolver<Taxic>> x;
				graph = dagSolver.graph;
			}
			else if (x instanceof DAGBuilder)
			{
				graph = (<DAGBuilder<Taxic>> x).build();
			}
			else if (isDigraph(x))
			{
				graph = <Digraph<Taxic>> x;
			}
			else
			{
			}
			var finalGraph = toUnitGraph(graph);
			if (dagSolver && equal(graph, finalGraph))
			{
				this._dagSolver = dagSolver;
				this._graph = graph;
			}
			else
			{
				this._graph = finalGraph;
				this._dagSolver = new DAGSolver(finalGraph);
			}
		}

		branch(internal: Taxic, external: Taxic): Taxic
		{
			var key = SolverCache.getKey("branch", [ internal, external ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			return this._cache.set(key, tax.setDiff(this.prcIntersect(internal), this.prcUnion(external)));
		}

		clade(taxon: Taxic): Taxic
		{
			if (taxon.empty)
			{
				return EMPTY_SET;
			}

			var key = SolverCache.getKey("clade", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			if (taxon.isUnit || this.min(taxon).isUnit || this.isCladogen(this.min(taxon)))
			{
				result = this.sucUnion(taxon);
			}
			else
			{
				result = this.sucUnion(this.max(this.prcIntersect(taxon)));
			}

			return this._cache.set(key, result);
		}

		cladogen(taxon: Taxic): Taxic
		{
			if (taxon.empty)
			{
				return EMPTY_SET;
			}

			var key = SolverCache.getKey("cladogen", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			if (this.isCladogen(this.min(taxon)))
			{
				result = taxon;
			}
			else
			{
				result = this.max(this.prcIntersect(taxon));
			}

			return this._cache.set(key, result);
		}

		crown(specifiers: Taxic, extant: Taxic): Taxic
		{
			var key = SolverCache.getKey("crown", [ specifiers, extant ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			return this._cache.set(key, this.clade(tax.intersect(this.clade(specifiers), extant)));
		}

		distance(x: Taxic, y: Taxic): number
		{
			if (x.empty || y.empty)
			{
				return Infinity;
			}
			if (x === y)
			{
				return 0;
			}
			var xHash = x.hash;
			var yHash = y.hash;
			if (xHash === yHash)
			{
				return 0;
			}

			var key = SolverCache.getKey("distance", (xHash < yHash) ? [x, y] : [y, x]);
			var result = this._cache.get<number>(key);
			if (result !== undefined)
			{
				return result;
			}

			result = Infinity;
			ext.each(x.units, function(xUnit: Taxic)
			{
				ext.each(y.units, function(yUnit: Taxic)
				{
					var dxy = this._dagSolver.distance(xUnit, yUnit);
					if (!isFinite(result) || result > dxy)
					{
						if ((result = dxy) === 0)
						{
							return false;
						}
					}
				}, this);
				if (result === 0)
				{
					return false;
				}
			}, this);

			return this._cache.set(key, result);
		}

		isCladogen(taxon: Taxic): boolean
		{
			if (taxon.empty)
			{
				return false;
			}
			if (taxon.isUnit)
			{
				return true;
			}
			return !this.sucIntersect(this.min(taxon)).empty;
		}

		max(taxon: Taxic): Taxic
		{
			var key = SolverCache.getKey("max", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			this._taxonBuilder.addSet(this.subgraphSolver(taxon).dagSolver.sinks);

			result = this._taxonBuilder.build();
			this._taxonBuilder.reset();
			return this._cache.set(key, result);
		}

		min(taxon: Taxic): Taxic
		{
			var key = SolverCache.getKey("min", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			this._taxonBuilder.addSet(this.subgraphSolver(taxon).dagSolver.sources);

			result = this._taxonBuilder.build();
			this._taxonBuilder.reset();
			return this._cache.set(key, result);
		}

		prcIntersect(taxon: Taxic): Taxic
		{
			var key = SolverCache.getKey("prcIntersect", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			ext.each(taxon.units, function(unit: Taxic)
			{
				if (result === undefined)
				{
					result = this.prcUnion(unit);
				}
				else
				{
					result = tax.intersect(result, this.prcUnion(unit));
				}
				if (result.empty)
				{
					return false;
				}
			}, this);

			return this._cache.set(key, result);
		}

		prcUnion(taxon: Taxic): Taxic
		{
			var key = SolverCache.getKey("prcUnion", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			ext.each(taxon.units, function(unit: Taxic)
			{
				this._taxonBuilder.addSet(this._dagSolver.prcs(unit));
			}, this);

			result = this._taxonBuilder.build();
			this._taxonBuilder.reset();
			return this._cache.set(key, result);
		}

		subgraph(taxon: Taxic): Digraph<Taxic>
		{
			return this._dagSolver.subgraph(taxon.units);
		}

		subgraphSolver(taxon: Taxic): PhyloSolver
		{
			if (taxon.hash === this.universal.hash)
			{
				return this;
			}

			var key = SolverCache.getKey("subgraphSolver", [ taxon ]);
			var result = this._cache.get<PhyloSolver>(key);
			if (result !== undefined)
			{
				return result;
			}

			return this._cache.set(key, new PhyloSolver(this.subgraph(taxon)));
		}

		sucIntersect(taxon: Taxic): Taxic
		{
			var key = SolverCache.getKey("sucIntersect", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			ext.each(taxon.units, function(unit:Taxic)
			{
				if (result === undefined)
				{
					result = this.sucUnion(unit);
				}
				else
				{
					result = tax.intersect(result, this.sucUnion(unit));
				}
				if (result.empty)
				{
					return false;
				}
			}, this);

			return this._cache.set(key, result);
		}

		sucUnion(taxon: Taxic): Taxic
		{
			var key = SolverCache.getKey("sucUnion", [ taxon ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			ext.each(taxon.units, function(unit: Taxic)
			{
				this._taxonBuilder.addSet(this._dagSolver.sucs(unit));
			}, this);

			result = this._taxonBuilder.build();
			this._taxonBuilder.reset();
			return this._cache.set(key, result);
		}

		synPrc(apomorphic: Taxic, representative: Taxic): Taxic
		{
			var key = SolverCache.getKey("synPrc", [ apomorphic, representative ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			if (tax.includes(apomorphic, representative))
			{
				result = this.subgraphSolver(apomorphic)
					.prcIntersect(representative);
			}
			else
			{
				result = EMPTY_SET;
			}

			return this._cache.set(key, result);
		}

		total(specifiers: Taxic, extant: Taxic): Taxic
		{
			var key = SolverCache.getKey("total", [ specifiers, extant ]);
			var result = this._cache.get<Taxic>(key);
			if (result !== undefined)
			{
				return result;
			}

			var crown = this.crown(specifiers, extant);
			return this._cache.set(key, this.clade(this.branch(crown, tax.setDiff(extant, crown))));
		}
	}
}