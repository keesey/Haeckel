///<reference path='Model.ts' />
///<reference path='Range.ts' />

module Haeckel
{
	export interface Stratum extends Model
	{
		type: string;
		name: string;
		start: Range;
		end: Range;
	}
	
	export function isStratum(o: any)
	{
		return isModel(o) && typeof o.type === "string" && typeof o.name === "string" && isRange(o.start) && isRange(o.end);
	}
}
