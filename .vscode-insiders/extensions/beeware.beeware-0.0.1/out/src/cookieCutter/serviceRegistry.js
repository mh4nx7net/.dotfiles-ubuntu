"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const installer_1 = require("./installer");
const types_1 = require("./types");
const ui_1 = require("./ui");
const variables_1 = require("./variables");
function registerTypes(serviceManager) {
    serviceManager.addSingleton(types_1.ICookiecutter, index_1.CookieCutter);
    serviceManager.addSingleton(types_1.IInstaller, installer_1.Installer);
    serviceManager.addSingleton(types_1.IUi, ui_1.Ui);
    serviceManager.addSingleton(types_1.IVariableService, variables_1.VariablesService);
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map