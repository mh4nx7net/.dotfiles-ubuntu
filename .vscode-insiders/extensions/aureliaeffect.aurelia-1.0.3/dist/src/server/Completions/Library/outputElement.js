"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class OutputElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <output> element represents the result of a calculation or user action.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output';
        this.attributes.set('for', new _elementStructure_1.BindableAttribute(`A list of IDs of other elements, indicating that those elements contributed input values to (or otherwise affected) the calculation.`));
        this.attributes.set('form', new _elementStructure_1.BindableAttribute(`
The form element that this element is associated with (its "form owner"). The value of the attribute must be an ID of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.`));
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`The name of the element.`));
    }
}
exports.default = OutputElement;
//# sourceMappingURL=outputElement.js.map