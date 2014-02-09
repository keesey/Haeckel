///<reference path='DataSources.ts' />

module Haeckel
{
	export interface Figure
	{
		dataSources: string[];
		height: string;
		width: string;
		render(dataSources: DataSources): SVGSVGElement;
	}
}