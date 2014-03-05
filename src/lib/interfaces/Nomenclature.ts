///<reference path='ExtSet.ts' />
///<reference path='Taxic.ts' />

module Haeckel
{
	export interface Nomenclature
	{
		nameMap:
		{
			[name: string]: Taxic;
		};
		names: ExtSet<string>;
		taxa: ExtSet<Taxic>;
	}
	
	export function isNomenclature(o: any)
	{
		return typeof o.nameMap === "object" && isExtSet(o.names) && isExtSet(o.taxa);
	}
}