"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class AddressElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <address> element supplies contact information for its nearest 
  <article> or <body> ancestor; in the latter case, it applies to the whole document.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address';
        this.areaRolesAllowed = false;
        this.notPermittedChildren.push(...['hgroup', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'article', 'aside', 'section', 'nav', 'header', 'footer']);
    }
}
exports.default = AddressElement;
//# sourceMappingURL=addressElement.js.map