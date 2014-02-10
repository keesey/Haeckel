/// <reference path="../../constants/EMPTY_SET.ts"/>
/// <reference path="../../interfaces/Nomenclature.ts"/>
/// <reference path="../../interfaces/Taxic.ts"/>
module Haeckel.tax
{
	export function byName(nomenclature: Nomenclature, name: string): Taxic
	{
		return nomenclature.nameMap[name] || EMPTY_SET;
	}
}