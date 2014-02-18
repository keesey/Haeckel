/// <reference path="ChronoCharChart.ts"/>
/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/VECTOR_0.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/rec/combine.ts"/>
/// <reference path="../functions/vec/point.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../interfaces/Vector.ts"/>
module Haeckel
{
	var DEFAULT_NAME_VECTOR_MAP = (name: string) => VECTOR_0;

	var DEFAULT_SIZE_MAP = (area: number) => 12;

	var LABEL_STYLE: { [name: string]: string; } = { "text-anchor": "middle" };

	export class VectorChronoLabeler implements Renderer
	{
		chart: ChronoCharChart;

		nameVectorMap: (name: string) => Vector = DEFAULT_NAME_VECTOR_MAP;

		names: ExtSet<string> = EMPTY_SET;

		nomenclature = EMPTY_NOMENCLATURE;

		sizeMap: (area: number) => number = DEFAULT_SIZE_MAP;

		render(parent: ElementBuilder): ElementBuilder
		{
			var g = parent.child(SVG_NS, 'g');
			if (this.chart === null)
			{
				return g;
			}
			ext.each(this.names, (name: string) =>
			{
				var taxon = <Taxic> this.nomenclature.nameMap[name];
				if (!taxon || taxon.empty)
				{
					return;
				}
				var rectangles: Rectangle[] = [];
				ext.each(taxon.units, function(unit: Taxic)
				{
					rectangles.push(this.chart.getTaxonRect(unit));
				}, this);
				var rectangle = rec.combine(rectangles);

				if (!rectangle.empty)
				{
					var x = rectangle.centerX,
						y = rectangle.centerY,
						offset = vec.point(<Vector> this.nameVectorMap(name)),
						size = this.sizeMap(rectangle.area);
					if (!isFinite(size))
					{
						size = 12;
					}
					x += offset.x;
					y += offset.y;
					g.child(SVG_NS, 'text')
						.attrs(SVG_NS, {
								'x': x + 'px',
								'y': y + 'px',
								'font-size': size + 'px'	
							})
						.attrs(SVG_NS, LABEL_STYLE)
						.text(name);
				}
			}, this);
			return g;
		}
	}
}