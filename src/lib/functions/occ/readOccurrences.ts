/// <reference path="read.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/OccurrenceData.ts"/>
/// <reference path="../../interfaces/Occurrence.ts"/>
module Haeckel.occ
{
	export function readOccurrences(data: OccurrenceData[]): ExtSet<Occurrence>;
	export function readOccurrences(data: { [key: string]: OccurrenceData; }): ExtSet<Occurrence>;
	export function readOccurrences(data: any): ExtSet<Occurrence>
	{
		var builder = new ExtSetBuilder<Occurrence>(),
			occurrence: Occurrence;
		if (Array.isArray(data))
		{
			for (var i = 0, n = data.length; i < n; ++i)
			{
				occurrence = read(data[i]);
				if (occurrence !== null)
				{
					builder.add(occurrence);
				}
			}
		}
		else if (typeof data === "object")
		{
			for (var k in data)
			{
				occurrence = read(data[k]);
				if (occurrence !== null)
				{
					builder.add(occurrence);
				}
			}
		}
		return builder.build();
	}
}