'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// This line should always be right on top.
// tslint:disable-next-line:no-any
if (Reflect.metadata === undefined) {
    // tslint:disable-next-line:no-require-imports no-var-requires
    require('reflect-metadata');
}
const inversify_1 = require("inversify");
const vscode_1 = require("vscode");
const constants_1 = require("./common/constants");
const serviceRegistry_1 = require("./common/platform/serviceRegistry");
const serviceRegistry_2 = require("./common/process/serviceRegistry");
const serviceRegistry_3 = require("./common/serviceRegistry");
const types_1 = require("./common/types");
const serviceRegistry_4 = require("./cookieCutter/serviceRegistry");
const container_1 = require("./ioc/container");
const serviceManager_1 = require("./ioc/serviceManager");
const types_2 = require("./ioc/types");
const serviceRegistry_5 = require("./project/serviceRegistry");
const types_3 = require("./project/types");
const serviceRegistry_6 = require("./tasks/serviceRegistry");
const types_4 = require("./tasks/types");
const serviceRegistry_7 = require("./templates/serviceRegistry");
function activate(context) {
    const cont = new inversify_1.Container();
    const serviceManager = new serviceManager_1.ServiceManager(cont);
    const serviceContainer = new container_1.ServiceContainer(cont);
    registerServices(context, serviceManager, serviceContainer);
    initialize(serviceContainer);
}
exports.activate = activate;
function registerServices(context, serviceManager, serviceContainer) {
    serviceManager.addSingletonInstance(types_2.IServiceContainer, serviceContainer);
    serviceManager.addSingletonInstance(types_1.IDisposableRegistry, context.subscriptions);
    const outputChannel = vscode_1.window.createOutputChannel(constants_1.ApplicationName);
    context.subscriptions.push(outputChannel);
    serviceManager.addSingletonInstance(types_1.IOutputChannel, outputChannel);
    serviceRegistry_3.registerTypes(serviceManager);
    serviceRegistry_1.registerTypes(serviceManager);
    serviceRegistry_2.registerTypes(serviceManager);
    serviceRegistry_4.registerTypes(serviceManager);
    serviceRegistry_7.registerTypes(serviceManager);
    serviceRegistry_5.registerTypes(serviceManager);
    serviceRegistry_6.registerTypes(serviceManager);
}
function initialize(serviceContainer) {
    serviceContainer.get(types_3.IProjectCommand).register();
    serviceContainer.get(types_4.ITaskCommands).register();
}
//# sourceMappingURL=extension.js.map