/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/Point.ts"/>
/// <reference path="../functions/pt/create.ts"/>
/// <reference path="../functions/precisionEqual.ts"/>
module Haeckel
{
	export class PathBuilder implements Builder<string>
	{
		private points: Point[] = [];

		close: boolean = true;

		add(point: Point): PathBuilder;
		add(x: number, y: number): PathBuilder;
		add(a: any, y?: number): PathBuilder
		{
			if (typeof a === 'number')
			{
				this.points.push(pt.create(<number> a, y));
			}
			else
			{
				this.points.push(<Point> a);
			}
			return this;
		}

		build(): string
		{
			var n = this.points.length;
			if (n === 0)
			{
				return 'M0,0Z';
			}
			var last = this.points[0];
			var result: string[] = ['M' + last.x + ' ' + last.y];
			var lastCommand = 'M';
			for (var i = 1; i < n; ++i)
			{
				var point = this.points[i];
				if (precisionEqual(last.x, point.x))
				{
					if (!precisionEqual(last.y, point.y))
					{
						if (lastCommand === 'V')
						{
							result.pop();
						}
						result.push((lastCommand = 'V') + point.y);
					}
				}
				else if (precisionEqual(last.y, point.y))
				{
					if (lastCommand === 'H')
					{
						result.pop();
					}
					result.push((lastCommand = 'H') + point.x);
				}
				else
				{
					result.push((lastCommand = 'L') + point.x + ' ' + point.y);
				}
				last = point;
			}
			if (this.close)
			{
				result.push('Z');
			}
			return result.join('');
		}
		
		reset()
		{
			this.points = [];
			return this;
		}
	}
}
