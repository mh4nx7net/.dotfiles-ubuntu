"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class FigcaptionElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <figcaption> element represents a caption or a legend associated with a figure 
  or an illustration described by the rest of the data of the <figure> element which is its immediate ancestor.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption';
        this.permittedParents.push('figure');
        this.ariaRoles.push(...['group', 'presentation']);
    }
}
exports.default = FigcaptionElement;
//# sourceMappingURL=figcaptionElement.js.map