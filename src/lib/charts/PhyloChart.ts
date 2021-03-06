/// <reference path="ChronoCharChart.ts"/>
/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_DIGRAPH.ts"/>
/// <reference path="../constants/RANGE_0.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../functions/precisionEqual.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/rng/create.ts"/>
/// <reference path="../interfaces/Arc.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/PhyloSolver.ts"/>
module Haeckel
{
	var DEFAULT_MIN_PRC_TIME = rng.create(-100000, 0);

	function DEFAULT_ARC_RENDERER(builder: ElementBuilder, arc: Arc<Taxic>, sourceRect: Rectangle, targetRect: Rectangle): void
	{
		var data: string = "M" + [sourceRect.centerX, sourceRect.bottom].join(' ');
		if (precisionEqual(sourceRect.centerX, targetRect.centerX))
		{
			data += "V" + targetRect.top;
		}
		else
		{
			var sourceY = Math.max(sourceRect.centerY, (targetRect.bottom + sourceRect.bottom) / 2);
			data += "V" + sourceY
				+ "Q" + [targetRect.centerX, sourceY, targetRect.centerX, targetRect.bottom].join(' ');
		}
		builder.child(SVG_NS, 'path')
			.attr(SVG_NS, 'd', data)
			.attrs(SVG_NS, {
				"fill": "none",
				"stroke": BLACK.hex,
				"stroke-opacity": "1"
			});
	}

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
		arcRenderer: (builder: ElementBuilder, arc: Arc<Taxic>, sourceRect: Rectangle, targetRect: Rectangle) => void = DEFAULT_ARC_RENDERER;

		minPrcTime = DEFAULT_MIN_PRC_TIME;

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
				this.arcRenderer(arcsGroup, arc, source, target);
			}, this);
			return parent;
		}		
	}
}