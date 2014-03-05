///<reference path='ExtSet.ts' />
///<reference path='Range.ts' />

module Haeckel
{
	export interface DistanceMatrix<T>
	{
		hashMap:
		{
			[hash: string]:
			{
				[hash: string]: Range;
			};
		};
		members: ExtSet<T>;
	}
	
	export function isDistanceMatrix(o: DistanceMatrix<any>)
	{
		return typeof o === "object" && typeof o.hashMap === "object" && isExtSet(o.members);
	}
}
