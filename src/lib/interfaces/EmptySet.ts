///<reference path='BitSet.ts' />
///<reference path='ExtSet.ts' />
///<reference path='IntSet.ts' />
///<reference path='Range.ts' />
///<reference path='Ray.ts' />
///<reference path='Rectangle.ts' />
///<reference path='Taxic.ts' />
///<reference path='TypeSet.ts' />

module Haeckel
{
	export interface EmptySet extends ExtSet<any>, BitSet, IntSet<any>, Range, Ray, Rectangle, Taxic, TypeSet<any>
	{
	}
}