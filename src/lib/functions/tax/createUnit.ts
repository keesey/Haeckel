///<reference path='createUnitForEntity.ts' />
///<reference path='../guid4.ts' />
///<reference path='../../interfaces/Taxic.ts' />
module Haeckel.tax
{
	export function createUnit(): Taxic
	{
		var uid = guid4(),
			entity: Entity = {
				hash: uid,
				uid: uid
			};
		return createUnitForEntity(Object.freeze(entity));
	}
}