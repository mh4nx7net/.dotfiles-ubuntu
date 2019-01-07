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
const _elementLibrary_1 = require("./Library/_elementLibrary");
const _elementStructure_1 = require("./Library/_elementStructure");
const BaseAttributeCompletionFactory_1 = require("./BaseAttributeCompletionFactory");
const AureliaSettings_1 = require("./../AureliaSettings");
let AureliaAttributeCompletionFactory = class AureliaAttributeCompletionFactory extends BaseAttributeCompletionFactory_1.default {
    constructor(library, settings) {
        super(library);
        this.settings = settings;
    }
    create(elementName, existingAttributes) {
        let result = [];
        let element = this.getElement(elementName);
        if (element.hasGlobalAttributes) {
            this.addAttributes(_elementStructure_1.GlobalAttributes.attributes, result, existingAttributes, this.settings.quote);
        }
        if (element.attributes) {
            this.addAttributes(element.attributes, result, existingAttributes, this.settings.quote);
        }
        if (element.hasGlobalEvents) {
            this.addEvents(_elementStructure_1.GlobalAttributes.events, result, existingAttributes, this.settings.quote);
        }
        if (element.events) {
            this.addEvents(element.events, result, existingAttributes, this.settings.quote);
        }
        return result;
    }
};
AureliaAttributeCompletionFactory = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [_elementLibrary_1.default, AureliaSettings_1.default])
], AureliaAttributeCompletionFactory);
exports.default = AureliaAttributeCompletionFactory;
//# sourceMappingURL=AttributeCompletionFactory.js.map