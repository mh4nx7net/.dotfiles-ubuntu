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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../common/application/types");
const types_2 = require("../ioc/types");
let Ui = class Ui {
    constructor(serviceContainer) {
        this.shell = serviceContainer.get(types_1.IApplicationShell);
    }
    selectOption(description, defaultValue, options, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.shell.showQuickPick(options, { placeHolder: description, ignoreFocusOut: true }, token)
                .then((item) => item ? item : defaultValue);
        });
    }
    selectYesNo(description, defaultValue, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.shell.showQuickPick(['Yes', 'No'], { placeHolder: description, ignoreFocusOut: true }, token)
                .then((item) => typeof item === 'string' ? item === 'Yes' : defaultValue);
        });
    }
    provideValue(description, defaultValue, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.shell.showInputBox({ placeHolder: description, value: defaultValue, ignoreFocusOut: true, prompt: description }, token)
                .then((item) => item && item.length > 0 ? item : defaultValue);
        });
    }
};
Ui = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_2.IServiceContainer))
], Ui);
exports.Ui = Ui;
//# sourceMappingURL=ui.js.map