/// <reference path="DAGBuilder.ts"/>
/// <reference path="TaxonBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/equal.ts"/>
/// <reference path="../functions/hash.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/ext/setDiff.ts"/>
/// <reference path="../functions/tax/includes.ts"/>
/// <reference path="../functions/tax/setDiff.ts"/>
/// <reference path="../functions/tax/union.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Digraph.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../solvers/DAGSolver.ts"/>
/// <reference path="../solvers/PhyloSolver.ts"/>
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
			function coarsen(unit: Taxic): Taxic
			{
				return unitMap[unit.hash] || unit;
			}
			
			// Set up solver for refined netowrk.
			var solver = new PhyloSolver(this.dagBuilder);
			
			// Lump multi-node taxa with their cladogen and all intervening nodes.
			var expandedMap: { [taxonHash: string]: Taxic; } = {};
			ext.each(taxa, (taxon: Taxic) =>
			{
				var cladogen = solver.cladogen(taxon);
				if (equal(cladogen, taxon))
				{
					expandedMap[taxon.hash] = taxon;
				}
				else
				{
					var properPrcs = tax.setDiff(solver.prcIntersect(cladogen), cladogen);
					expandedMap[taxon.hash] = tax.setDiff(solver.prcUnion(taxon), properPrcs);
				}
			});

			// Set up a unit-to-coarser taxon map.
			var unitMap: { [unitHash: string]: Taxic; } = {};

			// Lump all nodes with the same maximal successors.
			var maxSucsMap: { [hash: string]: TaxonBuilder; } = {};
			var prcs = ext.setDiff(solver.dagSolver.vertices, solver.dagSolver.sinks);
			var h: string;
			ext.each(prcs, (prc: Taxic) =>
			{
				h = hash(solver.max(solver.sucUnion(prc)));
				var builder = maxSucsMap[h];
				if (!builder)
				{
					builder = maxSucsMap[h] = new TaxonBuilder();
				}
				builder.add(prc);
			});
			for (h in maxSucsMap)
			{
				var taxon = maxSucsMap[h].build();
				ext.each(taxon.units, (unit: Taxic) => unitMap[unit.hash] = taxon);
			}

			// Populate map with specified taxa (merging with any existing lumps).
			ext.each(taxa, (taxon: Taxic) =>
			{
				var expanded = expandedMap[taxon.hash];
				ext.each(expanded.units, (unit: Taxic) =>
				{
					var existing = unitMap[unit.hash];
					if (existing)
					{
						var union = tax.union([ existing, taxon ]);
						if (!equal(existing, union))
						{
							for (h in unitMap)
							{
								if (equal(unitMap[h], existing))
								{
									unitMap[h] = union;
								}
							}
						}
					}
					else
					{
						unitMap[unit.hash] = taxon;
					}
				});
			});

			// Build coarsened network.
			var builder = new DAGBuilder<Taxic>();
			ext.each(this.dagBuilder.buildArcs(), (arc: Taxic[]) =>
			{
				var prc = coarsen(arc[0]);
				var suc = coarsen(arc[1]);
				if (!equal(prc, suc))
				{
					builder.addArc(prc, suc);
				}
			});
			return builder.buildReduction();
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
