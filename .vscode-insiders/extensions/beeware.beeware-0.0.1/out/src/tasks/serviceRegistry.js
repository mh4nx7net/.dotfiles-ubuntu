"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const taskProvider_1 = require("../tasks/taskProvider");
const command_1 = require("./command");
const types_1 = require("./types");
function registerTypes(serviceManager) {
    serviceManager.addSingleton(types_1.ITaskProvider, taskProvider_1.BulidRunTaskProvider);
    serviceManager.addSingleton(types_1.ITaskCommands, command_1.TaskCommands);
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map