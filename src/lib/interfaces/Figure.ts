///<reference path='DataSources.ts' />
///<reference path='../builders/ElementBuilder.ts' />

module Haeckel
{
	export interface Figure
	{
		assets?: {
			png?: string[];
			svg?: string[];
		};
		height: number;
		sources?: string[];
		width: number;
		render(builder: ElementBuilder, sources: DataSources, defs: ElementBuilder): void;
	}
}