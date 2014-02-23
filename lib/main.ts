///<reference path='../bower_components/dt-node/node.d.ts' />
///<reference path='builders/ElementBuilder.ts' />
///<reference path='interfaces/Figure.ts' />

if (process)
{

	if (process.argv.length !== 3 || !process.argv[2])
	{
		process.stderr.write('Usage: node generate [figure.js] > [figure.svg]\n');
		process.exit(1);
	}

	var fs: any = require('fs'),
		figureFilename = process.argv[2],
		figure: Haeckel.Figure;
	fs.readFile(figureFilename, 'utf8', (error: any, data: string) =>
	{
		if (error)
		{
			process.stderr.write('Error reading "' + figureFilename + '":\n');
			process.stderr.write(String(error));
			process.exit(1);
			return;
		}
		var figure = <Haeckel.Figure> eval(data),
			xmldom: any = require("xmldom"),
			parser = <DOMParser> new xmldom.DOMParser(),
			doc: Document = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'
				+ figure.width + '" height="' + figure.height + '"></svg>', 'image/svg+xml'),
			builder = new Haeckel.ElementBuilder(doc, doc.documentElement);
		// :TODO: load data sources and assets.
		figure.render(builder, null, null);
		var serializer = <XMLSerializer> new xmldom.XMLSerializer();
		process.stdout.write('<?xml version="1.0" encoding="UTF-8"?>');
		process.stdout.write(serializer.serializeToString(builder.build()));
	});
}