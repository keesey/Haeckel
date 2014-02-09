module Haeckel
{
	export interface Builder<T>
	{
		build(): T;
		reset(): Builder<T>;
	}
}