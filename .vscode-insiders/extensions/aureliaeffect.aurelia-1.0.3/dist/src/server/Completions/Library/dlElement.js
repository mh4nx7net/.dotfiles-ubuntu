"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class DlElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <dl> element encloses a list of groups of terms and descriptions. 
  Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl';
        this.ariaRoles.push(...['group', 'presentation']);
        this.permittedChildren.push(...['dt', 'dd', 'script', 'template']);
    }
}
exports.default = DlElement;
//# sourceMappingURL=dlElement.js.map