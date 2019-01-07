'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const sjc = require("strip-json-comments");
const pfUtil = require("./platformUtil");
const urlUtil = require("./urlUtil");
const ext = require("../extension");
function showMessage(chal, msg, show, alert) {
    if (show)
        chal.show();
    if (alert)
        vscode.window.showErrorMessage(alert);
    chal.appendLine(`${getCurTimeString()} ${msg}`);
}
exports.showMessage = showMessage;
function showLogMsg(msg, show, level, title) {
    if (show)
        ext.Global.repoChannel.show();
    ext.Global.repoChannel.appendLine(`${getCurTimeString()} ${msg}`);
    if (level) {
        if (level.toLowerCase() == "error" && title) {
            vscode.window.showErrorMessage(title);
        }
        else if (level.toLowerCase() == "warn" && title) {
            vscode.window.showWarningMessage(title);
        }
        else if (level.toLowerCase() == "info" && title) {
            vscode.window.showInformationMessage(title);
        }
    }
}
exports.showLogMsg = showLogMsg;
function showWarnMessage(msg, title) {
    showLogMsg(msg, true, "warn", title);
}
exports.showWarnMessage = showWarnMessage;
function showErrorMessage(msg, title) {
    showLogMsg(msg, true, "error", title);
}
exports.showErrorMessage = showErrorMessage;
function showConsoleMessage(msg, show) {
    console.log(`${getCurTimeString()} ${msg}`);
    if (show != undefined) {
        showLogMsg(msg, show);
    }
}
exports.showConsoleMessage = showConsoleMessage;
function getCurTimeString() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
exports.getCurTimeString = getCurTimeString;
function getObjectKey(obj) {
    let keys = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            keys.push(prop);
        }
    }
    return keys;
}
exports.getObjectKey = getObjectKey;
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepCopy = deepCopy;
function closeCurActivateDoc() {
    try {
        let curFile = vscode.window.activeTextEditor.document.fileName;
    }
    catch (e) {
        if (e instanceof TypeError) {
            vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        }
        else {
            console.error(e);
        }
    }
}
exports.closeCurActivateDoc = closeCurActivateDoc;
function loadConfig() {
    try {
        let config = {
            "workspace": {
                linuxPath: ""
            },
            "ssh": {
                "host": "",
                "port": 22,
                "user": "",
                "pwd": ""
            },
            "repotool": {
                "path": "",
                "uploadType": "",
                "initOption": "",
                "syncOption": ""
            },
            "git": {
                "path": ""
            },
            "manifest": {
                "type": []
            }
        };
        let cfg = vscode.workspace.getConfiguration("repotoolgui");
        config.ssh.host = cfg.get("ssh.host");
        config.ssh.port = cfg.get("ssh.port");
        config.ssh.user = cfg.get("ssh.user");
        config.ssh.pwd = cfg.get("ssh.pwd");
        config.git.path = (cfg.get("git.path")) ? cfg.get("git.path") : "git";
        config.repotool.path = (cfg.get("repotool.path")) ? cfg.get("repotool.path") : "repo";
        config.repotool.uploadType = (cfg.get("repotool.uploadType")) ? cfg.get("repotool.uploadType") : "DRAFT";
        config.repotool.initOption = cfg.get("repotool.initOption") ||
            "-u https://android.googlesource.com/platform/manifest ";
        config.repotool.syncOption = cfg.get("repotool.syncOption") || " -f --force-sync --no-tags -c -q -j 24 --prune --optimized-fetch ";
        config.workspace.linuxPath = (pfUtil.isLinux()) ? vscode.workspace.rootPath :
            cfg.get("workspace.linuxPath");
        config.manifest.type = (cfg.get("manifest.type")) ? cfg.get("manifest.type") : ["HQ", "ONE", "SUB"];
        return config;
    }
    catch (error) {
        throw new Error("Fail to load configuration:" + error);
    }
}
exports.loadConfig = loadConfig;
function saveConfig(config) {
    try {
        // the settign file doesn't exist at the first launch after installing vscode
        let f = pfUtil.getUserSettingPath();
        let userSetting = (fs.existsSync(f)) ? sjc(fs.readFileSync(f).toString()) : "{}";
        userSetting = JSON.parse(userSetting);
        userSetting["repotoolgui"] = config;
        var data = JSON.stringify(userSetting, null, 2);
        console.log(data);
        fs.writeFileSync(pfUtil.getUserSettingPath(), data);
        vscode.window.showInformationMessage("Repotool GUI Configuration saved successfully!");
    }
    catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(`Fail to save configuration: ${error}`);
    }
}
exports.saveConfig = saveConfig;
function tailWithSlash(pth) {
    let tmp = (' ' + pth).slice(1);
    if (!tmp.endsWith("/")) {
        tmp += "/";
    }
    return tmp;
}
exports.tailWithSlash = tailWithSlash;
function getProjRealPath(proj) {
    var keys = getObjectKey(ext.Global.codebaseInfo);
    for (var i = 0; i < keys.length; i++) {
        let projPath = keys[i];
        if (projPath.endsWith(proj) || projPath.endsWith(proj.substr(0, proj.length - 1))) {
            return projPath;
        }
    }
    throw new Error(`Fail to find real path of project:${proj} in codebase!`);
}
exports.getProjRealPath = getProjRealPath;
function getProjWorkspacePath(proj) {
    let projToken = proj.split(path.posix.sep).filter((x) => { return x; });
    let pthToekn = urlUtil.diff(vscode.workspace.rootPath.split(path.sep), projToken);
    pthToekn = pthToekn.concat(projToken);
    return (pfUtil.isLinux()) ? `${path.sep}${pthToekn.join(path.sep)}` : `${pthToekn.join(path.sep)}`;
}
exports.getProjWorkspacePath = getProjWorkspacePath;
function composeLinuxPath(winPath) {
    let delimit = "\\";
    let fileToken = winPath.split(delimit);
    let workDirToken = vscode.workspace.rootPath.split(delimit);
    let projToken = urlUtil.diff(fileToken, workDirToken);
    projToken.splice(0, 0, ext.Global.realpath);
    let linuxFile = path.posix.join.apply(this, projToken);
    let linuxWorkingDir = path.posix.dirname(linuxFile);
    return linuxFile;
}
exports.composeLinuxPath = composeLinuxPath;
//# sourceMappingURL=commonUtil.js.map