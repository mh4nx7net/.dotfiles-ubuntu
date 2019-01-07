"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class LabelElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <label> element represents a caption for an item in a user interface.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label';
        this.attributes.set('for', new _elementStructure_1.BindableAttribute(`The ID of a labelable form-related element in the same document as the label element. The first such element in the document with an ID matching the value of the for attribute is the labeled control for this label element.`));
    }
}
exports.default = LabelElement;
//# sourceMappingURL=labelElement.js.map