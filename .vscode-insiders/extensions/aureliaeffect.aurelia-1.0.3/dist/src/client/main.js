"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const aureliaCLICommands_1 = require("./aureliaCLICommands");
const relatedFiles_1 = require("./relatedFiles");
const Register_1 = require("./Preview/Register");
let outputChannel;
function activate(context) {
    // Create default output channel
    outputChannel = vscode_1.window.createOutputChannel('aurelia');
    context.subscriptions.push(outputChannel);
    // Register CLI commands
    context.subscriptions.push(aureliaCLICommands_1.default.registerCommands(outputChannel));
    context.subscriptions.push(new relatedFiles_1.RelatedFiles());
    // Register Code Actions
    const edit = (uri, documentVersion, edits) => {
        let textEditor = vscode_1.window.activeTextEditor;
        if (textEditor && textEditor.document.uri.toString() === uri) {
            textEditor.edit(mutator => {
                for (let edit of edits) {
                    mutator.replace(client.protocol2CodeConverter.asRange(edit.range), edit.newText);
                }
            }).then((success) => {
                vscode_1.window.activeTextEditor.document.save();
                if (!success) {
                    vscode_1.window.showErrorMessage('Failed to apply Aurelia code fixes to the document. Please consider opening an issue with steps to reproduce.');
                }
            });
        }
    };
    context.subscriptions.push(vscode_1.commands.registerCommand('aurelia-attribute-invalid-case', edit));
    context.subscriptions.push(vscode_1.commands.registerCommand('aurelia-binding-one-way-deprecated', edit));
    // Register Aurelia language server
    const serverModule = context.asAbsolutePath(path.join('dist', 'src', 'server', 'main.js'));
    const debugOptions = { execArgv: ['--nolazy', '--debug=6100'] };
    const serverOptions = {
        debug: { module: serverModule, options: debugOptions, transport: vscode_languageclient_1.TransportKind.ipc },
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
    };
    const clientOptions = {
        diagnosticCollectionName: 'Aurelia',
        documentSelector: ['html'],
        initializationOptions: {},
        synchronize: {
            configurationSection: ['aurelia'],
        },
    };
    const client = new vscode_languageclient_1.LanguageClient('html', 'Aurelia', serverOptions, clientOptions);
    Register_1.registerPreview(context, vscode_1.window, client);
    const disposable = client.start();
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=main.js.map