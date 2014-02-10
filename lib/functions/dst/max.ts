///<reference path='../../interfaces/DistanceMatrix.ts' />
module Haeckel.dst
{
	export function max<T>(matrix: DistanceMatrix<T>): number
	{
		var result = NaN,
			a: string,
			b: string;
		for (a in matrix.hashMap)
		{
			var row = matrix.hashMap[a];
			for (b in row)
			{
				var max = row[b].max;
				if (!isNaN(max))
				{
					if (isNaN(result))
					{
						result = max;
					}
					else
					{
						result = Math.max(max, result);
					}
				}
			}
		}
		return result;
	}
}