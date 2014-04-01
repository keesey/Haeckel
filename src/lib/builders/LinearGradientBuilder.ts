/// <reference path="ElementBuilder.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/GradientEntry.ts"/>
module Haeckel
{
	function compareGradientEntries(a: GradientEntry, b: GradientEntry)
	{
		return a.ratio - b.ratio;
	}
	
	function percent(ratio: number): string
	{
		return String(ratio * 100) + '%';
	}
	
	export class LinearGradientBuilder implements Builder<ElementBuilder>
	{
		angle = 0;

		bottom = 1;

		end = BLACK;

		endOpacity = 1;

		left = 0;

		right = 0;

		start = BLACK;

		startOpacity = 1;

		top = 0;

		private _stops: GradientEntry[] = [];

		constructor(private defsBuilder: ElementBuilder, private id: string)
		{
		}

		add(entry: GradientEntry)
		{
			if (entry.ratio <= 0 || isNaN(entry.ratio))
			{
				this.start = entry.color;
			}
			else if (entry.ratio >= 1)
			{
				this.end = entry.color;
			}
			else
			{
				this._stops.push(entry);
			}
			return this;
		}

		build()
		{
			this._stops = this._stops.sort(compareGradientEntries);
			var linearGradient = this.defsBuilder.child(SVG_NS, 'linearGradient')
					.attrs(SVG_NS, {
						id: this.id,
						x1: percent(this.left),
						y1: percent(this.top),
						x2: percent(this.right),
						y2: percent(this.bottom)
					});
			linearGradient.child(SVG_NS, 'stop')
				.attrs(SVG_NS, {
						offset: '0%',
						'stop-color': 'rgb(' + this.start.r + ',' + this.start.g + ',' + this.start.b + ')',
						'stop-opacity': percent(this.startOpacity)
					});
	        for (var i = 0, n = this._stops.length; i < n; ++i)
			{
				var stop = this._stops[i];
				linearGradient.child(SVG_NS, 'stop')
					.attrs(SVG_NS, {
							offset: percent(stop.ratio),
							'stop-color': 'rgb(' + stop.color.r + ',' + stop.color.g + ',' + stop.color.b + ')',
							'stop-opacity': percent(stop.opacity)
						});
			}
			linearGradient.child(SVG_NS, 'stop')
				.attrs(SVG_NS, {
						offset: '100%',
						'stop-color': 'rgb(' + this.end.r + ',' + this.end.g + ',' + this.end.b + ')',
						'stop-opacity': percent(this.endOpacity)
					});
			return linearGradient;
		}

		reset()
		{
			this.angle = 0;
			this.end = BLACK;
			this.start = BLACK;
			this._stops = [];
			return this;
		}

		resetEntries()
		{
			this._stops = [];
			return this;
		}

		resetID(id: string)
		{
			this.id = id;
			return this.reset();
		}
	}
}