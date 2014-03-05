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

	var DEFAULT_LABEL_FUNCTION = (value: number) => String(value);

	var STYLE: { [style: string]: any; } = {
		"text-anchor": "middle"
	};

	export class AxisLabeler implements Renderer
	{
		area: Rectangle = EMPTY_SET;

		axis: Axis = DEFAULT_AXIS;

		style: { [style: string]: any; } = null;

		render(parent: ElementBuilder): ElementBuilder
		{
			function text(x: number, y: number, text: string): ElementBuilder
			{
				return g.child(SVG_NS, 'text')
					.attrs(SVG_NS, {
						'x': x + 'px',
						'y': y + 'px'
					})
					.text(text);
			}

			var area = this.area.empty ? rec.createFromBoundingClientRect(<SVGSVGElement> parent.build()) : this.area,
				axis = this.axis,
				style = ElementBuilder.style(this.style || STYLE),
				g = parent.child(SVG_NS, 'g');
			if (isAxis(axis) && !axis.range.empty && axis.step > 0 && isFinite(axis.step))
			{
				var factor = area.width / axis.range.size,
					start = axis.range.min,
					end = axis.range.max,
					step = axis.step,
					labelFunction = (axis.labelFunction === undefined) ? DEFAULT_LABEL_FUNCTION : axis.labelFunction;
				for (var value = start; value <= end; value += step)
				{
					var x = (value - start) * factor + area.left;
					text(x, area.bottom, labelFunction(value));
				}
			}
			return g;
		}
	}
}