///<reference path='create.ts' />
///<reference path='../../builders/ExtSetBuilder.ts' />
///<reference path='../../interfaces/Entity.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	export function union(taxa: Taxic[]): Taxic
	{
		var builder = new ExtSetBuilder<Entity>();
		for (var i = 0, n = taxa.length; i < n; ++i)
		{
			builder.addSet(taxa[i].entities);
		}
		return create(builder.build());
	}
}