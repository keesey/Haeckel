/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/rng/create.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
module Haeckel
{
	export class ChronoChart
	{
		area: Rectangle = EMPTY_SET;

		time = RANGE_0;

		copyFrom(chart: ChronoChart)
		{
			this.area = chart.area;
			this.time = chart.time;
			return this;
		}

		getTimeY(time: Range): Range
		{
			var area = this.area;
			if (!isRange(time) || time.empty)
			{
				return EMPTY_SET;
			}
			var size = Math.max(1, this.time.size),
				y1 = area.bottom - (area.height * (time.max - this.time.min) / size) - 0.5,
				y2 = area.bottom - (area.height * (time.min - this.time.min) / size) + 0.5;
			return rng.create(y1, y2);
		}
	}
}