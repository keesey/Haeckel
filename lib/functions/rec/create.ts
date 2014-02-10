/// <reference path="../../interfaces/Rectangle.ts"/>
module Haeckel.rec
{
	export function create(x: number, y: number, width: number, height: number): Rectangle
	{
        if (isNaN(width) || width < 0)
        {
            throw new Error("Invalid width: " + String(width) + ".");
        }
        if (isNaN(height) || height < 0)
        {
            throw new Error("Invalid height: " + String(height) + ".");
        }
		return Object.freeze({
			area: width * height,
			bottom: y + height,
			centerX: x + (width / 2),
			centerY: y + (height / 2),
			empty: false,
			hash: "(" + x + ":" + y + " -> " + width + ":" + height + ")",
			height: height,
			left: x,
			right: x + width,
			top: y,
			width: width,
			x: x,
			y: y,
			x2: x + width,
			y2: y + height
		});
	}
}