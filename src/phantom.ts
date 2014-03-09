/// <reference path="../bower_components/dt-phantomjs/phantomjs.d.ts"/>
/// <reference path="lib/interfaces/Figure.ts"/>
/// <reference path="lib/interfaces/FileCache.ts"/>
/// <reference path="lib/render.ts"/>

declare var FIGURE_TO_RENDER: Haeckel.Figure;

var HTML = '<!DOCTYPE HTML><html><head><title>&nbsp;</title></head><body></body></html>';

function dataURI(data: string, mimetype: string = 'text/javascript', base64: boolean = false, charset: string = 'utf-8')
{
	return 'data:' + mimetype + ';charset=' + charset + (base64 ? ';base64' : '') + ',' + data;
}

var system = <System> require('system');
try
{
	if (system.args.length !== 3 || !/\.js$/.test(system.args[1]))
	{
		throw new Error('Correct usage: phantomjs phantom.js <figure.js> <output_folder>')
	}
	var inputFile = system.args[1],
		outputFolder = system.args[2],
		split = inputFile.split(/[\/\\]/g),
		baseFilename = split[split.length - 1].replace(/(\.fig)?\.js$/, ''),
		outputFilename = outputFolder.replace(/\/$/, '')
			+ '/' + baseFilename;
		fs = <FileSystem> require('fs');
	if (!fs.isFile(inputFile))
	{
		throw new Error("Cannot find input file \"" + inputFile + "\".");
	}
	if (!fs.isDirectory(outputFolder))
	{
		throw new Error("Cannot find output folder \"" + outputFolder + "\".");
	}
	if (!phantom.injectJs(inputFile))
	{
		throw new Error("Error reading \"" + inputFile + "\".");
	}
	if (!FIGURE_TO_RENDER)
	{
		throw new Error("\"" + inputFile + "\" must define a variable called \"FIGURE_TO_RENDER\".");
	}
	var files: Haeckel.FileCache = {
			base64: {},
			text: {}
		};
	if ((FIGURE_TO_RENDER.sources && FIGURE_TO_RENDER.sources.length)
		|| (FIGURE_TO_RENDER.assets &&
		((FIGURE_TO_RENDER.assets.base64 && FIGURE_TO_RENDER.assets.base64.length) || (FIGURE_TO_RENDER.assets.text && FIGURE_TO_RENDER.assets.text.length))
		))
	{
		var i: number,
			n: number,
			filename: string,
			fs = <FileSystem> require('fs'),
			read = <any> fs.read; // :TODO: fix declaration
		if (FIGURE_TO_RENDER.assets)
		{
			if (FIGURE_TO_RENDER.assets.text)
			{
				for (i = 0, n = FIGURE_TO_RENDER.assets.text.length; i < n; ++i)
				{
					filename = FIGURE_TO_RENDER.assets.text[i];
					files.text[filename] = read(filename, { charset: 'utf-8' }); // :TODO: fix declaration
				}
			}
			if (FIGURE_TO_RENDER.assets.base64)
			{
				for (i = 0, n = FIGURE_TO_RENDER.assets.base64.length; i < n; ++i)
				{
					filename = FIGURE_TO_RENDER.assets.base64[i];
					files.base64[filename] = read(filename, { mode: 'rb' }); // :TODO: fix declaration
					// :TODO: Figure out what this is.
					console.log(files.base64[filename])
				}
			}
		}
		if (FIGURE_TO_RENDER.sources)
		{
			for (i = 0, n = FIGURE_TO_RENDER.sources.length; i < n; ++i)
			{
				filename = FIGURE_TO_RENDER.sources[i];
				files.text[filename] = read(filename, { charset: 'utf-8' }); // :TODO: fix declaration
			}
		}
	}
	var page = <WebPage> require('webpage').create();
}
catch (e)
{
	console.error(e);
	phantom.exit(1);
}
page.open(dataURI(HTML, 'text/html'), (status: string) =>
{
	try
	{
		if (status !== 'success')
		{
			throw new Error('Error reading HTML.');
		}
		else if (!page.injectJs('haeckel.js'))
		{
			throw new Error('Cannot find "haeckel.js".');
		}
		else if (!page.injectJs(inputFile))
		{
			throw new Error('Cannot find \"" + inputFile + "\".');
		}
		else
		{
			var svgData = page.evaluate((cache: Haeckel.FileCache) =>
			{
				return Haeckel.render(FIGURE_TO_RENDER, document, cache, new XMLSerializer);
			}, files);
			fs.write(outputFilename + '.svg', svgData, 'w');
			page.render(outputFilename + '.png')
		}
	}
	catch (e)
	{
		console.error(e);
		phantom.exit(1);
		return;
	}
	phantom.exit(0);
});