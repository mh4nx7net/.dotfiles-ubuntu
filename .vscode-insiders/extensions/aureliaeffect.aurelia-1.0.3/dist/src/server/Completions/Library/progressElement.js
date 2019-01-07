"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ProgressElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <progress> element represents the completion progress of a task, typically 
  displayed as a progress bar.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress';
        this.attributes.set('max', new _elementStructure_1.BindableAttribute(`This attribute describes how much work the task indicated by the progress element requires. The max attribute, if present, 
      must have a value greater than zero and be a valid floating point number. The default value is 1.`));
        this.attributes.set('value', new _elementStructure_1.BindableAttribute(`This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 
      and max, or between 0 and 1 if max is omitted. If there is no value attribute, the progress bar is indeterminate; this indicates that an 
      activity is ongoing with no indication of how long it is expected to take.`));
    }
}
exports.default = ProgressElement;
//# sourceMappingURL=progressElement.js.map