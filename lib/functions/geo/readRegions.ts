/// <reference path="readRegion.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/GeoCoords.ts"/>
/// <reference path="../../interfaces/GeoData.ts"/>
module Haeckel.geo
{
	export function readRegions(data: GeoData): ExtSet<GeoCoords[]>;
	export function readRegions(data: number[][][]): ExtSet<GeoCoords[]>;
	export function readRegions(data: any): ExtSet<GeoCoords[]>
	{
		var builder = new ExtSetBuilder<GeoCoords[]>(),
			regionName: string,
			region: GeoCoords[];
		if (Array.isArray(data))
		{
			for (var i = 0, n = data.length; i < n; ++i)
			{
				region = readRegion(<number[][]> data[i]);
				if (region.length > 0)
				{
					builder.add(region);
				}
			}
		}
		else
		{
			for (regionName in data)
			{
				region = readRegion(<number[][]> data[regionName]);
				if (region.length > 0)
				{
					builder.add(region);
				}
			}
		}
		return builder.build();
	}
}