///<reference path="initiate.ts" />
///<reference path="overlapper.ts" />
///<reference path="../ext/domain.ts" />
///<reference path="../ext/intersect.ts" />
///<reference path="../ext/union.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/ExtSet.ts" />
module Haeckel.chr
{
	export function createDomain<T>(
		hash: string,
		readStates?: (data: any) => ExtSet<T>,
		writeStates?: (states: ExtSet<T>) => any,
		label?: string,
		labelStates?: (s: ExtSet<T>) => string,
		stateLabels?: string[]): Character<ExtSet<T>>
	{
		var c = initiate(ext.domain<T>(hash), label, labelStates, stateLabels);
		c.combine = ext.union;
		c.overlap = overlapper<ExtSet<T>>(ext.intersect);
		c.readStates = readStates;
		c.writeStates = writeStates;
		return Object.freeze(c);
	}
}