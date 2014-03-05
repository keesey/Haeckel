///<reference path='get.ts' />
///<reference path='../ext/create.ts' />
///<reference path='../ext/list.ts' />
///<reference path='../../interfaces/DistanceAxis.ts' />
///<reference path='../../interfaces/DistanceMatrix.ts' />
///<reference path='../../interfaces/Range.ts' />
module Haeckel.dst
{
	export function axes<T>(matrix: DistanceMatrix<T>): DistanceAxis[]
	{
		if (matrix.members.size < 2)
		{
			return [];
		}
		var axes: DistanceAxis[] = [],
			members = ext.list(matrix.members),
			l = members.length;
		for (var i = 0, n = l - 1; i < n; ++i)
		{
			var a = members[i];
			for (var j = i + 1; j < l; ++j)
			{
				var b = members[j],
					ab: Range = get(matrix, a, b);
				if (ab !== undefined)
				{
					axes.push(Object.freeze({distance: ab, endpoints: ext.create([ a, b ])}));
				}
			}
		}
		return axes.sort(function(a: DistanceAxis, b: DistanceAxis): number
		{
			return b.distance.mean - a.distance.mean;
		});
	}
}