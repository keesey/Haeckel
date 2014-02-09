/// <reference path="create.ts"/>
/// <reference path="../../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function read(data: number): BitSet;
	export function read(data: number[]): BitSet;
	export function read(data: any): BitSet
	{
		if (data === null || data === undefined)
		{
			return null;
		}
		if (Array.isArray(data))
		{
			return create(<number[]> data);
		}
		var n = Number(data);
		if (n >= 0 && n <= BIT_MEMBER_MAX)
		{
			var bits = 1 << n;
			return Object.freeze({
				bits: bits,
				empty: false,
				hash: "{bits:" + bits.toString(16) + "}"
			});
		}
		return null;
	}
}