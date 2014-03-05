/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../interfaces/Stratum.ts"/>
/// <reference path="../functions/rng/read.ts"/>
module Haeckel
{
	export interface StratData
	{
		boundaries: { [id: string]: any; };
		units: { [name: string]: StratUnitData; };
	}

	export interface StratUnitData
	{
		boundaries: string[];
		type: string;
	}

	export class StratReader
	{
		private _boundaries = {};

		readStrata(data: StratData, builder: ExtSetBuilder<Stratum> = null): ExtSetBuilder<Stratum>
		{
			for (var id in data.boundaries)
			{
				var range = rng.read(data.boundaries[id]);
				this._boundaries[id] = range;
			}
			if (builder === null)
			{
				builder = new ExtSetBuilder<Stratum>();
			}
			for (var name in data.units)
			{
				var datum = data.units[name],
					type = datum.type,
					start: Range = null,
					end: Range = null;
				for (var i = 0, n = datum.boundaries.length; i < n; ++i)
				{
					var boundary = <Range> this._boundaries[datum.boundaries[i]];
					if (boundary === undefined)
					{
						throw new Error("Invalid boundary ID: \"" + String(datum.boundaries[i]) + "\".");
					}
					if (start === null || start.mean > boundary.mean)
					{
						start = boundary;
					}
					if (end === null || end.mean < boundary.mean)
					{
						end = boundary;
					}
				}
				if (start === null || end === null || start.hash === end.hash)
				{
					throw new Error("Invalid boundaries for stratum \"" + name + "\".");
				}
				builder.add(Object.freeze({
					end: end,
					hash: '(stratum:' + type + ":" + name + ")",
					name: name,
					start: start,
					type: type
				}));
			}
			return builder;
		}
	}
}