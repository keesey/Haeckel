/// <reference path="contains.ts"/>
/// <reference path="create.ts"/>
/// <reference path="rectangle.ts"/>
/// <reference path="weights.ts"/>
/// <reference path="../rec/random.ts"/>
/// <reference path="../../interfaces/Point.ts"/>
module Haeckel.pt
{
	var MAX_RANDOM_ATTEMPTS = 1000;

	export function random(shapes: Point[][], weights?: number[], random?: () => number): Point;
	export function random(a: Point, b: Point, random?: () => number): Point;
	export function random(a: any, b?: any, random?: () => number): Point
	{
		function randomInSegment(a: Point, b: Point)
		{
			var ratio = random();
			return create(a.x + (b.x - a.x) * ratio, a.y + (b.y - a.y) * ratio);
		}

		function randomInShape(shape: Point[]): Point
		{
			switch (shape.length)
			{
				case 0:
				{
					return null;
				}
				case 1:
				{
					return shape[0];
				}
				case 2:
				{
					return randomInSegment(shape[0], shape[1]);
				}
				default:
				{
					var rect = rectangle(shape);
					if (rect.x === rect.x2 || rect.y === rect.y2)
					{
						return randomInSegment(create(rect.x, rect.y), create(rect.x2, rect.y2));
					}
					var attempts = MAX_RANDOM_ATTEMPTS;
					while (attempts-- > 0)
					{
						var p = rec.random(rect, random);
						if (contains(shape, p))
						{
							return p;
						}
					}
					return create(rect.centerX, rect.centerY);
				}
			}
		}

		function randomInShapes(shapes: Point[][], weightList: number[])
		{
			var n = shapes.length;
			if (n === 0)
			{
				return null;
			}
			if (n === 1)
			{
				return randomInShape(shapes[0]);
			}
			if (weightList)
			{
				if (weightList.length !== n)
				{
					console.warn('Mismatch between points in shape (' + n + ') and number of calculated weights provided (' + weightList.length + ').');
					weightList = null;
				}
			}
			if (!weightList)
			{
				weightList = weights(shapes);
			}
			var total = weightList[--n];
			if (total <= 0)
			{
				return null;
			}
			var r = random() * total;
			for (var i = 0; i < n; ++i)
			{
				if (r < weightList[i])
				{
					randomInShape(shapes[i]);
				}
			}
			return randomInShape(shapes[n]);
		}

		if (!random)
		{
			random = Math.random;
		}
		if (Array.isArray(a))
		{
			return randomInShapes(<Point[][]> a, <number[]> b);
		}
		return randomInSegment(<Point> a, <Point> b)
	}
}