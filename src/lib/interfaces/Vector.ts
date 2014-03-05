///<reference path='Model.ts' />

module Haeckel
{
	export interface Vector extends Model
	{
		angle: number;
		distance: number;
	}

	export function isVector(o: any)
	{
		return isModel(o) && typeof o.angle === "number" && typeof o.distance === "number";
	}
}