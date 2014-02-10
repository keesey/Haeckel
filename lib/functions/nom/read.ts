/// <reference path="../../builders/NomenclatureBuilder.ts"/>
/// <reference path="../../interfaces/Nomenclature.ts"/>
module Haeckel.nom
{
	export function read(data: any, builder: NomenclatureBuilder = null): NomenclatureBuilder
	{
		if (builder === null)
		{
			builder = new NomenclatureBuilder();
		}
		for (var name in data)
		{
			builder.addName(name);
		}
		return builder;
	}
}