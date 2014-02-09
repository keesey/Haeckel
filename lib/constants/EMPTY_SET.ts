/// <reference path="../interfaces/EmptySet.ts"/>

module Haeckel
{
	function create(): EmptySet
	{
		var filter = (element: any) => false,
			e: EmptySet =
			{
				angle: NaN,
				area: 0,
				bits: 0,
				bottom: NaN,
				centerX: NaN,
				centerY: NaN,
				contains: filter,
				criterion: filter,
				empty: true,
				entities: null,
				hash: '{}',
				hashMap: <{ [hash: string]: any }> Object.freeze({}),
				height: 0,
				isUnit: false,
				left: NaN,
				max: NaN,
				mean: NaN,
				min: NaN,
				origin: Object.freeze({hash: "(NaN:NaN)", x: NaN, y: NaN}),
				right: NaN,
				size: 0,
				top: NaN,
				units: null,
				width: 0,
				x: NaN,
				x2: NaN,
				y: NaN,
				y2: NaN
			};
		e.units = e.entities = e; 
		return Object.freeze(e);
	}

	export var EMPTY_SET = create();
}