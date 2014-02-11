/// <reference path="ChronoChart.ts"/>
/// <reference path="../builders/RangeBuilder.ts"/>
/// <reference path="../constants/EMPTY_CHARACTER_MATRIX.ts"/>
/// <reference path="../constants/RANGE_0_TO_1.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/chr/toDistanceMatrix.ts"/>
/// <reference path="../functions/dst/get.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/rec/createFromCoords.ts"/>
/// <reference path="../functions/rng/add.ts"/>
/// <reference path="../functions/rng/constrain.ts"/>
/// <reference path="../functions/rng/create.ts"/>
/// <reference path="../functions/rng/multiply.ts"/>
/// <reference path="../functions/rng/sum.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class ChronoCharChart extends ChronoChart
	{
		characterMatrix = EMPTY_CHARACTER_MATRIX;

		horizontalRatioMap: (taxon: Taxic) => Range = (taxon: Taxic) => RANGE_0_TO_1;

		copyFrom(chart: ChronoChart)
		{
			super.copyFrom(chart);
			if (chart instanceof ChronoCharChart)
			{
				this.characterMatrix = (<ChronoCharChart> chart).characterMatrix;
				this.horizontalRatioMap = (<ChronoCharChart> chart).horizontalRatioMap;
			}
			return this;
		}

		getTaxonRect(taxon: Taxic): Rectangle
		{
			var time = <Range> chr.states(this.characterMatrix, taxon, TIME_CHARACTER),
				y = this.getTimeY(time);
			if (y.empty)
			{
				return EMPTY_SET;
			}
			var x = this.getTaxonX(taxon);
			return rec.createFromCoords(x.min, y.min, x.max, y.max);
		}

		getTaxonX(taxon: Taxic): Range
		{
			var hRatioRange = this.horizontalRatioMap(taxon),
				area = this.area;
			if (!isRange(hRatioRange))
			{
				return rng.create(area.left, area.right);
			}
			hRatioRange = rng.constrain(hRatioRange, RANGE_0_TO_1);
			var x1 = area.left + hRatioRange.min * area.width,
				x2 = area.left + hRatioRange.max * area.width + 1;
			return rng.create(x1, x2);
		}

		useCharacterMatrixForHorizontal(leftTaxon: Taxic, rightTaxon: Taxic)
		{
			function getDistance(focus: Taxic, taxon: Taxic): Range
			{
				if (!focus || !taxon || focus.empty || taxon.empty)
				{
					return EMPTY_SET;
				}
				var builder = new RangeBuilder();
				ext.each(focus.units, (x: Taxic) =>
				{
					ext.each(taxon.units, (y: Taxic) => builder.addRange(dst.get(distanceMatrix, x, y)));
				});
				return builder.build();
			}

			var distanceMatrix = chr.toDistanceMatrix(this.characterMatrix);
			this.horizontalRatioMap = function(taxon: Taxic): Range
			{
				var dl = getDistance(taxon, leftTaxon),
					dr = getDistance(taxon, rightTaxon);
				if (!dr.empty)
				{
					dr = rng.add(rng.multiply(dr, -1), 1);
				}
				if (dl.empty)
				{
					return dr;
				}
				if (dr.empty)
				{
					return dl;
				}
				var d = rng.sum([ dl, dr ]);
				return rng.multiply(d, 0.5);
			};
			return this;
		}
	}
}