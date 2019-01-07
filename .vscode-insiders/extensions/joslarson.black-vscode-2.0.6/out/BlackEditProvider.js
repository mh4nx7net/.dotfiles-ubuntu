"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
const REL_PATH_REGEX = /^[\.]{1,2}\//;
class BlackEditProvider {
    constructor(commandPrefix = '') {
        this.commandPrefix = commandPrefix;
    }
    debug(msg, newLine = true) {
        const debug = vscode_1.workspace.getConfiguration('black', null).get('debug');
        if (debug) {
            if (this.channel === undefined)
                this.channel = vscode_1.window.createOutputChannel('Black – Python code formatter');
            newLine ? this.channel.appendLine(msg) : this.channel.append(msg);
            this.channel.show();
        }
    }
    getConfig(resource) {
        const blackConfig = vscode_1.workspace.getConfiguration('black', resource);
        const pythonConfig = vscode_1.workspace.getConfiguration('python', resource);
        const workspaceFolder = resource
            ? vscode_1.workspace.getWorkspaceFolder(resource)
            : vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders[0];
        return {
            lineLength: blackConfig.get('lineLength'),
            fast: blackConfig.get('fast'),
            blackPath: blackConfig.get('path'),
            pythonPath: pythonConfig.get('pythonPath'),
            rootPath: workspaceFolder ? workspaceFolder.uri.path : undefined,
            debug: blackConfig.get('debug'),
        };
    }
    getCommand({ lineLength, fast, blackPath, pythonPath, rootPath, debug }) {
        // replace ${workspaceRoot} var in paths with rootPath
        if (rootPath) {
            blackPath = utils_1.replaceVarInPath(blackPath, '${workspaceFolder}', rootPath);
            blackPath = utils_1.replaceVarInPath(blackPath, '${workspaceRoot}', rootPath);
            if (pythonPath) {
                pythonPath = utils_1.replaceVarInPath(pythonPath, '${workspaceFolder}', rootPath);
                pythonPath = utils_1.replaceVarInPath(pythonPath, '${workspaceRoot}', rootPath);
            }
        }
        // convert relative pythonPath to absolute pythonPath based on current rootPath
        if (pythonPath && REL_PATH_REGEX.test(pythonPath) && rootPath)
            pythonPath = path.join(rootPath, pythonPath);
        // convert relative blackPath to absolute blackPath based on current rootPath
        if (REL_PATH_REGEX.test(blackPath) && rootPath)
            blackPath = path.join(rootPath, blackPath);
        // prefix command with python path from python extension when setting exists
        const hasCustomPath = blackPath !== 'black';
        const pythonPrefix = pythonPath && pythonPath !== 'python' && !hasCustomPath ? `${pythonPath} -m ` : '';
        return `${this.commandPrefix}${pythonPrefix}${blackPath} -l ${lineLength}${fast ? ' --fast' : ''} -`;
    }
    async provideEdits(document, token, command, positions) {
        this.debug(''); // start with new line
        // handle incompatible black version
        if (!this.hasCompatibleBlackVersion) {
            const versionErrorMessage = await utils_1.blackVersionIsIncompatible(this);
            if (versionErrorMessage) {
                vscode_1.window.showErrorMessage(versionErrorMessage);
                this.debug(versionErrorMessage);
                return [];
            }
            else {
                this.hasCompatibleBlackVersion = true;
            }
        }
        // calculate input range and pull text selection from document text
        const lastLine = document.lineCount - 1;
        const lastChar = document.lineAt(lastLine).text.length;
        const start = positions ? positions.start : new vscode_1.Position(0, 0);
        const end = positions ? positions.end : new vscode_1.Position(lastLine, lastChar);
        const range = new vscode_1.Range(start, end);
        const input = document
            .getText()
            .slice(document.offsetAt(start), document.offsetAt(end))
            .trim();
        // format text
        const edits = await new Promise((resolve, reject) => {
            let exitCode;
            const blackProcess = child_process_1.exec(command, (error, stdout, stderr) => {
                const hasInput = input.length > 0;
                const hasOutput = stdout.trim().length > 0;
                // exit code 0 means success with no change, code 1 means success with change
                // but we can't trust exit codes by themselves, since we might get code 1 as
                // an error if black is not installed. So to be safe, we make sure there is an
                // input and an output as well, before saying it's succeeded
                const cancelled = token.isCancellationRequested;
                const succeeded = hasInput && hasOutput && exitCode === 0;
                let hasErrors = false;
                if (!cancelled && succeeded) {
                    // trim trailing newline when doing a selection format that does not
                    // include the entire last line, otherwise leave the extra newline
                    const isDocEnd = end.line === lastLine && end.character === lastChar;
                    const shouldTrim = positions && !isDocEnd;
                    resolve([vscode_1.TextEdit.replace(range, shouldTrim ? stdout.trim() : stdout)]);
                    this.debug('Formatting applied successfully.');
                }
                else {
                    resolve([]); // no changes, no text replacement
                    console.log('failed to format');
                    const moduleNotFound = error && error.message
                        ? error.message.indexOf('No module named black') > -1
                        : false;
                    console.log('after error');
                    hasErrors = (!cancelled && hasInput && !succeeded) || moduleNotFound;
                    // output status message
                    if (cancelled) {
                        this.debug('Formatting action cancelled.');
                    }
                    else if (!hasInput) {
                        this.debug('Nothing to format: empty input received.');
                    }
                    else if (exitCode === 123) {
                        // exit code 123 signifies and internal error, most likely unable to parse input
                        this.debug('Failed to format: unable to parse input.');
                        vscode_1.window.showErrorMessage(`Failed to format: unable to parse ${positions ? 'selection' : 'document'}.`);
                    }
                    else if (exitCode === 127 || moduleNotFound) {
                        this.debug('Failed to format: "black" command not found.');
                        vscode_1.window.showErrorMessage('Command "black" not found. Try "pip install black".');
                    }
                    else {
                        this.debug('Failed to format: unhandled error.');
                        vscode_1.window.showErrorMessage('Failed to format: unhandled error. Set "black.debug" to true to enable debugging output.');
                    }
                }
                // log the command that was run
                this.debug(`Command "${command}" resulted in an exit code of ${exitCode}.`);
                // log error if any
                if (hasErrors)
                    this.debug(`${error}`.trim());
            }).on('exit', function (code) {
                // capture the exit code for use above
                exitCode = code;
            });
            // send code to be formatted into stdin
            blackProcess.stdin.write(input);
            blackProcess.stdin.end();
        });
        return edits;
    }
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        const config = this.getConfig(document.uri);
        return this.provideEdits(document, token, this.getCommand(config), {
            start: range.start,
            end: range.end,
        });
    }
    provideDocumentFormattingEdits(document, options, token) {
        const config = this.getConfig(document.uri);
        return this.provideEdits(document, token, this.getCommand(config));
    }
}
exports.BlackEditProvider = BlackEditProvider;
//# sourceMappingURL=BlackEditProvider.js.map