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
const BaseAttributeCompletionFactory_1 = require("./BaseAttributeCompletionFactory");
const AureliaApplication_1 = require("./../FileParser/Model/AureliaApplication");
const AureliaSettings_1 = require("../AureliaSettings");
const FileUriToPath_1 = require("./../Util/FileUriToPath");
const NormalizePath_1 = require("./../Util/NormalizePath");
let AttributeCompletionFactory = class AttributeCompletionFactory extends BaseAttributeCompletionFactory_1.default {
    constructor(library, application, settings) {
        super(library);
        this.application = application;
        this.settings = settings;
    }
    create(elementName, attributeName, bindingName, uri) {
        let result = [];
        if (bindingName === undefined || bindingName === null || bindingName === '') {
            let element = this.getElement(elementName);
            let attribute = element.attributes.get(attributeName);
            if (!attribute) {
                attribute = _elementStructure_1.GlobalAttributes.attributes.get(attributeName);
            }
            if (attribute && attribute.values) {
                for (let [key, value] of attribute.values.entries()) {
                    result.push({
                        documentation: value.documentation,
                        insertText: key,
                        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                        kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                        label: key,
                    });
                }
            }
        }
        if (this.settings.featureToggles.smartAutocomplete) {
            includeCodeAutoComplete(this.application, result, NormalizePath_1.normalizePath(FileUriToPath_1.fileUriToPath(uri)));
        }
        return result;
    }
};
AttributeCompletionFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [_elementLibrary_1.default,
        AureliaApplication_1.AureliaApplication,
        AureliaSettings_1.default])
], AttributeCompletionFactory);
exports.default = AttributeCompletionFactory;
function includeCodeAutoComplete(application, result, path) {
    path = path.toLowerCase();
    const compoment = application.components.find(i => i.paths.map(x => x.toLowerCase()).indexOf(path) > -1);
    if (compoment) {
        if (compoment.viewModel) {
            compoment.viewModel.methods.forEach(x => {
                let inner = '';
                for (let i = 0; i < x.parameters.length; i++) {
                    inner += `\$${i + 1},`;
                }
                if (x.parameters.length) {
                    inner = inner.substring(0, inner.length - 1);
                }
                result.push({
                    documentation: x.name,
                    insertText: `${x.name}(${inner})$0`,
                    insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                    label: x.name,
                });
            });
            compoment.viewModel.properties.forEach(x => {
                let documentation = x.name;
                if (x.type) {
                    documentation += ` (${x.type})`;
                }
                result.push({
                    documentation: documentation,
                    insertText: x.name,
                    insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                    label: x.name,
                });
            });
        }
    }
}
//# sourceMappingURL=AttributeValueCompletionFactory.js.map