/// <reference path="../interfaces/Range.ts"/>
module Haeckel
{
	export var RANGE_INF: Range = Object.freeze({
		empty: false,
		hash: "[-Infinity...Infinity]",
		max: Infinity,
		mean: 0,
		min: -Infinity,
		size: Infinity
	});
}