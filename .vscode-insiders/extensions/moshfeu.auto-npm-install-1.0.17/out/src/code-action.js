"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const fs_1 = require("fs");
class CodeAction {
    getPackageIfImportAndNotInstalled(document, range) {
        const { text } = document.lineAt(range.start.line);
        const pack = this.extractPackageFromImport(text);
        if (pack) {
            const isPackageInstalled = fs_1.existsSync(`${vscode_1.workspace.rootPath}/node_modules/${pack}`);
            if (!isPackageInstalled) {
                return pack;
            }
        }
    }
    extractPackageFromImport(text) {
        try {
            const [, , packageName] = /^import (.*) from ['|"]+([^./]{0,})+['|"];$/.exec(text) || ['', '', ''];
            return packageName;
        }
        catch (error) {
            console.log(error);
        }
    }
    provideCodeActions(document, range) {
        const pack = this.getPackageIfImportAndNotInstalled(document, range);
        if (pack) {
            const command = `npm install ${pack}`;
            return [
                {
                    title: command,
                    command: 'extension.npmInstall',
                    arguments: [pack, command]
                }
            ];
        }
    }
}
exports.CodeAction = CodeAction;
//# sourceMappingURL=code-action.js.map