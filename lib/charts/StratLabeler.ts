/// <reference path="StratChart.ts"/>
/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Stratum.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/rng/constrain.ts"/>
/// <reference path="../functions/rng/create.ts"/>
module Haeckel
{
	export class StratLabeler implements Renderer
	{
		chart: StratChart;
		
		fontSize = 12;
		
		margin = 12;
		
		render(svg: SVGSVGElement): SVGGElement
		{
			var g = new ElementBuilder(svg.ownerDocument, SVG_NS, 'g'),
				chart = this.chart,
				yRange = rng.create(chart.area.top, chart.area.bottom),
				x = chart.area.right - this.margin,
				type = chart.type;
			ext.each(this.chart.strata, (stratum: Stratum) =>
			{
				if (type !== null && stratum.type !== type)
				{
					return;
				}
				var time = rng.create(stratum.start.mean, stratum.end.mean),
					y = rng.constrain(chart.getTimeY(time), yRange),
					label = g.child(SVG_NS, 'text')
						.attrs(SVG_NS, {
								'x': x + 'px',
								'y': y.mean + 'px',
								'text-anchor': 'middle',
								'font-size': this.fontSize + 'px',
								'transform': 'rotate(90)'
							})
						.text(stratum.name),
					box = (<SVGTextElement> label.build()).getBBox();
				if (y.size < box.height)
				{
					label.detach();
				}
			}, this);
			return <SVGGElement> g.attach(svg).build();
		}
	}
}