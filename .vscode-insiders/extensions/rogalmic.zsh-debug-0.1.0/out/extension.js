"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const handlePath_1 = require("./handlePath");
const path_1 = require("path");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.zsh-debug.getProgramName', _config => {
        return vscode.window.showInputBox({
            placeHolder: "Type absolute path to zsh script.",
            value: (process.platform === "win32") ? "{workspaceFolder}\\path\\to\\script.sh" : "{workspaceFolder}/path/to/script.sh"
        }).then(v => handlePath_1.expandPath(v, vscode.workspace.rootPath));
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.zsh-debug.selectProgramName', _config => {
        return vscode.workspace.findFiles("**/*.sh", "").then((uris) => {
            const list = new Array();
            for (let i = 0; i < uris.length; i++) {
                list.push(uris[i].fsPath);
            }
            return vscode.window.showQuickPick(list).then((result) => {
                if (!result) {
                    return undefined;
                }
                return result;
            }).then(v => handlePath_1.expandPath(v, vscode.workspace.rootPath));
        });
    }));
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('zshdb', new ZshConfigurationProvider()));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
class ZshConfigurationProvider {
    resolveDebugConfiguration(folder, config, _token) {
        if (!config.type && !config.request && !config.name) {
            return undefined;
        }
        if (!folder) {
            let msg = "Unable to determine workspace folder.";
            return vscode.window.showErrorMessage(msg).then(_ => { return undefined; });
        }
        if (!config.type || !config.name) {
            let msg = "BUG in Zsh Debug: reached to unreachable code.";
            msg += "\nIf it is reproducible, please report this bug on: https://github.com/rogalmic/vscode-zsh-debug/issues";
            msg += "\nYou can avoid this bug by setting \"type\" and \"name\" attributes in launch.json.";
            return vscode.window.showErrorMessage(msg).then(_ => { return undefined; });
        }
        if (!config.request) {
            let msg = "Please set \"request\" attribute to \"launch\".";
            return vscode.window.showErrorMessage(msg).then(_ => { return undefined; });
        }
        if (config.zshDbPath) {
            return vscode.window.showErrorMessage("`zshDbPath` is deprecated. Use `pathZshdb` instead.").then(_ => { return undefined; });
        }
        if (config.zshPath) {
            return vscode.window.showErrorMessage("`zshPath` is deprecated. Use `pathZsh` instead.").then(_ => { return undefined; });
        }
        if (config.commandLineArguments) {
            return vscode.window.showErrorMessage("`commandLineArguments` is deprecated. Use `args` instead.").then(_ => { return undefined; });
        }
        if (config.scriptPath) {
            return vscode.window.showErrorMessage("`scriptPath` is deprecated. Use `program` instead.").then(_ => { return undefined; });
        }
        if (!config.program) {
            return vscode.window.showErrorMessage("Please specify \"program\" in launch.json.").then(_ => { return undefined; });
        }
        if (!config.args) {
            config.args = [];
        }
        if (!config.cwd) {
            config.cwd = folder.uri.fsPath;
        }
        if (!config.pathZsh) {
            config.pathZsh = "zsh";
        }
        if (!config.pathZshdb) {
            if (process.platform === "win32") {
                config.pathZshdb = handlePath_1.getWSLPath(path_1.normalize(path_1.join(__dirname, "..", "zshdb_dir", "zshdb")));
            }
            else {
                config.pathZshdb = path_1.normalize(path_1.join(__dirname, "..", "zshdb_dir", "zshdb"));
            }
        }
        if (!config.pathZshdbLib) {
            if (process.platform === "win32") {
                config.pathZshdbLib = handlePath_1.getWSLPath(path_1.normalize(path_1.join(__dirname, "..", "zshdb_dir")));
            }
            else {
                config.pathZshdbLib = path_1.normalize(path_1.join(__dirname, "..", "zshdb_dir"));
            }
        }
        if (!config.pathCat) {
            config.pathCat = "cat";
        }
        if (!config.pathMkfifo) {
            config.pathMkfifo = "mkfifo";
        }
        if (!config.pathPkill) {
            config.pathPkill = "pkill";
        }
        return config;
    }
}
//# sourceMappingURL=extension.js.map