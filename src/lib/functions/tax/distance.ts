/// <reference path="../dst/get.ts"/>
/// <reference path="../ext/each.ts"/>
/// <reference path="../../builders/RangeBuilder.ts"/>
/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/DistanceMatrix.ts"/>
/// <reference path="../../interfaces/Range.ts"/>
/// <reference path="../../interfaces/Taxic.ts"/>
module Haeckel.tax
{
	export function distance(matrix: DistanceMatrix<Taxic>, focus: Taxic, taxon: Taxic): Range
	{
		if (!matrix)
		{
			throw new Error('No distance matrix provided.');
		}
		if (!focus || !taxon || focus.empty || taxon.empty)
		{
			return EMPTY_SET;
		}
		var builder = new RangeBuilder;
		ext.each(focus.units, (x: Taxic) =>
		{
			ext.each(taxon.units, (y: Taxic) =>
			{
				builder.addRange(dst.get(matrix, x, y));
			});
		});
		return builder.build();
	}
}