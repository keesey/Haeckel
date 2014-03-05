/// <reference path="create.ts"/>
/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export interface BBoxElement extends SVGElement
	{
		getBBox(): SVGRect;
	}

	export function createFromBBox(svg: BBoxElement): Rectangle
	{
		var rect = svg.getBBox();
		return create(rect.x, rect.y, rect.width, rect.height);
	}
}
