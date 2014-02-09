/// <reference path="../interfaces/Range.ts"/>
module Haeckel
{
	export var RANGE_NEG_INF: Range = Object.freeze({
		empty: false,
		hash: "[-Infinity...0]",
		max: 0,
		mean: -Infinity,
		min: -Infinity,
		size: Infinity
	});
}