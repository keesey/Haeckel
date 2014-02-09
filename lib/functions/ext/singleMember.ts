///<reference path='list.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function singleMember<T>(set: ExtSet<T>): T
	{
		if (set.size !== 1)
		{
			throw new Error("Not a singleton: {" + list(set).join(", ") + "}");
		}
		for (var h in set.hashMap)
		{
			return <any> set.hashMap[h]; // :KLUDGE: compiler bug -- rejects without <any>
		}
		return null;
	}
}