"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ColElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <col> element defines a column within a table and is used for defining 
  common semantics on all common cells. It is generally found within a <colgroup> element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col';
        this.areaRolesAllowed = false;
        this.permittedParents.push('colgroup');
        this.emptyElement = true;
        this.attributes.set('span', new _elementStructure_1.BindableAttribute(`This attribute contains a positive integer indicating the number of consecutive columns the <col> element spans. If not present, its default value is 1.`));
    }
}
exports.default = ColElement;
//# sourceMappingURL=colElement.js.map