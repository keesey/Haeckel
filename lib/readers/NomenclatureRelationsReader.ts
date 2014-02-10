/// <reference path="../builders/NomenclatureBuilder.ts"/>
module Haeckel
{
	export interface NomenclatureRelationsData
	{
		hyponymies?: string[][];
		synonymies?: string[][];
	}

	export class NomenclatureRelationsReader
	{
		readNomenclature(data: NomenclatureRelationsData, builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
	        if (builder === null)
	        {
                builder = new NomenclatureBuilder();
            }
	        var i: number,
	        	n: number;
	        if (data.hyponymies)
	        {
                for (i = 0, n = data.hyponymies.length; i < n; ++i)
                {
                    var hyponymy: string[] = data.hyponymies[i];
                    builder.hyponymize(hyponymy[0], hyponymy[1]);
                }
	        }
	        if (data.synonymies)
	        {
                for (i = 0, n = data.synonymies.length; i < n; ++i)
                {
                    var synonymy: string[] = data.synonymies[i],
                    	m = synonymy.length;
                    if (m > 0)
                    {
                    	var synonym = synonymy[0];
	                    builder.addName(synonym);
	                    for (var j = 1; j < m; ++j)
	                    {
	                        builder.synonymize(synonym, synonymy[j]);
						}
					}
                }
	        }
	        return builder;
		}
	}
}