/// <reference path="RANGE_POS_INF.ts"/>
/// <reference path="../functions/chr/createRange.ts"/>
/// <reference path="../interfaces/Character.ts"/>
/// <reference path="../interfaces/Range.ts"/>
module Haeckel
{
	export var COUNT_CHARACTER: Character<Range> = chr.createRange(RANGE_POS_INF, false, false);
}
