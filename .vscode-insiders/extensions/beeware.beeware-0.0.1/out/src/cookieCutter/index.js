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
const vscode_1 = require("vscode");
const types_1 = require("../common/application/types");
const types_2 = require("../common/configuration/types");
const constants_1 = require("../common/constants");
const types_3 = require("../common/platform/types");
const types_4 = require("../common/process/types");
const types_5 = require("../common/types");
const types_6 = require("../ioc/types");
const types_7 = require("./types");
let CookieCutter = class CookieCutter {
    constructor(serviceContainer) {
        this.shell = serviceContainer.get(types_1.IApplicationShell);
        this.installer = serviceContainer.get(types_7.IInstaller);
        this.variablesService = serviceContainer.get(types_7.IVariableService);
        this.executionServiceFactory = serviceContainer.get(types_4.IPythonExecutionFactory);
        this.configurationService = serviceContainer.get(types_2.IConfigurationService);
        this.currentProcess = serviceContainer.get(types_4.ICurrentProcess);
        this.commandManager = serviceContainer.get(types_1.ICommandManager);
        this.fileSystem = serviceContainer.get(types_3.IFileSystem);
        this.logger = serviceContainer.get(types_5.ILogger);
    }
    create(workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { location: vscode_1.ProgressLocation.Notification, title: `Creating ${constants_1.ApplicationName} project`, cancellable: true };
            this.shell.withProgress(options, (_, token) => this.createInternal(workspaceFolder, token));
        });
    }
    createInternal(workspaceFolder, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const executionService = yield this.executionServiceFactory.create({ resource: workspaceFolder });
            if (token.isCancellationRequested) {
                return;
            }
            let variables;
            try {
                if (!(yield this.installer.install(workspaceFolder))) {
                    return;
                }
                if (token.isCancellationRequested) {
                    return;
                }
                const cookiecutterjson = path.join(constants_1.ExtensionRootDirectory, 'resources', 'cookiecutter.json');
                const variableDefs = yield this.variablesService.getVariableDefinitions(cookiecutterjson);
                if (token.isCancellationRequested) {
                    return;
                }
                variables = yield this.variablesService.generateVariables(variableDefs, workspaceFolder, token);
                if (token.isCancellationRequested) {
                    return;
                }
            }
            catch (ex) {
                return this.logger.error('Failed to generate the variables for the cookiecutter.', ex);
            }
            try {
                // Run cookie cutter with known variables in python.
                // If any other variables are added, lets use defaults.
                // Long term plan is to create and utilize a generic cookiecutter component in VS Code.
                const file = path.join(constants_1.ExtensionRootDirectory, 'python_files', 'generate_cookiecutter.py');
                const settings = this.configurationService.getSettings(workspaceFolder);
                const args = { template_git_repo: settings.cookiecutterTemplateRepoUrl, variables };
                const PYTHONPATH = path.join(constants_1.ExtensionRootDirectory, 'python_files', 'packages');
                const processEnv = this.currentProcess.env;
                yield executionService.exec([file, JSON.stringify(args)], { cwd: workspaceFolder.fsPath, env: Object.assign({ PYTHONPATH }, processEnv), throwOnStdErr: true });
            }
            catch (ex) {
                return this.logger.error('Failed to generate the cookiecutter template.', ex);
            }
            if (token.isCancellationRequested) {
                return;
            }
            // Detect the folder and open it.
            const folderToOpen = vscode_1.Uri.file(path.join(workspaceFolder.fsPath, variables.app_name));
            if (yield this.fileSystem.directoryExists(folderToOpen.fsPath)) {
                yield this.commandManager.executeCommand('vscode.openFolder', folderToOpen);
            }
        });
    }
};
CookieCutter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_6.IServiceContainer))
], CookieCutter);
exports.CookieCutter = CookieCutter;
//# sourceMappingURL=index.js.map