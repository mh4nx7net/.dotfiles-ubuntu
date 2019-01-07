"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
class OneWayDeprecatedValidation {
    match(attribute) {
        return attribute.binding === 'one-way';
    }
    diagnostic(attribute, element, document) {
        const bindingStartOffset = attribute.startOffset + attribute.name.length + 1;
        const bindingEndOffset = bindingStartOffset + attribute.binding.length;
        return {
            message: `attribute '${attribute.name}' is using one-way data binding which is deprecated, use 'to-view'`,
            range: vscode_languageserver_types_1.Range.create(document.positionAt(bindingStartOffset), document.positionAt(bindingEndOffset)),
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            source: 'Aurelia',
            code: 'aurelia-binding-one-way-deprecated'
        };
    }
}
exports.OneWayDeprecatedValidation = OneWayDeprecatedValidation;
//# sourceMappingURL=OneWayDeprecatedValidation.js.map