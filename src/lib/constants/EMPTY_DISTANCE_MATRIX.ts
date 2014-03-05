/// <reference path="EMPTY_SET.ts"/>
/// <reference path="../interfaces/DistanceMatrix.ts"/>
module Haeckel
{
	export var EMPTY_DISTANCE_MATRIX: DistanceMatrix<any> = Object.freeze({ hashMap: Object.freeze({}), members: EMPTY_SET });
}