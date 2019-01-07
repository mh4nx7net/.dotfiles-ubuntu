"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class StyleElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <style> element contains style information for a document, or part of a 
  document. By default, the style instructions written inside that element are expected to be CSS.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style';
        this.attributes.set('type', new _elementStructure_1.BindableAttribute(`This attribute defines the styling language as a MIME type (charset should not be specified).
      This attribute is optional and default to text/css if it's missing.`));
        this.attributes.set('media', new _elementStructure_1.BindableAttribute(`This attribute defines which media the style should apply to. It's value is a media query, 
      which default to all if the attribute is missing.`));
        this.attributes.set('title', new _elementStructure_1.BindableAttribute(`Specifies alternative style sheet sets.`));
    }
}
exports.default = StyleElement;
//# sourceMappingURL=styleElement.js.map