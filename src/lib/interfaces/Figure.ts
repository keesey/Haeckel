///<reference path='DataSources.ts' />
///<reference path='../builders/ElementBuilder.ts' />

module Haeckel
{
	export interface AssetData
	{
		[filename: string]: string;
	}

	export interface Figure
	{
		assets?: {
			base64?: string[];
			text?: string[];
		};
		height: number;
		sources?: string[];
		width: number;
		render(builder: ElementBuilder, sources: DataSources, assets: AssetData): void;
	}
}