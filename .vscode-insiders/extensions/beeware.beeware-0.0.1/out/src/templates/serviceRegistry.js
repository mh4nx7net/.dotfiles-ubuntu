"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const types_1 = require("./types");
function registerTypes(serviceManager) {
    serviceManager.addSingleton(types_1.ITemplateEngine, engine_1.TemplateEngine);
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map