/// <reference path="create.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export interface BoundingClientRectElement extends SVGElement
	{
		getBoundingClientRect(): ClientRect;
	}

	export function createFromBoundingClientRect(svg: BoundingClientRectElement): Rectangle
	{
		var rect = svg.getBoundingClientRect();
		return create(rect.left, rect.top, rect.width, rect.height);
	}
}
