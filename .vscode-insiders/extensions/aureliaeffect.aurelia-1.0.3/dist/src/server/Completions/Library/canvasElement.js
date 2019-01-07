"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class CanvasElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `Use the HTML <canvas> element with the canvas 
  scripting API (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to draw graphics and animations.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas';
        this.attributes.set('height', new _elementStructure_1.BindableAttribute(`The height of the coordinate space in CSS pixels. Defaults to 150.`));
        this.attributes.set('width', new _elementStructure_1.BindableAttribute(`The width of the coordinate space in CSS pixels. Defaults to 300.`));
    }
}
exports.default = CanvasElement;
//# sourceMappingURL=canvasElement.js.map