///<reference path='Model.ts' />

module Haeckel
{
	export interface Entity extends Model
	{
		uid: string;
	}
	export function isEntity(o: Entity)
	{
		return isModel(o) && typeof o.uid === "string";
	}
}