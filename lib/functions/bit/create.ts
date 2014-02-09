/// <reference path="createFromBits.ts"/>
/// <reference path="../../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../../interfaces/BitSet.ts"/>
module Haeckel.bit
{
	export function create(members: number[]): BitSet
	{
		var bits = 0;
		for (var i = 0, n = members.length; i < n; ++i)
		{
			var member = members[i];
			if (!isFinite(member) || member < 0 || member > BIT_MEMBER_MAX)
			{
				throw new Error("Invalid member for bit set: " + member + ".");
			}
			bits |= (1 << (member | 0));
		}
		return createFromBits(bits);
	}
}