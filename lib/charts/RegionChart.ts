/// <reference path="ChronoCharChart.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/OCCURRENCE_CHARACTER.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/TAU.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/create.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/occ/create.ts"/>
/// <reference path="../functions/pt/add.ts"/>
/// <reference path="../functions/pt/create.ts"/>
/// <reference path="../functions/pt/distance.ts"/>
/// <reference path="../functions/pt/furthest.ts"/>
/// <reference path="../functions/pt/nearest.ts"/>
/// <reference path="../functions/ray/create.ts"/>
/// <reference path="../functions/ray/intersectSegments.ts"/>
/// <reference path="../functions/rec/combine.ts"/>
/// <reference path="../functions/rec/create.ts"/>
/// <reference path="../functions/rec/createFromCoords.ts"/>
/// <reference path="../functions/rec/segments.ts"/>
/// <reference path="../functions/vec/create.ts"/>
/// <reference path="../functions/vec/point.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Occurrence.ts"/>
/// <reference path="../interfaces/Point.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../interfaces/Vector.ts"/>
module Haeckel
{
	export interface Region
	{
		taxon: Taxic;
		typeRect: Rectangle;
		rectangles: Rectangle[];
	}

	export interface RegionTaxon
	{
		taxon: Taxic;
		type?: Taxic;
	}

	export interface RegionLabel
	{
		angle: number;
		attrs: { [attrName: string]: string; };
		label: string;
	}

	function condensePoints(points: Point[], threshold: number = 0): Point[]
	{
		var n = points.length;
		if (n <= 1)
		{
			return points;
		}
		var last = points[0],
			condensed: Point[] = [ last ];
		for (var i = 1; i < n; ++i)
		{
			var point = points[i];
			if (pt.distance(point, last) > threshold)
			{
				condensed.push(point);
				last = point;
			}
		}
		return condensed;
	}

	function points2path(points: Point[], threshold: number = 0): string
	{
		var points = condensePoints(points, threshold),
			n = points.length;
		if (n === 0)
		{
			return "";
		}
		var prev = points[0],
			origin = prev.x + " " + prev.y,
			path = "M" + origin;
		for (var i = 1; i < n; ++i)
		{
			var p = points[i];
			path += "Q" + prev.x + " " + prev.y + " " + p.x + " " + p.y;
			prev = p;
		}
		path += "Q" + prev.x + " " + prev.y + " " + origin + "Z";
		return path;
	}

	function smooth(vectors: Vector[]): Vector[]
	{
		var n = vectors.length,
			smoothed: Vector[] = new Array(n);
		for (var i = 0; i < n; ++i)
		{
			var v = vectors[i],
				va = (i === 0) ? vectors[n - 1] : vectors[i - 1],
				vb = (i === n - 1) ? vectors[0] : vectors[i + 1];
			smoothed[i] = vec.create(v.angle, (v.distance + va.distance + vb.distance) / 3);
		}
		return smoothed;
	}

	export class RegionChart extends ChronoCharChart implements Renderer
	{
		labels: (taxon: Taxic) => RegionLabel;

		margin = 12;

		minPointDistance = 1;

		pointsPerRegion = 12;

		smoothing = 2;

		shapeAttrFunction: (taxon?: Taxic) => { [attr: string]: string; } = null;

		shapeAttrs: { [attr: string]: string; } = {
			'fill-opacity': '0',
			'stroke': BLACK.hex,
			'stroke-width': '0.5',
			'stroke-dasharray': '2,8'
		};

		taxa: RegionTaxon[] = [];

		private addMargins(rect: Rectangle): Rectangle
		{
			var m = this.margin;
			if (m === 0 || isNaN(m))
			{
				return rect;
			}
			return rec.create(rect.x - m, rect.y - m, rect.width + 2 * m, rect.height + 2 * m);
		}

