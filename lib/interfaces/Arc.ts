module Haeckel
{
	export interface Arc<T> extends Array<T>
	{
	}

	export function isArc(o: Arc<any>)
	{
		return Array.isArray(o) && o.length >= 2;
	}
}
