/// <reference path="ChronoCharChart.ts"/>
/// <reference path="../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/TIME_CHARACTER.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../interfaces/Arc.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/PhyloSolver.ts"/>
module Haeckel
{
	var PATH_STYLE: { [name: string]: string; } = {
		"fill": BLACK.hex,
		"fill-opacity": "1",
		"stroke": BLACK.hex,
		"stroke-opacity": "1"
	};

	export class PhyloChart extends ChronoCharChart implements Renderer
	{
		phyloSolver: PhyloSolver;

		render(parent: ElementBuilder): ElementBuilder
		{
			var solver = this.phyloSolver,
				graph = solver.graph,
				timeMatrixBuilder = new CharacterMatrixBuilder<Range>(),
				characterMatrix = this.characterMatrix;
			ext.each(graph.vertices, (taxon: Taxic) => timeMatrixBuilder.states(taxon, TIME_CHARACTER, <Range> chr.states(characterMatrix, taxon, TIME_CHARACTER)));
			timeMatrixBuilder.inferStates(solver.dagSolver);
			var positions: { [hash: string]: Rectangle; } = {},
				area = this.area;
			ext.each(graph.vertices, (taxon: Taxic) => positions[taxon.hash] = this.getTaxonRect(taxon));
			var g = parent.child(SVG_NS, 'g');
			ext.each(graph.arcs, (arc: Arc<Taxic>) =>
			{
				var source: Rectangle = positions[arc[0].hash],
					target: Rectangle = positions[arc[1].hash];
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
				g.child(SVG_NS, 'path')
					.attr(SVG_NS, 'd', data)
					.attrs(SVG_NS, PATH_STYLE);
			});
			return g;
		}		
	}
}