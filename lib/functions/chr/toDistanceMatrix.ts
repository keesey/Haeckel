///<reference path='../ext/union.ts' />
///<reference path='../rng/sum.ts' />
///<reference path='../../interfaces/CharacterMatrix.ts' />
///<reference path='../../interfaces/Set.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.chr
{
	export function toDistanceMatrix(matrix: CharacterMatrix<Set>, anchors: Taxic = null): DistanceMatrix<Taxic>
	{
		var hashMap: { [hash: string]: { [hash: string]: Range; }; } = {};
		if (anchors === null)
		{
			anchors = matrix.taxon;
		}
		var allUnits = ext.union([ anchors.units, matrix.taxon.units ]),
			nChars = matrix.characters.size;
		ext.each(allUnits, (x: Taxic) => hashMap[x.hash] = {});
		ext.each(matrix.characters, (character: Character<Set>) =>
		{
			if (typeof character.distance !== 'function')
			{
				console.warn('Cannot compute distance of character:', character);
				return;
			}
			var charHashMap: { [hash: string]: { [hash: string]: Range; }; } = {};
			ext.each(anchors.units, function(x: Taxic)
			{
				var xStates = states(matrix, x, character);
				if (charHashMap[x.hash] === undefined)
				{
					charHashMap[x.hash] = {};
				}
				ext.each(allUnits, function(y: Taxic)
				{
					if (charHashMap[y.hash] === undefined)
					{
						charHashMap[y.hash] = {};
					}
					var yStates = states(matrix, y, character);
					charHashMap[x.hash][y.hash]
						= charHashMap[y.hash][x.hash]
						= character.distance(xStates, yStates);
				});
			});
			var xHash: string,
				yHash: string;
			for (xHash in charHashMap)
			{
				var sourceRow = charHashMap[xHash],
					targetRow = hashMap[xHash];
				for (yHash in sourceRow)
				{
					var sourceD: Range = sourceRow[yHash],
						targetD: Range = targetRow[yHash];
					if (targetD === undefined)
					{
						targetRow[yHash] = sourceD;
					}
					else
					{
						targetRow[yHash] = rng.sum([ targetD, sourceD ]);
					}
				}
			}
		});
		return Object.freeze({
			hashMap: Object.freeze(hashMap),
			members: allUnits
		});
	}
}