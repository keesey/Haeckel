module Haeckel
{
	export interface Renderer
	{
		render(parent: ElementBuilder): ElementBuilder;
	}
}