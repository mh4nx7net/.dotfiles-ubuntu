"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const AttributeInvalidCaseFix_1 = require("./../../Common/AttributeInvalidCaseFix");
class InValidAttributeCasingValidation {
    constructor() {
        this.match = (attribute, element, document) => {
            if (!attribute.binding) {
                this.attributeEndOffset = undefined;
                this.attributeStartOffset = undefined;
                this.original = undefined;
                this.fixed = undefined;
                return false;
            }
            this.attributeStartOffset = attribute.startOffset;
            this.attributeEndOffset = this.attributeStartOffset + attribute.name.length;
            this.fixed = AttributeInvalidCaseFix_1.attributeInvalidCaseFix(attribute.name, element.name);
            this.original = document.getText().substring(this.attributeStartOffset, this.attributeEndOffset);
            return (this.fixed && this.fixed !== this.original);
        };
    }
    diagnostic(attribute, element, document) {
        const attributeStartOffset = attribute.startOffset;
        const attributeEndOffset = attributeStartOffset + attribute.name.length;
        return {
            message: `'${this.original}' has invalid casing; it should likely be '${this.fixed}'`,
            range: vscode_languageserver_types_1.Range.create(document.positionAt(attributeStartOffset), document.positionAt(attributeEndOffset)),
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Error,
            source: 'Aurelia',
            code: 'aurelia-attribute-invalid-case',
            elementName: element.name
        };
    }
}
exports.InValidAttributeCasingValidation = InValidAttributeCasingValidation;
//# sourceMappingURL=InValidAttributeCasingValidation.js.map