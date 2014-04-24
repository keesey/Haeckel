///<reference path='../ext/union.ts' />
///<reference path='../rng/sum.ts' />
///<reference path='../../constants/EMPTY_SET.ts' />
///<reference path='../../interfaces/CharacterMatrix.ts' />
///<reference path='../../interfaces/Set.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.chr
{
	export function toDistanceMatrix(matrix: CharacterMatrix<Set>, anchors: Taxic = null): DistanceMatrix<Taxic>
	{
		var hashMap: { [hash: string]: { [hash: string]: Range; }; } = {};
		var nCharsMap: { [hash: string]: { [hash: string]: number; }; } = {};
		if (anchors === null)
		{
			anchors = matrix.taxon;
		}
		var allUnits = ext.union([ anchors.units, matrix.taxon.units ]);
		ext.each(allUnits, (x: Taxic) =>
		{
			hashMap[x.hash] = {};
			nCharsMap[x.hash] = {};
		});
		var xHash: string,
			yHash: string;
		ext.each(matrix.characters, (character: Character<Set>) =>
		{
			if (typeof character.distance !== 'function')
			{
				console.warn('Cannot compute distance of character:', character);
				return;
			}
			var charHashMap: { [hash: string]: { [hash: string]: Range; }; } = {};
			ext.each(anchors.units, (x: Taxic) =>
			{
				var xStates = states(matrix, x, character);
				var xIsEmpty = xStates && xStates.empty;
				if (charHashMap[x.hash] === undefined)
				{
					charHashMap[x.hash] = {};
				}
				ext.each(allUnits, (y: Taxic) =>
				{
					if (charHashMap[y.hash] === undefined)
					{
						charHashMap[y.hash] = {};
					}
					var yStates = states(matrix, y, character);
					if (!(xIsEmpty && yStates && yStates.empty))
					{
						charHashMap[x.hash][y.hash]
							= charHashMap[y.hash][x.hash]
							= character.distance(xStates, yStates);
						var nChars = nCharsMap[x.hash][y.hash];
						if (nChars === undefined)
						{
							nChars = 0;
						}
						nCharsMap[x.hash][y.hash]
							= nCharsMap[y.hash][x.hash]
							= ++nChars;
					}
				});
			});
			for (xHash in charHashMap)
			{
				var sourceRow = charHashMap[xHash],
					targetRow = hashMap[xHash];
				for (yHash in sourceRow)
				{
					var sourceD: Range = sourceRow[yHash],
						targetD: Range = targetRow[yHash];
					if (sourceD !== undefined)
					{
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
			}
		});
		for (xHash in hashMap)
		{
			for (yHash in hashMap)
			{
				var d = hashMap[xHash][yHash];
				if (d === undefined)
				{
					hashMap[xHash][yHash] = EMPTY_SET;
					hashMap[yHash][xHash] = EMPTY_SET;
				}
				else
				{
					hashMap[xHash][yHash]
						= hashMap[yHash][xHash]
						= rng.multiply(d, 1 / nCharsMap[xHash][yHash]);
				}
			}
		}
		return Object.freeze({
			hashMap: Object.freeze(hashMap),
			members: allUnits
		});
	}
}