/// <reference path="TempNomenclature.ts"/>
/// <reference path="../builders/DAGBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class PhyloArcsReader
	{
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		readDAG(data: string[][], builder: DAGBuilder<Taxic> = null): DAGBuilder<Taxic>
		{
			if (builder === null)
			{
				builder = new DAGBuilder<Taxic>();
			}
	        var nomenclature = new TempNomenclature(this.nomenclature);
	        for (var i = 0, n = data.length; i < n; ++i)
	        {
                var arc = data[i],
                	prc = nomenclature.taxon(arc[0]),
                	suc = nomenclature.taxon(arc[1]);
                builder.addArc(prc, suc);
	        }
	        return builder;
		}

		readNomenclature(data: string[][], builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			if (builder === null)
			{
				builder = new NomenclatureBuilder();
			}
	        for (var i = 0, n = data.length; i < n; ++i)
	        {
                var arc = data[i];
                builder.addName(arc[0]);
                builder.addName(arc[1]);
	        }
	        return builder;
		}
	}
}