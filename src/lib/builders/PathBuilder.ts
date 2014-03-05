/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Point.ts"/>
module Haeckel
{
	export class PathBuilder implements Builder<string>
	{
		private points: Point[] = [];

		add(point: Point)
		{
			this.points.push(point);
			return this;
		}

		build(): string
		{
			var n = this.points.length;
			if (n === 0)
			{
				return 'M0,0Z';
			}
			// :TODO: compression?
			return 'M' + this.points.map((point: Point) => String(point.x) + ' ' + point.y).join('L') + 'Z';
		}
		
		reset()
		{
			this.points = [];
			return this;
		}
	}
}
