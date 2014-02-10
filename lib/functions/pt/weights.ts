/// <reference path="weight.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	export function weights(shapes: Point[][], areas?: number[]): number[]
	{
		var n = shapes.length,
			weights: number[] = new Array(n);
		if (n > 0)
		{
			if (areas && areas.length !== n)
			{
				console.warn('Mismatch between number of shapes (' + n + ') and number of calculated areas provided (' + areas.length + ').');
				while (areas.length < n)
				{
					areas.push(0);
				}
			}
			var total = 0;
			for (var i = 0; i < n; ++i)
			{
				weights[i] = total += weight(shapes[i], areas ? areas[i] : NaN);
			}
		}
		return weights;
	}
}