"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class HeadElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <head> element provides general information (metadata) about the document, 
  including its title and links to its scripts and style sheets.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head';
        this.areaRolesAllowed = false;
        this.permittedParents.push('html');
        this.permittedChildren.push(...['title', 'base', 'link']);
    }
}
exports.default = HeadElement;
//# sourceMappingURL=headElement.js.map