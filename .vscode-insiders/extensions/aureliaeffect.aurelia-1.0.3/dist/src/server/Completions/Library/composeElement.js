"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ComposeElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `In order to live by the DRY (Don't Repeat Yourself) Principle, we don't necessarily want to 
  rely on tight coupling between our view and view-model pairs. Wouldn't it be great if there was a custom element
  that would arbitrarily combine an HTML template, a view-model, and maybe even some initialization data for us?`;
        this.url = 'http://aurelia.io/hub.html#/doc/article/aurelia/templating/latest/templating-basics/4';
        this.attributes.set('model', new _elementStructure_1.BindableAttribute(`The model to bind the compose to`));
        this.attributes.set('view-model', new _elementStructure_1.BindableAttribute(`The view model to bind the compose to`));
        this.attributes.set('view', new _elementStructure_1.BindableAttribute(`The location of the view file to compose`));
    }
}
exports.default = ComposeElement;
//# sourceMappingURL=composeElement.js.map