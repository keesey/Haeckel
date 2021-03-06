///<reference path="initiate.ts" />
///<reference path="intersector.ts" />
///<reference path="normalizeWeights.ts" />
///<reference path="overlapper.ts" />
///<reference path="../rng/combine.ts" />
///<reference path="../rng/create.ts" />
///<reference path="../rng/distance.ts" />
///<reference path="../rng/intersect.ts" />
///<reference path="../rng/multiply.ts" />
///<reference path="../rng/read.ts" />
///<reference path="../rng/write.ts" />
///<reference path="../../constants/EMPTY_SET.ts" />
///<reference path="../../constants/RANGE_0_TO_1.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/Range.ts" />
///<reference path="../../interfaces/WeightedStates.ts" />
module Haeckel.chr
{
	function average(statesList: WeightedStates<Range>[]): Range
	{
        var n = statesList.length;
        if (n === 0)
        {
			return null;
        }
        statesList = normalizeWeights<Range>(statesList);
        var min = 0,
        	max = 0,
        	total = 0;
        for (var i = 0; i < n; ++i)
        {
        	var ws = statesList[i],
				r = ws.states,
				weight = ws.weight;
			if (r && weight !== 0)
			{
				min += r.min * weight;
				max += r.max * weight;
				total += weight;
			}
        }
        if (total === 0)
        {
        	return null;
        }
        return rng.create(min / total, max / total);
	}

	export function createRange(domain: Range, inferrable?: boolean, distance?: boolean,
		label?: string, labelStates?: (s: Range) => string, stateLabels?: string[]): Character<Range>
	{
		var c = initiate(domain, label, labelStates, stateLabels, 'range');
		c.combine = rng.combine;
		c.intersect = intersector(rng.intersect, EMPTY_SET);
		c.overlap = overlapper<Range>(rng.intersect);
		c.readStates = rng.read;
		c.writeStates = rng.write;
		if (distance)
		{
			var ratio = 1 / domain.size;
			c.distance = (a: Range, b: Range) =>
			{
				if (!a || !b || a.empty || b.empty)
				{
					return RANGE_0_TO_1;
				}
				return rng.multiply(rng.distance(a, b), ratio);
			};
		}
		if (inferrable)
		{
			c.inferrer = Object.freeze({ average: average });
		}
		return Object.freeze(c);
	}
}