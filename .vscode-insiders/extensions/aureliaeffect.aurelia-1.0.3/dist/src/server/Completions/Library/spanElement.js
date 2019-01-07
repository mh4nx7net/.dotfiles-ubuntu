"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class SpanElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <span> element is a generic inline container for phrasing content, which does 
  not inherently represent anything. It can be used to group elements for styling purposes (using the class or 
  id attributes), or because they share attribute values, such as lang. It should be used only when no other 
  semantic element is appropriate. <span> is very much like a <div> element, but <div> is a block-level element 
  whereas a <span> is an inline element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span';
    }
}
exports.default = SpanElement;
//# sourceMappingURL=spanElement.js.map