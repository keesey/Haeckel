/// <reference path="../../builders/ElementBuilder.ts"/>
/// <reference path="../../constants/SVG_NS.ts"/>
/// <reference path="../../constants/XLINK_NS.ts"/>
/// <reference path="../../interfaces/Figure.ts"/>
/// <reference path="../../interfaces/FileCache.ts"/>
/// <reference path="../../readers/DataSourcesReader.ts"/>
module Haeckel.fig
{
	var XMLNS_NS = 'http://www.w3.org/2000/xmlns/';

	export function render(figure: Figure, document: Document, files: FileCache, serializer: XMLSerializer): string
	{
		function initDefs()
		{
			if (!defs)
			{
				defs = elementBuilder.child(SVG_NS, 'defs');
			}
		}

		function addPNGDef(filename: string, data: string)
		{
			initDefs();
			defs.child(SVG_NS, 'image')
				.attrs(SVG_NS, {
						id: filename,
						preserveAspectRatio: 'none'
					})
				.attr(XLINK_NS, 'xlink:href', 'data:image/png;base64,' + data);
		}

		function addSVGDef(filename: string, data: string)
		{
			initDefs();
			if (!parser)
			{
				parser = new DOMParser();
			}
		    var svgDocument = parser.parseFromString(data, 'image/svg+xml'),
		        svg = <SVGSVGElement> svgDocument.rootElement.cloneNode(true);
		    svg.setAttribute('id', filename);
		    if (!svg.hasAttribute('viewBox'))
		    {
			    var width = svg.width.baseVal,
			        height = svg.height.baseVal;
			    width.convertToSpecifiedUnits(5); // pixels
			    height.convertToSpecifiedUnits(5); // pixels
			    svg.setAttribute('viewBox', [0, 0, width.value, height.value].join(' '));
			}
			var xmlnsNames: string[] = [];
			for (var i = 0; i < svg.attributes.length; ++i)
			{
				var attr = svg.attributes.item(i);
				if (attr.namespaceURI === XMLNS_NS && attr.localName !== 'xmlns')
				{
					xmlnsNames.push(attr.localName);
				}
			}
			for (i = 0; i < xmlnsNames.length; ++i)
			{
				var name = xmlnsNames[i],
					value = svg.getAttributeNS(XMLNS_NS, name);
				svg.removeAttributeNS(XMLNS_NS, name);
				svg.setAttribute('xmlns:' + name, value);
			}
		    defs.build().appendChild(svg);
		}

		var dataSourcesReader = new DataSourcesReader(),
			dataSources = dataSourcesReader.read(files, figure.sources),
			i: number,
			n: number,
			filename: string,
			elementBuilder = new ElementBuilder(document, SVG_NS, 'svg')
				.attrs({
						xmlns: SVG_NS,
						"xmlns:xlink": XLINK_NS,
					})
				.attrs(SVG_NS, {
						width: figure.width + 'px',
						height: figure.height + 'px',
						version: '1.2',
						viewBox: '0 0 ' + figure.width + ' ' + figure.height
					}),
			defs: ElementBuilder,
			parser: DOMParser;
		if (figure.assets)
		{
			if (figure.assets.png)
			{
				for (i = 0, n = figure.assets.png.length; i < n; ++i)
				{
					filename = figure.assets.png[i];
					addPNGDef(filename, files.base64[filename]);
				}
			}
			if (figure.assets.svg)
			{
				for (i = 0, n = figure.assets.svg.length; i < n; ++i)
				{
					filename = figure.assets.svg[i];
					addSVGDef(filename, files.text[filename]);
				}
			}
		}
		figure.render(elementBuilder, dataSources, defs);
		var svg = <SVGSVGElement> elementBuilder.build();
		document.body.appendChild(svg);
		return '<?xml version="1.0" encoding="UTF-8"?>'
			+ serializer.serializeToString(svg);
	}
}