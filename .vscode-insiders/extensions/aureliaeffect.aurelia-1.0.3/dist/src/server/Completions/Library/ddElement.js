"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ddElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <dd> element indicates the description of a term in a description list (<dl>).`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd';
        this.areaRolesAllowed = false;
        this.permittedParents.push('dl');
    }
}
exports.default = ddElement;
//# sourceMappingURL=ddElement.js.map