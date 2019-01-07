'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const repoInfoView = require("../comp/repoInfoView");
const cli = require("../client/client");
const ext = require("../extension");
const urlUtil = require("../util/urlUtil");
const repoParser_1 = require("../util/repoParser");
const config_1 = require("../function/config");
const constant = require("../util/const");
const cmnUtil = require("../util/commonUtil");
let pageId = urlUtil.getId();
let provider = null;
function updateSingleRepoInfo(linuxWorkDir, callback, ...args) {
    cli.getInstance().doRepoInfo(linuxWorkDir, true).then((message) => {
        let repos = repoParser_1.parseRepoInfo(message[0]);
        repos.forEach((val, idx) => {
            if (val['mount-path']) {
                ext.Global.codebaseInfo[val['mount-path']] = val;
            }
        });
        if (callback) {
            try {
                callback.call(this, args);
            }
            catch (error) {
                cmnUtil.showErrorMessage(`Fail to execute call after repo info: ${error}`);
            }
        }
        provider.update(vscode.Uri.parse(`${provider.previewUri}?id=${pageId}`));
    }, (reason) => {
        cmnUtil.showErrorMessage(`Fail to update repo info[${linuxWorkDir}]: ${reason}`);
    });
}
exports.updateSingleRepoInfo = updateSingleRepoInfo;
function refreshAllInfo(refresh) {
    if (!config_1.checkConfiguratoin())
        return;
    if (refresh && refresh == "1") {
        provider.renderLoading(pageId);
        ext.Global.codebaseInfo = {};
        cli.getInstance().doRepoInfo(ext.Global.realpath, false).then((info) => {
            if (info[0]) {
                let repos = repoParser_1.parseRepoInfo(info[0]);
                repos.forEach((val, idx) => {
                    if (val['mount-path']) {
                        ext.Global.codebaseInfo[val['mount-path']] = val;
                    }
                });
            }
            else {
                cmnUtil.showErrorMessage(`Fail to get repo info : ${info[1]}`);
            }
            provider.renderFinishLoading(pageId);
        }, (reason) => {
            cmnUtil.showErrorMessage(`Fail to perform repo info : ${reason}`);
            provider.renderFinishLoading(pageId);
        });
    }
    else {
        provider.navigate(pageId);
    }
}
exports.refreshAllInfo = refreshAllInfo;
function activate(context) {
    provider = new repoInfoView.InfoViewProvider(context);
    let registration = vscode.workspace.registerTextDocumentContentProvider(provider.scheme, provider);
    let disposable = vscode.commands.registerCommand(constant.cmd.showInfo, refreshAllInfo);
    context.subscriptions.push(disposable, registration, provider);
}
exports.activate = activate;
//# sourceMappingURL=info.js.map