/// <reference path="create.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function createFromCoords(x1: number, y1: number, x2: number, y2: number): Rectangle
	{
		return create(x1, y1, x2 - x1, y2 - y1);
	}
}