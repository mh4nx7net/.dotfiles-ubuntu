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
const _elementStructure_1 = require("./Library/_elementStructure");
let BaseAttributeCompletionFactory = class BaseAttributeCompletionFactory {
    constructor(library) {
        this.library = library;
    }
    getElement(elementName) {
        let element = this.library.elements[elementName];
        if (!element) {
            element = this.library.unknownElement;
        }
        return element;
    }
    addAttributes(attributes, result, existingAttributes, quote) {
        for (let [key, value] of attributes.entries()) {
            if (existingAttributes.filter(i => i === key).length || value === null) {
                continue;
            }
            // remove duplicates (only leave latest addition)
            for (let item of result.filter(i => i.label === key ||
                i.label === (value.customLabel === null ? (key + '.bind') : value.customLabel))) {
                let index = result.indexOf(item, 0);
                if (index > -1) {
                    result.splice(index, 1);
                }
            }
            if (value instanceof _elementStructure_1.BindableAttribute) {
                result.push({
                    documentation: vscode_languageserver_types_1.MarkedString.fromPlainText(value.documentation).toString(),
                    detail: 'Bindable Attribute',
                    insertText: value.customBindingSnippet === null ? `${key}.bind=${quote}$0${quote}` : value.customBindingSnippet.replace('"', quote),
                    insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value,
                    label: value.customLabel === null ? (key + '.bind') : value.customLabel,
                });
            }
            if (value instanceof _elementStructure_1.EmptyAttribute) {
                result.push({
                    detail: 'Empty Custom Attribute',
                    documentation: vscode_languageserver_types_1.MarkedString.fromPlainText(value.documentation).toString(),
                    insertText: `${key}`,
                    insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                    label: key,
                });
            }
            if (value instanceof _elementStructure_1.SimpleAttribute || value instanceof _elementStructure_1.BindableAttribute) {
                result.push({
                    documentation: vscode_languageserver_types_1.MarkedString.fromPlainText(value.documentation).toString(),
                    detail: 'Attribute',
                    insertText: `${key}=${quote}$0${quote}`,
                    insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                    label: key,
                });
            }
        }
        return result;
    }
    addEvents(events, result, existingAttributes, quote) {
        for (let [key, value] of events.entries()) {
            if (existingAttributes.filter(i => i === key).length || value === null) {
                continue;
            }
            // remove exiting items that are doubles
            for (let item of result.filter(i => i.label === key ||
                i.label === key + (value.bubbles ? `.delegate` : `.trigger`))) {
                let index = result.indexOf(item, 0);
                if (index > -1) {
                    result.splice(index, 1);
                }
            }
            result.push({
                documentation: value.documentation,
                detail: 'Event',
                insertText: value.bubbles ? `${key}.delegate=${quote}$0${quote}` : `${key}.trigger=${quote}$0${quote}`,
                insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                label: key + (value.bubbles ? `.delegate` : `.trigger`),
            });
        }
        return result;
    }
};
BaseAttributeCompletionFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [_elementLibrary_1.default])
], BaseAttributeCompletionFactory);
exports.default = BaseAttributeCompletionFactory;
//# sourceMappingURL=BaseAttributeCompletionFactory.js.map