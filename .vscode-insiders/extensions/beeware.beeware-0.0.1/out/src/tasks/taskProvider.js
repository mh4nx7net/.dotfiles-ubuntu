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
const os_1 = require("os");
const vscode_1 = require("vscode");
const types_1 = require("../common/application/types");
const types_2 = require("../common/configuration/types");
const constants_1 = require("../common/constants");
const types_3 = require("../common/process/types");
const types_4 = require("../common/types");
const types_5 = require("../ioc/types");
const helper_1 = require("./helper");
let BulidRunTaskProvider = class BulidRunTaskProvider {
    constructor(serviceContainer) {
        this.logger = serviceContainer.get(types_4.ILogger);
        this.outputChannel = serviceContainer.get(types_4.IOutputChannel);
        this.processExecutionFactory = serviceContainer.get(types_3.IProcessServiceFactory);
        this.workspaceService = serviceContainer.get(types_1.IWorkspaceService);
        this.configurationService = serviceContainer.get(types_2.IConfigurationService);
        this.shell = serviceContainer.get(types_1.IApplicationShell);
        this.moduleInstaller = serviceContainer.get(types_3.IModuleInstaller);
    }
    build(target) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildHandler('build', target);
        });
    }
    run(target) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildHandler('run', target);
        });
    }
    buildHandler(buildOrRun, target) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(os_1.EOL);
            this.logger.info(`${buildOrRun ? 'Build' : 'Run'} '${target}'`);
            const workspaceFolder = yield this.workspaceService.selectWorkspaceFolder();
            if (!workspaceFolder) {
                return;
            }
            if (!(yield this.checkAndInstallModule('beeware', workspaceFolder.uri))) {
                return;
            }
            const executionService = yield this.processExecutionFactory.create(workspaceFolder.uri);
            const pythonPath = this.configurationService.getSettings(workspaceFolder.uri).pythonPath;
            const beewarePath = this.configurationService.getSettings(workspaceFolder.uri).beewarePath;
            const executionInfo = new helper_1.BeeWareExecutionHelper().buildExecutionArgs(pythonPath, beewarePath);
            const title = `${buildOrRun ? 'Building' : 'Running'} ${constants_1.ApplicationName} on ${target}`;
            const options = { location: vscode_1.ProgressLocation.Notification, title, cancellable: true };
            this.outputChannel.show();
            this.shell.withProgress(options, (_, token) => new Promise((resolve, reject) => {
                const cmd = buildOrRun === 'build' ? 'build' : 'run';
                const args = [...executionInfo.args, cmd, target];
                const output = executionService.execObservable(executionInfo.command, args, { cwd: workspaceFolder.uri.fsPath, token });
                output.out.subscribe(item => {
                    if (item.source === 'stderr') {
                        this.logger.error(item.out);
                    }
                    else {
                        this.logger.info(item.out);
                    }
                    this.outputChannel.append(item.out);
                }, error => {
                    this.logger.error(`${buildOrRun ? 'Build' : 'Run'} failed`, error);
                    reject(error);
                }, () => {
                    resolve();
                });
            }));
        });
    }
    checkAndInstallModule(moduleName, workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Checking if module '${moduleName}' is installed.`);
            const cookieCutterIsInstalled = yield this.moduleInstaller.isInstalled(moduleName, workspaceFolder);
            if (!cookieCutterIsInstalled) {
                const result = yield this.shell.showInformationMessage(`Module '${moduleName}' not installed, would you like to install it?`, 'Install', 'Cancel');
                if (result !== 'Install') {
                    return false;
                }
            }
            if (!(yield this.moduleInstaller.install(moduleName, workspaceFolder))) {
                return false;
            }
            this.logger.info(`Module '${moduleName}' is installed.`);
            return true;
        });
    }
};
BulidRunTaskProvider = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_5.IServiceContainer))
], BulidRunTaskProvider);
exports.BulidRunTaskProvider = BulidRunTaskProvider;
//# sourceMappingURL=taskProvider.js.map