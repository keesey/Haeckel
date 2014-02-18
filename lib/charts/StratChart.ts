/// <reference path="ChronoChart.ts"/>
/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/rng/compare.ts"/>
/// <reference path="../functions/rng/create.ts"/>
/// <reference path="../functions/rng/overlap.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Stratum.ts"/>
module Haeckel
{
	var BAR_STYLE: { [name: string]: string; } = {
		'stroke-opacity': '1',
		'stroke': '#000000',
		'stroke-dasharray': '2,8'
	};

	export class StratChart extends ChronoChart implements Renderer
	{
		minStrokeWidth = 0.5;

		strata: ExtSet<Stratum> = EMPTY_SET;

		type: string = null;

		render(svg: SVGSVGElement): SVGGElement
		{
			var strata: Stratum[] = [],
				yRange = rng.create(this.area.top, this.area.bottom),
				boundaries = new ExtSetBuilder<Range>(),
				y: Range;
			ext.each(this.strata, (stratum: Stratum) =>
			{
				if (this.type === null || this.type === stratum.type)
				{
					y = this.getTimeY(stratum.start);
					if (rng.overlap(yRange, y))
					{
						boundaries.add(y);
					}
					y = this.getTimeY(stratum.end);
					if (rng.overlap(yRange, y))
					{
						boundaries.add(y);
					}
				}
			}, this);
			var g = new ElementBuilder(svg.ownerDocument, SVG_NS, 'g'),
				boundaryList = ext.list(boundaries.build()).sort(rng.compare);
			arr.each(boundaryList, (boundary: Range) =>
			{
				var line = g.child(SVG_NS, 'path')
					.attr(SVG_NS, 'd', 'M' + this.area.left + " " + boundary.mean + "h" + this.area.width)
					.attrs(SVG_NS, BAR_STYLE)
					.attr(SVG_NS, 'stroke-width', Math.max(this.minStrokeWidth, boundary.size) + 'px');
			}, this);
			return <SVGGElement> g.attach(svg).build();
		}
	}
}