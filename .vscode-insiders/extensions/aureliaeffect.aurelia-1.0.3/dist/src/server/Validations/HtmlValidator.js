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
const HTMLDocumentParser_1 = require("./../FileParser/HTMLDocumentParser");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const OneWayDeprecatedValidation_1 = require("./Attribute/OneWayDeprecatedValidation");
const InValidAttributeCasingValidation_1 = require("./Attribute/InValidAttributeCasingValidation");
const AureliaSettings_1 = require("../AureliaSettings");
let HtmlValidator = class HtmlValidator {
    constructor(oneWayDeprecatedValidation, inValidAttributeCasingValidation, settings) {
        this.settings = settings;
        this.attributeValidators = [];
        this.attributeValidators.push(oneWayDeprecatedValidation, inValidAttributeCasingValidation);
    }
    doValidation(document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.settings.validation) {
                return Promise.resolve([]);
            }
            const text = document.getText();
            if (text.trim().length == 0) {
                return Promise.resolve([]);
            }
            const parser = new HTMLDocumentParser_1.HTMLDocumentParser();
            const documentNodes = yield parser.parse(text);
            const diagnostics = [];
            for (const element of documentNodes) {
                for (const attribute of element.attributes) {
                    this.attributeValidators
                        .filter(validator => validator.match(attribute, element, document))
                        .forEach(validator => diagnostics.push(validator.diagnostic(attribute, element, document)));
                }
            }
            return Promise.resolve(diagnostics);
        });
    }
};
HtmlValidator = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [OneWayDeprecatedValidation_1.OneWayDeprecatedValidation,
        InValidAttributeCasingValidation_1.InValidAttributeCasingValidation,
        AureliaSettings_1.default])
], HtmlValidator);
exports.HtmlValidator = HtmlValidator;
//# sourceMappingURL=HtmlValidator.js.map