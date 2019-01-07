"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class UlElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul';
        this.permittedChildren.push('li');
    }
}
exports.default = UlElement;
//# sourceMappingURL=ulElement.js.map