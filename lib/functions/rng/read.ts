///<reference path="create.ts" />
///<reference path="../arr/each.ts" />
///<reference path="../../builders/RangeBuilder.ts" />
///<reference path="../../interfaces/Range.ts" />
module Haeckel.rng
{
	export function read(data: number): Range
	export function read(data: number[]): Range
	export function read(data: any): Range
	{
		if (data === null || data === undefined)
		{
			return null;
		}
		if (typeof data === "number")
		{
			return create(<number> data);
		}
		if (Array.isArray(data))
		{
			var builder = new RangeBuilder;
			arr.each(<number[]> data, builder.add, builder);
			return builder.build();
		}
		return null;
	}
}