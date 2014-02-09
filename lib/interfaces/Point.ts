///<reference path='Model.ts' />

module Haeckel
{
	export interface Point extends Model
	{
		x: number;
		y: number;
	}

	export function isPoint(o: Point)
	{
		return isModel(o) && typeof o.x === 'number' && typeof o.y === 'number';
	}
}