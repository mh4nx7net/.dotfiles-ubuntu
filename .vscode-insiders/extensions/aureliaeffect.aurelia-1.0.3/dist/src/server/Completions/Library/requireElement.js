"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class AureliaRequireElement extends _elementStructure_1.BaseElement {
    constructor() {
        super();
        this.documentation = `"import" or "require" various resources into a view. Equivalent of the ES 2015 "import" syntax`;
        this.url = 'http://aurelia.io/hub.html#/doc/article/aurelia/templating/latest/templating-html-behaviors-introduction/4';
        this.hasGlobalAttributes = false;
        this.hasGlobalEvents = false;
        this.attributes.set('from', new _elementStructure_1.SimpleAttribute(`The path to the file to require or import`));
        this.attributes.set('as', new _elementStructure_1.SimpleAttribute(`The name of custom element once it is imported`));
    }
}
exports.default = AureliaRequireElement;
//# sourceMappingURL=requireElement.js.map