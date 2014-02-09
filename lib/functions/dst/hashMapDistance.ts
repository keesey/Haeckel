///<reference path='../hash.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../constants/RANGE_0.ts' />
///<reference path='../../interfaces/Range.ts' />

module Haeckel.dst
{
	export function hashMapDistance(hashMap: { [hash: string]: { [hash: string]: Range; }; }, a: any, b: any): Range
	{
		var aHash = hash(a),
			bHash = hash(b),
			result: Range = undefined;
		if (hashMap[aHash] !== undefined)
		{
			result = hashMap[aHash][bHash];
		}
		if (result === undefined)
		{
			if (aHash === bHash)
			{
				return RANGE_0;
			}
			return EMPTY_SET;
		}
		return result;
	}
}