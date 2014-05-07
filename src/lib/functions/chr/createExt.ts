///<reference path="combiner.ts" />
///<reference path="initiate.ts" />
///<reference path="normalizeWeights.ts" />
///<reference path="overlapper.ts" />
///<reference path="../ext/distance.ts" />
///<reference path="../ext/intersect.ts" />
///<reference path="../ext/list.ts" />
///<reference path="../ext/read.ts" />
///<reference path="../ext/union.ts" />
///<reference path="../../builders/ExtSetBuilder.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/ExtSet.ts" />
///<reference path="../../interfaces/WeightedStates.ts" />
module Haeckel.chr
{
	function average<T>(statesList: WeightedStates<ExtSet<T>>[]): ExtSet<T>
	{
		var n = statesList.length;
		if (n === 0)
		{
			return null;
		}
		statesList = normalizeWeights<ExtSet<T>>(statesList);
		var threshold = 1 / n,
			builder = new ExtSetBuilder<T>();
		for (var i = 0; i < n; ++i)
		{
			var ws = statesList[i];
			if (ws.weight >= threshold && ws.states !== null)
			{
				builder.addSet(ws.states);
			}
		}
		return builder.build();
	}

	export function createExt<T>(domain: ExtSet<T>, inferrable?: boolean, distance?: boolean,
		label?: string, labelStates?: (s: ExtSet<T>) => string, stateLabels?: string[]): Character<ExtSet<T>>
	{
		var c = initiate(domain, label, labelStates, stateLabels);
		c.combine = combiner<ExtSet<T>>(ext.union);
		c.overlap = overlapper<ExtSet<T>>(ext.intersect);
		c.readStates = (data: T[]) => ext.read<T>(data);
		c.writeStates = ext.list;
		if (distance)
		{
			c.distance = ext.distance;
		}
		if (inferrable)
		{
			c.inferrer = Object.freeze({ average: average });
		}
		return Object.freeze(c);
	}
}