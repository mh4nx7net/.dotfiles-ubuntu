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
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const _elementLibrary_1 = require("./Completions/Library/_elementLibrary");
const _elementStructure_1 = require("./Completions/Library/_elementStructure");
let HoverProviderFactory = class HoverProviderFactory {
    constructor(elementLibrary) {
        this.elementLibrary = elementLibrary;
    }
    create(text, offset) {
        let leadingCharacter = '', appixCharacter = '';
        let backPos = offset;
        while (true) {
            let char = text[backPos];
            if (char === ' ' || char === '/' || char === '<' || char === undefined) {
                leadingCharacter = char;
                backPos = backPos + 1;
                break;
            }
            backPos = backPos - 1;
        }
        let nextPos = offset;
        while (true) {
            let char = text[nextPos];
            if (char === ' ' || char === '/' || char === '>' || char === '=' || char === undefined) {
                appixCharacter = char;
                break;
            }
            nextPos = nextPos + 1;
        }
        let tag = text.substring(backPos, nextPos);
        let displayValue = '';
        let documentation = '';
        let source = '';
        let moreInfo = '';
        let element;
        switch (leadingCharacter) {
            case '<':
                element = this.elementLibrary.elements[tag] || this.elementLibrary.unknownElement;
                if (element) {
                    documentation = element.documentation;
                    moreInfo = `more information: ${element.url}`;
                    displayValue = `<${tag}>`;
                }
                break;
            case '/':
                element = this.elementLibrary.elements[tag];
                if (element) {
                    documentation = element.documentation;
                    moreInfo = `more information: ${element.url}`;
                    displayValue = `</${tag}>`;
                }
                break;
            case ' ':
                let matches = /<(\w*)\b.*$/g.exec(text.substring(0, offset));
                if (!matches || matches.length === 0) {
                    return;
                }
                let elementName = matches[1];
                displayValue = `<${elementName} ${tag}="">`;
                // fixes
                if (tag.startsWith('data-')) {
                    tag = 'data-*';
                }
                if (tag.indexOf('.')) {
                    tag = tag.split('.')[0];
                }
                element = this.elementLibrary.elements[elementName] || this.elementLibrary.unknownElement;
                let attribute = element.attributes.get(tag);
                let event = element.events.get(tag);
                if (attribute) {
                    documentation = attribute.documentation;
                    moreInfo = attribute.url || element.url;
                }
                if (event) {
                    documentation = event.documentation;
                    moreInfo = event.url;
                    source = `MDN by Mozilla Contributors (${event.url}$history) is licensed under CC-BY-SA 2.5.`;
                }
        }
        documentation = documentation.replace(/\s\s+/g, ' ');
        if (documentation == '') {
            return undefined;
        }
        if (element instanceof _elementStructure_1.MozDocElement) {
            source = element.licenceText;
        }
        return {
            contents: [
                { language: 'html', value: displayValue },
                { language: 'markdown', value: documentation },
                moreInfo,
                source
            ]
        };
    }
};
HoverProviderFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [_elementLibrary_1.default])
], HoverProviderFactory);
exports.default = HoverProviderFactory;
//# sourceMappingURL=HoverProviderFactory.js.map