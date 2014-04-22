///<reference path='../ext/each.ts' />
///<reference path='../tax/includes.ts' />
///<reference path='../../builders/DAGBuilder.ts' />
///<reference path='../../interfaces/Taxic.ts' />
///<reference path='../../solvers/DAGSolver.ts' />
module Haeckel.phy
{
	export function coarsen(solver: DAGSolver<Taxic>, taxa: ExtSet<Taxic>): DAGBuilder<Taxic>
	{
		var taxonMap: { [vertexHash: string]: Taxic; } = {};
		ext.each(solver.vertices, (vertex: Taxic) =>
		{
			taxonMap[vertex.hash] = vertex;
			ext.each(taxa, (taxon: Taxic) =>
			{
				if (tax.includes(taxon, vertex))
				{
					taxonMap[vertex.hash] = taxon;
					return false;
				}
				return true;
			});
		});
		var builder = new DAGBuilder<Taxic>();
		ext.each(solver.vertices, (vertex: Taxic) =>
		{
			var taxon = taxonMap[vertex.hash];
			ext.each(solver.imSucs(vertex), (imSuc: Taxic) =>
			{
				var sucTaxon = taxonMap[imSuc.hash];
				if (sucTaxon !== taxon)
				{
					builder.addArc(taxon, sucTaxon);
				}
			});
		});
		return builder;
	}
}
