///<reference path='ExtSet.ts' />
///<reference path='Model.ts' />
///<reference path='Range.ts' />

module Haeckel
{
	export interface Occurrence extends Model
	{
		count: Range;
		geo: ExtSet<GeoCoords[]>;
		time: Range;
	}
	
	export function isOccurrence(o: any)
	{
		return isModel(o) && isRange(o.count) && isExtSet(o.geo) && isRange(o.time);
	}
}
