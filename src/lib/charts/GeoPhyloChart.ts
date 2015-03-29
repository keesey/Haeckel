/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_CHARACTER_MATRIX.ts"/>
/// <reference path="../constants/EMPTY_DAG_SOLVER.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/GEO_CHARACTER.ts"/>
/// <reference path="../constants/WHITE.ts"/>
/// <reference path="../functions/equal.ts"/>
/// <reference path="../functions/arr/each.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/geo/center.ts"/>
/// <reference path="../functions/nom/forTaxon.ts"/>
/// <reference path="../functions/pt/create.ts"/>
/// <reference path="../functions/rec/create.ts"/>
/// <reference path="../interfaces/CharacterMatrix.ts"/>
/// <reference path="../interfaces/GeoCoords.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Point.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Set.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/DAGSolver.ts"/>
module Haeckel
{
	/*
	var DEFAULT_LINE_ATTRS_VALUE: { [name: string]: string; } =
	{
		'fill': WHITE.hex,
		'stroke': BLACK.hex,
		'stroke-linecap': 'round',
		'stroke-width': '3px'
	};
	*/

	var DEFAULT_MAP_AREA = rec.create(0, 0, 360, 180);

	/*
	function DEFAULT_LINE_ATTRS(source: Taxic, target: Taxic, solver: DAGSolver<Taxic>): { [name: string]: string; }
	{
		return DEFAULT_LINE_ATTRS_VALUE;
	};
	*/

	export class GeoPhyloChart implements Renderer
	{
		extensions = true;

		fill = WHITE;

		//lineAttrs: (source: Taxic, target: Taxic, solver: DAGSolver<Taxic>) => { [name: string]: string; } = DEFAULT_LINE_ATTRS;

		lineWidth = 3;

		mapArea = DEFAULT_MAP_AREA;

		nodeRadius = 3;

		nomenclature = EMPTY_NOMENCLATURE;

		occurrenceMatrix: CharacterMatrix<Set> = EMPTY_CHARACTER_MATRIX;

		paddingY = 6;

		projector: (coords: GeoCoords) => Point = DEFAULT_PROJECTOR;

		solver: DAGSolver<Taxic> = EMPTY_DAG_SOLVER;

		stroke = BLACK;

		strokeWidth = 1;

		project(coords: GeoCoords): Point
		{
			var p = this.projector(coords),
				area = this.mapArea,
				result = pt.create(area.x + p.x * area.width, area.y + p.y * area.height);
			return result;
		}

		render(parent: ElementBuilder): ElementBuilder
		{
			var fill = this.fill;
			var g = parent.child(SVG_NS, 'g');
			var lineWidth = this.lineWidth;
			var mapWidth = this.mapArea.width;
			var matrix = this.occurrenceMatrix;
			var nodeRadius = this.nodeRadius;
			var nomenclature = this.nomenclature;
			var self = this;
			var solver = this.solver;
			var stroke = this.stroke;
			var strokeWidth = this.strokeWidth;
			var taxonToCoords: { [taxonHash: string]: GeoCoords; } = {};

			function drawFillCircle(g: ElementBuilder, coords: GeoCoords, root: boolean = false)
			{
				var p = self.project(coords);
				g.child(SVG_NS, 'circle')
					.attrs(SVG_NS,
						{
							'cx': p.x + 'px',
							'cy': p.y + 'px',
							'r': (nodeRadius * (root ? 2 : 1)) + 'px',
							'fill': fill.hex,
							'stroke': 'none'
						});
			}

			function drawLine(g: ElementBuilder, source: GeoCoords, target: GeoCoords, terminal: boolean, drawStroke: boolean = true)
			{
				var p1 = self.project(source);
				var p2 = self.project(target);
				var midp = self.project(geo.center([ source, target ]));

				function curve(x1: number, x2: number)
				{
					var minX: number;
					var maxX: number;
					var cx = midp.x;
					if (x1 < x2)
					{
						minX = x1;
						maxX = x2;
					}
					else
					{
						minX = x2;
						maxX = x1;
					}
					while (cx < minX)
					{
						cx += mapWidth;
					}
					while (cx > maxX)
					{
						cx -= mapWidth;
					}
					var d = "M" + x1 + " " + p1.y + "Q" + cx + " " + midp.y + " " + x2 + " " + p2.y;
					var attrs: { [ name: string]: string; } = {
						'fill': 'none',
						'stroke': stroke.hex,
						'stroke-width': (lineWidth + strokeWidth * 2) + 'px',
						'stroke-linecap': 'none'
					};
					if (terminal)
					{
						attrs['marker-end'] = 'url(#arrowhead-stroke)';
					}
					if (drawStroke)
					{
						g.child(SVG_NS, 'path')
							.attr(SVG_NS, 'd', d)
							.attrs(SVG_NS, attrs);
					}
					attrs['stroke-width'] = lineWidth + 'px';
					attrs['stroke'] = fill.hex;
					if (terminal)
					{
						attrs['marker-end'] = 'url(#arrowhead-fill)';
					}
					g.child(SVG_NS, 'path')
						.attr(SVG_NS, 'd', d)
						.attrs(SVG_NS, attrs);
				}

				if (equal(source, target))
				{
					return;
				}
				if (Math.abs(p1.x - p2.x) > mapWidth / 2)
				{
					if (p1.x < mapWidth / 2)
					{
						curve(p1.x, p2.x - mapWidth);
						curve(p1.x + mapWidth, p2.x);
					}
					else
					{
						curve(p1.x, p2.x + mapWidth);
						curve(p1.x - mapWidth, p2.x);
					}
				}
				else
				{
					curve(p1.x, p2.x);
				}
			}

			function drawStrokeCircle(g: ElementBuilder, coords: GeoCoords, root: boolean = false)
			{
				var p = self.project(coords);
				g.child(SVG_NS, 'circle')
					.attrs(SVG_NS,
						{
							'cx': p.x + 'px',
							'cy': p.y + 'px',
							'r': (nodeRadius * (root ? 2 : 1) + strokeWidth) + 'px',
							'fill': stroke.hex,
							'stroke': 'none'
						});
			}

			function name(taxon: Taxic): string
			{
				return ext.list(nom.forTaxon(nomenclature, taxon)).join('/');
			}

			function getTaxonCoords(taxon: Taxic): GeoCoords
			{
				var coords = taxonToCoords[taxon.hash];
				if (coords === undefined)
				{
					var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, taxon, GEO_CHARACTER);
					if (regions && !regions.empty)
					{
						taxonToCoords[taxon.hash] = coords = geo.center(regions);
					}
					else
					{
						var childCoords: GeoCoords[] = [];
						ext.each(solver.imSucs(taxon), child => childCoords.push(getTaxonCoords(child)));
						coords = geo.center(childCoords);
						if (!coords)
						{
							throw new Error('No coordinates for taxon \"' + name(taxon) + '\".');
						}
					}
					taxonToCoords[taxon.hash] = coords;
				}
				return coords;
			}

