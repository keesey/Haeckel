///<reference path='Arc.ts' />
///<reference path='ExtSet.ts' />

module Haeckel
{
	export interface Digraph<V> extends Array<ExtSet<any>>
	{
		arcs: ExtSet<Arc<V>>;
		vertices: ExtSet<V>;
	}

	export function isDigraph(o: Digraph<any>)
	{
		return Array.isArray(o) && o.length === 2 && isExtSet(o.arcs) && isExtSet(o.vertices);
	}
}
