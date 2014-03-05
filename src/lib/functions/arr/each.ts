module Haeckel.arr
{
	export function each<T>(list: T[], f: (element: T) => any, thisObject: any = null)
	{
		for (var i = 0, n = list.length; i < n; ++i)
		{
			if (f.call(thisObject, list[i]) === false)
			{
				return;
			}
		}
	}
}