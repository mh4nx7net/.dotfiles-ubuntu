"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class BElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <b> element represents a span of text stylistically different from normal text, 
  without conveying any special importance or relevance, and that is typically rendered in boldface.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b';
        this.permittedParents.push("html");
        this.areaRolesAllowed = false;
        this.emptyElement = true;
    }
}
exports.default = BElement;
//# sourceMappingURL=bElement.js.map