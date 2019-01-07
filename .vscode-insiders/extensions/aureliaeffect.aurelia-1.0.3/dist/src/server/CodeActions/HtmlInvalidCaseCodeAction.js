"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const HTMLDocumentParser_1 = require("./../FileParser/HTMLDocumentParser");
const AttributeInvalidCaseFix_1 = require("../Common/AttributeInvalidCaseFix");
class HtmlInvalidCaseCodeAction {
    constructor() {
        this.name = 'aurelia-attribute-invalid-case';
    }
    commands(diagnostic, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = document.getText();
            const start = document.offsetAt(diagnostic.range.start);
            const end = document.offsetAt(diagnostic.range.end);
            const parser = new HTMLDocumentParser_1.HTMLDocumentParser();
            const element = yield parser.getElementAtPosition(text, start, end);
            const original = text.substring(start, end);
            let fixed = original;
            if (element) {
                fixed = AttributeInvalidCaseFix_1.attributeInvalidCaseFix(fixed, element.name);
            }
            return vscode_languageserver_types_1.Command.create(`Rename ${original} to ${fixed}`, 'aurelia-attribute-invalid-case', document.uri, document.version, [
                vscode_languageserver_types_1.TextEdit.replace(diagnostic.range, fixed)
            ]);
        });
    }
}
exports.HtmlInvalidCaseCodeAction = HtmlInvalidCaseCodeAction;
//# sourceMappingURL=HtmlInvalidCaseCodeAction.js.map