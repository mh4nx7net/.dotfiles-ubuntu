"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ParamElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <param> element defines parameters for an <object> element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param';
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`Name of the parameter.`));
        this.attributes.set('value', new _elementStructure_1.BindableAttribute(`Specifies the value of the parameter.`));
    }
}
exports.default = ParamElement;
//# sourceMappingURL=paramElement.js.map