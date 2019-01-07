"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class _Element extends _elementStructure_1.BaseElement {
    constructor() {
        super();
        this.documentation = ``;
        this.url = '';
        this.attributes.set('', new _elementStructure_1.BindableAttribute(``));
    }
}
exports.default = _Element;
//# sourceMappingURL=_Element.js.map