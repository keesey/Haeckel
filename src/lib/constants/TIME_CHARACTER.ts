/// <reference path="RANGE_INF.ts" />
/// <reference path="../functions/chr/createRange.ts" />
/// <reference path="../interfaces/Character.ts" />
/// <reference path="../interfaces/Range.ts" />
module Haeckel
{
	export var TIME_CHARACTER: Character<Range> = chr.createRange(RANGE_NEG_INF, true, true);
}
