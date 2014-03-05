///<reference path='../../builders/ExtSetBuilder.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../interfaces/ExtSet.ts' />
module Haeckel.ext
{
	export function create<T>(elements: T[]): ExtSet<T>
	{
		if (elements.length === 0)
		{
			return EMPTY_SET;
		}
		return new ExtSetBuilder<T>()
			.addList(elements)
			.build();
	}
}