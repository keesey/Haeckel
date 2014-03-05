///<reference path="initiate.ts" />
///<reference path="../ist/create.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/IntSet.ts" />
module Haeckel.chr
{
	export function createInt<T>(criterion: (element: T) => boolean,
		combine?: (sets: IntSet<T>[]) => IntSet<T>,
		readStates?: (data: any) => IntSet<T>,
		writeStates?: (states: IntSet<T>) => any): Character<IntSet<T>>
	{
		var domain = ist.create(criterion),
			c = initiate(domain);
		c.combine = combine ? combine : combiner<IntSet<T>>((sets: IntSet<T>[]) => ist.union<T>(sets));
		c.readStates = readStates;
		c.writeStates = writeStates;
		return Object.freeze(c);
	}
}