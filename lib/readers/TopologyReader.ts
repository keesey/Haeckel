/// <reference path="TempNomenclature.ts"/>
/// <reference path="../builders/DAGBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/tax/createUnit.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class TopologyReader
	{
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

        readDAG(data: string, builder?: DAGBuilder<Taxic>): DAGBuilder<Taxic>;
        readDAG(data: any[], builder?: DAGBuilder<Taxic>): DAGBuilder<Taxic>;
        readDAG(data: any, builder: DAGBuilder<Taxic> = null): DAGBuilder<Taxic>
		{
		    function readNode(node: any): Taxic
		    {
                var taxon: Taxic = EMPTY_SET;
	            if (typeof node === "string")
	            {
                    taxon = nomenclature.taxon(<string> node);
                    builder.addVertex(taxon);
				}
	            if (Array.isArray(node))
	            {
                    taxon = tax.createUnit();
                    builder.addVertex(taxon);
                    for (var i = 0, n = node.length; i < n; ++i)
                    {
                        var child = readNode(node[i]);
                        if (!child.empty)
                        {
                            builder.addArc(taxon, child);
                        }
                    }
	            }
                return taxon;
		    }

			if (builder === null)
			{
				builder = new DAGBuilder<Taxic>();
			}
	        var nomenclature = new TempNomenclature(this.nomenclature);
	        readNode(data);
	        return builder;
		}

        readNomenclature(data: string, builder?: NomenclatureBuilder): NomenclatureBuilder;
        readNomenclature(data: any[], builder?: NomenclatureBuilder): NomenclatureBuilder;
        readNomenclature(data: any, builder: NomenclatureBuilder = null): NomenclatureBuilder
        {
            function readNode(node: any)
            {
                if (typeof node === "string")
                {
                    builder.addName(node);
                }
                else if (Array.isArray(node))
                {
                    for (var i = 0, n = node.length; i < n; ++i)
                    {
                        readNode(node[i]);
                    }
                }
            }

            if (builder === null)
            {
                builder = new NomenclatureBuilder();
            }
            readNode(data);
            return builder;
        }
	}
}