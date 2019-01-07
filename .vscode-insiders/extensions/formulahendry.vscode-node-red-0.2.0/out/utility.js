"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const request = require("request-promise");
const vscode = require("vscode");
class Utility {
    static initialize(context) {
        Utility.storagePath = context.storagePath ? context.storagePath : path.join(os.tmpdir(), "vscode-node-red");
    }
    static openFunction(port, flowId, nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = yield this.getFunctionNode(port, flowId, nodeId);
            const functionPath = Utility.getFunctionPath(flowId, nodeId);
            yield fs.ensureFile(functionPath);
            yield fs.writeFile(functionPath, node.func, "utf-8");
            vscode.workspace.openTextDocument(functionPath).then((document) => {
                if (document.isDirty) {
                    vscode.window.showWarningMessage(`Your function code has unsaved changes. \
                        Please close or save the file. Then try again.`);
                }
                vscode.window.showTextDocument(document, vscode.ViewColumn.One);
            });
        });
    }
    static getFunctionNode(port, flowId, nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flow = yield Utility.getFlow(port, flowId);
            let functionNode = null;
            flow.nodes.forEach((node) => {
                if (node.id === nodeId) {
                    functionNode = node;
                }
            });
            return functionNode;
        });
    }
    static getFlow(port, flowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `http://localhost:${port}/red/flow/${flowId}`;
            const flow = JSON.parse(yield request.get(url));
            return flow;
        });
    }
    static getFunctionPath(flowId, nodeId) {
        return path.join(Utility.storagePath, `${flowId}_${nodeId}.js`);
    }
}
exports.Utility = Utility;
//# sourceMappingURL=utility.js.map