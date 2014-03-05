///<reference path='Range.ts' />

module Haeckel
{
	export interface Axis
	{
		labelFunction?: (value: number) => string;
		range: Range;
		step: number;
	}
	
	export function isAxis(o: Axis)
	{
		return typeof o === "object" && isRange(o.range) && typeof o.step === "number" && (o.labelFunction === undefined || typeof o.labelFunction === "function");
	}
}