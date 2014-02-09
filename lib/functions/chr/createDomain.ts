///<reference path="initiate.ts" />
///<reference path="../ext/domain.ts" />
///<reference path="../ext/union.ts" />
///<reference path="../../interfaces/Character.ts" />
///<reference path="../../interfaces/ExtSet.ts" />
module Haeckel.chr
{
	export function createDomain<T>(
		hash: string,
		readStates?: (data: any) => ExtSet<T>,
		writeStates?: (states: ExtSet<T>) => any): Character<ExtSet<T>>
	{
		var c = initiate(ext.domain<T>(hash));
		c.combine = ext.union;
		c.readStates = readStates;
		c.writeStates = writeStates;
		return Object.freeze(c);
	}
}