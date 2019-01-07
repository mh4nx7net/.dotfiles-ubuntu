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
const vscode = require("vscode");
const nodeRed_1 = require("./nodeRed");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodeRed = new nodeRed_1.NodeRed();
        yield nodeRed.start();
        context.subscriptions.push(vscode.commands.registerCommand("node-red.open", () => {
            nodeRed.open(false);
        }));
        context.subscriptions.push(vscode.commands.registerCommand("node-red.openToSide", () => {
            nodeRed.open(true);
        }));
    });
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map