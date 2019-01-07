"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aurelia_templating_binding_1 = require("aurelia-templating-binding");
function attributeInvalidCaseFix(name, elementName) {
    // TODO: find a way to detect if this element is a svg element
    const attributeMap = new aurelia_templating_binding_1.AttributeMap({
        isStandardSvgAttribute: () => false
    });
    let fixed;
    const auElement = attributeMap.elements[elementName];
    // only replace dashes in non data-* and aria-* attributes
    let lookupProperty = name.toLowerCase();
    if (/^(?!(data|aria)-).*$/g.test(lookupProperty)) {
        lookupProperty = lookupProperty.replace('-', '');
    }
    if (auElement && lookupProperty in auElement || lookupProperty in attributeMap.allElements) {
        fixed = lookupProperty;
    }
    else {
        fixed = name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-');
    }
    return fixed;
}
exports.attributeInvalidCaseFix = attributeInvalidCaseFix;
//# sourceMappingURL=AttributeInvalidCaseFix.js.map