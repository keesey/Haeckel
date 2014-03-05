///<reference path='create.ts' />
///<reference path='../ext/intersect.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	export function intersect(a: Taxic, b: Taxic): Taxic
	{
		return create(ext.intersect(a.entities, b.entities));
	}
}