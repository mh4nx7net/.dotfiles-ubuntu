"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class HtmlBaseElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base';
        this.areaRolesAllowed = false;
        this.emptyElement = true;
        this.permittedParents.push("head");
        this.attributes.set('href', new _elementStructure_1.BindableAttribute(`The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed.`));
        this.attributes.set('target', new _elementStructure_1.BindableAttribute(`A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a browsing context (for example: tab, window, or inline frame).`, null, null, null, null, new Map([
            ['_self', new _elementStructure_1.Value(`Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.`)],
            ['_blank', new _elementStructure_1.Value(`Load the result into a new unnamed browsing context.`)],
            ['_parent', new _elementStructure_1.Value(`Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as _self.`)],
            ['_top', new _elementStructure_1.Value(`Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as _self.`)],
        ])));
    }
}
exports.default = HtmlBaseElement;
//# sourceMappingURL=baseElement.js.map