///<reference path='Model.ts' />

module Haeckel
{
	export interface Set extends Model
	{
		empty: boolean;
	}

	export function isSet(o: Set)
	{
		return isModel(o) && typeof o.empty === "boolean";
	}
}