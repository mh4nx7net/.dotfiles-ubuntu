"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class HtmlElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <html> element represents the root (top-level element) of an HTML document, 
  so it is also referred to as the root element. All other elements must be descendants of this element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html';
        this.attributes.set('xmlns', new _elementStructure_1.BindableAttribute(`Specifies the XML Namespace of the document. Default value is "http://www.w3.org/1999/xhtml". This is required in documents parsed with XML parsers, and optional in text/html documents.`));
    }
}
exports.default = HtmlElement;
//# sourceMappingURL=htmlElement.js.map