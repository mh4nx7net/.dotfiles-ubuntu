"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const _elementLibrary_1 = require("./Library/_elementLibrary");
let ElementCompletionFactory = class ElementCompletionFactory {
    constructor(library) {
        this.library = library;
    }
    create(parent) {
        let result = [];
        if (parent) {
            let parentElementDef = this.library.elements[parent];
            if (parentElementDef && parentElementDef.permittedChildren && parentElementDef.permittedChildren.length) {
                for (let childName of parentElementDef.permittedChildren) {
                    result.push({
                        documentation: vscode_languageserver_types_1.MarkedString.fromPlainText(this.library.elements[childName].documentation).toString(),
                        detail: 'HTMLElement',
                        insertText: childName + '>',
                        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
                        kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                        label: `<${childName}>`,
                        filterText: `${childName}>`
                    });
                }
                return result;
            }
        }
        for (let name in this.library.elements) {
            let item = this.library.elements[name];
            // if (item instanceof MozDocElement && item.permittedParents.length) {
            //   continue;
            // }
            result.push({
                documentation: vscode_languageserver_types_1.MarkedString.fromPlainText(item.documentation).toString(),
                detail: 'HTMLElement',
                insertText: name + '>',
                insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                label: `<${name}>`,
                filterText: `${name}>`
            });
        }
        return result;
    }
};
ElementCompletionFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [_elementLibrary_1.default])
], ElementCompletionFactory);
exports.default = ElementCompletionFactory;
//# sourceMappingURL=ElementCompletionFactory.js.map