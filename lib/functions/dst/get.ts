///<reference path='hashMapDistance.ts' />
///<reference path='../../interfaces/DistanceMatrix.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.dst
{
	export function get<T>(matrix: DistanceMatrix<T>, a: T, b: T): Range
	{
		return hashMapDistance(matrix.hashMap, a, b);
	}
}