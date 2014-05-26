/// <reference path="ChronoCharChart.ts"/>
/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_DIGRAPH.ts"/>
/// <reference path="../constants/RANGE_0.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../interfaces/Arc.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/PhyloSolver.ts"/>
module Haeckel
{
	var DEFAULT_MIN_PRC_TIME = Haeckel.rng.create(-100000, 0);

	var PATH_STYLE: { [name: string]: string; } = {
		"fill": BLACK.hex,
		"fill-opacity": "1",
		"stroke": BLACK.hex,
		"stroke-opacity": "1"
	};

	function DEFAULT_VERTEX_RENDERER(builder: ElementBuilder, taxon: Taxic, rectangle: Rectangle): void
	{
		builder
			.child(SVG_NS, 'rect')
			.attrs(SVG_NS, {
					x: rectangle.x + 'px',
					y: rectangle.y + 'px',
					width: rectangle.width + 'px',
					height: rectangle.height + 'px'
				});
	}

	export class PhyloChart extends ChronoCharChart implements Renderer
	{
		minPrcTime = DEFAULT_MIN_PRC_TIME;

		pathStyle: { [name: string]: string; } = PATH_STYLE;

		phylogeny: Digraph<Taxic> = EMPTY_DIGRAPH;

		vertexRenderer: (builder: ElementBuilder, taxon: Taxic, rectangle: Rectangle) => void = DEFAULT_VERTEX_RENDERER;

		render(parent: ElementBuilder): ElementBuilder
		{
			var solver: PhyloSolver;
			var timeMatrixBuilder = new CharacterMatrixBuilder<Range>();
			ext.each(this.phylogeny.vertices, (taxon: Taxic) => 
			{
				timeMatrixBuilder.states(taxon, TIME_CHARACTER, <Range> chr.states(this.characterMatrix, taxon, TIME_CHARACTER))
			});
			ext.each(this.phylogeny.vertices, (taxon: Taxic) => 
			{
				var states = <Range> chr.states(this.characterMatrix, taxon, TIME_CHARACTER);
				if (!states || states.empty)
				{
					if (!solver)
					{
						solver = new PhyloSolver(this.phylogeny);
					}
					states = <Range> chr.states(this.characterMatrix, solver.clade(taxon), TIME_CHARACTER);
					if (!states || states.empty)
					{
						timeMatrixBuilder.states(taxon, TIME_CHARACTER, RANGE_0);
					}
					else
					{
						var maxSucTime = states.min;
						timeMatrixBuilder.states(taxon, TIME_CHARACTER, Haeckel.rng.create(maxSucTime + this.minPrcTime.min, maxSucTime + this.minPrcTime.max));
					}
				}
			}, this);
			var timeMatrix = timeMatrixBuilder.build();
			var positions: { [taxonHash: string]: Rectangle; } = {};
			var area = this.area;
			var arcsGroup = parent.child(SVG_NS, 'g');
			var verticesGroup = parent.child(SVG_NS, 'g');
			ext.each(this.phylogeny.vertices, (taxon: Taxic) =>
			{
				var rect = positions[taxon.hash] = this.getTaxonRect(taxon, timeMatrix);
				this.vertexRenderer(verticesGroup, taxon, rect);
			});
			ext.each(this.phylogeny.arcs, (arc: Arc<Taxic>) =>
			{
				var source: Rectangle = positions[arc[0].hash];
				var target: Rectangle = positions[arc[1].hash];
				if (!source || !target || source.empty || target.empty)
				{
					return;
				}
				var data = "M" + source.centerX + " " + source.bottom
						+ "L" + target.centerX + " " + target.bottom
						+ "V" + target.top
						+ "L" + source.centerX + " " + source.top
						+ "V" + source.bottom
						+ "Z";
				arcsGroup.child(SVG_NS, 'path')
					.attr(SVG_NS, 'd', data)
					.attrs(SVG_NS, this.pathStyle);
			}, this);
			return parent;
		}		
	}
}