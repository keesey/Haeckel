///<reference path="../../interfaces/Range.ts" />
module Haeckel.rng
{
	export function write(r: Range): any
	{
		if (r === null || r === undefined)
		{
			return undefined;
		}
		if (r.empty)
		{
			return [];
		}
		if (r.size === 0)
		{
			return r.min;
		}
		return [ r.min, r.max ];
	}
}