'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const semverCompare = require("semver-compare");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const util_1 = require("./util");
const MINIMUM_SERVER_VERSION = '1.5.2';
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { command, version } = yield util_1.getServerInfo();
            if (semverCompare(version, MINIMUM_SERVER_VERSION) === -1) {
                return handleOutdatedExecutable();
            }
            const explainshellEndpoint = vscode_1.workspace
                .getConfiguration('bashIde')
                .get('explainshellEndpoint', '');
            const highlightParsingErrors = vscode_1.workspace
                .getConfiguration('bashIde')
                .get('highlightParsingErrors', false);
            start(context, command, explainshellEndpoint, highlightParsingErrors);
        }
        catch (error) {
            handleMissingExecutable();
        }
    });
}
exports.activate = activate;
function start(context, command, explainshellEndpoint, highlightParsingErrors) {
    const env = Object.assign({}, process.env, { EXPLAINSHELL_ENDPOINT: explainshellEndpoint, HIGHLIGHT_PARSING_ERRORS: highlightParsingErrors });
    const serverOptions = {
        run: {
            command,
            args: ['start'],
            options: {
                env,
            },
        },
        debug: {
            command,
            args: ['start'],
            options: {
                env,
            },
        },
    };
    const clientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'shellscript',
            },
        ],
        synchronize: {
            configurationSection: 'Bash IDE',
            // Notify the server about file changes to '.clientrc files contain in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc'),
        },
    };
    const disposable = new vscode_languageclient_1.LanguageClient('Bash IDE', 'Bash IDE', serverOptions, clientOptions).start();
    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
function handleOutdatedExecutable() {
    const message = `Outdated bash server. Please upgrade by running "npm i -g bash-language-server".`;
    vscode_1.window.showErrorMessage(message, { modal: false });
}
function handleMissingExecutable() {
    const message = `Can't find bash-language-server on your PATH. Please install it using "npm i -g bash-language-server".`;
    vscode_1.window.showErrorMessage(message, { modal: false });
}
//# sourceMappingURL=extension.js.map