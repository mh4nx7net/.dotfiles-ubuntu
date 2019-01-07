'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const cli = require("../client/client");
const ext = require("../extension");
const updateVerView_1 = require("../comp/updateVerView");
const urlUtil = require("../util/urlUtil");
const comUtil = require("../util/commonUtil");
const constant = require("../util/const");
const config_1 = require("../function/config");
let pageId = urlUtil.getId();
let workMap = new Map();
function activate(context) {
    let repoChannel = ext.Global.repoChannel;
    let gc = vscode.commands.registerCommand(constant.cmd.getcode, function (branch, linDir) {
        let workDir = linDir || ext.Global.realpath;
        if (workMap.has(workDir)) {
            vscode.window.showWarningMessage(`${workMap.get(workDir)} are still under synchronizing at ${workDir} ... `);
            return;
        }
        comUtil.showMessage(repoChannel, `Code Synchronizing at ${workDir}... [${branch}] : 0%`);
        var running = false;
        var begin = new Date().getTime();
        workMap.set(workDir, `[${branch}]`);
        let watcher = setInterval((arg) => {
            try {
                if (!running) {
                    running = true;
                    cli.getInstance().getDirSize(workDir, null).then((msgs) => {
                        try {
                            comUtil.showConsoleMessage(JSON.stringify(msgs));
                            let size = /(\d+)\s+.*/g.exec(msgs[0]);
                            let ratio = Math.floor((parseFloat(size[1]) / (100 * Math.pow(1024, 2))) * 100);
                            comUtil.showMessage(repoChannel, `Code Synchronizing at ${workDir}... [${branch}] : ${ratio}%`, false);
                        }
                        catch (error) {
                            comUtil.showErrorMessage(`Fail to parse size: ${JSON.stringify(error)}`);
                        }
                        finally {
                            running = false;
                        }
                    }, (reason) => {
                        comUtil.showErrorMessage(`Fail to get size: ${JSON.stringify(reason)}`);
                        running = false;
                    });
                }
                else {
                    return;
                }
            }
            catch (err) {
                comUtil.showErrorMessage(`Fail call get size: ${JSON.stringify(err)}`);
            }
        }, 60000);
        let opts = `${vscode.workspace.getConfiguration("repotoolgui").get("repotool.initOption")} -b ${branch}`;
        cli.getInstance().doRepoInit(workDir, opts).then((output) => {
            cli.getInstance().doRepoSync(workDir, 24).then((output) => {
                clearInterval(watcher);
                workMap.delete(workDir);
                comUtil.showMessage(repoChannel, `[${(new Date().getTime() - begin) / 1000} sec.]Successfully synced at ${workDir}! [${branch}] : 100%`, false);
                try {
                    comUtil.closeCurActivateDoc();
                }
                finally {
                    let msg = `Successfully updated codebase[${branch}] !`;
                    if (linDir) {
                        msg = `Get your codebase[${branch}] : ${workDir} `;
                    }
                    vscode.window.showInformationMessage(msg);
                }
            }, (reason) => {
                workMap.delete(workDir);
                clearInterval(watcher);
                comUtil.showMessage(repoChannel, reason);
            });
        }, (reason) => {
            workMap.delete(workDir);
            clearInterval(watcher);
            comUtil.showMessage(repoChannel, reason);
        });
    });
    let provider = new updateVerView_1.VersionSwitchView(context);
    let registration = vscode.workspace.registerTextDocumentContentProvider(provider.scheme, provider);
    vscode.commands.registerCommand(constant.cmd.getcodeGui, (uri) => {
        if (!uri)
            uri = vscode.Uri.parse("1");
        comUtil.showConsoleMessage(`show version GUI... ${uri.toString()}`);
        if (!config_1.checkConfiguratoin())
            return;
        if (uri.toString() == "1") {
            ext.Global.versionRefresh = true;
            pageId = urlUtil.getId();
        }
        provider.navigate(pageId);
    });
    context.subscriptions.push(gc, provider, registration);
}
exports.activate = activate;
//# sourceMappingURL=getcode.js.map