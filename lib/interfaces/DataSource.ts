///<reference path='CharacterMatrix.ts' />
///<reference path='Dating.ts' />
///<reference path='Digraph.ts' />
///<reference path='DistanceMatrix.ts' />
///<reference path='ExtSet.ts' />
///<reference path='Nomenclature.ts' />
///<reference path='Stratum.ts' />
///<reference path='Taxic.ts' />

module Haeckel
{
	export interface DataSourceMetadata
	{
		authors?: string[];
		day?: number;
		issue?: any;
		journal?: string;
		month?: number;
		pages?: number[];
		title?: string;
		uri?: string;
		volume?: any;
		year?: number;
	}

	export interface DataSource
	{
		characterMatrices: { [name: string]: CharacterMatrix<Set>; };
		datings: { [name: string]: ExtSet<Dating>; }
		distanceMatrices: { [name: string]: DistanceMatrix<Taxic>; };
		metadata: DataSourceMetadata;
		nomenclature: Nomenclature;
		occurrences: CharacterMatrix<Set>;
		phylogenies: { [name: string]: Digraph<Taxic>; };
		strata: ExtSet<Stratum>;
	}
}