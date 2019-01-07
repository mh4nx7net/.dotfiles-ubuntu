"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class AbbrElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <abbr> element represents an abbreviation and optionally provides a full description 
  for it. If present, the title attribute must contain this full description and nothing else.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr';
        this.attributes.set('title', new _elementStructure_1.BindableAttribute(`Use the title attribute to define the full description of the abbreviation. Many user agents present this as a tooltip.`, 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title'));
    }
}
exports.default = AbbrElement;
//# sourceMappingURL=abbrElement.js.map