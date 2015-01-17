/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_CHARACTER_MATRIX.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/WHITE.ts"/>
/// <reference path="../functions/bit/contains.ts"/>
/// <reference path="../functions/bit/size.ts"/>
/// <reference path="../functions/chr/states.ts"/>
/// <reference path="../functions/clr/create.ts"/>
/// <reference path="../functions/rec/createFromCoords.ts"/>
/// <reference path="../interfaces/BitSet.ts"/>
/// <reference path="../interfaces/CharacterMatrix.ts"/>
/// <reference path="../interfaces/Color.ts"/>
/// <reference path="../interfaces/Rectangle.ts"/>
/// <reference path="../interfaces/Renderer.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>

module Haeckel
{
	function DEFAULT_STATE_STYLER(state: number, totalStates: number): { [name: string]: string; }
	{
		var color = BLACK;
		if (state > 0 && totalStates > 0)
		{
			totalStates = Math.max(state + 1, totalStates);
			var value = 0xFF * state / (totalStates - 1);
			color = clr.create(value, value, value);
		}
		return {
			fill: color.hex,
			stroke: BLACK.hex,
			'stroke-opacity' : '1',
			'stroke-width': '1px',
			'fill-opacity' : '1'
		};
	}

	function drawUnknown(element: ElementBuilder, area: Rectangle, spacing: number)
	{
		// :TODO: Customizable styles
		element
			.child(SVG_NS, 'rect')
			.attrs(SVG_NS, {
				'x': area.left + 'px',
				'y': area.top + 'px',
				'rx': (area.height / 4) + 'px',
				'ry': (area.height / 4) + 'px',
				'width': area.width + 'px',
				'height': area.height + 'px',
				'fill': WHITE.hex,
				'stroke': BLACK.hex,
				'stroke-dasharray' : '1,3',
				'stroke-width': '1px'
			});
		element
			.child(SVG_NS, 'text')
			.attrs(SVG_NS, {
				'x': area.centerX + 'px',
				'y': (area.centerY + area.height / 8) + 'px',
				'fill': BLACK.hex,
				'font-size': (area.height / 4) + 'px',
				'text-anchor': 'middle',
				'font-family': "Myriad Pro"
			})
			.text('?');
	}

	class StateRenderer implements Renderer
	{
		private columnY: {
			[column: string]: {
				top: number;
				bottom: number;
			};
		} = {};
		private maxColumn = NaN;
		private minColumn = NaN;
		private rowHeight: number;
		private rowTop: number;
		constructor(private chart: CharacterMatrixChart, private row: number,
			private state: number, private totalStates: number, private stateSpacing: number)
		{
			var firstCell = chart.getArea(row, 0);
			this.rowHeight = firstCell.height;
			this.rowTop = firstCell.top;
		}
		setRatio(column: number, top: number, bottom: number)
		{
			if (isNaN(this.maxColumn) || column > this.maxColumn)
			{
				this.maxColumn = column;
			}
			if (isNaN(this.minColumn) || column < this.minColumn)
			{
				this.minColumn = column;
			}
			this.columnY[String(column)] = {
				top: this.rowTop + top * (this.rowHeight + this.stateSpacing),
				bottom: this.rowTop - this.stateSpacing + bottom * (this.rowHeight + this.stateSpacing)
			};
		}
		render(element: ElementBuilder): ElementBuilder
		{
			if (isNaN(this.maxColumn) || isNaN(this.minColumn))
			{
				return element;
			}

			// top edge
			var area = this.chart.getArea(this.row, this.minColumn);
			if (area.empty)
			{
				throw new Error("No area for row " + this.row + ", column " + this.minColumn + ".");
			}
			var columnY = this.columnY[String(this.minColumn)];
			var d =
				'M' + [area.left, (columnY.top + columnY.bottom) / 2].join(' ') +
				'Q' + [area.left, columnY.top, area.centerX, columnY.top].join(' ');
			if (this.minColumn !== this.maxColumn)
			{
				d += 'H' + area.right;
				for (var column = this.minColumn + 1; column <= this.maxColumn; ++column)
				{
					var lastTop = columnY.top;
					var lastArea = area;
					columnY = this.columnY[String(column)];
					area = this.chart.getArea(this.row, column);
					if (area.empty)
					{
						throw new Error("No area for row " + this.row + ", column " + column + ".");
					}
					if (lastTop !== columnY.top)
					{
						var midX = (lastArea.right + area.left) / 2;
						d +=
							'Q' + [midX, lastTop, midX, (lastTop + columnY.top) / 2].join(' ') +
							'Q' + [midX, columnY.top, area.left, columnY.top].join(' ');
					}
					if (column === this.maxColumn)
					{
						d += 'H' + area.centerX;
					}
					else
					{
						d += 'H' + area.right;
					}
				}
			}
			d += 'Q' + [area.right, columnY.top, area.right, (columnY.top + columnY.bottom) / 2].join(' ');
			
			// bottom edge
			d += 'Q' + [area.right, columnY.bottom, area.centerX, columnY.bottom].join(' ');
			if (this.minColumn !== this.maxColumn)
			{
				d += 'H' + area.left;
				for (column = this.maxColumn - 1; column >= this.minColumn; --column)
				{
					var lastBottom = columnY.bottom;
					lastArea = area;
					columnY = this.columnY[String(column)];
					area = this.chart.getArea(this.row, column);
					if (lastTop !== columnY.top)
					{
						midX = (lastArea.left + area.right) / 2;
						d +=
							'Q' + [midX, lastBottom, midX, (lastBottom + columnY.bottom) / 2].join(' ') +
							'Q' + [midX, columnY.bottom, area.right, columnY.bottom].join(' ');
					}
					if (column === this.minColumn)
					{
						d += 'H' + area.centerX;
					}
					else
					{
						d += 'H' + area.left;
					}
				}
			}
			d +=
				'Q' + [area.left, columnY.bottom, area.left, (columnY.top + columnY.bottom) / 2].join(' ') +
				'Z';
			
			return element
				.child(SVG_NS, 'path')
				.attr(SVG_NS, 'd', d)
				.attrs(SVG_NS, this.chart.stateStyler(this.state, this.totalStates));
		}
	}

