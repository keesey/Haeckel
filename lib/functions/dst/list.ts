///<reference path='get.ts' />
///<reference path='../ext/each.ts' />
///<reference path='../../interfaces/DistanceItem.ts' />
///<reference path='../../interfaces/DistanceMatrix.ts' />
module Haeckel.dst
{
	export function list<T>(matrix: DistanceMatrix<T>, focus: T): DistanceItem<T>[]
	{
		var entries: DistanceItem<T>[] = [];
		ext.each(matrix.members, (member: T) =>
		{
			var entry: DistanceItem<T> =
			{
				distance: get(matrix, focus, member),
				item: member
			};
			entries.push(Object.freeze(entry));
		});
		return entries.sort((a: DistanceItem<T>, b: DistanceItem<T>) => a.distance.mean - b.distance.mean);
	}
}