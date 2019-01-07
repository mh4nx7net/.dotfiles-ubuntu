"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class BrElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <br> element produces a line break in text (carriage-return). It is useful for writing
  a poem or an address, where the division of lines is significant.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br';
        this.emptyElement = true;
    }
}
exports.default = BrElement;
//# sourceMappingURL=brElement.js.map