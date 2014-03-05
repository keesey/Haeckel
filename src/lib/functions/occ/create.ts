/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
/// <reference path="../../interfaces/Occurrence.ts"/>
/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.occ
{
	export function create(count: Range = null, geo: ExtSet<GeoCoords[]> = null, time: Range = null): Occurrence
	{
		var occurrence: Occurrence =
		{
			count: count ? count : EMPTY_SET,
			geo: geo ? geo : EMPTY_SET,
			hash: null,
			time: time ? time : EMPTY_SET
		};
		occurrence.hash = "(occurrence:" + occurrence.count.hash + ":" + occurrence.geo.hash + ":" + occurrence.time.hash + ")";
		return Object.freeze(occurrence);
	}
}