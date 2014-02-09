/// <reference path="DigraphBuilder.ts"/>
/// <reference path="../constants/EMPTY_DIGRAPH.ts"/>
/// <reference path="../functions/ext/contains.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../interfaces/Arc.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>

module Haeckel
{
	export class DAGBuilder<T> implements Builder<Digraph<T>>
	{
		private _builder: DigraphBuilder<T> = new DigraphBuilder<T>();

		private _closure: Digraph<T> = null;

		private _reduction: Digraph<T> = null;

		addArc(head: T, tail: T)
		{
			if (equal(head, tail))
			{
				throw new Error("Cannot add a loop to a DAG: [" + head + ", " + tail + "].");
			}
			if (this._builder.containsArc([ head, tail ]))
			{
				return this;
			}
			if (this._builder.containsArc([ tail, head ]))
			{
				throw new Error("Arc would introduce cycle: [" + head + ", " + tail + "].");
			}
			var closure = this.buildClosure();
			if (ext.contains(closure[1], [ tail, head ]))
			{
				throw new Error("Arc would introduce cycle: [" + head + ", " + tail + "].");
			}
			this._closure = this._reduction = null;
			this._builder.addArc(head, tail);
			return this;
		}

		addArcs(arcs: ExtSet<Arc<T>>)
		{
			ext.each(arcs, (arc: Arc<T>) =>
			{
				this.addArc(arc[0], arc[1]);
			}, this);
			return this;
		}

		addGraph(graph: Digraph<T>)
		{
			return this
				.addVertices(graph.vertices)
				.addArcs(graph.arcs);
		}

		addVertex(vertex: T)
		{
			this._builder.addVertex(vertex);
			return this;
		}

		addVertices(vertices: ExtSet<T>)
		{
			this._builder.addVertices(vertices);
			return this;
		}

		adjacencyMatrix(vertices: T[] = null): boolean[][]
		{
			if (vertices === null)
			{
				vertices = ext.list(this.buildVertices());
			}
			var n = vertices.length,
				matrix: boolean[][] = new Array(n);
			if (n === 0)
			{
				return matrix;
			}
			var basicRow: boolean[] = new Array(n);
			for (var i = 0; i < n; ++i)
			{
				basicRow[i] = false;
			}
			var indices: { [hash: string]: number; } = {};
			for (var i = 0; i < n; ++i)
			{
				var vertex = vertices[i];
				matrix[i] = basicRow.concat();
				indices[hash(vertex)] = i;
			}
			ext.each(this.buildArcs(), function(arc: Arc<T>)
			{
				var headIndex: number = indices[hash(arc[0])],
					tailIndex: number = indices[hash(arc[1])];
				matrix[headIndex][tailIndex] = true;
			});
			return matrix;
		}

		build(): Digraph<T>
		{
			return this._builder.build();
		}

		buildArcs(): ExtSet<Arc<T>>
		{
			return this._builder.buildArcs();
		}

		buildClosure(): Digraph<T>
		{
			if (this._closure === null)
			{
				var vertices = this._builder.buildVertices();
				if (vertices.empty)
				{
					return this._closure = EMPTY_DIGRAPH;
				}
				var n = vertices.size,
					vertexArray = ext.list(vertices),
					closureMatrix = this.adjacencyMatrix(vertexArray),
					i: number,
					j: number,
					k: number;
				for (k = 0; k < n; ++k)
				{
					for (i = 0; i < n; ++i)
					{
						if (closureMatrix[i][k])
						{
							for (j = 0; j < n; ++j)
							{
								closureMatrix[i][j] = (closureMatrix[i][j] || (closureMatrix[i][k] && closureMatrix[k][j]));
							}
						}
					}
				}
				var arcs = new ExtSetBuilder<Arc<T>>();
				for (i = 0; i < n; ++i)
				{
					for (j = 0; j < n; ++j)
					{
						if (closureMatrix[i][j])
						{
							arcs.add([ vertexArray[i], vertexArray[j] ]);
						}
					}
				}
				var closure: any = [ vertices, arcs.build() ];
				closure.vertices = vertices;
				closure.arcs = closure[1];
				this._closure = <Digraph<T>> Object.freeze(closure);
			}
			return this._closure;
		}

		buildReduction(): Digraph<T>
		{
			if (this._reduction === null)
			{
				var closure = this.buildClosure();
				if (closure.vertices.empty)
				{
					return this._reduction = EMPTY_DIGRAPH;
				}
				var arcs = new ExtSetBuilder<Arc<T>>();
				arcs.addSet(closure.arcs);
				ext.each(closure.vertices, function(x: T)
				{
					ext.each(closure.vertices, function(y: T)
					{
						if (x !== y)
						{
							ext.each(closure.vertices, function(z: T)
							{
								if (arcs.contains([ x, z ]) && arcs.contains([ x, y ]) && arcs.contains([ y, z ]))
								{
									arcs.remove([ x, z ]);
								}
							});
						}
					});
				});
				var reduction: any = [ closure.vertices, arcs.build() ];
				reduction.vertices = closure.vertices;
				reduction.arcs = reduction[1];
				this._reduction = <Digraph<T>> Object.freeze(reduction);
			}
			return this._reduction;
		}

		buildSubgraph(vertices: ExtSet<T>): Digraph<T>
		{
			return this._builder.buildSubgraph(vertices);
		}

		buildVertices(): ExtSet<T>
		{
			return this._builder.buildVertices();
		}

		containsArc(arc: Arc<T>): boolean
		{
			return this._builder.containsArc(arc);
		}

		containsVertex(vertex: T): boolean
		{
			return this._builder.containsVertex(vertex);
		}

		removeArc(head: T, tail: T)
		{
			this._closure = this._reduction = null;
			this._builder.removeArc(head, tail);
			return this;
		}

		removeVertex(vertex: T)
		{
			this._closure = this._reduction = null;
			this._builder.removeVertex(vertex);
			return this;
		}

		replaceVertex(oldVertex: T, newVertex: T)
		{
			this._closure = this._reduction = null;
			this._builder.replaceVertex(oldVertex, newVertex);
			return this;
		}

		reset()
		{
			this._closure = this._reduction = null;
			this._builder.reset();
			return this;
		}
	}
}