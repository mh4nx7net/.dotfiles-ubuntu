"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../ioc/types");
const constants_1 = require("./constants");
const types_2 = require("./types");
const PREFIX = `${constants_1.ApplicationName}: `;
let Logger = class Logger {
    constructor(serviceContainer) {
        this.outputChannel = serviceContainer.get(types_2.IOutputChannel);
    }
    error(message, ex) {
        console.error(`${PREFIX}${message}`, ex);
        this.outputChannel.appendLine(message);
    }
    warn(message) {
        console.warn(`${PREFIX}${message}`);
        this.outputChannel.appendLine(message);
    }
    info(message) {
        this.outputChannel.appendLine(message);
    }
};
Logger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.IServiceContainer))
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map