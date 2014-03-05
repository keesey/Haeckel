/// <reference path="../ext/each.ts"/>
/// <reference path="../rng/intersect.ts"/>
/// <reference path="../rng/multiply.ts"/>
/// <reference path="../../builders/ExtSetBuilder.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/Occurrence.ts"/>
/// <reference path="../../interfaces/Range.ts"/>
module Haeckel.occ
{
	export function timeSlice(time: Range, occurrences: ExtSet<Occurrence>): ExtSet<Occurrence>
	{
		var sliceBuilder = new ExtSetBuilder<Occurrence>();
		if (occurrences && !occurrences.empty)
		{
			ext.each(occurrences, (occurrence: Occurrence) =>
			{
				var intersectTime = rng.intersect(time, occurrence.time);
				if (!intersectTime.empty)
				{
					var ratio = (occurrence.time.size === 0) ? 1 : (intersectTime.size / occurrence.time.size),
						intersectCount = (ratio === 1) ? occurrence.count : rng.multiply(occurrence.count, ratio);
					sliceBuilder.add(create(intersectCount, occurrence.geo, intersectTime));
				}
			});
		}
		return sliceBuilder.build();
	}
}