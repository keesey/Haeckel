///<reference path="initiate.ts" />
///<reference path="intersector.ts" />
///<reference path="../ist/create.ts" />
///<reference path="../ist/intersect.ts" />
///<reference path="../../constants/EMPTY_SET.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/IntSet.ts" />
module Haeckel.chr
{
	export function createInt<T>(criterion: (element: T) => boolean,
		combine?: (sets: IntSet<T>[]) => IntSet<T>,
		readStates?: (data: any) => IntSet<T>,
		writeStates?: (states: IntSet<T>) => any,
		label?: string,
		labelStates?: (s: IntSet<T>) => string,
		stateLabels?: string[]): Character<IntSet<T>>
	{
		var domain = ist.create(criterion),
			c = initiate(domain, label, labelStates, stateLabels);
		c.combine = combine ? combine : combiner<IntSet<T>>((sets: IntSet<T>[]) => ist.union<T>(sets));
		c.intersect = intersector<IntSet<T>>(ist.intersect, EMPTY_SET);
		c.overlap = overlapper<IntSet<T>>(ist.intersect);
		c.readStates = readStates;
		c.writeStates = writeStates;
		return Object.freeze(c);
	}
}