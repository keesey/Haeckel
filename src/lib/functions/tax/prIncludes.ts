/// <reference path="../ext/prIncludes.ts"/>
/// <reference path="../../interfaces/Taxic.ts"/>
module Haeckel.tax
{
	export function prIncludes(a: Taxic, b: Taxic):boolean
	{
		return ext.prIncludes(a.entities, b.entities);
	}
}