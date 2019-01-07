"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ColgroupElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <colgroup> element defines a group of columns within a table.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup';
        this.areaRolesAllowed = false;
        this.permittedParents.push('table');
        this.attributes.set('span', new _elementStructure_1.BindableAttribute(`This attribute contains a positive integer indicating the number of consecutive columns the <colgroup> element spans. If not present, its default value is 1.`));
    }
}
exports.default = ColgroupElement;
//# sourceMappingURL=colgroupElement.js.map