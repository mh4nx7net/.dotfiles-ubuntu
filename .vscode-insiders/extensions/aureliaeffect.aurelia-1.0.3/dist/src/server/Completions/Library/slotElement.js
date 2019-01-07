"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class SlotElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <slot> element is a placeholder inside a web component that you can fill 
  with your own markup, with the effect of composing different DOM trees together. A named slot is a <slot> element with a name attribute.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot';
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`The slot's name.`));
    }
}
exports.default = SlotElement;
//# sourceMappingURL=slotElement.js.map