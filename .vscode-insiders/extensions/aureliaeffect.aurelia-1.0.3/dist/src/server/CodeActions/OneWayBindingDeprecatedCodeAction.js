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
class OneWayBindingDeprecatedCodeAction {
    constructor() {
        this.name = 'aurelia-binding-one-way-deprecated';
    }
    commands(diagnostic, document) {
        return __awaiter(this, void 0, void 0, function* () {
            return vscode_languageserver_types_1.Command.create(`Change 'one-way' binding behaviour to 'to-view'`, 'aurelia-binding-one-way-deprecated', document.uri, document.version, [
                vscode_languageserver_types_1.TextEdit.replace(diagnostic.range, 'to-view')
            ]);
        });
    }
}
exports.OneWayBindingDeprecatedCodeAction = OneWayBindingDeprecatedCodeAction;
//# sourceMappingURL=OneWayBindingDeprecatedCodeAction.js.map