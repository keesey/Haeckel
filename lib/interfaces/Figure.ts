///<reference path='DataSources.ts' />

module Haeckel
{
	export enum AssetType
	{
		BASE64,
		SVG
	}

	export interface Asset
	{
		data: string;
		type: AssetType;
	}

	export interface Figure
	{
		assets: string[];
		dataSources: string[];
		height: string;
		width: string;
		render(doc: Document, dataSources: DataSources, assets: { [filename: string]: Asset; }): SVGSVGElement;
	}
}