/// <reference path="../functions/hash.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
/// <reference path="../interfaces/ExtSet.ts"/>

module Haeckel
{
	export class ExtSetBuilder<T> implements Builder<ExtSet<T>>
	{
		private _hashMap = {};

		add(...elements: T[])
		{
			return this.addList(elements);
		}

		addList(elements: T[])
		{
			for (var i = 0, n = elements.length; i < n; ++i)
			{
				var element = elements[i];
				if (element === null || element === undefined)
				{
					throw new Error("Null or undefined element.");
				}
				this._hashMap[hash(element)] = element;
			}
			return this;
		}

		addSet(elements: ExtSet<T>)
		{
			for (var h in elements.hashMap)
			{
				this._hashMap[h] = elements.hashMap[h];
			}
			return this;
		}

		build(): ExtSet<T>
		{
			var s: ExtSet<T> = {
					empty: false,
					hash: '',
					hashMap: {},
					size: NaN
				},
				hashes: string[] = [];
			for (var h in this._hashMap)
			{
				s.hashMap[h] = this._hashMap[h];
				hashes.push(h);
			}
			var n = hashes.length;
			if (n === 0)
			{
				return EMPTY_SET;
			}
			Object.freeze(s.hashMap);
			s.hash = "{" + hashes.sort().join(",") + "}";
			s.size = n;
			return Object.freeze(s);
		}

		contains(element: T): boolean
		{
			return this._hashMap[hash(element)] !== undefined;
		}

		remove(...elements: T[])
		{
			return this.removeList(elements);
		}

		removeList(elements: T[])
		{
			for (var i = 0, n = elements.length; i < n; ++i)
			{
				delete this._hashMap[hash(elements[i])];
			}
			return this;
		}

		removeSet(elements: ExtSet<T>)
		{
			for (var h in elements.hashMap)
			{
				delete this._hashMap[h];
			}
			return this;
		}
		
		reset()
		{
			this._hashMap = {};
			return this;
		}
	}
}