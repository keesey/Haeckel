///<reference path='../equal.ts' />
///<reference path='../ext/each.ts' />
///<reference path='../ext/intersect.ts' />
///<reference path='../ext/setDiff.ts' />
///<reference path='../ext/union.ts' />
///<reference path='../../builders/DAGBuilder.ts' />
///<reference path='../../interfaces/Taxic.ts' />
///<reference path='../../solvers/PhyloSolver.ts' />
module Haeckel.phy
{
	export function merge(solvers: ExtSet<PhyloSolver>, taxa: ExtSet<Taxic>): PhyloSolver
	{
		var builder = new DAGBuilder<Taxic>();
		// :TODO: Synonymize ancestral nodes with identical descendants.
		ext.each(graphs, (solver: PhyloSolver) =>
		{
			builder.addGraph(refine(solver.dagSolver).build());
		});
		builder = coarsen(builder, taxa);
		return new PhyloSolver(builder);
	}
}
