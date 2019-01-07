"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class EmbedElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <embed> element represents an integration point for an external application 
  or interactive content (in other words, a plug-in).`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed';
        this.emptyElement = true;
        this.ariaRoles.push(...['application', 'document', 'img', 'presentation']);
        this.attributes.set('height', new _elementStructure_1.BindableAttribute(`The displayed height of the resource, in CSS pixels.`));
        this.attributes.set('src', new _elementStructure_1.BindableAttribute(`The URL of the resource being embedded.`));
        this.attributes.set('type', new _elementStructure_1.BindableAttribute(`The MIME type to use to select the plug-in to instantiate.`));
        this.attributes.set('width', new _elementStructure_1.BindableAttribute(`The displayed width of the resource, in CSS pixels.`));
    }
}
exports.default = EmbedElement;
//# sourceMappingURL=embedElement.js.map