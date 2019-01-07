"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class DelElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <del> element represents a range of text that has been deleted from a document.
  This element is often (but need not be) rendered with strike-through text.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del';
        this.attributes.set('cite', new _elementStructure_1.BindableAttribute(`A URI for a resource that explains the change (for example, meeting minutes).`));
        this.attributes.set('datetime', new _elementStructure_1.BindableAttribute(`This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp.`));
    }
}
exports.default = DelElement;
//# sourceMappingURL=delElement.js.map