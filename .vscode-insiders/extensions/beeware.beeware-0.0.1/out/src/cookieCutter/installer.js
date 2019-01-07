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
const path = require("path");
const constants_1 = require("../common/constants");
const types_1 = require("../common/process/types");
const types_2 = require("../common/types");
const types_3 = require("../ioc/types");
let Installer = class Installer {
    constructor(serviceContainer) {
        this.logger = serviceContainer.get(types_2.ILogger);
        this.moduleInstaller = serviceContainer.get(types_1.IModuleInstaller);
    }
    install(workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkAndInstallModule('cookiecutter', workspaceFolder))) {
                return false;
            }
            if (!(yield this.checkAndInstallModule('jinja2', workspaceFolder))) {
                return false;
            }
            return true;
        });
    }
    checkAndInstallModule(moduleName, workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Checking if module '${moduleName}' is installed.`);
            const cookieCutterIsInstalled = yield this.moduleInstaller.isInstalled(moduleName, workspaceFolder);
            if (!cookieCutterIsInstalled && !(yield this.installModule(moduleName, workspaceFolder))) {
                return false;
            }
            this.logger.info(`Module '${moduleName}' is installed.`);
            return true;
        });
    }
    installModule(moduleName, workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetDirectory = path.join(constants_1.ExtensionRootDirectory, 'python_files', 'packages');
            return this.moduleInstaller.install(moduleName, workspaceFolder, targetDirectory);
        });
    }
};
Installer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_3.IServiceContainer))
], Installer);
exports.Installer = Installer;
//# sourceMappingURL=installer.js.map