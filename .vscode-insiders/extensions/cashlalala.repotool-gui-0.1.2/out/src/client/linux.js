'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const ext = require("../extension");
const cmnUtil = require("../util/commonUtil");
const constant = require("../util/const");
class LinuxClient {
    constructor() {
        this.repoTool = ext.Global.config.repotool.path;
        this.git = ext.Global.config.git.path;
    }
    localExe(cmd, stdin) {
        return new Promise((resolve, reject) => {
            let msg = "", errMsg = "";
            let child = cp.exec(cmd, { maxBuffer: 1024 * 1024 * 50 }, (error, stdout, stderr) => {
                msg = stdout;
                errMsg = stderr;
                if (error) {
                    cmnUtil.showConsoleMessage(`${error.stack}`, true);
                    reject([stdout, stderr]);
                }
                else {
                    resolve([stdout, stderr]);
                }
            }).on('exit', (code) => {
                if (code) {
                    cmnUtil.showConsoleMessage(`failt to execute ${cmd}: ${errMsg}`, true);
                }
                else {
                    cmnUtil.showConsoleMessage(`Success: ${cmd}`);
                }
            });
            if (stdin) {
                child.stdin.write(stdin);
            }
        });
    }
    checkPath(workDir, options) {
        let cmd = `readlink ${options} ${workDir}`;
        return this.localExe(cmd);
    }
    getDirSize(dir, option) {
        let cmd = `du ${option || "--max-depth=0 "} ${dir}`;
        return this.localExe(cmd);
    }
    ;
    doGitLog(workDir, options) {
        let cmd = `cd ${workDir} && ${this.git} log ${options}`;
        return this.localExe(cmd);
    }
    doBatchUplaod(projs, data, checkStatus) {
        var allDone = projs.map((x) => { return null; });
        projs.forEach((val, idx) => {
            let key = cmnUtil.getProjRealPath(val);
            let mountPath = ext.Global.codebaseInfo[key]['mount-path'];
            let realProj = ext.Global.codebaseInfo[key]['project'];
            let amend = data[val]["isAmendToggled"];
            let msg = "", errMsg = "";
            let cmd = `cd ${mountPath} && ${this.git} add . `;
            let informer = setInterval(() => {
                cmnUtil.showMessage(ext.Global.repoChannel, `[${idx}] uploading ${val}.. please be patient...`);
            }, 2500);
            let errHandling = (idx) => {
                clearInterval(informer);
                allDone[idx] = false;
            };
            let child = cp.exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    cmnUtil.showConsoleMessage(`${stderr}\n${error.stack}`, true);
                }
                errMsg = stderr;
                msg = stdout;
            }).on('exit', (code) => {
                if (code) {
                    errHandling(idx);
                    checkStatus(mountPath, allDone);
                    cmnUtil.showConsoleMessage(errMsg, true);
                }
                else {
                    cmnUtil.showConsoleMessage(`Success: ${cmd}`);
                    cmd = `cd ${mountPath} && ${this.git} commit ${(amend) ? "--amend" : ""} -m '${data[val][constant.message]}' `;
                    let child = cp.exec(cmd, (error, stdout, stderr) => {
                        if (error) {
                            cmnUtil.showConsoleMessage(`${stderr}\n${error.stack}`, true);
                        }
                        errMsg = stderr;
                        msg = stdout;
                    }).on('exit', (code) => {
                        if (code) {
                            errHandling(idx);
                            checkStatus(mountPath, allDone);
                        }
                        else {
                            cmnUtil.showConsoleMessage(`Success: ${cmd}`);
                            let draftOrNot = (ext.Global.config.repotool.uploadType == "DRAFT") ? "--draft" : "";
                            errMsg = "";
                            cmd = `cd ${mountPath} && ${this.repoTool} upload ${draftOrNot} --dest=${data[val][constant.remoteBranch]} --br=${data[val][constant.localBranch]} ${realProj}`;
                            let child = cp.exec(cmd, (error, stdout, stderr) => {
                                if (error) {
                                    cmnUtil.showConsoleMessage(`${stderr}\n${error.stack}`, true);
                                }
                                else {
                                    cmnUtil.showConsoleMessage(`Success: ${cmd}: \n${stdout}\n${(stderr) ? `stderr:\n${stderr}` : ""}`);
                                }
                                errMsg = stderr;
                                msg = stdout;
                            }).on('exit', (code) => {
                                clearInterval(informer);
                                if (code) {
                                    cmnUtil.showConsoleMessage(`Fail to upload: ${cmd}`, true);
                                    allDone[idx] = false;
                                    if (amend) {
                                        cmnUtil.showConsoleMessage(`skip reset codebase because commit with amend.`);
                                        checkStatus(mountPath, allDone);
                                    }
                                    else {
                                        cmd = `cd ${mountPath} && ${this.git} reset --mixed HEAD^ `;
                                        let child = cp.exec(cmd, (error, stdout, stderr) => {
                                            if (error) {
                                                cmnUtil.showConsoleMessage(`${stderr}\n${error.stack}`, true);
                                            }
                                            errMsg = stderr;
                                            msg = stdout;
                                        }).on('exit', (code) => {
                                            if (code) {
                                                cmnUtil.showConsoleMessage(`Fail to reset codebase`, true);
                                            }
                                            else {
                                                cmnUtil.showConsoleMessage(`Success: ${cmd}`);
                                            }
                                            checkStatus(mountPath, allDone);
                                        });
                                    }
                                    ;
                                }
                                else {
                                    allDone[idx] = true;
                                    checkStatus(mountPath, allDone);
                                }
                            });
                            child.stdin.write(`y\nno\n`);
                        }
                    });
                }
            });
        });
    }
    doRepoInfo(workDir, curDir = false) {
        let cmd = `cd ${workDir} && ${this.repoTool} info ${(curDir) ? "." : ""}`;
        return this.localExe(cmd);
    }
    doRepoStatus(workDir, thread = 24, curDir = false) {
        let cmd = `cd ${workDir} && ${(curDir) ? "" : ""} ${this.repoTool} status -j ${thread} ${(curDir) ? "." : ""}`;
        return this.localExe(cmd);
    }
    doRepoSync(workDir, thread = 24) {
        let cmd = `pwd && cd ${workDir} &&  ${this.repoTool} sync -j 24 -f -c --no-tags --optimized-fetch --force-sync >sync.log`;
        return this.localExe(cmd);
    }
    doRepoInit(workDir, options) {
        let cmd = `mkdir -p ${workDir} && cd ${workDir} &&  ${this.repoTool} init ${options}`;
        return this.localExe(cmd);
    }
    doRepoUpload(workDir, stdin, projects, srcBr, destBr) {
        let projStr = "";
        projects.forEach((v) => {
            projStr += `${v} `;
        });
        return this.localExe(`cd ${workDir} && ${this.repoTool} upload --dest=${destBr} --br=${srcBr} ${projStr}`, stdin);
    }
    doRepoStart(workDir, branch, all = false) {
        let cmd = `cd ${workDir} && ${this.repoTool} start ${branch} ${(all) ? "--all" : ""} .`;
        return this.localExe(cmd);
    }
    doGitCommit(workDir, message) {
        let cmd = `cd ${workDir} && ${this.git} commit -m '${message}' `;
        return this.localExe(cmd);
    }
    doGitAdd(workDir, filePath) {
        let cmd = `cd ${workDir} && ${this.git} add ${filePath}`;
        return this.localExe(cmd);
    }
    doGitPush(workDir, remote, srcBr, destBr) {
        let cmd = `cd ${workDir} && ${this.git} push ${remote} ${srcBr}:refs/for/${destBr} `;
        return this.localExe(cmd);
    }
    doGitReset(workDir, ref, mode) {
        let cmd = `cd ${workDir} && ${this.git} reset ${mode} ${ref} `;
        return this.localExe(cmd);
    }
}
exports.LinuxClient = LinuxClient;
//# sourceMappingURL=linux.js.map