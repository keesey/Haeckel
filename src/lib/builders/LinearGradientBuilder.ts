/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/RAD_TO_DEG.ts"/>
/// <reference path="../functions/trg/normalize.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/GradientEntry.ts"/>
module Haeckel
{
	function compareGradientEntries(a: GradientEntry, b: GradientEntry)
	{
		return a.ratio - b.ratio;
	}
	
	function gradientEntryToString(entry: GradientEntry)
	{
		return entry.color.hex + ":" + (entry.ratio * 100);
	}
	
	export class LinearGradientBuilder implements Builder<string>
	{
		angle = 0;

		end = BLACK;

		start = BLACK;

		private _tweens: GradientEntry[] = [];

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
				this._tweens.push(entry);
			}
			return this;
		}

		build()
		{
			this._tweens = this._tweens.sort(compareGradientEntries);
	        var s = String(trg.normalize(this.angle) * RAD_TO_DEG) + "-" + this.start.hex;
	        for (var i = 0, n = this._tweens.length; i < n; ++i)
			{
				s += "-" + gradientEntryToString(this._tweens[i]);
			}
	        s += "-" + this.end.hex;
	        return s;
		}

		reset()
		{
			this.angle = 0;
			this.end = BLACK;
			this.start = BLACK;
			this._tweens = [];
			return this;
		}
		
		resetEntries()
		{
			this._tweens = [];
			return this;
		}
	}
}