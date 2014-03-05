///<reference path='Point.ts' />
///<reference path='Set.ts' />

module Haeckel
{
	export interface Rectangle extends Point, Set
	{
		area: number;
		bottom: number;
		centerX: number;
		centerY: number;
		height: number;
		left: number;
		right: number;
		top: number;
		width: number;
		x2: number;
		y2: number;
	}
	
	export function isRectangle(o: Rectangle)
	{
		return isPoint(o) && typeof o.area === "number" && typeof o.bottom === "number" && typeof o.centerX === "number"
			 && typeof o.centerY === "number" && typeof o.height === "number" && typeof o.left === "number"
			 && typeof o.right === "number" && typeof o.top === "number" && typeof o.width === "number"
			 && typeof o.x2 === "number" && typeof o.y2 === "number";
	}
}