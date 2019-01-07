"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class FieldsetElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <fieldset> element is used to group several controls as well as labels 
  (<label>) within a web form.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset';
        this.ariaRoles.push(...['group', 'presentation']);
        this.attributes.set('disabled', new _elementStructure_1.BindableAttribute(`If this Boolean attribute is set, the form controls that are its descendants, except descendants of its first optional <legend> element, are disabled, i.e., not editable. They won't receive any browsing events, like mouse clicks or focus-related ones. Often browsers display such controls as gray.`));
        this.attributes.set('form', new _elementStructure_1.BindableAttribute(`This attribute has the value of the id attribute of the <form> element it's related to. Its default value is the id of the nearest <form> element it is a descendant of.`));
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`The name associated with the group.`));
    }
}
exports.default = FieldsetElement;
//# sourceMappingURL=fieldsetElement.js.map