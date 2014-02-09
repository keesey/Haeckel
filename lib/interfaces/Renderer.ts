module Haeckel
{
	export interface Renderer
	{
		render(svg: SVGSVGElement): SVGElement;
	}
}