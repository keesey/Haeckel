///<reference path='../lib/haeckel.d.ts' />

var figure: Haeckel.Figure =
{
	height: '5in',
	width: '6in',
	render: (builder: Haeckel.ElementBuilder, source: Haeckel.DataSources, assets: Haeckel.AssetData) =>
	{
		builder
			.child(Haeckel.SVG_NS, 'circle')
			.attrs(Haeckel.SVG_NS, {
				cx: '3in',
				cy: '2.5in',
				r: '2in',
				stroke: 'black',
				fill: 'red'
			});
	}
};
figure;