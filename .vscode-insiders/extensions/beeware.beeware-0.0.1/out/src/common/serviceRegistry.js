"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const applicationShell_1 = require("./application/applicationShell");
const commandManager_1 = require("./application/commandManager");
const documentManager_1 = require("./application/documentManager");
const terminalManager_1 = require("./application/terminalManager");
const types_1 = require("./application/types");
const workspace_1 = require("./application/workspace");
const service_1 = require("./configuration/service");
const types_2 = require("./configuration/types");
const logger_1 = require("./logger");
const currentProcess_1 = require("./process/currentProcess");
const types_3 = require("./process/types");
const types_4 = require("./types");
function registerTypes(serviceManager) {
    serviceManager.addSingleton(types_4.ILogger, logger_1.Logger);
    serviceManager.addSingleton(types_1.IApplicationShell, applicationShell_1.ApplicationShell);
    serviceManager.addSingleton(types_3.ICurrentProcess, currentProcess_1.CurrentProcess);
    serviceManager.addSingleton(types_1.ICommandManager, commandManager_1.CommandManager);
    serviceManager.addSingleton(types_2.IConfigurationService, service_1.ConfigurationService);
    serviceManager.addSingleton(types_1.IWorkspaceService, workspace_1.WorkspaceService);
    serviceManager.addSingleton(types_1.IDocumentManager, documentManager_1.DocumentManager);
    serviceManager.addSingleton(types_1.ITerminalManager, terminalManager_1.TerminalManager);
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map