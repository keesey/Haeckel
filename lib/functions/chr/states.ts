///<reference path='hashMapStates.ts' />
///<reference path='../../interfaces/Character.ts' />
///<reference path='../../interfaces/CharacterMatrix.ts' />
///<reference path='../../interfaces/Taxic.ts' />
///<reference path='../../interfaces/Set.ts' />
module Haeckel.chr
{
	export function states<S extends Set>(matrix: CharacterMatrix<S>, taxon: Taxic, character: Character<S>): S
	{
		return hashMapStates(matrix.hashMap, taxon, character);
	}
}