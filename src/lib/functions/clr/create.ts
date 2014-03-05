///<reference path="../../interfaces/Color.ts" />
module Haeckel.clr
{
	function constrain(c: number): number
	{
		c = Math.floor(c);
		if (!isFinite(c) || c < 0 || c >= 0x100)
		{
			return -1;
		}
		return c;
	}

	function toHex(n: number): string
	{
		var s = n.toString(16);
		while (s.length < 2)
		{
			 s = '0' + s;
		}
		return s;
	}

	export function create(r: number, g: number, b: number): Color
	{
		r = constrain(r);
		g = constrain(g);
		b = constrain(b);
		var error = r < 0 || g < 0 || b < 0,
			hex: string;
		if (error)
		{
			r = g = b = -1;
			hex = 'none';
		}
		else
		{
			hex = '#' + toHex(r) + toHex(g) + toHex(b);
		}
		return Object.freeze({
			r: r,
			g: g,
			b: b,
			error: error,
			hex: hex
		});
	}
}