'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const import_checker_code_action_1 = require("./import-checker-code-action");
const npm_install_1 = require("./commands/npm-install");
let ch;
function activate(context) {
    console.log('Congratulations, your extension "auto-npm-install" is now active!');
    ch = new npm_install_1.CommandHandler();
    const documents = ['typescript', 'javascript', 'javascriptreact', 'typescriptreact'];
    const importCheckerCodeAction = vscode_1.languages.registerCodeActionsProvider(documents, new import_checker_code_action_1.ImportCheckerCodeAction());
    const npmInstallDisposable = vscode_1.commands.registerCommand('extension.npmInstall', ch.handle);
    const npmInstallDevDisposable = vscode_1.commands.registerCommand('extension.npmInstallDev', ch.handle);
    context.subscriptions.push(importCheckerCodeAction, npmInstallDisposable, npmInstallDevDisposable);
}
exports.activate = activate;
function deactivate() {
    ch.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map