/// <reference path="ExtSetBuilder.ts"/>
/// <reference path="../functions/equal.ts"/>
/// <reference path="../functions/ext/contains.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/intersect.ts"/>
/// <reference path="../interfaces/Arc.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>

module Haeckel
{
	export class DigraphBuilder<T> implements Builder<Digraph<T>>
	{
		private _arcs = new ExtSetBuilder<Arc<T>>();

		private _vertices = new ExtSetBuilder<T>();

		addArc(head: T, tail: T)
		{
			this._vertices.add(head, tail);
			this._arcs.add([ head, tail ]);
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
			this._vertices.add(vertex);
			return this;
		}

		addVertices(vertices: ExtSet<T>)
		{
			this._vertices.addSet(vertices);
			return this;
		}

		build(): Digraph<T>
		{
			var vertices = this._vertices.build(),
				arcs = this._arcs.build(),
				result: any = [ vertices, arcs ];
			result.arcs = arcs;
			result.vertices = vertices;
			return <Digraph<T>> Object.freeze(result);
		}

		buildArcs(): ExtSet<Arc<T>>
		{
			return this._arcs.build();
		}

		buildSubgraph(vertices: ExtSet<T>): Digraph<T>
		{
			vertices = ext.intersect(vertices, this._vertices.build());
			var arcs = new ExtSetBuilder<T[]>();
			if (!vertices.empty)
			{
				ext.each(this._arcs.build(), (arc: T[]) =>
				{
					if (ext.contains(vertices, arc[0]) && ext.contains(vertices, arc[1]))
					{
						arcs.add(arc);
					}
				});
			}
			var result: any = [ vertices, arcs.build() ];
			result.vertices = vertices;
			result.arcs = result[1];
			return <Digraph<T>> Object.freeze(result);
		}

		buildVertices(): ExtSet<T>
		{
			return this._vertices.build();
		}

		containsArc(arc: Arc<T>): boolean
		{
			return this._arcs.contains(arc);
		}

		containsVertex(vertex: T): boolean
		{
			return this._vertices.contains(vertex);
		}

		removeArc(head: T, tail: T)
		{
			this._arcs.remove([ head, tail ]);
			return this;
		}

		removeVertex(vertex: T)
		{
			if (this._vertices.contains(vertex))
			{
				this._vertices.remove(vertex);
				var arcs = this._arcs;
				var h = hash(vertex);
				ext.each(arcs.build(), (arc: T[]) =>
				{
					if (h === hash(arc[0]) || h === hash(arc[1]))
					{
						arcs.remove(arc);
					}
				});
			}
			return this;
		}

		replaceVertex(oldVertex: T, newVertex: T)
		{
			if (equal(oldVertex, newVertex) || !this._vertices.contains(oldVertex))
			{
				return this;
			}
			if (this._vertices.contains(newVertex))
			{
				throw new Error("Graph already contains " + newVertex + ".");
			}
			this._vertices.remove(oldVertex);
			this._vertices.add(newVertex);
			var arcs = this._arcs,
				h = hash(oldVertex);
			ext.each(arcs.build(), (arc: Arc<T>) =>
			{
				var head = hash(arc[0]) === h,
					tail = hash(arc[1]) === h;
				if (head || tail)
				{
					arcs.remove(arc);
					arcs.add([ head ? newVertex : arc[0], tail ? newVertex : arc[1] ]);
				}
			});
			return this;
		}

		reset()
		{
			this._arcs.reset();
			this._vertices.reset();
			return this;
		}
	}
}