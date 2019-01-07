'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const fs_1 = require("fs");
class ImportCheckerCodeAction {
    getPackageIfImportAndNotInstalled(document, range) {
        const { text } = document.lineAt(range.start.line);
        const pack = this.extractPackageFromImport(text);
        if (pack && this.projectHasNodeModules()) {
            const isPackageInstalled = fs_1.existsSync(`${vscode_1.workspace.rootPath}/node_modules/${pack}`);
            if (!isPackageInstalled) {
                return pack;
            }
        }
    }
    getPackageFromDiagnostic(context) {
        let pack = '';
        context.diagnostics.forEach(diagnostic => {
            const result = /cannot find module '(.*)'/im.exec(diagnostic.message);
            if (result && result.length > 1) {
                pack = result[1];
            }
        });
        return pack;
    }
    projectHasNodeModules() {
        return fs_1.existsSync(`${vscode_1.workspace.rootPath}/node_modules/`);
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
    provideCodeActions(document, range, context) {
        let pack;
        const isTsFile = document.languageId === 'typescriptreact' || document.languageId === 'typescript';
        if (isTsFile) {
            pack = this.getPackageFromDiagnostic(context);
        }
        // if didn't succeed to fetch from diagnostic
        if (!isTsFile || !pack) {
            pack = this.getPackageIfImportAndNotInstalled(document, range);
        }
        if (pack) {
            return ['--save', '--save-dev'].map(flag => {
                const command = `npm install ${pack} ${flag}`;
                return {
                    title: command,
                    command: 'extension.npmInstall',
                    arguments: [pack, command]
                };
            });
        }
    }
}
exports.ImportCheckerCodeAction = ImportCheckerCodeAction;
//# sourceMappingURL=import-checker-code-action.js.map