"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class FigureElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <figure> element represents self-contained content, frequently with a 
  caption (<figcaption>), and is typically referenced as a single unit.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure';
        this.ariaRoles.push(...['group', 'presentation']);
    }
}
exports.default = FigureElement;
//# sourceMappingURL=figureElement.js.map