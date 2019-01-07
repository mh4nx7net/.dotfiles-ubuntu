"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const project_1 = require("./project");
const types_1 = require("./types");
function registerTypes(serviceManager) {
    serviceManager.addSingleton(types_1.IProjectCommand, command_1.ProjectCommand);
    serviceManager.addSingleton(types_1.IProject, project_1.Project);
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map