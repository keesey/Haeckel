/// <reference path="../../builders/ElementBuilder.ts"/>
/// <reference path="../../constants/SVG_NS.ts"/>
/// <reference path="../../constants/XLINK_NS.ts"/>
/// <reference path="../../interfaces/Figure.ts"/>
/// <reference path="../../interfaces/FileCache.ts"/>
/// <reference path="../../readers/DataSourcesReader.ts"/>
module Haeckel.fig
{
	var XMLNS_NS = 'http://www.w3.org/2000/xmlns/';

	class PNGAssetsImpl implements PNGAssets
	{
		base64Dict: { [filename: string]: string; } = {};
		image(builder: ElementBuilder, filename: string): ElementBuilder
		{
			var data = this.base64Dict[filename];
			if (!data)
			{
				throw new Error('Cannot find PNG data for "' + filename + '".');
			}
			return builder.child(SVG_NS, 'image')
				.attr(SVG_NS, 'preserveAspectRatio', 'none')
				.attr('xlink:href', 'data:image/png;base64,' + data);
		}
	}

	export function render(figure: Figure, document: Document, files: FileCache, serializer: XMLSerializer): string
	{
		function initDefs()
		{
			if (!defs)
			{
				defs = elementBuilder.child(SVG_NS, 'defs');
			}
			return defs;
		}

		function addPNGDef(filename: string, data: string)
		{
			initDefs();
			defs.child(SVG_NS, 'image')
				.attrs(SVG_NS, {
						id: filename,
						preserveAspectRatio: 'none'
					})
				.attr('xlink:href', 'data:image/png;base64,' + data);
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

			// :KLUDGE: The following section is needed to correct some errors in the handling of namespaces.
			var xmlns: { [uri: string]: string; } = {},
				n = svg.attributes.length,
				name: string,
				uri: string;
			for (var i = 0; i < n; ++i)
			{
				var attr = svg.attributes.item(i);
				if (attr.namespaceURI === XMLNS_NS && attr.localName !== 'xmlns')
				{
					xmlns[attr.value] = attr.localName;
				}
			}
			for (i = 0; i < n; ++i)
			{
				attr = svg.attributes.item(i);
				if (name = xmlns[attr.namespaceURI])
				{
					svg.removeAttributeNS(attr.namespaceURI, attr.localName);
					svg.setAttribute(name + ':' + attr.localName, attr.value);
				}
			}
			for (uri in xmlns)
			{
				var name = xmlns[uri];
				svg.removeAttributeNS(XMLNS_NS, name);
				svg.setAttribute('xmlns:' + name, uri);
			}
			
		    defs.build().appendChild(svg);
		}

		var elementBuilder = new ElementBuilder(document, SVG_NS, 'svg')
				.attrs({
						xmlns: SVG_NS,
						"xmlns:xlink": XLINK_NS,
					})
				.attrs(SVG_NS, {
						width: figure.width + 'px',
						height: figure.height + 'px',
						version: '1.2',
						viewBox: '0 0 ' + figure.width + ' ' + figure.height
					});
		try
		{
			var dataSourcesReader = new DataSourcesReader(),
				dataSources = dataSourcesReader.read(files, figure.sources),
				i: number,
				n: number,
				filename: string,
				defs: ElementBuilder,
				parser: DOMParser,
				pngAssets = new PNGAssetsImpl;
			document.body.appendChild(elementBuilder.build());
			if (figure.assets)
			{
				if (figure.assets.png)
				{
					for (i = 0, n = figure.assets.png.length; i < n; ++i)
					{
						filename = figure.assets.png[i];
						pngAssets.base64Dict[filename] = files.base64[filename];
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
			figure.render(elementBuilder, dataSources, initDefs, pngAssets);
		}
		catch (e)
		{
			elementBuilder.child(SVG_NS, 'textArea')
				.attrs(SVG_NS, 
				{
					editable: 'simple',
					focusable: 'true',
					fill: 'red',
					x: '10px',
					y: '10px',
					width: (figure.width - 20) + 'px',
					height: (figure.height - 20) + 'px',
				})
				.text(String(e.stack));
		}
		var svg = <SVGSVGElement> elementBuilder.build();
		document.body.appendChild(svg);
		return '<?xml version="1.0" encoding="UTF-8"?>'
			+ serializer.serializeToString(svg);
	}
}