/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../builders/PathBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/DEFAULT_PROJECTOR.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/geo/project.ts"/>
/// <reference path="../functions/pt/create.ts"/>
/// <reference path="../functions/pt/random.ts"/>
/// <reference path="../functions/pt/weights.ts"/>
/// <reference path="../functions/rec/create.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/GeoCoords.ts"/>
/// <reference path="../interfaces/Occurrence.ts"/>
/// <reference path="../interfaces/Point.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
module Haeckel
{
	var DEFAULT_AREA = rec.create(0, 0, 360, 180);

	export class GeoChart implements Renderer
	{
		area = DEFAULT_AREA;

		color = BLACK;

		minThickness = 1;

		occurrences: ExtSet<Occurrence> = EMPTY_SET;

		projector: (coords: GeoCoords) => Point = DEFAULT_PROJECTOR;

		random: () => number = Math.random;

		project(coords: GeoCoords): Point
		{
			var p = this.projector(coords),
				area = this.area,
				result = pt.create(area.x + p.x * area.width, area.y + p.y * area.height);
			return result;
		}

		render(svg: SVGSVGElement): SVGGElement
		{
			function createLine(a: Point, b: Point, occurrence: Occurrence)
			{
				g.child(SVG_NS, 'path')
					.attr(SVG_NS, 'd', 'M' + a.x + ' ' + a.y + 'L' + b.x + ' ' + b.y)
					.attr(SVG_NS, 'stroke', color.hex)
					.attr(SVG_NS, 'stroke-opacity', '1')
					.attr(SVG_NS, 'stroke-width', minThickness + 'px');
			}

			function createPoint(p: Point, occurrence: Occurrence)
			{
				g.child(SVG_NS, 'circle')
					.attr(SVG_NS, 'cx', p.x + 'px')
					.attr(SVG_NS, 'cy', p.y + 'px')
					.attr(SVG_NS, 'r', minThickness + 'px')
					.attr(SVG_NS, 'color', color.hex)
					.attr(SVG_NS, 'stroke', color.hex)
					.attr(SVG_NS, 'stroke-opacity', '1')
					.attr(SVG_NS, 'stroke-width', minThickness + 'px');
			}

			function createPolygon(points: Point[], occurrence: Occurrence)
			{
				if (!pathBuilder)
				{
					pathBuilder = new PathBuilder();
				}
				else
				{
					pathBuilder.reset();
				}
				arr.each(points, (point: Point) => pathBuilder.add(point));
				g.child(SVG_NS, 'path')
					.attr(SVG_NS, 'd', pathBuilder.build())
					.attr(SVG_NS, 'fill', color.hex)
					.attr(SVG_NS, 'fill-opacity', '1')
					.attr(SVG_NS, 'stroke', color.hex)
					.attr(SVG_NS, 'stroke-opacity', '1')
					.attr(SVG_NS, 'stroke-width', minThickness + 'px');
			}

			function fill(shapes: Point[][], occurrence: Occurrence)
			{
				arr.each(shapes, (shape: Point[]) =>
				{
					var n = shape.length;
					switch(n)
					{
						case 0:
						{
							break;
						}
						case 1:
						{
							createPoint(shape[0], occurrence);
							break;
						}
						case 2:
						{
							createLine(shape[0], shape[1], occurrence);
							break;
						}
						default:
						{
							createPolygon(shape, occurrence);
							break;
						}
					}
				});
			}

			var pathBuilder: PathBuilder,
				color = this.color,
				minThickness = this.minThickness,
				self = this,
				projector = (coords: GeoCoords) => self.project(coords),
				g = new ElementBuilder(svg.ownerDocument, SVG_NS, 'g'),
				i: number;

			ext.each(this.occurrences, (occurrence: Occurrence) =>
			{
				if (occurrence.count.empty)
				{
					return;
				}
				var shapes = geo.project(occurrence.geo, projector),
					weights = pt.weights(shapes),
					n = weights.length;
				if (n === 0)
				{
					return;
				}
				var count = occurrence.count.mean;
				if (weights[n - 1] <= count)
				{
					fill(shapes, occurrence);
				}
				else
				{
					for (i = 0; i < count; ++i)
					{
						createPoint(pt.random(shapes, weights, this.random), occurrence);
					}
				}
			}, this);

			return <SVGGElement> g.attach(svg).build();
		}
	}
}