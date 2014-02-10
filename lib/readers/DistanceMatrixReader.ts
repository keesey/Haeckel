/// <reference path="../builders/DistanceMatrixBuilder.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../functions/rng/read.ts"/>
module Haeckel
{
	export interface DistanceData
	{
		distance: any; // number or number[]
		names: string[];
	}

	export class DistanceMatrixReader
	{
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		readDistanceMatrix(data: DistanceData[], builder: DistanceMatrixBuilder<Taxic> = null): DistanceMatrixBuilder<Taxic>
		{
			if (builder === null)
			{
				builder = new DistanceMatrixBuilder<Taxic>();
			}
			for (var i = 0, n = data.length; i < n; ++i)
			{
				var names = data[i].names,
					m = names.length;
				if (!(m >= 1))
				{
					continue;
				}
				var distance = rng.read(data[i].distance),
					j = 0,
					taxa: Taxic[] = new Array(m);
				while (j < m)
				{
					taxa[j] = this.nomenclature.nameMap[names[j++]];
				}
				if (m === 1)
				{
					builder.addRange(taxa[0], taxa[0], distance);
				}
				else
				{
					for (j = 0; j < m - 1; ++j)
					{
						var taxonA = taxa[j];
						if (!taxonA.empty)
						{
							for (var k = j + 1; k < m; ++k)
							{
								var taxonB = taxa[k];
								if (!taxonB.empty)
								{
									builder.addRange(taxonA, taxonB, distance);
								}
							}
						}
					}
				}
			}
			return builder;
		}

		readNomenclature(data: DistanceData[], builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			if (builder === null)
			{
				builder = new NomenclatureBuilder();
			}
			for (var i = 0, n = data.length; i < n; ++i)
			{
				var names = data[i].names;
				for (var j = 0, m = names.length; j < m; ++j)
				{
					builder.addName(names[j]);
				}
			}
			return builder;
		}
	}
}