/// <reference path="../ext/list.ts"/>
/// <reference path="../tax/union.ts"/>
/// <reference path="../../builders/CharacterMatrixBuilder.ts"/>
/// <reference path="../../constants/TIME_CHARACTER.ts"/>
/// <reference path="../../interfaces/Dating.ts"/>
/// <reference path="../../interfaces/ExtSet.ts"/>
/// <reference path="../../interfaces/Range.ts"/>
/// <reference path="../../solvers/PhyloSolver.ts"/>
module Haeckel.dat
{
	export function toCharacterMatrixBuilder(datings: ExtSet<Dating>, phyloSolver: PhyloSolver): CharacterMatrixBuilder<Range>
	{
		var builder = new CharacterMatrixBuilder<Range>();
		ext.each(datings, (dating: Dating) => builder.states(phyloSolver.cladogen(tax.union(ext.list(dating.taxa))), TIME_CHARACTER, dating.time));
		return builder;
	}
}