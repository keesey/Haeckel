/// <reference path="../constants/XML_SERIALIZER.ts"/>
/// <reference path="../interfaces/Builder.ts"/>
module Haeckel
{
	export class ElementBuilder implements Builder<Element>
	{
		private element: Element;
		
		private _parent: ElementBuilder;
		
		static style(attrs: { [style: string]: any; }): string
		{
			var value: string = '';
			for (var style in attrs)
			{
				value += style + ':' + String(attrs[style]) + ';';
			}
			return value;
		}
		
		constructor(document: Document, element: Element);
		constructor(document: Document, uri: string, localName: string);
		constructor(document: Document, name: string);
		constructor(private document: Document, a: any, b: string = null)
		{
			if (typeof a === 'string')
			{
				this.element = b === null
					? document.createElement(<string> a)
					: document.createElementNS(<string> a, b);
			}
			else
			{
				this.element = <Element> a;
			}
		}

		attach(parent: Element): ElementBuilder
		{
			parent.appendChild(this.element);
			this._parent = null;
			return this;
		}
		
		attr(name: string, value: string): ElementBuilder;
		attr(uri: string, localName: string, value: string): ElementBuilder;
		attr(a: string, b: string, c: string = null): ElementBuilder
		{
			c === null
				? this.element.setAttribute(a, b)
				: this.element.setAttributeNS(a, b, c);
			return this;
		}
		
		attrs(uri: string, attrs: { [ name: string]: string; }): ElementBuilder;
		attrs(attrs: { [ name: string]: string; }): ElementBuilder;
		attrs(a: any, b: { [ name: string]: string; } = null): ElementBuilder
		{
			var uri = typeof a === 'string' ? (<string> a) : null,
				attrs: { [ name: string]: string; } = uri ? b : a;
			for (var name in attrs)
			{
				uri === null
					? this.element.setAttribute(name, attrs[name])
					: this.element.setAttributeNS(uri, name, attrs[name]);
			}
			return this;
		}
		
		build(): Element
		{
			return this.element;
		}
		
		buildString(): string
		{
			return XML_SERIALIZER.serializeToString(this.element);
		}
		
		child(uri: string, localName: string): ElementBuilder;
		child(name: string): ElementBuilder;
		child(a: string, b: string = null): ElementBuilder
		{
			var child = new ElementBuilder(this.document, a, b);
			child._parent = this;
			this.element.appendChild(child.element);
			return child;
		}
		
		detach(): ElementBuilder
		{
			if (this.element.parentNode)
			{
				this.element.parentNode.removeChild(this.element);
				this._parent = null;
			}
			return this;
		}
		
		parent(): ElementBuilder
		{
			return this._parent;
		}

		reset(): ElementBuilder
		{
			this.element = null;
			this._parent = null;
			return this;
		}

		text(data: string): ElementBuilder
		{
			this.element.appendChild(this.document.createTextNode(data));
			return this;
		}
	}
}