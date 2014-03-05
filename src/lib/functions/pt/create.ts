///<reference path='../../constants/ORIGIN.ts' />
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
		if (x === 0 && y === 0)
		{
			return ORIGIN;
		}
		return Object.freeze({
			hash: "(" + x + ":" + y + ")",
			x: x,
			y: y
		});
	}
}