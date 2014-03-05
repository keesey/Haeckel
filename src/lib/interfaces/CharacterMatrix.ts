///<reference path='ExtSet.ts' />
///<reference path='Character.ts' />
///<reference path='Set.ts' />
///<reference path='Taxic.ts' />

module Haeckel
{
	export interface CharacterMatrix<S extends Set>
	{
		characters: ExtSet<Character<S>>;
		characterList: Character<S>[];
		hashMap:
		{
			[unitCharacterCompositeHash: string]: S;
		};
		taxon: Taxic;
	}

	export function isCharacterMatrix(o: any)
	{
		return typeof o === "object" && isExtSet(o.characters) && Array.isArray(o.characterList) && typeof o.hashMap === "object" && isTaxic(o.taxon);
	}
}