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
const Path = require("path");
const aurelia_binding_1 = require("aurelia-binding");
const HtmlTemplateDocument_1 = require("./../Model/HtmlTemplateDocument");
const TemplateReference_1 = require("./../Model/TemplateReference");
const HTMLDocumentParser_1 = require("./../HTMLDocumentParser");
const typescript_1 = require("typescript");
class AureliaHtmlParser {
    processFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let template = new HtmlTemplateDocument_1.HtmlTemplateDocument();
            template.path = path;
            template.name = Path.basename(path, '.html').split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-');
            const fileContent = typescript_1.sys.readFile(path, 'utf-8');
            if (!fileContent.startsWith('<template')) {
                // not an Aurelia template, stop processing
                return template;
            }
            const docParser = new HTMLDocumentParser_1.HTMLDocumentParser();
            let document = yield docParser.parse(fileContent);
            const templateTag = document.find(tag => tag.name === 'template');
            if (templateTag) {
                template.bindables = this.getBindableValuesFrom(templateTag);
            }
            template.references = this.getRequireImportsFrom(document);
            template.dynamicBindables = this.getAttributeCommands(document);
            template.interpolationBindings = this.getStringInterpolationBindings(fileContent);
            template.tags = document;
            return template;
        });
    }
    getBindableValuesFrom(templateTag) {
        const bindableAttribute = templateTag.attributes.find(attribute => attribute.name === 'bindable');
        if (bindableAttribute && bindableAttribute.value) {
            return bindableAttribute.value.split(',').map(i => i.trim());
        }
        else {
            return [];
        }
    }
    getRequireImportsFrom(document) {
        const requireStatements = document.filter(tag => tag.name === 'require' && tag.startTag);
        let references = [];
        for (let require of requireStatements) {
            const pathAttribute = require.attributes.find(attr => attr.name === 'from');
            const asAttribute = require.attributes.find(attr => attr.name === 'as');
            let path, asElementValue;
            if (pathAttribute) {
                path = pathAttribute.value;
            }
            if (asAttribute) {
                asElementValue = asAttribute.value;
            }
            references.push(new TemplateReference_1.TemplateReference(path, asElementValue));
        }
        return references;
    }
    getAttributeCommands(document) {
        let bindings = [];
        const aureliaParser = new aurelia_binding_1.Parser();
        for (let element of document) {
            if (element.name === 'require' || element.name === 'template') {
                continue;
            }
            const bindingAttributes = element.attributes.filter(attr => attr.binding);
            for (let binding of bindingAttributes) {
                bindings.push({
                    name: binding.name,
                    value: binding.value,
                    bindingType: binding.binding,
                    bindingData: aureliaParser.parse(binding.value)
                });
            }
        }
        return bindings;
    }
    getStringInterpolationBindings(fileContent) {
        let bindings = [];
        const aureliaParser = new aurelia_binding_1.Parser();
        const interpolationRegex = /\$\{(.*)\}/g;
        var match;
        while (match = interpolationRegex.exec(fileContent)) {
            bindings.push({
                value: match[0],
                bindingData: aureliaParser.parse(match[1])
            });
        }
        return bindings;
    }
}
exports.AureliaHtmlParser = AureliaHtmlParser;
//# sourceMappingURL=AureliaHtmlParser.js.map