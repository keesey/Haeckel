///<reference path='../../interfaces/Point.ts' />
module Haeckel.pt
{
	export function create(x: number, y: number): Point
	{
		if (!isFinite(x))
		{
			x = 0;
		}
		if (!isFinite(y))
		{
			y = 0;
		}
		return Object.freeze({
			hash: "(" + x + ":" + y + ")",
			x: x,
			y: y
		});
	}
}