"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class OlElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol';
        this.attributes.set('reversed', new _elementStructure_1.BindableAttribute(`This Boolean attribute specifies that the items of the list are specified in reversed order.`));
        this.attributes.set('start', new _elementStructure_1.BindableAttribute(`This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use <ol start="3">.`));
        this.attributes.set('type', new _elementStructure_1.BindableAttribute(`Indicates the numbering type`, null, null, null, null, new Map([
            ['a', new _elementStructure_1.Value(`indicates lowercase letters`)],
            ['A', new _elementStructure_1.Value(`indicates uppercase letters`)],
            ['i', new _elementStructure_1.Value(`indicates lowercase Roman numerals`)],
            ['I', new _elementStructure_1.Value(`indicates uppercase Roman numerals`)],
            ['1', new _elementStructure_1.Value(`indicates numbers (default)`)],
        ])));
    }
}
exports.default = OlElement;
//# sourceMappingURL=olElement.js.map