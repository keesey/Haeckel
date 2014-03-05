module Haeckel
{
	export interface Model
	{
		hash: string;
	}
	export function isModel(o: Model)
	{
		return o !== null && typeof o === "object" && typeof o.hash === "string";
	}
}