/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/dst/get.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/ext/list.ts"/>
/// <reference path="../functions/nom/forTaxon.ts"/>
/// <reference path="../functions/rng/write.ts"/>
/// <reference path="../interfaces/DistanceMatrix.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
/// <reference path="../readers/DistanceMatrixReader.ts"/>
module Haeckel
{
	export class DistanceMatrixWriter
	{
		nomenclature: Nomenclature = EMPTY_NOMENCLATURE;

		private getName(taxon: Taxic): string
		{
			if (taxon.empty)
			{
				return null;
			}
			var names = nom.forTaxon(this.nomenclature, taxon);
			if (names.empty)
			{
				return null;
			}
			var list = ext.list(names);
			list.sort();
			return list[0];
		}

		write(matrix: DistanceMatrix<Taxic>): DistanceData[]
		{
			var result: DistanceData[] = [];
			ext.each(matrix.members, (x: Taxic) =>
			{
				var xName = this.getName(x);
				if (xName === null)
				{
					console.warn('Unnamed taxon; cannot write.');
				}
				else
				{
					ext.each(matrix.members, (y: Taxic) =>
					{
						var yName = (x === y) ? xName : this.getName(y);
						if (yName !== null)
						{
							var distance = dst.get(matrix, x, y);
							if (distance.empty)
							{
								return;
							}
							if (x === y && distance.size === 0 && distance.min === 0)
							{
								return;
							}
							result.push({
								names: [ xName, yName ],
								distance: rng.write(distance)
							});
						}
					}, this);
				}
			}, this);
			return result;
		}
	}
}