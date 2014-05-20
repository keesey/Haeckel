/// <reference path="DAGBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/hash.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/setDiff.ts"/>
/// <reference path="../functions/tax/includes.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/DAGSolver.ts"/>
module Haeckel
{
	export class PhyloBuilder implements Builder<Digraph<Taxic>>
	{
		private dagBuilder = new DAGBuilder<Taxic>();

		addPhylogeny(g: Digraph<Taxic>)
		{
			ext.each(g.arcs, (arc: Taxic[]) =>
			{
				this.addPrecedence(arc[0], arc[1]);
			}, this);
			return this;
		}

		addPrecedence(prc: Taxic, suc: Taxic)
		{
			ext.each(prc.units, (prcUnit: Taxic) =>
			{
				ext.each(suc.units, (sucUnit: Taxic) =>
				{
					this.dagBuilder.addArc(prcUnit, sucUnit);
				}, this);
			}, this);
			return this;
		}

		addTaxon(taxon: Taxic)
		{
			ext.each(taxon.units, (unit: Taxic) =>
			{
				this.dagBuilder.addVertex(unit);
			}, this);
			return this;
		}

		build()
		{
			return this.dagBuilder.buildReduction();
		}

		buildCoarser(taxa: ExtSet<Taxic>)
		{
			var unitMap: { [unitHash: string]: Taxic; } = {};

			function coarsen(unit: Taxic): Taxic
			{
				return unitMap[unit.hash] || unit;
			}

			ext.each(taxa, (taxon: Taxic) =>
			{
				ext.each(taxon.units, (unit: Taxic) =>
				{
					unitMap[unit.hash] = taxon;
				});
			});
			var builder = new DAGBuilder<Taxic>();
			ext.each(this.dagBuilder.buildArcs(), (arc: Taxic[]) =>
			{
				builder.addArc(coarsen(arc[0]), coarsen(arc[1]));
			});
			return builder.buildReduction();
		}

		mergePredecessors(exclude?: Taxic)
		{
			exclude = exclude || EMPTY_SET;
			var prcsSucsMap: { [hash: string]: Taxic; } = {};
			var solver = new DAGSolver(this.dagBuilder.build());
			var prcs = ext.setDiff(solver.vertices, solver.sinks);
			ext.each(prcs, (prc: Taxic) =>
			{
				var prcsSucsHash = hash([ solver.imPrcs(prc), solver.imSucs(prc) ]);
				var replacement = prcsSucsMap[prcsSucsHash];
				if (replacement)
				{
					var excluded = tax.includes(exclude, prc);
					if (excluded)
					{
						if (!tax.includes(exclude, replacement))
						{
							this.dagBuilder.replaceVertex(replacement, prc);
							prcsSucsMap[prcsSucsHash] = prc;
						}
					}
					else
					{
						this.dagBuilder.replaceVertex(prc, replacement);
					}
				}
				else
				{
					prcsSucsMap[prcsSucsHash] = prc;
				}
			}, this);
			return this;
		}

		removePhylogeny(g: Digraph<Taxic>)
		{
			ext.each(g.arcs, (arc: Taxic[]) =>
			{
				this.removePrecedence(arc[0], arc[1]);
			}, this);
			return this;
		}

		removePrecedence(prc: Taxic, suc: Taxic)
		{
			ext.each(prc.units, (prcUnit: Taxic) =>
			{
				ext.each(suc.units, (sucUnit: Taxic) =>
				{
					this.dagBuilder.removeArc(prcUnit, sucUnit);
				}, this);
			}, this);
			return this;
		}

		removeTaxon(taxon: Taxic)
		{
			ext.each(taxon.units, (unit: Taxic) =>
			{
				this.dagBuilder.removeVertex(unit);
			}, this);
			return this;
		}

		reset()
		{
			this.dagBuilder.reset();
			return this;
		}
	}
}