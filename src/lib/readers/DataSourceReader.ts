/// <reference path="CharacterMapReader.ts"/>
/// <reference path="CharacterScoresReader.ts"/>
/// <reference path="DatingReader.ts"/>
/// <reference path="DistanceMatrixReader.ts"/>
/// <reference path="NomenclatureRelationsReader.ts"/>
/// <reference path="OccurrencesReader.ts"/>
/// <reference path="PhyloArcsReader.ts"/>
/// <reference path="StratReader.ts"/>
/// <reference path="TopologyReader.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_CHARACTER_MATRIX.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../interfaces/DataSource.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
module Haeckel
{
	export interface SourceData
	{
		characterMaps?: {
			[name: string]: CharacterMapData;
		};
		characterScores?:  {
			[name: string]: CharacterScoresData;
		};
		datings?: {
			[name: string]: DatingData[];
		}
		distances?: {
			[name: string]: DistanceData[];
		};
		nomenclature?: NomenclatureRelationsData;
		occurrences?: OccurrencesData;
		phyloGraphs?: {
			[name: string]: string[][];
		};
		stratigraphy?: StratData;
		topologies?: {
			[name: string]: any;
		};
	}

	export interface DataSourceData
	{
		data: SourceData;
		metadata: DataSourceMetadata;
	}

	export class DataSourceReader
	{
		private _nomenclature:Nomenclature = EMPTY_NOMENCLATURE;

		private characterMapReader = new CharacterMapReader<Set>();

		private characterScoresReader = new CharacterScoresReader();

		private datingReader = new DatingReader();

		private distanceMatrixReader = new DistanceMatrixReader();

		private nomenclatureRelationsReader = new NomenclatureRelationsReader();

		private occurrencesReader = new OccurrencesReader();

		private phyloArcsReader = new PhyloArcsReader();

		private stratReader = new StratReader();

		private topologyReader = new TopologyReader();

		set nomenclature(value: Nomenclature)
		{
			if (!isNomenclature(value))
			{
				value = EMPTY_NOMENCLATURE;
			}
			if (this._nomenclature !== value)
			{
				this._nomenclature = value;
				this.characterMapReader.nomenclature = value;
				this.characterScoresReader.nomenclature = value;
				this.datingReader.nomenclature = value;
				this.distanceMatrixReader.nomenclature = value;
				this.occurrencesReader.nomenclature = value;
				this.phyloArcsReader.nomenclature = value;
				this.topologyReader.nomenclature = value;
			}
		}

		prepareNomenclature(data: DataSourceData, builder: NomenclatureBuilder): boolean
		{
			var d: SourceData = data.data;
			var added: boolean = false;
			if (d.occurrences !== undefined)
			{
				added = this.occurrencesReader.addDefaultUnits(d.occurrences, builder);
			}
			return added;
		}

		readDataSource(data: DataSourceData): DataSource
		{
			var result: DataSource = {
					characterMatrices: {},
					datings: {},
					distanceMatrices: {},
					metadata: Object.freeze(data.metadata),
					nomenclature: this._nomenclature,
					occurrences: EMPTY_CHARACTER_MATRIX,
					phylogenies: {},
					strata: EMPTY_SET
				},
				key: string,
				d: SourceData = data.data;
			if (d.characterMaps !== undefined)
			{
				for (key in d.characterMaps)
				{
					result.characterMatrices[key] = this.characterMapReader
						.readCharacterMatrix(d.characterMaps[key])
						.build();
				}
			}
			if (d.characterScores !== undefined)
			{
				for (key in d.characterScores)
				{
					result.characterMatrices[key] = this.characterScoresReader
						.readCharacterMatrix(d.characterScores[key])
						.build();
				}
			}
			if (d.datings !== undefined)
			{
				for (key in d.datings)
				{
					result.datings[key] = this.datingReader
						.readDatings(d.datings[key])
						.build();
				}
			}
			if (d.distances !== undefined)
			{
				for (key in d.distances)
				{
					result.distanceMatrices[key] = this.distanceMatrixReader
						.readDistanceMatrix(d.distances[key])
						.build();
				}
			}
			if (d.occurrences !== undefined)
			{
				result.occurrences = this.occurrencesReader
					.readCharacterMatrix(d.occurrences)
					.build();
			}
			if (d.phyloGraphs !== undefined)
			{
				for (key in d.phyloGraphs)
				{
					result.phylogenies[key] = this.phyloArcsReader
						.readDAG(d.phyloGraphs[key])
						.build();
				}
			}
			if (d.stratigraphy !== undefined)
			{
				result.strata = this.stratReader
					.readStrata(d.stratigraphy)
					.build();
			}
			if (d.topologies !== undefined)
			{
				for (key in d.topologies)
				{
					result.phylogenies[key] = this.topologyReader
						.readDAG(d.topologies[key])
						.build();
				}
			}
			result.characterMatrices = Object.freeze(result.characterMatrices);
			result.distanceMatrices = Object.freeze(result.distanceMatrices);
			result.phylogenies = Object.freeze(result.phylogenies);
			return Object.freeze(result);
		}

		readNomenclature(data: DataSourceData, builder: NomenclatureBuilder = null): NomenclatureBuilder
		{
			if (builder === null)
			{
				builder = new NomenclatureBuilder();
			}
			var key: string,
				d: SourceData = data.data;
			if (d.characterMaps !== undefined)
			{
				for (key in d.characterMaps)
				{
					this.characterMapReader.readNomenclature(d.characterMaps[key], builder);
				}
			}
			if (d.characterScores !== undefined)
			{
				for (key in d.characterScores)
				{
					this.characterScoresReader.readNomenclature(d.characterScores[key], builder);
				}
			}
			if (d.datings !== undefined)
			{
				for (key in d.datings)
				{
					this.datingReader.readNomenclature(d.datings[key], builder);
				}
			}
			if (d.distances !== undefined)
			{
				for (key in d.distances)
				{
					this.distanceMatrixReader.readNomenclature(d.distances[key], builder);
				}
			}
			if (d.occurrences !== undefined)
			{
				this.occurrencesReader.readNomenclature(d.occurrences, builder);
			}
			if (d.nomenclature !== undefined)
			{
				this.nomenclatureRelationsReader.readNomenclature(d.nomenclature, builder);
			}
			if (d.phyloGraphs !== undefined)
			{
				for (key in d.phyloGraphs)
				{
					this.phyloArcsReader.readNomenclature(d.phyloGraphs[key], builder);
				}
			}
			if (d.topologies !== undefined)
			{
				for (key in d.topologies)
				{
					this.topologyReader.readNomenclature(d.topologies[key], builder);
				}
			}
			return builder;
		}
	}
}