///<reference path='../rng/add.ts' />
///<reference path='../rng/combine.ts' />
///<reference path='../rng/multiply.ts' />
///<reference path='../../constants/EMPTY_DISTANCE_MATRIX.ts' />
///<reference path='../../interfaces/DistanceMatrix.ts' />
///<reference path='../../interfaces/Range.ts' />
module Haeckel.dst
{
	export function normalize<T>(matrix: DistanceMatrix<T>): DistanceMatrix<T>
	{
		var a: string,
			b: string,
			sourceRow: { [hash: string]: Range; },
			targetRow: { [hash: string]: Range; }, 
			ranges: Range[] = [];
		for (a in matrix.hashMap)
		{
			sourceRow = matrix.hashMap[a];
			for (b in sourceRow)
			{
				ranges.push(sourceRow[b]);
			}
		}
		var totalRange = rng.combine(ranges);
		if (!totalRange)
		{
			return EMPTY_DISTANCE_MATRIX;
		}
		var hashMap: { [hash: string]: { [hash: string]: Range; }; } = {},
			offset = -totalRange.min,
			factor = (totalRange.size === 0) ? 0 : (1 / totalRange.size);
		for (a in matrix.hashMap)
		{
			targetRow = {};
			sourceRow = matrix.hashMap[a];
			for (b in sourceRow)
			{
				var r = sourceRow[b];
				targetRow[b] = rng.multiply(rng.add(r, offset), factor);
			}
			hashMap[a] = Object.freeze(targetRow);
		}
		return Object.freeze({
			hashMap: Object.freeze(hashMap),
			members: matrix.members
		});
	}
}