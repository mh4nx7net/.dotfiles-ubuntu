'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const repoStatusView = require("../comp/repoStatusView");
const ext = require("../extension");
const repoParser = require("../util/repoParser");
const cli = require("../client/client");
const urlUtil = require("../util/urlUtil");
const constant = require("../util/const");
const pftUtil = require("../util/platformUtil");
const cmnUtil = require("../util/commonUtil");
const repoInfo = require("../function/info");
const config_1 = require("../function/config");
const info_1 = require("../function/info");
let pageId = urlUtil.getId();
let provider = null;
function updateSingleRepoStatus(linuxWorkingDir, callback) {
    cli.getInstance().doRepoStatus(linuxWorkingDir, 48, true).then((output) => {
        if (output[0]) {
            let status = repoParser.parseRepoStatus(output[0]);
            if (status.size > 0) {
                status.forEach(function (val, proj) {
                    cmnUtil.showMessage(ext.Global.repoChannel, `updating ${proj} status`);
                    let prev = JSON.stringify(ext.Global.codebaseStatus.get(proj));
                    if (val && val['changes'].length > 0) {
                        ext.Global.codebaseStatus.set(proj, val);
                    }
                    else {
                        let repo = repoParser.genRepoStatus(proj);
                        repo["branch"] = val["branch"];
                        ext.Global.codebaseStatus.set(proj, repo);
                    }
                    cmnUtil.showConsoleMessage(`replace ${prev} with ${JSON.stringify(val)}`);
                });
            }
            else {
                if (ext.Global.codebaseInfo.hasOwnProperty(linuxWorkingDir)) {
                    let relDir = linuxWorkingDir.substr(ext.Global.realpath.length + 1);
                    ext.Global.codebaseStatus.delete(`${relDir}/`);
                }
            }
        }
        else {
            cmnUtil.showMessage(ext.Global.repoChannel, output[1]);
        }
        if (callback) {
            callback(linuxWorkingDir);
        }
        else {
            provider.update(vscode.Uri.parse(`${provider.previewUri}?id=${pageId}`));
        }
    }, (reason) => {
        ext.Global.repoChannel.show();
        cmnUtil.showMessage(ext.Global.repoChannel, reason);
    });
}
exports.updateSingleRepoStatus = updateSingleRepoStatus;
function refreshAll(refresh) {
    if (!config_1.checkConfiguratoin())
        return;
    if (refresh && refresh == "1") {
        provider.renderLoading(pageId);
        // force update info in advance
        repoInfo.refreshAllInfo(refresh);
        cli.getInstance().doRepoStatus(ext.Global.realpath, 24, false).then((status) => {
            if (status[0]) {
                try {
                    ext.Global.codebaseStatus.clear();
                    let repoStatusMap = repoParser.parseRepoStatus(status[0]);
                    repoStatusMap.forEach((val, key) => {
                        let p = cmnUtil.getProjRealPath(key);
                        if (p.indexOf(ext.Global.realpath) > -1) {
                            cmnUtil.showConsoleMessage(p);
                            ext.Global.codebaseStatus.set(key, val);
                        }
                    });
                }
                catch (err) {
                    cmnUtil.showErrorMessage(`${status[0]}\n${err.stack}`, `Fail to parse repo status output!`);
                }
            }
            else {
                cmnUtil.showErrorMessage(status[1], `Repo status exit with error...`);
            }
            provider.renderFinishLoading(pageId);
        }, (error) => {
            provider.renderFinishLoading(pageId);
            cmnUtil.showErrorMessage(`${error.stack}`, `Fail to get repo status output! Check output channel for more detail...`);
        });
    }
    else {
        provider.navigate(pageId);
    }
}
function refreshCurrent() {
    if (!config_1.checkConfiguratoin())
        return;
    provider.renderLoading(pageId);
    let tmpMap = {};
    let onFinish = (...args) => {
        tmpMap[args[0]] = true;
        let allDone = true;
        cmnUtil.getObjectKey(tmpMap).forEach((v, idx) => {
            if (!tmpMap[v]) {
                allDone = false;
            }
        });
        if (allDone) {
            provider.renderFinishLoading(pageId);
        }
    };
    if (ext.Global.codebaseStatus.size == 0) {
        provider.renderFinishLoading(pageId);
    }
    else {
        ext.Global.codebaseStatus.forEach((v, idx) => {
            let projPath = cmnUtil.getProjRealPath(v.project);
            tmpMap[projPath] = false;
            updateSingleRepoStatus(projPath, onFinish);
        });
    }
}
function activate(context) {
    provider = new repoStatusView.RepoStatusContentProvider(context);
    let registration = vscode.workspace.registerTextDocumentContentProvider(provider.scheme, provider);
    context.subscriptions.push(provider, registration);
    context.subscriptions.push(vscode.commands.registerCommand(constant.cmd.showStatus, refreshAll));
    context.subscriptions.push(vscode.commands.registerCommand(constant.cmd.updateStatus, refreshCurrent));
    context.subscriptions.push(vscode.commands.registerCommand(constant.cmd.openProject, provider.openProject, provider));
    vscode.workspace.onDidSaveTextDocument((e) => {
        if (!config_1.checkConfiguratoin())
            return;
        try {
            let linuxFile = (pftUtil.isLinux()) ? e.fileName : cmnUtil.composeLinuxPath(e.fileName);
            let linuxWorkingDir = path.posix.dirname(linuxFile);
            cmnUtil.showConsoleMessage(`updateing ${linuxWorkingDir}`);
            info_1.updateSingleRepoInfo(linuxWorkingDir, updateSingleRepoStatus, linuxWorkingDir);
        }
        catch (err) {
            cmnUtil.showErrorMessage(err);
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=status.js.map