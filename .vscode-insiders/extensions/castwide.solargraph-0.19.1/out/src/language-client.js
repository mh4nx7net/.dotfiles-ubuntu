"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageclient_1 = require("vscode-languageclient");
const net = require("net");
const vscode_1 = require("vscode");
const solargraph = require("solargraph-utils");
const vscode = require("vscode");
//export function makeLanguageClient(socketProvider: solargraph.SocketProvider): LanguageClient {
function makeLanguageClient(configuration) {
    let convertDocumentation = function (text) {
        var regexp = /\(solargraph\:(.*?)\)/g;
        var match;
        var adjusted = text;
        while (match = regexp.exec(text)) {
            var commandUri = "(command:solargraph._openDocumentUrl?" + encodeURI(JSON.stringify("solargraph:" + match[1])) + ")";
            adjusted = adjusted.replace(match[0], commandUri);
        }
        var md = new vscode_1.MarkdownString(adjusted);
        md.isTrusted = true;
        return md;
    };
    let middleware = {
        provideHover: (document, position, token, next) => {
            return new Promise((resolve) => {
                var promise = next(document, position, token);
                // HACK: It's a promise, but TypeScript doesn't recognize it
                promise['then']((hover) => {
                    var contents = [];
                    hover.contents.forEach((orig) => {
                        contents.push(convertDocumentation(orig.value));
                    });
                    resolve(new vscode_1.Hover(contents));
                });
            });
        },
        resolveCompletionItem: (item, token, next) => {
            return new Promise((resolve) => {
                var promise = next(item, token);
                // HACK: It's a promise, but TypeScript doesn't recognize it
                promise['then']((item) => {
                    if (item.documentation) {
                        item.documentation = convertDocumentation(item.documentation.toString());
                    }
                    resolve(item);
                });
            });
        }
    };
    // Options to control the language client
    let clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'ruby' }, { scheme: 'file', pattern: '**/Gemfile' }],
        synchronize: {
            // Synchronize the setting section 'solargraph' to the server
            configurationSection: 'solargraph',
            // Notify the server about changes to relevant files in the workspace
            fileEvents: vscode.workspace.createFileSystemWatcher('{**/*.rb,**/*.gemspec,**/Gemfile}')
        },
        middleware: middleware,
        initializationOptions: {
            enablePages: true,
            viewsPath: vscode.extensions.getExtension('castwide.solargraph').extensionPath + '/views'
        }
    };
    var selectClient = function () {
        var transport = vscode.workspace.getConfiguration('solargraph').transport;
        if (transport == 'stdio') {
            return () => {
                return new Promise((resolve) => {
                    let child = solargraph.commands.solargraphCommand(['stdio'], configuration);
                    child.stderr.on('data', (data) => {
                        console.log(data.toString());
                    });
                    child.on('exit', (code, signal) => {
                        console.log('Solargraph exited with code', code, signal);
                    });
                    resolve(child);
                });
            };
        }
        else if (transport == 'socket') {
            return () => {
                return new Promise((resolve) => {
                    let socketProvider = new solargraph.SocketProvider(configuration);
                    socketProvider.start().then(() => {
                        let socket = net.createConnection(socketProvider.port);
                        resolve({
                            reader: socket,
                            writer: socket
                        });
                    }).catch((err) => {
                        // TODO Handle error
                        // console.log('Failed to start language server: ' + JSON.stringify(err));
                        // if (err.toString().includes('ENOENT') || err.toString().includes('command not found')) {
                        // 	vscode.window.showErrorMessage('Solargraph gem not found. Run `gem install solargraph` or update your Gemfile.', 'Install Now').then((item) => {
                        // 		if (item == 'Install Now') {
                        // 			solargraph.installGem(configuration).then(() => {
                        // 				vscode.window.showInformationMessage('Successfully installed the Solargraph gem.')
                        // 				startLanguageServer();
                        // 			}).catch(() => {
                        // 				vscode.window.showErrorMessage('Failed to install the Solargraph gem.')
                        // 			});
                        // 		}
                        // 	});
                        // } else if (err.toString().includes('Could not find command "socket"')) {
                        // 	vscode.window.showErrorMessage('The Solargraph gem is out of date. Run `gem update solargraph` or update your Gemfile.');
                        // } else {
                        // 	vscode.window.showErrorMessage("Failed to start Solargraph: " + err);
                        // }
                        console.log('Error starting socket provider', err);
                    });
                });
            };
        }
        else {
            return () => {
                return new Promise((resolve) => {
                    let socket = net.createConnection({ host: vscode.workspace.getConfiguration('solargraph').externalServer.host, port: vscode.workspace.getConfiguration('solargraph').externalServer.port });
                    resolve({
                        reader: socket,
                        writer: socket
                    });
                });
            };
        }
    };
    let serverOptions = selectClient();
    let client = new vscode_languageclient_1.LanguageClient('Ruby Language Server', serverOptions, clientOptions);
    let prepareStatus = vscode.window.setStatusBarMessage('Starting the Solargraph language server...');
    client.onReady().then(() => {
        prepareStatus.dispose();
        vscode.window.setStatusBarMessage('Solargraph is ready.', 3000);
        // if (vscode.workspace.getConfiguration('solargraph').checkGemVersion) {
        // 	client.sendNotification('$/solargraph/checkGemVersion');
        // }
    }).catch(() => {
        prepareStatus.dispose();
        vscode.window.setStatusBarMessage('Solargraph failed to initialize.', 3000);
    });
    return client;
}
exports.makeLanguageClient = makeLanguageClient;
//# sourceMappingURL=language-client.js.map