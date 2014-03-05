/// <reference path="builders/ElementBuilder.ts"/>
/// <reference path="constants/SVG_NS.ts"/>
/// <reference path="interfaces/Figure.ts"/>
/// <reference path="readers/DataSourcesReader.ts"/>

module Haeckel
{
	export function render(figure: Figure, document: Document, system: FileSystem, serializer: XMLSerializer): string
	{
		var dataSourcesReader = new DataSourcesReader(),
			dataSources = dataSourcesReader.read(system, figure.sources),
			i: number,
			n: number,
			assetData: AssetData = {},
			filename: string,
			elementBuilder = new ElementBuilder(document, SVG_NS, 'svg')
				.attrs({
						xmlns: SVG_NS,
						"xmlns:xlink": "http://www.w3.org/1999/xlink",
					})
				.attrs(SVG_NS, {
						width: figure.width,
						height: figure.height
					});
		if (figure.assets)
		{
			if (figure.assets.base64)
			{
				for (i = 0, n = figure.assets.base64.length; i < n; ++i)
				{
					filename = figure.assets.base64[i];
					assetData[filename] = system.readBase64(filename);
				}
			}
			if (figure.assets.text)
			{
				for (i = 0, n = figure.assets.text.length; i < n; ++i)
				{
					filename = figure.assets.text[i];
					assetData[filename] = system.readText(filename);
				}
			}
		}
		figure.render(elementBuilder, dataSources, assetData);
		return '<?xml version="1.0" encoding="UTF-8"?>'
			+ serializer.serializeToString(elementBuilder.build());
	}
}