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
		if (anchors === null)
		{
			anchors = matrix.taxon;
		}
		var allUnits = ext.union([ anchors.units, matrix.taxon.units ]);
		var hashMap: { [hash: string]: { [hash: string]: Range; }; } = {};
		ext.each(anchors.units, (x: Taxic) =>
		{
			var xHash = x.hash;
			var xRow = hashMap[xHash];
			if (!xRow)
			{
				xRow = hashMap[xHash] = {};
			}
			ext.each(allUnits, (y: Taxic) =>
			{
				var yHash = y.hash;
				var yRow = hashMap[yHash];
				if (!yRow)
				{
					yRow = hashMap[yHash] = {};
				}
				if (yRow[xHash])
				{
					return;
				}
				var distances: Range[] = [];
				ext.each(matrix.characters, (character: Character<Set>) =>
				{
					var xStates = states(matrix, x, character);
					var yStates = states(matrix, y, character);
					var d = character.distance(xStates, yStates);
					if (d && !d.empty)
					{
						distances.push(d);
					}
				});
				if (distances.length > 0)
				{
					xRow[yHash] = yRow[xHash] = rng.multiply(rng.sum(distances), 1 / distances.length);
				}
				else
				{
					xRow[yHash] = yRow[xHash] = EMPTY_SET;
				}
			});
		});
		return Object.freeze({
			hashMap: Object.freeze(hashMap),
			members: allUnits
		});
	}
}