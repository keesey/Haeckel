///<reference path='states.ts' />
///<reference path='../ext/each.ts' />
///<reference path='../../builders/ExtSetBuilder.ts' />
///<reference path='../../interfaces/Character.ts' />
///<reference path='../../interfaces/CharacterMatrix.ts' />
///<reference path='../../interfaces/ExtSet.ts' />
///<reference path='../../interfaces/Taxic.ts' />
///<reference path='../../interfaces/Set.ts' />
module Haeckel.chr
{
	export function definedUnits<S extends Set>(matrix: CharacterMatrix<S>, character: Character<S>): ExtSet<Taxic>
	{
        var builder = new ExtSetBuilder<Taxic>();
		ext.each(matrix.taxon.units, (unit: Taxic) =>
        {
            if (states(matrix, unit, character) !== null)
			{
				builder.add(unit);
			}
	    });
        return builder.build();
	}
}