"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class DataElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <data> element links a given content with a machine-readable translation. 
  If the content is time- or date-related, the <time> must be used.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data';
        this.attributes.set('value', new _elementStructure_1.BindableAttribute(`This attribute specifies the machine-readable translation of the content of the element.`));
    }
}
exports.default = DataElement;
//# sourceMappingURL=dataElement.js.map