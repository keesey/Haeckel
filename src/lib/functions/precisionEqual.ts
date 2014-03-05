/// <reference path="../constants/PRECISION.ts"/>
module Haeckel
{
	export function precisionEqual(a: number, b: number): boolean
	{
		return Math.round(a * PRECISION) / PRECISION === Math.round(b * PRECISION) / PRECISION;
	}
}