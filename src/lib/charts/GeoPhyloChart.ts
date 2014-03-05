/// <reference path="../constants/EMPTY_CHARACTER_MATRIX.ts"/>
/// <reference path="../constants/EMPTY_DAG_SOLVER.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/GEO_CHARACTER.ts"/>
/// <reference path="../functions/equal.ts"/>
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
	var DEFAULT_LINE_ATTRS_VALUE: { [name: string]: string; } =
	{
		'opacity': '0.5',
		'stroke-linecap': 'round',
		'stroke-width': '3px'
	};

	var DEFAULT_MAP_AREA = rec.create(0, 0, 360, 180);

	function DEFAULT_LINE_ATTRS(source: Taxic, target: Taxic, solver: DAGSolver<Taxic>): { [name: string]: string; }
	{
		return DEFAULT_LINE_ATTRS_VALUE;
	};

	export class GeoPhyloChart implements Renderer
	{
		color = BLACK;

		extensions = true;

		lineAttrs: (source: Taxic, target: Taxic, solver: DAGSolver<Taxic>) => { [name: string]: string; } = DEFAULT_LINE_ATTRS;

		mapArea = DEFAULT_MAP_AREA;

		nomenclature = EMPTY_NOMENCLATURE;

		occurrenceMatrix: CharacterMatrix<Set> = EMPTY_CHARACTER_MATRIX;

		paddingY = 6;

		projector: (coords: GeoCoords) => Point = DEFAULT_PROJECTOR;

		rootRadius = 3;

		solver: DAGSolver<Taxic> = EMPTY_DAG_SOLVER;

		project(coords: GeoCoords): Point
		{
			var p = this.projector(coords),
				area = this.mapArea,
				result = pt.create(area.x + p.x * area.width, area.y + p.y * area.height);
			return result;
		}

		render(parent: ElementBuilder): ElementBuilder
		{
			function drawExtensions(coords: GeoCoords, taxon: Taxic, lineAttrs: { [name: string]: string; })
			{
				var regions = <ExtSet<GeoCoords[]>> chr.states(matrix, taxon, GEO_CHARACTER);
				if (regions)
				{
					ext.each(regions, (region: GeoCoords[]) => drawLine(coords, geo.center(region), lineAttrs));
				}
			}

			function drawLine(source: GeoCoords, target: GeoCoords, lineAttrs: { [name: string]: string; })
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
					g.child(SVG_NS, 'path')
						.attr(SVG_NS, 'd', "M" + x1 + " " + p1.y + "Q" + cx + " " + midp.y + " " + x2 + " " + p2.y)
						.attrs(SVG_NS, lineAttrs);
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
			ext.each(solver.vertices, (taxon: Taxic) =>
			{
				var coords = getTaxonCoords(taxon);
				if (this.extensions)
				{
					drawExtensions(coords, taxon, this.lineAttrs(taxon, taxon, solver));
				}
				ext.each(solver.imSucs(taxon), (child: Taxic) =>
				{
					drawLine(coords, getTaxonCoords(child), this.lineAttrs(taxon, child, solver));
				}, this);
			}, this);
			ext.each(solver.sources, (taxon: Taxic) =>
			{
				var p = this.project(getTaxonCoords(taxon)),
					r = this.rootRadius + 'px';
				g.child(SVG_NS, 'circle')
					.attrs(SVG_NS,
						{
							'cx': p.x + 'px',
							'cy': p.y + 'px',
							'r': r,
							'fill': this.color.hex,
							'stroke': 'none'
						});
			}, this);
			return g;
		}
	}
}