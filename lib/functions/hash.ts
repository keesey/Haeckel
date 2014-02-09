module Haeckel
{
	/**
	 * Returns the unique hash code associated with an object's identity.
	 * 
	 * @param object
	 *            An object.
	 * @returns A unique hash code. If the object has a property called
	 *          <code>hash</code>, then that will be used. If it is
	 *          <code>undefined</code>, then the hash is <code>undefined</code>.
	 *          If it is an array, then this function is applied iteratively to all
	 *          members. Otherwise, a JSON string is used.
	 */
	export function hash(object: any): string
	{
		if (object === undefined || object === null)
		{
			return undefined;
		}
		if (Array.isArray(object))
		{
			var n = object.length,
				a: string[] = new Array(n);
			for (var i = 0; i < n; ++i)
			{
				a[i] = hash(object[i]);
			}
			return "[" + a.join(",") + "]";
		}
		if (typeof object === 'object')
		{
			var h: any = object.hash;
			if (typeof h === "string")
			{
				return <string> h;
			}
		}
		return JSON.stringify(object, (key: string, value: any) =>
		{
			if (typeof value === 'number' && !isFinite(value))
			{
				return String(value);
			}
			return value;
		});
	}
}