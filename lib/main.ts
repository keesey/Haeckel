///<reference path='../bower_components/dt-node/node.d.ts' />
///<reference path='builders/ElementBuilder.ts' />
///<reference path='builders/NomenclatureBuilder.ts' />
///<reference path='interfaces/DataSource.ts' />
///<reference path='interfaces/DataSources.ts' />
///<reference path='interfaces/Figure.ts' />
///<reference path='readers/DataSourceReader.ts' />

if (process)
{

	if (process.argv.length !== 3 || !process.argv[2])
	{
		process.stderr.write('Usage: node generate [figure.js] > [figure.svg]\n');
		process.exit(1);
	}

	var SVG_MIME_TYPE = 'image/svg+xml',
		fs: any = require('fs'),
		figureFilename = process.argv[2],
		options = { encoding: 'utf8', flag: 'r' },
		figure: Haeckel.Figure = eval(fs.readFileSync(figureFilename, options)),
		path: any = require('path'),
		dir = path.dirname(figureFilename),
		sources: Haeckel.DataSources = {},
		assets: Haeckel.AssetData = {},
		filename: string,
		i: number,
		n: number;
	if (figure.sources)
	{
		var data: { [filename: string]: Haeckel.DataSourceData; } = {};
		for (i = 0, n = figure.sources.length; i < n; ++i)
		{
			filename = figure.sources[i];
			data[filename] = <Haeckel.DataSourceData> JSON.parse(fs.readFileSync(path.join(dir, filename), options));
		}
		var reader = new Haeckel.DataSourceReader(),
			nomenclatureBuilder = new Haeckel.NomenclatureBuilder;
		for (filename in data)
		{
			reader.readNomenclature(data[filename], nomenclatureBuilder);
		}
		reader.nomenclature = nomenclatureBuilder.build();
		for (filename in data)
		{
			sources[filename] = reader.readDataSource(data[filename]);
		}
	}
	var xmldom: any = require("xmldom"),
		parser = <DOMParser> new xmldom.DOMParser(),
		serializer = <XMLSerializer> new xmldom.XMLSerializer();
	if (figure.assets)
	{
		if (figure.assets.base64)
		{
			for (i = 0, n = figure.assets.base64.length; i < n; ++i)
			{
				filename = figure.assets.base64[i];
				assets[filename] = fs.readFileSync(path.join(dir, filename)).toString('base64');
			}
		}
		if (figure.assets.svg)
		{
			for (i = 0, n = figure.assets.svg.length; i < n; ++i)
			{
				filename = figure.assets.svg[i];
				assets[filename] = serializer.serializeToString(
					parser.parseFromString(
						fs.readFileSync(path.join(dir, filename), options),
						SVG_MIME_TYPE
					).documentElement
				);
			}
		}
	}
	var doc: Document = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'
			+ figure.width + '" height="' + figure.height + '"></svg>', SVG_MIME_TYPE),
		builder = new Haeckel.ElementBuilder(doc, doc.documentElement);
	figure.render(builder, sources, assets);
	process.stdout.write('<?xml version="1.0" encoding="UTF-8"?>');
	process.stdout.write(serializer.serializeToString(builder.build()));
}