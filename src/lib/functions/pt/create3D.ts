///<reference path='../../interfaces/Point3D.ts' />
module Haeckel.pt
{
	export function create3D(x: number, y: number, z: number): Point3D
	{
		if (!isFinite(x))
		{
			x = 0;
		}
		if (!isFinite(y))
		{
			y = 0;
		}
		if (!isFinite(z))
		{
			z = 0;
		}
		return Object.freeze({
			hash: "(" + String(x) + ":" + String(y) + ":" + String(z) + ")",
			x: x,
			y: y,
			z: z
		});
	}
}