"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const vscode_1 = require("vscode");
const BlackEditProvider_1 = require("./BlackEditProvider");
const utils_1 = require("./utils");
let formatterHandler;
let rangeFormatterHandler;
function disposeHandlers() {
    if (formatterHandler)
        formatterHandler.dispose();
    if (rangeFormatterHandler)
        rangeFormatterHandler.dispose();
    formatterHandler = undefined;
    rangeFormatterHandler = undefined;
}
// bundle formatter registration logic for reuse
async function registerFormatter(provider) {
    disposeHandlers();
    vscode_1.languages.registerDocumentFormattingEditProvider('python', provider);
    vscode_1.languages.registerDocumentRangeFormattingEditProvider('python', provider);
    // check black version compatibility
    const versionErrorMessage = await utils_1.blackVersionIsIncompatible(provider);
    if (versionErrorMessage) {
        vscode_1.window.showErrorMessage(versionErrorMessage);
        provider.debug(versionErrorMessage);
        provider.hasCompatibleBlackVersion = false;
    }
}
async function activate(context) {
    const providerArgs = [];
    // workaround for vscode issue: https://github.com/Microsoft/vscode/issues/16261
    if (process.platform === 'darwin' && !process.env.LANG) {
        await new Promise((resolve, reject) => child_process_1.exec(`echo $(defaults read -g AppleLanguages | sed '/"/!d;s/["[:space:]]//g;s/-/_/').UTF-8`, (error, stdout, stderr) => {
            // if there's an unexpected error, skip this
            if (!error) {
                const langCode = stdout.trim();
                // make sure stdout matches a valid language code pattern
                if (langCode.match(/^[a-z]{2}_[A-Z]{2}\.UTF-8$/)) {
                    providerArgs.push(`LANG=${langCode} `);
                }
            }
            resolve();
        }));
    }
    const provider = new BlackEditProvider_1.BlackEditProvider(...providerArgs);
    // initial formatter registration
    registerFormatter(provider);
    // dispose, then re-register formatter on workspace root change (for multi-root workspaces)
    context.subscriptions.push(vscode_1.workspace.onDidChangeWorkspaceFolders(() => registerFormatter(provider)), { dispose: disposeHandlers });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map