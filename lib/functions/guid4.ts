///<reference path='seedRandom.ts' />
module Haeckel
{
	var GUID4_RANDOM = seedRandom("UUID", 4);

	export function guid4(): string
	{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) =>
		{
			var r = GUID4_RANDOM() * 16 | 0;
			return ((c === 'x') ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}
}