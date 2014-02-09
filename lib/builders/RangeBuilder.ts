/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../functions/rng/create.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Range.ts"/>
module Haeckel
{
	export class RangeBuilder implements Builder<Range>
	{
		private _max:number = NaN;

		private _min:number = NaN;

		add(value: number): RangeBuilder
		{
			if (!isNaN(value))
			{
				if (isNaN(this._min) || value < this._min)
				{
					this._min = value;
				}
				if (isNaN(this._max) || value > this._max)
				{
					this._max = value;
				}
			}
			return this;
		}

		addRange(range: Range): RangeBuilder
		{
			if (!range.empty)
			{
				if (isNaN(this._min) || range.min < this._min)
				{
					this._min = range.min;
				}
				if (isNaN(this._max) || range.max > this._max)
				{
					this._max = range.max;
				}
			}
			return this;
		}

		build(): Range
		{
			var max = this._max,
				min = this._min;
			if (isNaN(min) || isNaN(max))
			{
				return EMPTY_SET;
			}
			return rng.create(min, max);
		}

		reset(): RangeBuilder
		{
			this._min = this._max = NaN;
			return this;
		}
	}
}