/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/RANGE_0_TO_1.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../functions/rec/createFromBoundingClientRect.ts"/>
/// <reference path="../interfaces/Axis.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
module Haeckel
{
	var DEFAULT_AXIS: Axis = Object.freeze({
			range: RANGE_0_TO_1,
			step: 0.1
		});

	var LINE_STYLE: { [style: string]: string; } = {
			"stroke-opacity": '1',
			"stroke-linecap": "square"
		};

	export class AxisChart implements Renderer
	{
		area: Rectangle = EMPTY_SET;

		axis: Axis = DEFAULT_AXIS;

		lineStyle: { [style: string]: string; } = null;

		render(parent: ElementBuilder): ElementBuilder
		{
			function vLine(x: number, top: number, bottom: number): ElementBuilder
			{
				return g.child(SVG_NS, 'path')
					.attrs(SVG_NS,
						{
							'path': "M" + x + " " + top + "V " + bottom,
							'style': lineStyle
						});
			}

			var area = this.area.empty ? rec.createFromBoundingClientRect(<SVGSVGElement> parent.build()) : this.area,
				axis = this.axis,
				lineStyle = ElementBuilder.style(this.lineStyle || LINE_STYLE),
				g = parent.child(SVG_NS, 'g');
			if (isAxis(axis) && !axis.range.empty && axis.step > 0 && isFinite(axis.step))
			{
				var factor = area.width / axis.range.size,
					start = axis.range.min,
					end = axis.range.max,
					step = axis.step;
				for (var value = start; value <= end; value += step)
				{
					var x = (value - start) * factor + area.left;
					vLine(x, area.top, area.bottom);
				}
			}
			return g;
		}
	}
}