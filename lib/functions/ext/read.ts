///<reference path='create.ts' />
///<reference path='../../interfaces/ExtSet.ts' />

module Haeckel.ext
{
	//export function read<T>(data: T): ExtSet<T>;
	//export function read<T>(data: T[]): ExtSet<T>;
	export function read<T>(data: any): ExtSet<T>
	{
		if (data === null || data === undefined)
		{
			return null;
		}
		if (Array.isArray(data))
		{
			return create<T>(<T[]> data);
		}
		return create<T>([ <T> data ]);
	}
}