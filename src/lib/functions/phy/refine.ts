///<reference path='../ext/each.ts' />
///<reference path='../../builders/DAGBuilder.ts' />
///<reference path='../../interfaces/Taxic.ts' />
///<reference path='../../solvers/DAGSolver.ts' />
module Haeckel.phy
{
	export function refine(solver: DAGSolver<Taxic>): DAGBuilder<Taxic>
	{
		var builder = new DAGBuilder<Taxic>();
		ext.each(solver.vertices, (vertex: Taxic) =>
		{
			ext.each(solver.imSucs(vertex), (imSuc: Taxic) =>
			{
				ext.each(imSuc.units, (imSucUnit: Taxic) =>
				{
					ext.each(vertex.units, (vertexUnit: Taxic) =>
					{
						builder.addArc(vertexUnit, imSucUnit);
					});
				});
			});
		});
		return builder;
	}
}
