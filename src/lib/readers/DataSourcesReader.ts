/// <reference path="DataSourceReader.ts"/>
/// <reference path="../builders/NomenclatureBuilder.ts"/>
/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../interfaces/DataSource.ts"/>
/// <reference path="../interfaces/DataSources.ts"/>
/// <reference path="../interfaces/FileCache.ts"/>
module Haeckel
{
	export class DataSourcesReader
	{
		read(files: FileCache, filenames: string[]): DataSources
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
					data[filename] = <DataSourceData> JSON.parse(files.text[filename]);
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