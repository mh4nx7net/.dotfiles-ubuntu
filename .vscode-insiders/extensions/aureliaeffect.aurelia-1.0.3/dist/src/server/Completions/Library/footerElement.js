"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class FooterElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <footer> element represents a footer for its nearest sectioning content 
  or sectioning root element. A footer typically contains information about the author of the section, 
  copyright data or links to related documents.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer';
        this.ariaRoles.push(...['group', 'presentation']);
    }
}
exports.default = FooterElement;
//# sourceMappingURL=footerElement.js.map