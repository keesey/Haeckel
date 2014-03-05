/// <reference path="SolverCache.ts"/>
/// <reference path="../builders/DAGBuilder.ts"/>
/// <reference path="../builders/DistanceMatrixBuilder.ts"/>
/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../functions/equal.ts"/>
/// <reference path="../functions/hash.ts"/>
/// <reference path="../functions/ext/contains.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/ext/setDiff.ts"/>
/// <reference path="../functions/ext/union.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
module Haeckel
{
	export class DAGSolver<T>
	{
		private _builder: DAGBuilder<T> = null;

		private _cache = new SolverCache;
		
		private _graph: Digraph<T>;

		get arcs(): ExtSet<T[]>
		{
			return this._graph.arcs;
		}

		get graph(): Digraph<T>
		{
			return this._graph;
		}

		get sinks(): ExtSet<T>
		{
			var key = "sinks",
				result = this._cache.get<ExtSet<T>>(key);
			if (result !== undefined)
			{
				return result;
			}

			var builder = new ExtSetBuilder<T>();
			builder.addSet(this._graph.vertices);
			ext.each(this._graph.arcs, function(arc: Arc<T>)
			{
				builder.remove(arc[0]);
			});

			return this._cache.set(key, builder.build());
		}

		get sources(): ExtSet<T>
		{
			var key = "sources",
				result = this._cache.get<ExtSet<T>>(key);
			if (result !== undefined)
			{
				return result;
			}

			var builder = new ExtSetBuilder<T>();
			builder.addSet(this._graph.vertices);
			ext.each(this._graph.arcs, function(arc: T[])
			{
				builder.remove(arc[1]);
			});
			
			return this._cache.set(key, builder.build());
		}

		get vertices(): ExtSet<T>
		{
			return this._graph.vertices;
		}

		constructor(graph: Digraph<T>)
		{
			this._graph = graph;
		}

		distance(x: T, y: T, traversedBuilder: ExtSetBuilder<T> = null): number
		{
			if (x === y)
			{
				return 0;
			}
			var xHash = hash(x);
			if (xHash === undefined)
			{
				return NaN;
			}
			var yHash = hash(y);
			if (yHash === undefined)
			{
				return NaN;
			}
			if (xHash === yHash)
			{
				return 0;
			}
			
			var key = SolverCache.getKey("distance", (xHash < yHash) ? [x, y] : [y, x]),	
				result = this._cache.get<number>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			result = Infinity;
			var im = ext.union([ this.imPrcs(x), this.imSucs(x) ]),
				record = true;
			if (ext.contains(im, y))
			{
				result = 1;
			}
			else
			{
				if (traversedBuilder)
				{
					record = false;
				}
				else
				{
					traversedBuilder = new ExtSetBuilder<T>();
				}
				traversedBuilder.add(x);
				var untraversed = ext.setDiff(im, traversedBuilder.build());
				ext.each(untraversed, (unit: T) =>
				{
					var dUnit = this.distance(unit, y, traversedBuilder);
					if (isFinite(dUnit) && dUnit + 1 < result)
					{
						result = dUnit + 1;
					}
				}, this);
				traversedBuilder.remove(x);
			}
			
			if (record)
			{
				return this._cache.set(key, result);
			}
			return result;
		}

		imPrcs(vertex: T): ExtSet<T>
		{
			if (!ext.contains(this._graph.vertices, vertex))
			{
				return EMPTY_SET;
			}
			var key = SolverCache.getKey("imPrcs", [ vertex ]),
				result = this._cache.get<ExtSet<T>>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			var builder = new ExtSetBuilder<T>();
			ext.each(this._graph.arcs, function(arc: Arc<T>)
			{
				if (equal(vertex, arc[1]))
				{
					builder.add(arc[0]);
				}
			});
			
			return this._cache.set(key, builder.build());
		}

		imSucs(vertex: T): ExtSet<T>
		{
			if (!ext.contains(this._graph.vertices, vertex))
			{
				return EMPTY_SET;
			}
			
			var key = SolverCache.getKey("imSucs", [ vertex ]),
				result = this._cache.get<ExtSet<T>>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			var builder = new ExtSetBuilder<T>();
			ext.each(this._graph.arcs, function(arc: Arc<T>)
			{
				if (equal(vertex, arc[0]))
				{
					builder.add(arc[1]);
				}
			});
			
			return this._cache.set(key, builder.build());
		}

		prcs(vertex: T): ExtSet<T>
		{
			if (!ext.contains(this._graph.vertices, vertex))
			{
				return EMPTY_SET;
			}
			
			var key = SolverCache.getKey("prcs", [ vertex ]),
				result = this._cache.get<ExtSet<T>>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			var builder = new ExtSetBuilder<T>();
			builder.add(vertex);
			ext.each(this._graph.arcs, function(arc: T[])
			{
				if (equal(vertex, arc[1]))
				{
					builder.addSet(this.prcs(arc[0]));
				}
			}, this);
			
			return this._cache.set(key, builder.build());
		}

		subgraph(vertices: ExtSet<T>): Digraph<T>
		{
			var key = SolverCache.getKey("subgraph", [ vertices ]),
				result = this._cache.get<Digraph<T>>(key);
			if (result !== undefined)
			{
				return result;
			}

			if (this._builder === null)
			{
				this._builder = new DAGBuilder<T>()
					.addGraph(this._graph);
			}

			return this._cache.set(key, this._builder.buildSubgraph(vertices));
		}

		subgraphSolver(vertices: ExtSet<T>): DAGSolver<T>
		{
			if (vertices.hash === this._graph.vertices.hash)
			{
				return this;
			}

			var key = SolverCache.getKey("subgraphSolver", [ vertices ]),
				result = this._cache.get<DAGSolver<T>>(key);
			if (result !== undefined)
			{
				return result;
			}

			return this._cache.set(key, new DAGSolver<T>(this.subgraph(vertices)));
		}

		sucs(vertex: T): ExtSet<T>
		{
			if (!ext.contains(this._graph[0], vertex))
			{
				return EMPTY_SET;
			}
			
			var key = SolverCache.getKey("sucs", [ vertex ]),
				result = this._cache.get<ExtSet<T>>(key);
			if (result !== undefined)
			{
				return result;
			}
			
			var builder = new ExtSetBuilder<T>();
			builder.add(vertex);
			ext.each(this._graph.arcs, (arc: Arc<T>) =>
			{
				if (equal(vertex, arc[0]))
				{
					builder.addSet(this.sucs(arc[1]));
				}
			}, this);
			
			return this._cache.set(key, builder.build());
		}
		
		toDistanceMatrix(): DistanceMatrix<T>
		{
			var builder = new DistanceMatrixBuilder<T>(),
				vertices = ext.list(this._graph.vertices),
				n = vertices.length;
			for (var i = 0; i < n; ++i)
			{
				var x = vertices[i];
				for (var j = i; j < n; ++j)
				{
					var y = vertices[j];
					builder.addDistance(x, y, this.distance(x, y));
				}
			}
			return builder.build();
		}
	}
}