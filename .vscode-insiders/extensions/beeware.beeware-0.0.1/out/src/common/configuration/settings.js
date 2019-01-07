'use strict';
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
const events_1 = require("events");
const inversify_1 = require("inversify");
const path = require("path");
const vscode_1 = require("vscode");
const types_1 = require("../../ioc/types");
const types_2 = require("../application/types");
const types_3 = require("../types");
const systemVariables_1 = require("../variables/systemVariables");
// tslint:disable-next-line:no-require-imports no-var-requires
const untildify = require('untildify');
exports.BEEWARE_PATH = 'beeware';
exports.COOKIE_CUTTER_TEMPLATE_REPO_URL = 'https://github.com/pybee/briefcase-template.git';
let BeeWareSettings = class BeeWareSettings extends events_1.EventEmitter {
    constructor(serviceContainer, workspaceFolder) {
        super();
        this.workspaceFolder = workspaceFolder;
        const workspaceService = serviceContainer.get(types_2.IWorkspaceService);
        const disposables = serviceContainer.get(types_3.IDisposableRegistry);
        this.systemVariables = new systemVariables_1.SystemVariables(this.workspaceFolder ? this.workspaceFolder.fsPath : undefined);
        disposables.push(workspaceService.onDidChangeConfiguration(() => {
            this.initializeSettings();
            // If workspace config changes, then we could have a cascading effect of on change events.
            // Let's defer the change notification.
            setTimeout(() => this.emit('change'), 1);
        }));
        this.initializeSettings();
    }
    get beewarePath() {
        return this._beewarePath;
    }
    get cookiecutterTemplateRepoUrl() {
        return this._cookiecutterTemplateRepoUrl;
    }
    get pythonPath() {
        return this._pythonPath;
    }
    initializeSettings() {
        const settings = vscode_1.workspace.getConfiguration('beeware', this.workspaceFolder);
        this._beewarePath = settings.get('beewarePath', exports.BEEWARE_PATH);
        this._cookiecutterTemplateRepoUrl = settings.get('beewarePath', exports.COOKIE_CUTTER_TEMPLATE_REPO_URL);
        const pythonSettings = vscode_1.workspace.getConfiguration('python', this.workspaceFolder);
        this._pythonPath = pythonSettings.get('pythonPath', 'python');
        this._pythonPath = this.systemVariables.resolveAny(pythonSettings.get('pythonPath'));
        this._pythonPath = this.workspaceFolder ? getAbsolutePath(this.pythonPath, this.workspaceFolder.fsPath) : this._pythonPath;
    }
};
BeeWareSettings = __decorate([
    __param(0, inversify_1.inject(types_1.IServiceContainer))
], BeeWareSettings);
exports.BeeWareSettings = BeeWareSettings;
function getAbsolutePath(pathToCheck, rootDir) {
    pathToCheck = untildify(pathToCheck);
    if (pathToCheck.indexOf(path.sep) === -1) {
        return pathToCheck;
    }
    return path.isAbsolute(pathToCheck) ? pathToCheck : path.resolve(rootDir, pathToCheck);
}
//# sourceMappingURL=settings.js.map