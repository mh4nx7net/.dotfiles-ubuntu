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
const types_1 = require("../../ioc/types");
const types_2 = require("../application/types");
const types_3 = require("../types");
const types_4 = require("./types");
let ModuleInstaller = class ModuleInstaller {
    constructor(serviceContainer) {
        this.pythonExecServieFactory = serviceContainer.get(types_4.IPythonExecutionFactory);
        this.shell = serviceContainer.get(types_2.IApplicationShell);
        this.logger = serviceContainer.get(types_3.ILogger);
    }
    isInstalled(moduleName, workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.pythonExecServieFactory.create({ resource: workspaceFolder });
            return service.isModuleInstalled(moduleName);
        });
    }
    install(moduleName, workspaceFolder, targetDirectory) {
        return __awaiter(this, void 0, void 0, function* () {
            const executionService = yield this.pythonExecServieFactory.create({ resource: workspaceFolder });
            const destinationMessage = targetDirectory ? ` into ${targetDirectory}` : '';
            try {
                this.logger.info(`Installing module '${moduleName}'${destinationMessage}`);
                const installDirArgs = targetDirectory ? ['-t', targetDirectory.fileToCommandArgument()] : [];
                const cacheArgs = targetDirectory ? ['--no-cache-dir'] : [];
                const args = ['-m', 'pip', 'install', ...installDirArgs, moduleName, ...cacheArgs];
                yield executionService.exec(args, { throwOnStdErr: true });
                return true;
            }
            catch (ex) {
                const message = `Failed to install '${moduleName}'${destinationMessage}, please install manually.`;
                this.logger.error(message, ex);
                this.shell.showErrorMessage(message);
                return false;
            }
        });
    }
};
ModuleInstaller = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.IServiceContainer))
], ModuleInstaller);
exports.ModuleInstaller = ModuleInstaller;
//# sourceMappingURL=moduleInstaller.js.map