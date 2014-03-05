///<reference path='ExtSet.ts' />
///<reference path='Range.ts' />

module Haeckel
{
	export interface DistanceAxis
	{
		distance: Range;
		endpoints: ExtSet<number>;
	}
}
