/// <reference path="../functions/chr/createDomain.ts"/>
/// <reference path="../functions/geo/readRegions.ts"/>
/// <reference path="../interfaces/GeoCoords.ts"/>

module Haeckel
{
	export var GEO_CHARACTER = chr.createDomain<GeoCoords[]>('{GeoCoords}', geo.readRegions);
}
