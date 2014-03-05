///<reference path='create.ts' />
///<reference path='../ext/setDiff.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	export function setDiff(minuend: Taxic, subtrahend: Taxic): Taxic
	{
		return create(ext.setDiff(minuend.entities, subtrahend.entities));
	}
}