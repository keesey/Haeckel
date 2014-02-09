module Haeckel.arr
{
	export function map<A, B>(list: A[], f: (element: A) => B, thisObject: any = null): B[]
	{
		for (var i = 0, n = list.length, image: B[] = []; i < n; ++i)
		{
			image.push(f.call(thisObject, list[i]));
		}
		return image;
	}
}
