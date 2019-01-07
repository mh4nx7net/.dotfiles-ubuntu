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
const BaseAttributeCompletionFactory_1 = require("./BaseAttributeCompletionFactory");
const _elementStructure_1 = require("./Library/_elementStructure");
const AureliaSettings_1 = require("./../AureliaSettings");
let BindingCompletionFactory = class BindingCompletionFactory extends BaseAttributeCompletionFactory_1.default {
    constructor(library, settings) {
        super(library);
        this.settings = settings;
    }
    create(tagDef, attributeDef, nextChar) {
        let snippetPrefix = nextChar === '=' ? '' : `=${this.settings.quote}$0${this.settings.quote}`;
        let result = [];
        let element = this.getElement(tagDef.name);
        if (!element.events.get(attributeDef.name) && !_elementStructure_1.GlobalAttributes.events.get(attributeDef.name)) {
            this.setAttributes(element.attributes, attributeDef.name, snippetPrefix, result);
        }
        this.setEvents(element.events, attributeDef.name, snippetPrefix, result);
        return result;
    }
    setEvents(events, name, snippetPrefix, result) {
        let event = events.get(name);
        if (!event) {
            event = _elementStructure_1.GlobalAttributes.events.get(name);
        }
        if (event) {
            if (event.bubbles) {
                for (let binding of ['delegate', 'capture']) {
                    result.push({
                        documentation: binding,
                        insertText: binding + snippetPrefix,
                        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                        kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                        label: `.${binding}=${this.settings.quote}${this.settings.quote}`
                    });
                }
            }
            for (let binding of ['trigger', 'call']) {
                result.push({
                    documentation: binding,
                    insertText: binding + snippetPrefix,
                    insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                    label: `.${binding}=${this.settings.quote}${this.settings.quote}`
                });
            }
        }
    }
    setAttributes(attributes, name, snippetPrefix, result) {
        let attribute = attributes.get(name);
        if (!attribute) {
            attribute = _elementStructure_1.GlobalAttributes.attributes.get(name);
        }
        for (let binding of this.settings.bindings.data) {
            result.push({
                documentation: binding.documentation,
                insertText: `${binding.name}${snippetPrefix}`,
                insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                label: binding.label ? binding.label.replace(/'/g, this.settings.quote) : `.${binding.name}=${this.settings.quote}${this.settings.quote}`
            });
        }
    }
};
BindingCompletionFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [_elementLibrary_1.default, AureliaSettings_1.default])
], BindingCompletionFactory);
exports.default = BindingCompletionFactory;
//# sourceMappingURL=BindingCompletionFactory.js.map