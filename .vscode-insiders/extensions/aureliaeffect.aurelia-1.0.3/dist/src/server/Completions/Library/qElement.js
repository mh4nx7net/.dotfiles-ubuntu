"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class QElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <q> element indicates that the enclosed text is a short inline quotation. This 
  element is intended for short quotations that don't require paragraph breaks; for long quotations use 
  the <blockquote> element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q';
        this.attributes.set('cite', new _elementStructure_1.BindableAttribute(`The value of this attribute is a URL that designates a source document or message for the 
      information quoted. This attribute is intended to point to information explaining the context or the 
      reference for the quote.`));
    }
}
exports.default = QElement;
//# sourceMappingURL=qElement.js.map