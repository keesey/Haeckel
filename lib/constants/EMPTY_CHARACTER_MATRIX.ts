/// <reference path="EMPTY_SET.ts"/>
/// <reference path="../interfaces/CharacterMatrix.ts"/>
/// <reference path="../interfaces/Set.ts"/>
module Haeckel
{
	export var EMPTY_CHARACTER_MATRIX: CharacterMatrix<Set> = Object.freeze({
		characters: EMPTY_SET,
		characterList: Object.freeze([]),
		hashMap: Object.freeze({}),
		taxon: EMPTY_SET
	});
}