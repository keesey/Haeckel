/// <reference path="ExtSetBuilder.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/DistanceMatrix.ts"/>
/// <reference path="../interfaces/Range.ts"/>
/// <reference path="../functions/dst/hashMapDistance.ts"/>
/// <reference path="../functions/rng/create.ts"/>
module Haeckel
{
	export class DistanceMatrixBuilder<T> implements Builder<DistanceMatrix<T>>
	{
		private _hashMap: { [hash: string]: { [hash: string]: Range; }; } = {};

		private _members = new ExtSetBuilder<T>();

		addDistance(a: T, b: T, d: number)
		{
			return this.addRange(a, b, rng.create(d, d));
		}

		addRange(a: T, b: T, range: Range)
		{
			if (a === null || b === null || a === undefined || b === undefined)
			{
				throw new Error("Cannot define distance from null or undefined.");
			}
			var aHash = hash(a),
				bHash = hash(b);
			if (this._hashMap[aHash] === undefined)
			{
				this._hashMap[aHash] = {};
			}
			if (this._hashMap[bHash] === undefined)
			{
				this._hashMap[bHash] = {};
			}
			this._hashMap[aHash][bHash]
				= this._hashMap[bHash][aHash]
				= range;
			this._members
				.add(a)
				.add(b);
			return this;
		}

		build(): DistanceMatrix<T>
		{
			var hashMap: { [hash: string]: { [hash: string]: Range; }; } = {};
			for (var aHash in this._hashMap)
			{
				var row = this._hashMap[aHash],
					hashMapRow: { [hash: string]: Range; } = {};
				for (var bHash in row)
				{
					hashMapRow[bHash] = row[bHash];
				}
				hashMap[aHash] = hashMapRow;
			}
			var matrix =
			{
				hashMap: Object.freeze(hashMap),
				members: this._members.build()
			};
			return Object.freeze(matrix);
		}

		get(a: T, b: T): Range
		{
			return dst.hashMapDistance(this._hashMap, a, b);
		}
		
		reset()
		{
			this._hashMap = {};
			this._members.reset();
			return this;
		}
	}
}