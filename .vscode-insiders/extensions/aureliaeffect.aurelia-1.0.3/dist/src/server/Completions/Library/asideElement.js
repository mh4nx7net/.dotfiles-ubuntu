"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class AsideElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <aside> element represents a section of a document with content connected 
  tangentially to the main content of the document (often presented as a sidebar).`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside';
        this.ariaRoles.push(...['feed', 'note', 'presentation', 'region', 'search']);
    }
}
exports.default = AsideElement;
//# sourceMappingURL=asideElement.js.map