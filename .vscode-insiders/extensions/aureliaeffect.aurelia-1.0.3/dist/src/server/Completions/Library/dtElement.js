"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class DtElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <dt> element identifies a term in a description list. This element can occur 
  only as a child element of a <dl>. It is usually followed by a <dd> element; however, multiple <dt> elements in 
  a row indicate several terms that are all defined by the immediate next <dd> element.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt';
        this.areaRolesAllowed = false;
    }
}
exports.default = DtElement;
//# sourceMappingURL=dtElement.js.map