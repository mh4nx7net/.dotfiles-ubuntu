"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
`use strict`;
const vscode = require("vscode");
const path = require("path");
const sysmsg = require("../msg/message");
const cli = require("../client/client");
const cmnUtil = require("../util/commonUtil");
const pftUtil = require("../util/platformUtil");
const status_1 = require("../function/status");
const info_1 = require("../function/info");
const config_1 = require("../function/config");
function activate(context) {
    let disposable = vscode.commands.registerCommand('repotool-cmd:startbranch', (fileUri) => {
        console.log(fileUri.toString());
        if (!config_1.checkConfiguratoin())
            return;
        let filePath = (pftUtil.isLinux()) ? fileUri.fsPath : cmnUtil.composeLinuxPath(fileUri.fsPath);
        let dirPath = path.dirname(filePath);
        vscode.window.showInputBox({ placeHolder: sysmsg.HINT_INPUT_BRANCH_NAME }).then((branch) => {
            if (!branch)
                return;
            cli.getInstance().doRepoStart(dirPath, branch, false).then((msgs) => {
                status_1.updateSingleRepoStatus(dirPath);
                info_1.updateSingleRepoInfo(dirPath);
                vscode.window.showInformationMessage(`Local branch[${branch}] was created successfully!`);
            }, (reason) => {
                vscode.window.showErrorMessage(`Fail to create local branch[${branch}]: ${reason}`);
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=startbr.js.map