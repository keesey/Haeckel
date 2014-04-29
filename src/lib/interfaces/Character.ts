///<reference path='Entity.ts' />
///<reference path='Inferrer.ts' />
///<reference path='Range.ts' />
///<reference path='Set.ts' />

module Haeckel
{
	export interface Character<S extends Set> extends Entity
	{
		combine: (statesList: S[]) => S;
		domain: S;
		distance?: (statesA: S, statesB: S) => Range;
		inferrer?: Inferrer<S>;
		overlap: (statesA: S, statesB: S) => boolean;
		readStates: (data: any) => S;
		writeStates: (states: S) => any;
	}

	export function isCharacter(o: any)
	{
		if (!isEntity(o))
		{
			return false;
		}
		if (o.distance !== undefined && typeof o.distance !== "function")
		{
			return false;
		}
		if (o.inferrer !== undefined && !isInferrer(o))
		{
			return false;
		}
		return typeof o.combine === "function" && isSet(o.domain) && typeof o.readStates === "function";
	}
}