			var builder = new DAGBuilder<GeoCoords>();
			var vertexGroups: { [vertexHash: string]: ElementBuilder; } = {};
			ext.each(solver.vertices, vertex =>
			{
				var coords = getTaxonCoords(vertex);
				ext.each(this.solver.imSucs(vertex), child => builder.addArc(coords, getTaxonCoords(child)));
				if (this.extensions)
				{
					var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, vertex, GEO_CHARACTER);
					if (regions && regions.size > 1)
					{
						ext.each(regions, region => builder.addArc(coords, geo.center(region)));
					}
				}
			});
			var geoSolver = new DAGSolver(builder.build());
			var nonSinks = ext.setDiff(geoSolver.vertices, geoSolver.sinks);
			var nonSinkGeoSolver = geoSolver.subgraphSolver(nonSinks);

			arr.each(nonSinkGeoSolver.verticesSorted, vertex => vertexGroups[hash(vertex)] = g.child(SVG_NS, 'g'));
			arr.each(nonSinkGeoSolver.verticesSorted, vertex =>
			{
				var group = vertexGroups[hash(vertex)];
				var children = geoSolver.imSucs(vertex);
				var parents = geoSolver.imPrcs(vertex);
				if (!children.empty)
				{
					if (parents.empty)
					{
						drawStrokeCircle(group, vertex, true);
					}
					ext.each(children, child => {
						var childTerminal = geoSolver.imSucs(child).empty;
						if (!childTerminal)
						{
							drawStrokeCircle(group, child);
						}
						drawLine(group, vertex, child, childTerminal);
					});
					drawFillCircle(group, vertex, parents.empty);
					if (parents.empty)
					{
						drawStrokeCircle(group, vertex, false);
					}
				}
			});

