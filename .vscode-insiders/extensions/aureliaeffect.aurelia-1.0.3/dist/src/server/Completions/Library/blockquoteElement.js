"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class BlockquoteElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <blockquote> Element (or HTML Block Quotation Element) indicates that the enclosed 
  text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). 
  A URL for the source of the quotation may be given using the cite attribute, while a text representation of the 
  source can be given using the <cite> element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote';
        this.attributes.set('cite', new _elementStructure_1.BindableAttribute(`A URL that designates a source document or message for the information quoted. This attribute 
      is intended to point to information explaining the context or the reference for the quote.`));
    }
}
exports.default = BlockquoteElement;
//# sourceMappingURL=blockquoteElement.js.map