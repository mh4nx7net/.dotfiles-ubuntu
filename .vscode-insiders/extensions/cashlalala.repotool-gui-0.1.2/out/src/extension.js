'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const getCode = require("./function/getcode");
const showInfo = require("./function/info");
const showStatus = require("./function/status");
const upload = require("./function/upload");
const start = require("./function/startbr");
const cfgController = require("./function/config");
const cmnUtil = require("./util/commonUtil");
const cli = require("./client/client");
class Global {
}
Global.codebaseStatus = new Map();
Global.codebaseInfo = {};
Global.statusRefresh = false;
Global.infoRefresh = false;
Global.versionRefresh = true;
Global.verions = {};
Global.config = {};
Global.realpath = ""; // to handle softlink
Global.isSingleRepoWs = true;
Global.repoChannel = vscode.window.createOutputChannel('Repo tool');
exports.Global = Global;
function activate(context) {
    try {
        Global.config = cmnUtil.loadConfig();
        if (vscode.workspace.rootPath &&
            fs.existsSync(path.join(vscode.workspace.rootPath, ".repo"))) {
            Global.isSingleRepoWs = false;
        }
        cfgController.activate(context);
        getCode.activate(context);
        showInfo.activate(context);
        showStatus.activate(context);
        upload.activate(context);
        start.activate(context);
        if (Global.config.workspace && Global.config.workspace.linuxPath) {
            var pth = cmnUtil.tailWithSlash(Global.config.workspace.linuxPath);
            cli.getInstance() && cli.getInstance().checkPath(pth, "-f").then((msg) => {
                if (msg[0]) {
                    Global.realpath = msg[0].replace('\n', '');
                }
                else {
                    cmnUtil.showErrorMessage(`Fail to check mapping path: ${msg}`);
                }
            }, (reason) => {
                cmnUtil.showErrorMessage(`Fail to check mapping path: ${reason}`);
            });
        }
    }
    catch (error) {
        cmnUtil.showErrorMessage(error.stack, error);
    }
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map