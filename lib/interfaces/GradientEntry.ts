module Haeckel
{
	export interface Color
	{
		b: number;
		error: boolean;
		g: number;
		hex: string;
		r: number;
	}

	export interface GradientEntry
	{
		color: Color;
		ratio: number;
	}
}