/// <reference path="DistanceMatrixBuilder.ts"/>
/// <reference path="../functions/ext/each.ts"/>
/// <reference path="../functions/tax/power.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class TaxicDistanceMatrixBuilder extends DistanceMatrixBuilder<Taxic>
	{
		addRange(a: Taxic, b: Taxic, range: Range)
		{
			ext.each(tax.power(a), (a: Taxic) =>
			{
				if (!a.empty)
				{
					ext.each(tax.power(b), (b: Taxic) =>
					{
						if (!b.empty)
						{
							super.addRange(a, b, range);
						}
					})
				}
			});
			return this;
		}
	}
}