"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ObjectElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <object> element represents an external resource, which can be treated as an image, 
  a nested browsing context, or a resource to be handled by a plugin`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object';
        this.attributes.set('data', new _elementStructure_1.BindableAttribute(`The address of the resource as a valid URL. At least one of data and type must be defined.`));
        this.attributes.set('form', new _elementStructure_1.BindableAttribute(`The form element, if any, that the object element is associated with (its form owner). The value of the attribute must be an ID of a <form> element in the same document.`));
        this.attributes.set('height', new _elementStructure_1.BindableAttribute(`The height of the displayed resource, in CSS pixels.`));
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`The name of valid browsing context (HTML5)`));
        this.attributes.set('type', new _elementStructure_1.BindableAttribute(`The content type of the resource specified by data. At least one of data and type must be defined.`));
        this.attributes.set('typemustmatch', new _elementStructure_1.BindableAttribute(`This Boolean attribute indicates if the type and the actual content type resource must match in order of this one to be used.`));
        this.attributes.set('usemap', new _elementStructure_1.BindableAttribute(`A hash-name reference to a <map> element; that is a '#' followed by the value of a name of a map element.`));
        this.attributes.set('width', new _elementStructure_1.BindableAttribute(`The width of the display resource, in CSS pixels.`));
    }
}
exports.default = ObjectElement;
//# sourceMappingURL=objectElement.js.map