		private getRegions(): Region[]
		{
			var regions: Region[] = [],
				matrix = this.characterMatrix;
			for (var i = 0, n = this.taxa.length; i < n; ++i)
			{
				var taxon = this.taxa[i].taxon,
					type = this.taxa[i].type,
					rectangles: Rectangle[] = [];
				if (!isTaxic(type))
				{
					type = taxon;
				}
				ext.each(taxon.units, (unit: Taxic) =>
				{
					var occurrences = <ExtSet<Occurrence>> chr.states(matrix, unit, OCCURRENCE_CHARACTER);
					if (!isExtSet(occurrences))
					{
						var time = <Range> chr.states(matrix, unit, TIME_CHARACTER);
						occurrences = ext.create([ occ.create(null, null, time) ]);
					}
					if (!occurrences.empty)
					{
						var x = this.getTaxonX(unit);
						if (!x.empty)
						{
							ext.each(occurrences, (occurrence: Occurrence) =>
							{
								var y = this.getTimeY(occurrence.time);
								if (!y.empty)
								{
									var rect = rec.createFromCoords(x.min, y.min, x.max, y.max);
									if (!rect.empty)
									{
										rectangles.push(this.addMargins(rect));
									}
								}
							}, this);
						}
					}
				}, this);
				if (rectangles.length > 0)
				{
					regions.push({
						rectangles: rectangles,
						taxon: taxon,
						typeRect: this.getTaxonRect(type)
					});
				}
			}
			return regions;
		}

		render(svg: SVGSVGElement): SVGGElement
		{
			var g = new ElementBuilder(svg.ownerDocument, SVG_NS, 'g'),
				regions = this.getRegions();
			for (var i = 0, n = regions.length; i < n; ++i)
			{
				var region = regions[i],
					rectangle = rec.combine(region.rectangles);
				if (rectangle.empty)
				{
					continue;
				}
				var segments = rec.segments(region.rectangles),
					origin = pt.create(region.typeRect.centerX, region.typeRect.centerY),
					p = this.pointsPerRegion,
					vectors: Vector[] = [];
				for (var j = 0; j < p; ++j)
				{
					var angle = TAU * j / p,
						r = ray.create(origin, angle),
						candidates = ray.intersectSegments(r, segments),
						point: Point;
					if (candidates.length === 0)
					{
						r = ray.create(origin, angle + Math.PI);
						candidates = ray.intersectSegments(r, segments);
						point = pt.nearest(origin, candidates);
					}
					else
					{
						point = pt.furthest(origin, candidates);
					}
					if (!isPoint(point))
					{
						continue;
					}
					vectors.push(vec.create(angle, pt.distance(origin, point)));
				}
				p = vectors.length;
				if (p > 0)
				{
					for (j = 0; j < this.smoothing; ++j)
					{
						vectors = smooth(vectors);
					}
					var points: Point[] = new Array(p);
					for (j = 0; j < p; ++j)
					{
						points[j] = pt.add(origin, vec.point(vectors[j]));
					}
					var regionGroup = g.child(SVG_NS, 'g'),
						shape = regionGroup.child(SVG_NS, 'path')
							.attr(SVG_NS, 'd', points2path(points, this.minPointDistance)),
						attrs = (typeof this.shapeAttrFunction === 'function') ? this.shapeAttrFunction(region.taxon) : this.shapeAttrs;
					shape.attrs(SVG_NS, attrs);
					if (typeof this.labels === "function")
					{
						var label = this.labels(region.taxon);
						if (label)
						{
							r = ray.create(origin, label.angle);
							candidates = ray.intersectSegments(r, segments);
							point = pt.furthest(origin, candidates);
							if (!isPoint(point))
							{
								point = origin;
							}
							var labelGroup = regionGroup.child(SVG_NS, 'g'),
								text = labelGroup.child(SVG_NS, 'text')
									.attr(SVG_NS, 'x', point.x + 'px')
									.attr(SVG_NS, 'y', point.y + 'px')
									.text(label.label)
									.attrs(SVG_NS, label.attrs),
								box = (<SVGTextElement> text.build()).getBBox(),
								rpx = (Math.min(box.width, box.height) / 2) + 'px',
								textBox = labelGroup.child(SVG_NS, 'rect')
									.attrs(SVG_NS, {
											'fill': WHITE.hex,
											'fill-opacity': '1',
											'height': box.height + 'px',
											'rx': rpx,
											'ry': rpx,
											'stroke-opacity': '0',
											'width': box.width + 'px',
											'x': box.x + 'px',
											'y': box.y + 'px'
										});
							text.attach(labelGroup.build());
						}
					}
				}
			}
			return <SVGGElement> g.attach(svg).build();
		}
	}
}