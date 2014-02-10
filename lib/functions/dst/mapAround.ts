///<reference path='get.ts' />
///<reference path='../../interfaces/DistanceMatrix.ts' />
///<reference path='../../interfaces/Range.ts' />
module Haeckel.dst
{
	export function mapAround<T>(matrix: DistanceMatrix<T>, focus: T): (element: T) => Range
	{
		return (element: T) => get(matrix, focus, element);
	}
}