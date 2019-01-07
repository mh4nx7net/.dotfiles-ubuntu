'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const vscode_1 = require("vscode");
class CommandHandler {
    constructor() {
        this.handle = (pack, command) => {
            this.cp = cp.exec(command, { cwd: vscode_1.workspace.rootPath, env: process.env }, (e, stdout) => {
                if (e) {
                    vscode_1.window.showErrorMessage(e.message);
                }
                else if (stdout) {
                    vscode_1.window.showInformationMessage(`The package ${pack} installed successfully :)`);
                }
                this.done = true;
            });
        };
    }
    dispose() {
        if (!this.done && this.cp && !this.cp.killed && this.cp.connected) {
            this.cp.kill();
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=npm-install.js.map