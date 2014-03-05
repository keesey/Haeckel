/// <reference path="DataSourceReader.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../interfaces/DataSource.ts"/>
/// <reference path="../interfaces/DataSources.ts"/>
module Haeckel
{
	export interface FileSystem
	{
		readBase64(filename: string): string;
		readText(filename: string): string;
	}

	export class DataSourcesReader
	{
		read(system: FileSystem, filenames: string[]): DataSources
		{
			var data: { [filename: string]: DataSourceData; } = {},
				filename: string;
			if (!filenames)
			{
				filenames = [];
			}
			for (var i = 0, n = filenames.length; i < n; ++i)
			{
				filename = filenames[i];
				if (data[filename] === undefined)
				{
					data[filename] = <DataSourceData> JSON.parse(system.readText(filename));
				}
			}
			var reader = new DataSourceReader,
				nomenclatureBuilder = new NomenclatureBuilder;
			for (filename in data)
			{
				reader.readNomenclature(data[filename], nomenclatureBuilder);
			}
			var sources: DataSources = {
				nomenclature: reader.nomenclature = nomenclatureBuilder.build(),
				sources: {}
			};
			for (filename in data)
			{
				sources.sources[filename] = reader.readDataSource(data[filename]);
			}
			return sources;
		}
	}
}