/// <reference path="ChronoChart.ts"/>
/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/COUNT_CHARACTER.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/OCCURRENCE_CHARACTER.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/create.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/occ/create.ts"/>
/// <reference path="../functions/pt/create.ts"/>
/// <reference path="../functions/rec/contains.ts"/>
/// <reference path="../functions/rec/createFromCoords.ts"/>
/// <reference path="../functions/rec/intersect.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Occurrence.ts"/>
/// <reference path="../interfaces/Point.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	var MAX_RANDOM_ATTEMPTS = 32;

	var POINT_STYLE: { [name: string]: string; } = {
		'fill': BLACK.hex,
		'fill-opacity': '1',
		'stroke': 'none'
	};

	var RECT_STYLE: { [name: string]: string; } = POINT_STYLE;

	function DEFAULT_DRAW_AREA(builder: ElementBuilder, area: Rectangle, unit: Taxic)
	{
		builder.child(SVG_NS, 'rect')
			.attrs(SVG_NS,
				{
					'height': Math.max(area.height, this.radius * 2) + 'px',
					'width': Math.max(area.width, this.radius * 2) + 'px',
					'x': area.left + 'px',
					'y': area.top + 'px'
				})
			.attrs(SVG_NS, RECT_STYLE);
	}

	function DEFAULT_DRAW_POINT(builder: ElementBuilder, p: Point, unit: Taxic)
	{
		builder.child(SVG_NS, 'circle')
			.attrs(SVG_NS, {
					'cx': p.x + 'px',
					'cy': p.y + 'px',
					'r': this.radius + 'px'
				})
			.attrs(SVG_NS, POINT_STYLE);
	}

	export enum OccurrenceCountStrategy
	{
		MIN,
		MEAN,
		MAX
	}

	function getCount(count: Range, strategy: OccurrenceCountStrategy): number
	{
		switch (strategy)
		{
			case OccurrenceCountStrategy.MIN:
				return count.min;
			case OccurrenceCountStrategy.MEAN:
				return count.mean;
			case OccurrenceCountStrategy.MAX:
				return count.max;
			default:
				return undefined;
		}
	}

	export class OccurrencePlotChart extends ChronoCharChart implements Renderer
	{
		countStrategy: OccurrenceCountStrategy = OccurrenceCountStrategy.MIN;

		radius = 1;

		random: () => number = Math.random;

		drawArea: (builder: ElementBuilder, area: Rectangle, unit: Taxic) => any = DEFAULT_DRAW_AREA;

		drawPoint: (builder: ElementBuilder, p: Point, unit: Taxic) => any = DEFAULT_DRAW_POINT;

		private drawPoints(builder: ElementBuilder, plots: { [key: string]: boolean; }, area: Rectangle, unit: Taxic, count: number)
		{
			var point: Point;
			for (var i = 0; i < count; ++i)
			{
				point = this.getIndividualPoint(plots, area);
				if (rec.contains(this.area, point))
				{
					this.drawPoint(builder, point, unit);
				}
			}
		}

		private getIndividualPoint(plots: { [key: string]: boolean; }, area: Rectangle): Point
		{
			var times = 0,
				x: number,
				y: number,
				w2 = area.width / 2,
				h2 = area.height / 2;
			do
			{
				var a = this.random() * Math.PI * 2,
					r = this.random();
				x = Math.round(area.centerX + Math.cos(a) * r * w2);
				y = Math.round(area.centerY + Math.sin(a) * r * h2);
				var key = String(x) + "," + String(y);
				if (plots[key])
				{
					times++;
				}
				else
				{
					plots[key] = true;
					break;
				}
			}
			while (times < MAX_RANDOM_ATTEMPTS);
			return pt.create(x, y);
		}

		render(parent: ElementBuilder): ElementBuilder
		{
			var g = parent.child(SVG_NS, 'g');
			if (this.time.size === 0 || this.area.area === 0)
			{
				return g;
			}

			var plots: { [key: string]: boolean; } = {},
				matrix = this.characterMatrix,
				area = this.area;

			ext.each(matrix.taxon.units, (unit: Taxic) =>
			{
				var occurrences = <ExtSet<Occurrence>> chr.states(matrix, unit, OCCURRENCE_CHARACTER);
				if (!isExtSet(occurrences))
				{
					var count = <Range> chr.states(matrix, unit, COUNT_CHARACTER);
					if (isRange(count))
					{
						var time = <Range> chr.states(matrix, unit, TIME_CHARACTER);
						occurrences = ext.create([ occ.create(count, null, time) ]);
					}
					else
					{
						occurrences = EMPTY_SET;
					}
				}
				if (!occurrences.empty)
				{
					var x = this.getTaxonX(unit);
					if (!x.empty)
					{
						ext.each(occurrences, (occurrence: Occurrence) =>
						{
							var count = occurrence.count;
							if (!count.empty && count.max > 0)
							{
								var y = this.getTimeY(occurrence.time);
								if (!y.empty)
								{
									var rect = rec.createFromCoords(x.min, y.min, x.max, y.max);
									var countNum = getCount(count, this.countStrategy);
									if (rect.area <= countNum)
									{
										var rect = rec.intersect(this.area, area);
										if (!rect.empty)
										{
											var right = Math.floor(rect.right),
												bottom = Math.floor(rect.bottom),
												top = Math.floor(rect.top),
												left = Math.floor(rect.left);
											for (var x = left; x <= right; ++x)
											{
												for (var y = top; y <= bottom; ++y)
												{
													var key = String(x) + "," + String(y);
													plots[key] = true;
												}
											}
											this.drawArea(g, rect, unit);
										}
									}
									else
									{
										this.drawPoints(g, plots, rect, unit, countNum);
									}
								}
							}
						}, this);
					}
				}
			}, this);

			return g;
		}
	}
}