/// <reference path="../builders/LinearGradientBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_DISTANCE_MATRIX.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/WHITE.ts"/>
/// <reference path="../functions/dst/max.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/nom/forTaxon.ts"/>
/// <reference path="../functions/rec/create.ts"/>
/// <reference path="../functions/rng/multiply.ts"/>
/// <reference path="../functions/tax/distance.ts"/>
/// <reference path="../interfaces/Color.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export interface ProximityBar
	{
		distance: Range;
		
		names: ExtSet<string>;
		
		normalizedDistance: Range;
		
		taxon: Taxic;
	}
	
	var BAR_STYLE: { [name: string]: string; } =
	{
		"fill-opacity" : '1',
		"stroke-opacity" : '0'
	};

	var DEFAULT_BAR_SORT = function(a: ProximityBar, b: ProximityBar): number
	{
		if (a === b)
		{
			return 0;
		}
		if (a.distance.mean === b.distance.mean)
		{
			var aNames = ext.list(a.names).sort().join("|"),
				bNames = ext.list(b.names).sort().join("|");
			if (aNames < bNames)
			{
				return -1;
			}
			if (aNames > bNames)
			{
				return 1;
			}
			return 0;
		}
		return b.distance.mean - a.distance.mean;
	}

	var DEFAULT_COLOR_MAP = function(taxon: Taxic): Color
	{
		return BLACK;
	}

	function DEFAULT_LABELER(bar: ProximityBar, rectangle: Rectangle, builder: ElementBuilder): void
	{
	}

	export class ProximityBarChart implements Renderer
	{
		area: Rectangle = EMPTY_SET;
		
		barSort: (a: ProximityBar, b: ProximityBar) => number = DEFAULT_BAR_SORT;
		
		colorMap: (taxon: Taxic) => Color = DEFAULT_COLOR_MAP;
		
		distanceMatrix = EMPTY_DISTANCE_MATRIX;

		focus: Taxic = EMPTY_SET;
		
		labeler: (bar: ProximityBar, rectangle: Rectangle, builder: ElementBuilder) => void = DEFAULT_LABELER;
		
		nomenclature = EMPTY_NOMENCLATURE;
		
		spacing = 1;
		
		taxa: ExtSet<Taxic>;

		constructor(private id: string)
		{
		}
		
		private getBars(): ProximityBar[]
		{
			var bars: ProximityBar[] = [],
				focus = this.focus,
				nomenclature = this.nomenclature,
				factor = 1 / dst.max(this.distanceMatrix);
			ext.each(this.taxa, (taxon: Taxic) =>
			{
				var distance = tax.distance(this.distanceMatrix, focus, taxon);
				if (distance)
				{
					bars.push({
						distance: distance,
						names: nom.forTaxon(nomenclature, taxon),
						normalizedDistance: rng.multiply(distance, factor),
						taxon: taxon
					});
				}
			}, this);
			return bars.sort(this.barSort);
		}
		
		private renderBar(builder: ElementBuilder, defsBuilder: ElementBuilder, bar: ProximityBar, index: number, barWidth: number)
		{
			if (bar.normalizedDistance.empty)
			{
				return;
			}
			var x = this.area.left + barWidth * index,
				yMin = this.area.top + bar.normalizedDistance.min * this.area.height,
				yMax = this.area.top + bar.normalizedDistance.max * this.area.height,
				yBottom = this.area.bottom,
				color = this.colorMap(bar.taxon),
				gradientID = this.id + '-gradient-' + index;
			if (yMin === yBottom)
			{
				yMin -= 1;
				yMax -= 1;
			}
			var fillBuilder = new LinearGradientBuilder(defsBuilder, gradientID),
				yMin = this.area.top + bar.normalizedDistance.min * this.area.height,
				yMax = this.area.top + bar.normalizedDistance.max * this.area.height,
				yBottom = this.area.bottom;
			fillBuilder.startOpacity = 0;
			fillBuilder.start = color;
			fillBuilder.end = color;
			fillBuilder.add({
				color: color,
				opacity: 1,
				ratio: (yMax - yMin) / (yBottom - yMin)
			});
			fillBuilder.build();
			var rectangle = rec.create(x + this.spacing / 2, yMin, barWidth - this.spacing, yBottom - yMin),
				barGroup = builder.child(SVG_NS, 'g')
					.attr(SVG_NS, 'id', this.id + '-bar-' + index);
			barGroup.child(SVG_NS, 'rect')
				.attrs(SVG_NS,{
						'x': rectangle.x + 'px',
						'y': rectangle.y + 'px',
						'width': rectangle.width + 'px',
						'height': rectangle.height + 'px',
						'fill': 'url(#' + gradientID + ')'
					})
				.attrs(SVG_NS, BAR_STYLE);
			this.labeler(bar, rectangle, barGroup);
		}

		render(parent: ElementBuilder, defs: () => ElementBuilder): ElementBuilder
		{
			var g = parent.child(SVG_NS, 'g'),
				bars = this.getBars(),
				n = bars.length,
				i: number;
			if (n !== 0)
			{
				var barWidth = this.area.width / n;
				for (i = 0; i < n; ++i)
				{
					this.renderBar(g, defs(), bars[i], i, barWidth);
				}
			}
			return g;
		}
	}
}
