"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class BeeWareExecutionHelper {
    buildExecutionArgs(pythonPath, beewarePath) {
        if (path.basename(beewarePath) === beewarePath) {
            return { command: pythonPath, args: ['-m', beewarePath] };
        }
        else {
            return { command: beewarePath, args: [] };
        }
    }
}
exports.BeeWareExecutionHelper = BeeWareExecutionHelper;
//# sourceMappingURL=helper.js.map