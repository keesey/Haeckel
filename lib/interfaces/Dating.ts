///<reference path='ExtSet.ts' />
///<reference path='Model.ts' />
///<reference path='Range.ts' />
///<reference path='Taxic.ts' />

module Haeckel
{
	export interface Dating extends Model
	{
		taxa: ExtSet<Taxic>;
		time: Range;
	}
	
	export function isDating(o: Dating)
	{
		return isModel(o) && isExtSet(o.taxa) && isRange(o.time);
	}

}
