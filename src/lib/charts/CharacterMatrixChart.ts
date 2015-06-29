/// <reference path="../builders/ElementBuilder.ts"/>
/// <reference path="../builders/ExtSetBuilder.ts"/>
/// <reference path="../constants/BIT_MEMBER_MAX.ts"/>
/// <reference path="../constants/BLACK.ts"/>
/// <reference path="../constants/EMPTY_CHARACTER_MATRIX.ts"/>
/// <reference path="../constants/EMPTY_SET.ts"/>
/// <reference path="../constants/SVG_NS.ts"/>
/// <reference path="../constants/WHITE.ts"/>
/// <reference path="../functions/bit/contains.ts"/>
/// <reference path="../functions/bit/create.ts"/>
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
			var value = 0xE0 * state / (totalStates - 1);
			color = clr.create(value, value, value);
		}
		return {
			fill: color.hex,
			stroke: BLACK.hex,
			'stroke-opacity' : '1',
			'stroke-width': '1px',
			'fill-opacity': '1'
		};
	}

	function drawUnknown(element: ElementBuilder, area: Rectangle, spacingH: number, spacingV: number, fontSize: number)
	{
		// :TODO: Customizable renderer
		var group = element.child(SVG_NS, 'g');
		/*
		element
			.child(SVG_NS, 'rect')
			.attrs(SVG_NS, {
				'x': (area.left - spacing * 2) + 'px',
				'y': (area.top - 1) + 'px',
				'width': (spacing * 2) + 'px',
				'height': (area.height + 2) + 'px',
				'fill': 'url(#leftFade)'
			});
		*/
		group
			.child(SVG_NS, 'rect')
			.attrs(SVG_NS, {
				'x': (area.left + spacingH) + 'px',
				'y': (area.top - spacingV + 1) + 'px',
				'width': (area.width - spacingH * 2) + 'px',
				'height': (area.height + spacingV * 2 - 2) + 'px',
				'fill': WHITE.hex
			});
		group
			.child(SVG_NS, 'line')
			.attrs(SVG_NS, {
				'x1': (area.left + spacingH) + 'px',
				'y1': (area.top - spacingV) + 'px',
				'x2': (area.left + spacingH) + 'px',
				'y2': (area.bottom + spacingV) + 'px',
				'stroke': BLACK.hex,
				'stroke-width': '2px',
				'stroke-dasharray': '2 2'
			});
		group
			.child(SVG_NS, 'line')
			.attrs(SVG_NS, {
				'x1': (area.right - spacingH) + 'px',
				'y1': (area.top - spacingV) + 'px',
				'x2': (area.right - spacingH) + 'px',
				'y2': (area.bottom + spacingV) + 'px',
				'stroke': BLACK.hex,
				'stroke-width': '2px',
				'stroke-dasharray': '2 2'
			});
		/*
		element
			.child(SVG_NS, 'rect')
			.attrs(SVG_NS, {
				'x': area.right + 'px',
				'y': (area.top - 1) + 'px',
				'width': (spacing * 2) + 'px',
				'height': (area.height + 2) + 'px',
				'fill': 'url(#rightFade)'
			});
		*/
		group
			.child(SVG_NS, 'text')
			.attrs(SVG_NS, {
				'x': area.centerX + 'px',
				'y': (area.centerY + fontSize / 2) + 'px',
				'fill': BLACK.hex,
				'font-size': fontSize + 'px',
				'font-weight': 'bold',
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
		private minKnownColumn = NaN;
		private rowHeight: number;
		private rowTop: number;
		constructor(private chart: CharacterMatrixChart, private row: number,
			private state: number, private totalStates: number,
			private label: string,
			private stateSpacing: number, private cornerRadius: number,
			private fontSize: number)
		{
			var firstCell = chart.getArea(row, 0);
			this.rowHeight = firstCell.height;
			this.rowTop = firstCell.top;
		}
		setRatio(column: number, top: number, bottom: number, unknown: boolean)
		{
			if (isNaN(this.maxColumn) || column > this.maxColumn)
			{
				this.maxColumn = column;
			}
			if (isNaN(this.minColumn) || column < this.minColumn)
			{
				this.minColumn = column;
			}
			if (!unknown)
			{
				if (isNaN(this.minKnownColumn) || column < this.minKnownColumn)
				{
					this.minKnownColumn = column;
				}
			}
			this.columnY[String(column)] = {
				top: this.rowTop + (1 - bottom) * (this.rowHeight + this.stateSpacing),
				bottom: this.rowTop - this.stateSpacing + (1 - top) * (this.rowHeight + this.stateSpacing)
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

			var group = element.child(Haeckel.SVG_NS, 'g');

			var columnY = this.columnY[String(this.minColumn)];
			var d =
				'M' + [area.left, columnY.top + this.cornerRadius].join(' ') +
				'Q' + [area.left, columnY.top, area.left + this.cornerRadius, columnY.top].join(' ') +
				'H' + (area.right - this.cornerRadius);
			if (this.minColumn !== this.maxColumn)
			{
				for (var column = this.minColumn + 1; column <= this.maxColumn; ++column)
				{
					var lastTop = columnY.top;
					var lastArea = area;
					columnY = this.columnY[String(column)];
					area = this.chart.getArea(this.row, column);
					if (lastTop !== columnY.top)
					{
						if (Math.abs(lastTop - columnY.top) <= this.cornerRadius * 2)
						{
							d += 'Q' + [lastArea.right, lastTop, lastArea.right, (lastTop + columnY.top) / 2].join(' ');
							d += 'Q' + [lastArea.right, columnY.top, lastArea.right + this.cornerRadius, columnY.top].join(' ');
						}
						else if (lastTop < columnY.top)
						{
							d +=
								'Q' + [lastArea.right, lastTop, lastArea.right, lastTop + this.cornerRadius].join(' ') +
								'V' + (columnY.top - this.cornerRadius);
							d += 'Q' + [lastArea.right, columnY.top, lastArea.right + this.cornerRadius, columnY.top].join(' ');
						}
						else
						{
							d +=
								'h' + this.cornerRadius + 
								'Q' + [lastArea.right + this.cornerRadius, lastTop, lastArea.right + this.cornerRadius, lastTop - this.cornerRadius].join(' ') +
								'V' + (columnY.top + this.cornerRadius);
							d += 'Q' + [lastArea.right + this.cornerRadius, columnY.top, lastArea.right + this.cornerRadius * 2, columnY.top].join(' ');
						}
					}
					d += 'H' + (area.right - this.cornerRadius);
				}
			}
			d +=
				'Q' + [area.right, columnY.top, area.right, columnY.top + this.cornerRadius].join(' ') +
				'V' + (columnY.bottom - this.cornerRadius);
			
			// bottom edge
			d +=
				'Q' + [area.right, columnY.bottom, area.right - this.cornerRadius, columnY.bottom].join(' ') +
				'H' + (area.left + this.cornerRadius);
			if (this.minColumn !== this.maxColumn)
			{
				for (column = this.maxColumn - 1; column >= this.minColumn; --column)
				{
					var lastBottom = columnY.bottom;
					lastArea = area;
					columnY = this.columnY[String(column)];
					area = this.chart.getArea(this.row, column);
					if (lastBottom !== columnY.bottom)
					{
						if (Math.abs(lastBottom - columnY.bottom) <= this.cornerRadius * 2)
						{
							d += 'Q' + [lastArea.left, lastBottom, lastArea.left, (lastBottom + columnY.bottom) / 2].join(' ');
							d += 'Q' + [lastArea.left, columnY.bottom, lastArea.left - this.cornerRadius, columnY.bottom].join(' ');
						}
						else if (lastBottom < columnY.bottom)
						{
							d +=
								'H' + lastArea.left +
								'Q' + [lastArea.left - this.cornerRadius, lastBottom, lastArea.left - this.cornerRadius, lastBottom + this.cornerRadius].join(' ') +
								'V' + (columnY.bottom - this.cornerRadius);
							d += 'Q' + [lastArea.left - this.cornerRadius, columnY.bottom, lastArea.left - this.cornerRadius * 2, columnY.bottom].join(' ');
						}
						else
						{
							d +=
								'Q' + [lastArea.left, lastBottom, lastArea.left, lastBottom - this.cornerRadius].join(' ') +
								'V' + (columnY.bottom + this.cornerRadius);
							d += 'Q' + [lastArea.left, columnY.bottom, lastArea.left - this.cornerRadius, columnY.bottom].join(' ');
						}
					}
					d += 'H' + (area.left + this.cornerRadius);
				}
			}
			d +=
				'Q' + [area.left, columnY.bottom, area.left, columnY.bottom - this.cornerRadius].join(' ') +
				'V' + (columnY.top + this.cornerRadius) +
				'Z';
			
			group
				.child(SVG_NS, 'path')
				.attr(SVG_NS, 'd', d)
				.attrs(SVG_NS, this.chart.stateStyler(this.state, this.totalStates));

			if (this.label)
			{
				area = this.chart.getArea(this.row, this.minKnownColumn);
				columnY = this.columnY[String(this.minKnownColumn)];
				var label = group
					.child(Haeckel.SVG_NS, 'text')
					.attrs(Haeckel.SVG_NS, {
						'x': (area.left + this.cornerRadius * 4) + 'px',
						'y': Math.min(columnY.top + this.cornerRadius + this.fontSize, columnY.bottom - this.cornerRadius * 2) + 'px',
						'fill': (this.state / (this.totalStates - 1) <= 0.5) ? WHITE.hex : BLACK.hex,
						'text-anchor': 'start',
						'font-size': this.fontSize + 'px',
						'font-family': "Myriad Pro",
						'font-weight': 'bold'
					});
				this.label
					.split(/\n+/g)
					.forEach((word: string, index: number) =>
					{
						label
							.child(Haeckel.SVG_NS, 'tspan')
							.text(word)
							.attrs(Haeckel.SVG_NS, {
								x: (area.left + this.cornerRadius * 4) + 'px',
								dy: (index > 0) ? this.fontSize + 'px' : '0'
							});
					});
					// :TODO: custom style
			}

			return group;
		}
	}

	export class CharacterMatrixChart implements Renderer
	{
		area: Rectangle = EMPTY_SET;

		characters: Character<BitSet>[] = [];

		matrix = <CharacterMatrix<BitSet>> EMPTY_CHARACTER_MATRIX;

		spacingH = 4;

		spacingV = 16;

		stateFontSize = 11;

		stateSort: (row: number) => (a: number, b: number) => number;

		stateSpacing = 4;

		stateStyler: (state: number, totalStates: number) => { [name: string]: string; } = DEFAULT_STATE_STYLER;

		taxa: Taxic[] = [];

		unknownFontSize = 22;

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
					cells[column] = null;
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
			cells = cells.map((cell: number[], index: number, cells: number[][]) =>
			{
				function next()
				{
					for (var i = index + 1; i < cells.length; ++i)
					{
						if (cells[i])
						{
							return cells[i];
						}
					}
					return [];
				}

				function prev()
				{
					for (var i = index - 1; i >= 0; --i)
					{
						if (cells[i])
						{
							return cells[i];
						}
					}
					return [];
				}

				if (!cell)
				{
					return next().concat(prev())
						.filter((value: number, index: number, array: number[]) => array.indexOf(value) === index)
						.sort();
				}
				return cell;
			});
			var stateRendererLookup: { [state: string]: StateRenderer; } = {};
			var stateRenderers: StateRenderer[] = [];
			for (column = 0; column < columns; ++column)
			{
				taxon = this.taxa[column];
				var cell = cells[column].sort(this.stateSort(row));
				var stateLookup: { [state: string]: boolean; } = {};
				for (var i = 0; i < cell.length; ++i)
				{
					state = cell[i];
					stateLookup[String(state)] = true;
					var stateRenderer = stateRendererLookup[String(state)];
					if (!stateRenderer)
					{
						stateRendererLookup[String(state)] = stateRenderer
							= new StateRenderer(this, row, state, numStates, character.labelStates(bit.create([ state ])),
								this.stateSpacing, this.spacingH, this.stateFontSize);
						stateRenderers.push(stateRenderer);
					}
					stateRenderer.setRatio(column, i / cell.length, (i + 1) / cell.length, unknownsBuilder.contains(column));
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
					drawUnknown(unknownsGroup, area, this.spacingH, this.spacingV, this.unknownFontSize);
				}
			}
		}
	}
}