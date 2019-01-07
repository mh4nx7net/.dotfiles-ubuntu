'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const cmnUtil = require("../util/commonUtil");
class BaseContentProvider {
    constructor() {
        this._onDidChange = new vscode.EventEmitter();
    }
    dispose() {
        this._onDidChange.dispose();
    }
    getStyleSheetPath(resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', 'resources', 'css', resourceName)).toString();
    }
    getScriptFilePath(resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', 'resources', 'js', resourceName)).toString();
    }
    getHtmlFilePath(resourceName) {
        return path.join(__dirname, '..', '..', '..', 'resources', 'html', resourceName);
    }
    getNodeModulesPath(resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', 'node_modules', resourceName)).toString();
    }
    provideTextDocumentContent(uri) {
        return this.createSnippet(uri);
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    update(uri) {
        this._onDidChange.fire(uri);
    }
    navigate(pageId, cmd) {
        if (!cmd) {
            cmd = `${this.previewUri}?id=${pageId}`;
        }
        return vscode.commands.executeCommand('vscode.previewHtml', vscode.Uri.file(this.getHtmlFilePath("cache.html")), vscode.ViewColumn.One, this.title).then((success) => {
            cmnUtil.closeCurActivateDoc();
            return vscode.commands.executeCommand('vscode.previewHtml', vscode.Uri.parse(cmd), vscode.ViewColumn.One, this.title).then((success) => { }, (reason) => {
                vscode.window.showErrorMessage(reason);
            });
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    }
}
exports.BaseContentProvider = BaseContentProvider;
//# sourceMappingURL=baseView.js.map