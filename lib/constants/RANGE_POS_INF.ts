/// <reference path="../interfaces/Range.ts"/>
module Haeckel
{
	export var RANGE_POS_INF: Range = Object.freeze({
		empty: false,
		hash: "[0...Infinity]",
		max: Infinity,
		mean: Infinity,
		min: 0,
		size: Infinity
	});
}