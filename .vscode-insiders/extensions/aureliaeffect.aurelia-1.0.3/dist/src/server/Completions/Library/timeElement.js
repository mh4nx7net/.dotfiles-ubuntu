"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class TimeElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <time> element represents either a time on a 24-hour clock or a precise date in 
  the Gregorian calendar (with optional time and timezone information).`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time';
        this.attributes.set('datetime', new _elementStructure_1.BindableAttribute(`This attribute indicates the time and date of the element and must be a valid date with an optional 
      time string. If the value cannot be parsed as a date with an optional time string, the element does not have an 
      associated time stamp.`));
    }
}
exports.default = TimeElement;
//# sourceMappingURL=timeElement.js.map