	export class CharacterMatrixChart implements Renderer
	{
		area: Rectangle = EMPTY_SET;

		characters: Character<BitSet>[] = [];

		matrix = <CharacterMatrix<BitSet>> EMPTY_CHARACTER_MATRIX;

		spacingH = 10;

		spacingV = 10;

		stateSpacing = 2;

		stateStyler: (state: number, totalStates: number) => { [name: string]: string; } = DEFAULT_STATE_STYLER;

		taxa: Taxic[] = [];

		getArea(character: Character<BitSet>, taxon: Taxic): Rectangle;
		getArea(row: number, column: number): Rectangle;
		getArea(a: any, b: any): Rectangle
		{
			if (typeof a === 'number' && typeof b === 'number')
			{
				if (!(a >= 0) || !(b >= 0) || a >= this.characters.length || b >= this.taxa.length)
				{
					return EMPTY_SET;
				}
				return this._getArea(<number> a, <number> b);
			}
			var row = this.characters.indexOf(a);
			if (row < 0)
			{
				return EMPTY_SET;
			}
			var column = this.taxa.indexOf(b);
			if (column < 0)
			{
				return EMPTY_SET;
			}
			return this._getArea(row, column);
		}

		render(parent: ElementBuilder): ElementBuilder
		{
			var g = parent.child(SVG_NS, 'g');
			var n = this.characters.length;
			if (n > 0)
			{
				for (var i = 0; i < n; ++i)
				{
					var character = this.characters[i];
					this.renderCharacter(g, character, i);
				}
			}
			return g;
		}

		private _getArea(row: number, column: number): Rectangle
		{
			var rows = this.characters.length;
			var columns = this.taxa.length;
			if (rows === 0 || columns === 0)
			{
				return EMPTY_SET;
			}
			var w = (this.area.width - this.spacingH * (columns - 1)) / columns;
			var h = (this.area.height - this.spacingV * (rows - 1)) / rows;
			var x = this.area.left + (w + this.spacingH) * column;
			var y = this.area.top + (h + this.spacingV) * row;
			return rec.createFromCoords(x, y, x + w, y + h);
		}

		private renderCharacter(element: ElementBuilder, character: Character<BitSet>, row: number)
		{
			var columns = this.taxa.length;
			if (!(columns > 0))
			{
				return;
			}
			var g = element.child(SVG_NS, 'g');
			var statesGroup = g.child(SVG_NS, 'g');
			var numStates = bit.size(character.domain);
			if (!(numStates > 0))
			{
				return;
			}
			var cells: number[][] = new Array(columns);
			var unknownsBuilder = new ExtSetBuilder<number>();
			for (var column = 0; column < columns; ++column)
			{
				var taxon = this.taxa[column];
				var states = chr.states(this.matrix, taxon, character);
				if (states === null)
				{
					cells[column] = column === 0 ? [] : cells[column - 1];
					unknownsBuilder.add(column);
				}
				else
				{
					var cell: number[] = [];
					for (var state = 0; state < numStates; ++state)
					{
						if (bit.contains(states, state))
						{
							cell.push(state);
						}
					}
					cells[column] = cell;
				}
			}
			var stateRendererLookup: { [state: string]: StateRenderer; } = {};
			var stateRenderers: StateRenderer[] = [];
			for (column = 0; column < columns; ++column)
			{
				taxon = this.taxa[column];
				var cell = cells[column];
				var stateLookup: { [state: string]: boolean; } = {};
				for (var i = 0; i < cell.length; ++i)
				{
					state = cell[i];
					stateLookup[String(state)] = true;
					var stateRenderer = stateRendererLookup[String(state)];
					if (!stateRenderer)
					{
						stateRendererLookup[String(state)] = stateRenderer = new StateRenderer(this, row, state, numStates, this.stateSpacing);
						stateRenderers.push(stateRenderer);
					}
					stateRenderer.setRatio(column, i / cell.length, (i + 1) / cell.length);
				}
				for (var stateString in stateRendererLookup)
				{
					if (!stateLookup[stateString])
					{
						delete stateRendererLookup[stateString];
					}
				}
			}
			stateRenderers.forEach(renderer => renderer.render(statesGroup));
			var unknowns = unknownsBuilder.build();
			if (!unknowns.empty)
			{
				var unknownsGroup = g.child(SVG_NS, 'g');
				for (column = 0; column < columns; ++column)
				{
					if (!ext.contains(unknowns, column)) {
						continue;
					}
					var start = column;
					while (column < columns && ext.contains(unknowns, column + 1))
					{
						++column;
					}
					var area = rec.combine([ this._getArea(row, start), this._getArea(row, column) ]);
					drawUnknown(unknownsGroup, area, this.spacingH);
				}
			}
		}
	}
}