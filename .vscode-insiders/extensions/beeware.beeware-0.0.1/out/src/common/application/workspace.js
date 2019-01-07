"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
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
const vscode_1 = require("vscode");
const types_1 = require("./types");
let WorkspaceService = class WorkspaceService {
    constructor(shell) {
        this.shell = shell;
    }
    get onDidChangeConfiguration() {
        return vscode_1.workspace.onDidChangeConfiguration;
    }
    get rootPath() {
        return Array.isArray(vscode_1.workspace.workspaceFolders) ? vscode_1.workspace.workspaceFolders[0].uri.fsPath : undefined;
    }
    get workspaceFolders() {
        return vscode_1.workspace.workspaceFolders;
    }
    get onDidChangeWorkspaceFolders() {
        return vscode_1.workspace.onDidChangeWorkspaceFolders;
    }
    get hasWorkspaceFolders() {
        return Array.isArray(vscode_1.workspace.workspaceFolders) && vscode_1.workspace.workspaceFolders.length > 0;
    }
    getConfiguration(section, resource) {
        return vscode_1.workspace.getConfiguration(section, resource);
    }
    getWorkspaceFolder(uri) {
        return vscode_1.workspace.getWorkspaceFolder(uri);
    }
    asRelativePath(pathOrUri, includeWorkspaceFolder) {
        return vscode_1.workspace.asRelativePath(pathOrUri, includeWorkspaceFolder);
    }
    createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
        return vscode_1.workspace.createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents);
    }
    findFiles(include, exclude, maxResults, token) {
        return vscode_1.workspace.findFiles(include, exclude, maxResults, token);
    }
    get onDidSaveTextDocument() {
        return vscode_1.workspace.onDidSaveTextDocument;
    }
    selectWorkspaceFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasWorkspaceFolders) {
                yield this.shell.showErrorMessage('Please open a workspace folder');
                return;
            }
            else if (vscode_1.workspace.workspaceFolders.length === 1) {
                return vscode_1.workspace.workspaceFolders[0];
            }
            else {
                return vscode_1.window.showWorkspaceFolderPick({ placeHolder: 'Select a workspace folder' });
            }
        });
    }
};
WorkspaceService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.IApplicationShell))
], WorkspaceService);
exports.WorkspaceService = WorkspaceService;
//# sourceMappingURL=workspace.js.map