'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const cli = require("../client/client");
const ext = require("../extension");
const configView_1 = require("../comp/configView");
const uriUtil = require("../util/urlUtil");
const comUtil = require("../util/commonUtil");
const pfUtil = require("../util/platformUtil");
const constant = require("../util/const");
const msg = require("../msg/message");
let cfgProvider = null;
let pageId = "";
// let config = {
//     "workspace": {
//         linuxPath: ""
//     },
//     "ssh": {
//         "host": "",
//         "port": 22,
//         "user": "",
//         "pwd": ""
//     },
//     "repotool": {
//         "path": "",
//         "uploadType": ""
//         "initOption" :　""
//         "syncOption" : ""
//     },
//     "git": {
//         "path": ""
//     },
//     "manifest": {
//         "type": []
//     }
// };
function checkConfiguratoin(showPage = true) {
    let result = true;
    let cfg = ext.Global.config;
    if (!cfg.workspace.linuxPath) {
        vscode.window.showWarningMessage(msg.WARN_PLEASE_SETUP_LINUX_PATH);
        result = false;
    }
    // only need to check if windows
    if (pfUtil.isWindows()) {
        if (!cfg.ssh || !cfg.ssh.user || !cfg.ssh.pwd || !cfg.ssh.port || !cfg.ssh.host) {
            vscode.window.showWarningMessage(msg.WARN_PLEASE_SETUP_SSH_SETTING);
            result = false;
        }
        if (ext.Global.config && (!ext.Global.config.workspace || !ext.Global.config.workspace.linuxPath)) {
            result = false;
            comUtil.showErrorMessage(`Current workspace is ${vscode.workspace.rootPath}, configured mapped linux path is ${ext.Global.config.workspace.linuxPath}`, msg.ERR_SETUP_PATH_FIRST);
        }
    }
    if (!result && showPage)
        cfgProvider.navigate(pageId);
    return result;
}
exports.checkConfiguratoin = checkConfiguratoin;
function activate(context) {
    cfgProvider = new configView_1.ConfigView(context);
    let registration = vscode.workspace.registerTextDocumentContentProvider(cfgProvider.scheme, cfgProvider);
    let cfg = vscode.commands.registerCommand(constant.cmd.config, (uri, id) => {
        pageId = uriUtil.getId();
        cfgProvider.navigate(pageId);
    });
    vscode.workspace.onDidChangeConfiguration((e) => {
        ext.Global.config = comUtil.loadConfig();
        console.log(JSON.stringify(ext.Global.config, null, 2));
    });
    let cfgSubmit = vscode.commands.registerCommand(constant.cmd.configSubmit, (systemCfg) => {
        comUtil.closeCurActivateDoc();
        ext.Global.config = systemCfg;
        comUtil.saveConfig(ext.Global.config);
        if (systemCfg.workspace.linuxPath) {
            var pth = comUtil.tailWithSlash(systemCfg.workspace.linuxPath);
            cli.getInstance().checkPath(pth, "-f").then((msg) => {
                if (msg[0]) {
                    ext.Global.realpath = msg[0].replace('\n', '');
                }
                else {
                    comUtil.showErrorMessage(`Fail to check mapping path: ${msg}`);
                }
            }, (reason) => {
                comUtil.showErrorMessage(`Fail to check mapping path: ${reason}`);
            });
        }
    });
    context.subscriptions.push(cfgProvider, registration, cfg, cfgSubmit);
}
exports.activate = activate;
//# sourceMappingURL=config.js.map