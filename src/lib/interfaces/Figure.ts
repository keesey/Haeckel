///<reference path='DataSources.ts' />
///<reference path='../builders/ElementBuilder.ts' />

module Haeckel
{
	export interface JSONAssets
	{
		[filename: string]: any;
	}

	export interface PNGAssets
	{
		image(builder: ElementBuilder, filename: string): ElementBuilder;
	}

	export interface Figure
	{
		assets?: {
			json?: string[];
			png?: string[];
			svg?: string[];
		};
		height: number;
		sources?: string[];
		width: number;
		render(builder: ElementBuilder, sources: DataSources, defs: () => ElementBuilder,
			pngAssets: PNGAssets, jsonAssets: JSONAssets): void;
	}
}