"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class DetailsElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <details> element is used as a disclosure widget from which the user can retrieve 
  additional information.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details';
        this.areaRolesAllowed = false;
        this.attributes.set('open', new _elementStructure_1.BindableAttribute(`This Boolean attribute indicates whether the details will be shown to the user on page load. Default is false and so details will be hidden.`));
    }
}
exports.default = DetailsElement;
//# sourceMappingURL=detailsElement.js.map