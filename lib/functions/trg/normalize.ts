///<reference path="../../constants/TAU.ts" />
module Haeckel.trg
{
	export function normalize(radians: number): number
	{
		if (!isFinite(radians))
		{
			return 0;
		}
		while (radians < 0)
		{
			radians += TAU;
		}
		while (radians >= TAU)
		{
			radians -= TAU;
		}
		return radians;
	}
}