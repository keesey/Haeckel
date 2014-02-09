/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/RANGE_0.ts"/>
/// <reference path="../constants/RANGE_0_TO_1.ts"/>
/// <reference path="../constants/RANGE_1.ts"/>
/// <reference path="../constants/RANGE_INF.ts"/>
/// <reference path="../constants/RANGE_NEG_INF.ts"/>
/// <reference path="../constants/RANGE_POS_INF.ts"/>
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
			if (min === 0)
			{
				if (max === 1)
				{
					return RANGE_0_TO_1;
				}
				if (max === 0)
				{
					return RANGE_0;
				}
			}
			else if (min === 1 && max === 1)
			{
				return RANGE_1;
			}
			if (max === Infinity)
			{
				if (min === 0)
				{
					return RANGE_POS_INF;
				}
				if (min === -Infinity)
				{
					return RANGE_INF;
				}
			}
			else if (min === -Infinity && max === 0)
			{
				return RANGE_NEG_INF;
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