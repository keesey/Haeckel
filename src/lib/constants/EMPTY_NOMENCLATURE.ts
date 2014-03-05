/// <reference path="EMPTY_SET.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
module Haeckel
{
	export var EMPTY_NOMENCLATURE: Nomenclature = Object.freeze({
		nameMap: Object.freeze({}),
		names: EMPTY_SET,
		taxa: EMPTY_SET
	});
}