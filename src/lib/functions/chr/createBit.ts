///<reference path="combiner.ts" />
///<reference path="initiate.ts" />
///<reference path="normalizeWeights.ts" />
///<reference path="overlapper.ts" />
///<reference path="../bit/createFromBits.ts" />
///<reference path="../bit/distance.ts" />
///<reference path="../bit/intersect.ts" />
///<reference path="../bit/read.ts" />
///<reference path="../bit/union.ts" />
///<reference path="../bit/write.ts" />
///<reference path="../../interfaces/BitSet.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/WeightedStates.ts" />
module Haeckel.chr
{
	function average(statesList: WeightedStates<BitSet>[]): BitSet
	{
		var n = statesList.length;
		if (n === 0)
		{
			return null;
		}
		statesList = normalizeWeights<BitSet>(statesList);
		var threshold = 1 / n,
			bits = 0;
		for (var i = 0; i < n; ++i)
		{
			var ws = statesList[i];
			if (ws.weight >= threshold && ws.states !== null)
			{
				bits |= ws.states.bits;
			}
		}
		return bit.createFromBits(bits);
	}

	export function createBit(domain: BitSet, inferrable?: boolean, distance?: boolean,
		label?: string, labelStates?: (s: BitSet) => string, stateLabels?: string[]): Character<BitSet>
	{
		var c = initiate(domain, label, labelStates, stateLabels, 'discrete');
		c.combine = combiner(bit.union);
		c.overlap = overlapper<BitSet>(bit.intersect);
		c.readStates = bit.read;
		c.writeStates = bit.write;
		if (distance)
		{
			c.distance = bit.distance;
		}
		if (inferrable)
		{
			c.inferrer = Object.freeze({ average: average });
		}
		return Object.freeze(c);
	}
}