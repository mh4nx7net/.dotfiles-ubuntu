"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const TextDocumentContentProvider_1 = require("./TextDocumentContentProvider");
function registerPreview(context, window, client) {
    let previewUri = vscode.Uri.parse('aurelia-preview://authority/aurelia-preview');
    let provider = new TextDocumentContentProvider_1.TextDocumentContentProvider(client);
    let registration = vscode.workspace.registerTextDocumentContentProvider('aurelia-preview', provider);
    vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });
    vscode.window.onDidChangeTextEditorSelection((e) => {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    });
    context.subscriptions.push(vscode.commands.registerCommand('aurelia.showViewProperties', () => {
        const smartAutocomplete = vscode.workspace.getConfiguration().get('aurelia.featureToggles.smartAutocomplete');
        if (smartAutocomplete) {
            return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'Aurelia view data')
                .then((success) => {
            }, (reason) => {
                window.showErrorMessage(reason);
            });
        }
        else {
            return vscode.window.showWarningMessage('This command requires the experimental feature "smartAutocomplete" to be enabled');
        }
    }));
}
exports.registerPreview = registerPreview;
//# sourceMappingURL=Register.js.map