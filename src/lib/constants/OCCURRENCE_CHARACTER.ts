/// <reference path="../functions/chr/createDomain.ts"/>
/// <reference path="../functions/occ/readOccurrences.ts"/>
/// <reference path="../interfaces/GeoCoords.ts"/>

module Haeckel
{
	export var OCCURRENCE_CHARACTER = chr.createDomain<Occurrence>('{Occurrence}', occ.readOccurrences);
}
