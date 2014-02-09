/// <reference path="EMPTY_SET.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>

module Haeckel
{
	function create(): Digraph<any>
	{
		var g: any = [ EMPTY_SET, EMPTY_SET ];
		g.vertices = EMPTY_SET;
		g.arcs = EMPTY_SET;
		return <Digraph<any>> Object.freeze(g);
	}

	export var EMPTY_DIGRAPH = create();
}