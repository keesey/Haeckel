///<reference path='DataSource.ts' />
///<reference path='Nomenclature.ts' />

module Haeckel
{
	export interface DataSources
	{
		nomenclature: Nomenclature;
		sources: { [filename: string]: DataSource; }
	}
}