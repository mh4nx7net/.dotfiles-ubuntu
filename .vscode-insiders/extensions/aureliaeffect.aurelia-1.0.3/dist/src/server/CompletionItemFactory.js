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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const AttributeCompletionFactory_1 = require("./Completions/AttributeCompletionFactory");
const ElementCompletionFactory_1 = require("./Completions/ElementCompletionFactory");
const AttributeValueCompletionFactory_1 = require("./Completions/AttributeValueCompletionFactory");
const BindingCompletionFactory_1 = require("./Completions/BindingCompletionFactory");
const EmmetCompletionFactory_1 = require("./Completions/EmmetCompletionFactory");
const HTMLDocumentParser_1 = require("./FileParser/HTMLDocumentParser");
let CompletionItemFactory = class CompletionItemFactory {
    constructor(attributeCompletionFactory, elementCompletionFactory, attributeValueCompletionFactory, bindingCompletionFactory, emmetCompletionFactory, parser) {
        this.attributeCompletionFactory = attributeCompletionFactory;
        this.elementCompletionFactory = elementCompletionFactory;
        this.attributeValueCompletionFactory = attributeValueCompletionFactory;
        this.bindingCompletionFactory = bindingCompletionFactory;
        this.emmetCompletionFactory = emmetCompletionFactory;
        this.parser = parser;
    }
    create(triggerCharacter, position, text, positionNumber, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            let nodes = yield this.parser.parse(text);
            let insideTag = null;
            let lastIdx = 0;
            // get insidetag and last index of tag
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];
                if (!insideTag && positionNumber >= node.startOffset && positionNumber <= node.endOffset) {
                    insideTag = node;
                }
                if (node !== insideTag && node.endOffset > positionNumber) {
                    lastIdx = i;
                    break;
                }
            }
            // get open parent tag
            let tags = this.getOpenHtmlTags(nodes, lastIdx);
            let parentTag = tags[tags.length - 1];
            // auto complete inside a tag
            if (insideTag) {
                let elementString = text.substring(insideTag.startOffset, positionNumber);
                if (this.notInAttributeValue(elementString)) {
                    if (triggerCharacter === ' ') {
                        return this.attributeCompletionFactory.create(insideTag.name, insideTag.attributes.map(i => i.name));
                    }
                    else if (triggerCharacter === '.' && this.canExpandDot(elementString)) {
                        return this.createBindingCompletion(insideTag, text, positionNumber);
                    }
                    else {
                        return [];
                    }
                    // inside attribute, perform attribute completion
                }
                else if (triggerCharacter === '"' || triggerCharacter === '\'') {
                    return this.createValueCompletion(insideTag, text, positionNumber, uri);
                }
                else {
                    return [];
                }
            }
            // auto complete others
            switch (triggerCharacter) {
                case '[':
                    return this.createEmmetCompletion(text, positionNumber);
                case '<':
                    return this.elementCompletionFactory.create(parentTag);
            }
        });
    }
    notInAttributeValue(tagText) {
        let single = 0, double = 0;
        for (let char of tagText) {
            if (char === '"')
                double += 1;
            if (char === '\'')
                single += 1;
        }
        return single % 2 == 0 && double % 2 == 0;
    }
    canExpandDot(elementString) {
        return !/([^a-zA-Z]|\.(bind|one-way|two-way|one-time|from-view|to-view|delegate|trigger|call|capture|ref))\.$/g.test(elementString);
    }
    getOpenHtmlTags(nodes, lastIdx) {
        let tags = [];
        for (let i = 0; i < lastIdx; i++) {
            if (nodes[i].startTag) {
                tags.push(nodes[i].name);
            }
            else {
                var index = tags.indexOf(nodes[i].name);
                if (index >= 0) {
                    tags.splice(index, 1);
                }
            }
        }
        return tags;
    }
    createValueCompletion(tag, text, position, uri) {
        let nextCharacter = text.substring(position, position + 1);
        if (/['"]/.test(nextCharacter)) {
            let attribute;
            let elementText = text.substring(tag.startOffset, tag.endOffset);
            let tagPosition = position - tag.startOffset;
            const attributeRegex = /([\w-]+)\.?\w*\=['"]/g;
            let matches;
            while (matches = attributeRegex.exec(elementText)) {
                if (tagPosition >= matches.index && (tagPosition <= matches.index + matches[0].length)) {
                    let foundText = matches[1];
                    let attributes = tag.attributes.filter(a => a && a.name == foundText);
                    if (attributes.length) {
                        attribute = attributes[0];
                        break;
                    }
                }
            }
            if (!attribute) {
                return [];
            }
            return this.attributeValueCompletionFactory.create(tag.name, attribute.name, attribute.binding, uri);
        }
    }
    createEmmetCompletion(text, position) {
        const emmetRegex = /^([^<]*?>)*?([\w|-]*)\[$/gm;
        let matches = emmetRegex.exec(text.substring(0, position));
        if (!matches) {
            return [];
        }
        let elementName = matches[2];
        return this.emmetCompletionFactory.create(elementName);
    }
    createBindingCompletion(tag, text, position) {
        let attribute;
        let elementText = text.substring(tag.startOffset, tag.endOffset);
        let tagPosition = position - tag.startOffset;
        const attributeRegex = /([\w\.-]+)(\=['"](.*?)["'])?/g;
        let matches;
        let foundText = '';
        while (matches = attributeRegex.exec(elementText)) {
            if (tagPosition >= matches.index && (tagPosition <= matches.index + matches[1].length)) {
                foundText = matches[1];
                let attributes = tag.attributes.filter(a => a.name + (a.binding !== undefined ? '.' : '') == foundText);
                if (attributes.length) {
                    attribute = attributes[0];
                    break;
                }
            }
        }
        if (!attribute) {
            attribute = new HTMLDocumentParser_1.AttributeDefinition(foundText.substring(0, foundText.length - 1), '');
        }
        return this.bindingCompletionFactory.create(tag, attribute, text.substring(position, position + 1));
    }
};
CompletionItemFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [AttributeCompletionFactory_1.default,
        ElementCompletionFactory_1.default,
        AttributeValueCompletionFactory_1.default,
        BindingCompletionFactory_1.default,
        EmmetCompletionFactory_1.default,
        HTMLDocumentParser_1.HTMLDocumentParser])
], CompletionItemFactory);
exports.default = CompletionItemFactory;
//# sourceMappingURL=CompletionItemFactory.js.map