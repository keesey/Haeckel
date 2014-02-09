/// <reference path="create.ts"/>
/// <reference path="../geo/readRegions.ts"/>
/// <reference path="../rng/read.ts"/>
/// <reference path="../../interfaces/Occurrence.ts"/>
/// <reference path="../../interfaces/OccurrenceData.ts"/>
module Haeckel.occ
{
	export function read(data: OccurrenceData): Occurrence
	{
		if (data === null)
		{
			return null;
		}
		return create(rng.read(data.count), geo.readRegions(data.geo), rng.read(data.time));
	}
}