module Haeckel
{
	export interface Renderer
	{
		render(parent: ElementBuilder, defsBuilder: () => ElementBuilder): ElementBuilder;
	}
}