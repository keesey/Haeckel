/// <reference path="DAGBuilder.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../functions/equal.ts"/>
/// <reference path="../functions/ext/create.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/intersect.ts"/>
/// <reference path="../functions/ext/setDiff.ts"/>
/// <reference path="../functions/ext/union.ts"/>
/// <reference path="../functions/tax/createUnit.ts"/>
/// <reference path="../solvers/DAGSolver.ts"/>
module Haeckel
{
	export class NomenclatureBuilder implements Builder<Nomenclature>
	{
		private _nameSets = new DAGBuilder<ExtSet<string>>();

		private _nameToNameSet: { [name: string]: ExtSet<string>;} = {};

		addName(name: string)
		{
			if (name.length === 0)
			{
				throw new Error("Empty name.");
			}
			if (this._nameToNameSet[name] === undefined)
			{
				var nameSet = ext.create([ name ]);
				this._nameSets.addVertex(nameSet);
				this._nameToNameSet[name] = nameSet;
			}
			return this;
		}

		build(): Nomenclature
		{
	        var graph = this._nameSets.buildClosure(),
	        	solver = new DAGSolver<ExtSet<string>>(graph),
	        	sinks = solver.sinks,
	        	sinksToTaxa: { [hash: string]: Taxic; } = {},
	        	namesToTaxa: { [name: string]: Taxic; } = {},
	        	namesBuilder = new ExtSetBuilder<string>();
	        ext.each(sinks, (sink: ExtSet<string>) =>
	        {
                var taxon = tax.createUnit();
                sinksToTaxa[sink.hash] = taxon;
                ext.each(sink, (name: string) =>
                {
                    namesBuilder.add(name);
                    namesToTaxa[name] = taxon;
                });
	        });
	        ext.each(ext.setDiff(graph.vertices, sinks), (nonsink: ExtSet<string>) =>
	        {
                var sucSinks = ext.intersect(solver.imSucs(nonsink), sinks),
                	taxon: Taxic = EMPTY_SET;
                ext.each(sucSinks, (sink: ExtSet<string>) =>
                {
                    taxon = tax.union([ taxon, sinksToTaxa[sink.hash] ]);
                });
                ext.each(nonsink, (name: string) =>
                {
                    namesBuilder.add(name);
                    namesToTaxa[name] = taxon;
                });
	        });
	        var taxaBuilder = new ExtSetBuilder<Taxic>();
	        for (var key in namesToTaxa)
	        {
                taxaBuilder.add(namesToTaxa[key]);
	        }
	        return Object.freeze({
	        	nameMap: Object.freeze(namesToTaxa),
	        	names: namesBuilder.build(),
	        	taxa: taxaBuilder.build()
	        });
		}

		hyponymize(hyperonym: string, hyponym: string)
		{
	        this
	        	.addName(hyperonym)
	        	.addName(hyponym)
	        	._nameSets.addArc(this._nameToNameSet[hyperonym], this._nameToNameSet[hyponym]);
	        return this;
		}

		reset()
		{
			this._nameSets.reset();
			this._nameToNameSet = {};
			return this;
		}

		synonymize(nameA: string, nameB: string)
		{
	        this
	        	.addName(nameA)
	        	.addName(nameB);
	        if (nameA === nameB)
	        {
                return this;
            }
	        var nameSetA = this._nameToNameSet[nameA],
	        	nameSetB = this._nameToNameSet[nameB];
	        if (equal(nameSetA, nameSetB))
	        {
				return this;
			}
	        var nameSets = this._nameSets,
	        	graph = nameSets.build(),
	        	solver = new DAGSolver(graph),
	        	nameSet = ext.union<string>([ nameSetA, nameSetB ]),
	        	imPrcs = ext.union<ExtSet<string>>([ solver.imPrcs(nameSetA), solver.imPrcs(nameSetB) ]),
	        	imSucs = ext.union<ExtSet<string>>([ solver.imSucs(nameSetA), solver.imSucs(nameSetB) ]);
	        nameSets
	        	.removeVertex(nameSetA)
	        	.removeVertex(nameSetB)
	        	.addVertex(nameSet);
	        ext.each(imPrcs, (prc: ExtSet<string>) =>
	        {
                nameSets.addArc(prc, nameSet);
	        });
	        ext.each(imSucs, (suc: ExtSet<string>) =>
	        {
                nameSets.addArc(nameSet, suc);
	        });
	        for (var key in this._nameToNameSet)
	        {
                var x = this._nameToNameSet[key];
                if (equal(x, nameSetA) || equal(x, nameSetB))
                {
                    this._nameToNameSet[key] = nameSet;
				}
	        }
	        return this;
		}
	}
}