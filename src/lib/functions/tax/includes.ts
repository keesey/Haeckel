///<reference path='../ext/includes.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	export function includes(a: Taxic, b: Taxic): boolean
	{
		return ext.includes(a.entities, b.entities);
	}
}