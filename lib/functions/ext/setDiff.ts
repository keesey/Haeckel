///<reference path='../equal.ts' />
///<reference path='../../builders/ExtSetBuilder.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	export function setDiff<T>(minuend: ExtSet<T>, subtrahend: ExtSet<T>): ExtSet<T>
	{
		if (minuend.empty || subtrahend.size === Infinity)
		{
			return EMPTY_SET;
		}
		if (subtrahend.empty)
		{
			return minuend;
		}
		if (equal(minuend, subtrahend))
		{
			return EMPTY_SET;
		}
		if (minuend.size === Infinity)
		{
			throw new Error('Cannot traverse domain sets.');
		}
		return new ExtSetBuilder<T>()
			.addSet(minuend)
			.removeSet(subtrahend)
			.build();
	}
}