"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class MapElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <map> element is used with <area> elements to define an image map (a clickable link area).`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map';
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value.`));
    }
}
exports.default = MapElement;
//# sourceMappingURL=mapElement.js.map