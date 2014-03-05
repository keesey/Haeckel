module Haeckel.arr
{
	export function forSome<T>(list: T[], f: (element: T) => boolean, thisObject: any = null): boolean
	{
		for (var i = 0, n = list.length; i < n; ++i)
		{
			if (f.call(thisObject, list[i]))
			{
				return true;
			}
		}
		return false;
	}
}