			return g;
		}

		/*
		render(parent: ElementBuilder): ElementBuilder
		{
			function drawExtensions(coords: GeoCoords, taxon: Taxic /*, lineAttrs: { [name: string]: string; }* /)
			{
				var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, taxon, GEO_CHARACTER);
				if (regions)
				{
					ext.each(regions, (region: GeoCoords[]) => drawLine(coords, geo.center(region), true/*, lineAttrs* /));
				}
			}

			function drawLine(source: GeoCoords, target: GeoCoords, terminal: boolean/*, lineAttrs: { [name: string]: string; }* /)
			{
				function curve(x1: number, x2: number)
				{
					var minX: number,
						maxX: number,
						cx = midp.x;
					if (x1 < x2)
					{
						minX = x1;
						maxX = x2;
					}
					else
					{
						minX = x2;
						maxX = x1;
					}
					while (cx < minX)
					{
						cx += mapWidth;
					}
					while (cx > maxX)
					{
						cx -= mapWidth;
					}
					var d = "M" + x1 + " " + p1.y + "Q" + cx + " " + midp.y + " " + x2 + " " + p2.y;
					g.child(SVG_NS, 'path')
						.attr(SVG_NS, 'd', d)
						.attrs(SVG_NS, {
							'stroke': '#000000',
							'stroke-linecap': 'none',
							'stroke-width': '4px',
							'fill': 'none',
							'marker-end': terminal ? "url(#arrowheadBlack)" : "url(#circleBlack)"
						});
					g.child(SVG_NS, 'path')
						.attr(SVG_NS, 'd', d)
						.attrs(SVG_NS, {
							'stroke': '#ffffff',
							'stroke-linecap': 'round',
							'stroke-width': '3px',
							'fill': 'none',
							'marker-end': terminal ? "url(#arrowheadWhite)" : "url(#circleWhite)"
						});
				}

				if (equal(source, target))
				{
					return;
				}
				var p1 = self.project(source),
					p2 = self.project(target),
					midp = self.project(geo.center([ source, target ]));
				if (Math.abs(p1.x - p2.x) > mapWidth / 2)
				{
					if (p1.x < mapWidth / 2)
					{
						curve(p1.x, p2.x - mapWidth);
						curve(p1.x + mapWidth, p2.x);
					}
					else
					{
						curve(p1.x, p2.x + mapWidth);
						curve(p1.x - mapWidth, p2.x);
					}
				}
				else
				{
					curve(p1.x, p2.x);
				}
			}

			function getTaxonCoords(taxon: Taxic): GeoCoords
			{
				var coords = taxonToCoords[taxon.hash];
				if (coords === undefined)
				{
					var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, taxon, GEO_CHARACTER);
					if (regions && !regions.empty)
					{
						taxonToCoords[taxon.hash] = coords = geo.center(regions);
					}
					else
					{
						var childCoords: GeoCoords[] = [];
						ext.each(solver.imSucs(taxon), (child: Taxic) => childCoords.push(getTaxonCoords(child)));
						coords = geo.center(childCoords);
						if (!coords)
						{
							throw new Error('No coordinates for taxon \"' + name(taxon) + '\".');
						}
					}
					taxonToCoords[taxon.hash] = coords;
				}
				return coords;
			}

			function name(taxon: Taxic): string
			{
				return ext.list(nom.forTaxon(nomenclature, taxon)).join('/');
			}

			var self = this,
				matrix = this.occurrenceMatrix,
				solver = this.solver,
				mapWidth = this.mapArea.width,
				nomenclature = this.nomenclature,
				taxonToCoords: { [taxonHash: string]: GeoCoords; } = {},
				g = parent.child(SVG_NS, 'g');
			ext.each(solver.vertices, getTaxonCoords);
			if (this.extensions)
			{
				ext.each(solver.vertices, (taxon: Taxic) =>
				{
					var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, taxon, GEO_CHARACTER);
					if (!regions || regions.size !== 1)
					{
						var parentCoords: GeoCoords[] = [];
						ext.each(solver.imPrcs(taxon), (parent: Taxic) => parentCoords.push(getTaxonCoords(parent)));
						parentCoords.push(getTaxonCoords(taxon));
						taxonToCoords[taxon.hash] = geo.center(parentCoords);
					}
				});
			}
			ext.each(solver.sources, (taxon: Taxic) =>
			{
				var p = this.project(getTaxonCoords(taxon));
				g.child(SVG_NS, 'circle')
					.attrs(SVG_NS,
						{
							'cx': p.x + 'px',
							'cy': p.y + 'px',
							'r': (this.rootRadius + 1) + 'px',
							'fill': this.stroke.hex,
							'stroke': 'none'
						});
			}, this);
			arr.each(solver.verticesSorted, taxon =>
			{
				var coords = getTaxonCoords(taxon);
				var children = solver.imSucs(taxon);
				ext.each(children, child =>
				{
					var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, taxon, GEO_CHARACTER);
					drawLine(coords, getTaxonCoords(child), false/*, this.lineAttrs(taxon, child, solver)* /);
				}, this);
				if (this.extensions)
				{
					drawExtensions(coords, taxon/*, this.lineAttrs(taxon, taxon, solver)* /);
				}
			}, this);
			ext.each(solver.sources, (taxon: Taxic) =>
			{
				var p = this.project(getTaxonCoords(taxon));
				g.child(SVG_NS, 'circle')
					.attrs(SVG_NS,
						{
							'cx': p.x + 'px',
							'cy': p.y + 'px',
							'r': this.rootRadius + 'px',
							'fill': this.fill.hex,
							'stroke': 'none'
						});
			}, this);
			return g;
		}
		*/
	}
}