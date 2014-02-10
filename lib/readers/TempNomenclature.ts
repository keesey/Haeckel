/// <reference path="../constants/EMPTY_NOMENCLATURE.ts"/>
/// <reference path="../functions/tax/createUnit.ts"/>
/// <reference path="../interfaces/Nomenclature.ts"/>
/// <reference path="../interfaces/Taxic.ts"/>
module Haeckel
{
	export class TempNomenclature
	{
		nomenclature: Nomenclature;

		warn: boolean = true;

		private _otherNameMap: { [name: string]: Taxic; } = {};

		constructor(nomenclature: Nomenclature = null)
		{
			this.nomenclature = (nomenclature === null) ? EMPTY_NOMENCLATURE : nomenclature;
		}
		
        taxon(name: string): Taxic
        {
            var taxon = this.nomenclature.nameMap[name];
            if (!taxon)
            {
                taxon = this._otherNameMap[name];
                if (!taxon)
                {
                    taxon = tax.createUnit();
                    this._otherNameMap[name] = taxon;
                    if (this.warn)
                    {
	                    console.warn("Unrecognized name: \"" + name + "\".");
					}
                }
            }
            return taxon;
        }
	}
}