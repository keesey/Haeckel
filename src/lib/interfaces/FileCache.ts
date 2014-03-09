module Haeckel
{
	export interface FileCache
	{
		base64: { [filename: string]: string; };
		text: { [filename: string]: string; };
	}
}