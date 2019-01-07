"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class CaptionElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <caption> element represents the title of a table. Though it is always the first 
  descendant of a <table>, its styling, using CSS, may place it elsewhere, relative to the table.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption';
        this.areaRolesAllowed = false;
        this.permittedParents.push('table');
    }
}
exports.default = CaptionElement;
//# sourceMappingURL=captionElement.js.map