module Haeckel.arr
{
	export function where<T>(list: T[], f: (element: T) => boolean, thisObject: any = null): T[]
	{
		for (var i = 0, n = list.length, image: T[] = []; i < n; ++i)
		{
			var element = list[i];
			if (f.call(thisObject, element))
			{
				image.push(element);
			}
		}
		return image;
	}
}
