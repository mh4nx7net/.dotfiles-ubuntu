"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawnZsh_1 = require("./spawnZsh");
var validatePathResult;
(function (validatePathResult) {
    validatePathResult[validatePathResult["success"] = 0] = "success";
    validatePathResult[validatePathResult["notExistCwd"] = 1] = "notExistCwd";
    validatePathResult[validatePathResult["notFoundZsh"] = 2] = "notFoundZsh";
    validatePathResult[validatePathResult["notFoundZshdb"] = 3] = "notFoundZshdb";
    validatePathResult[validatePathResult["notFoundCat"] = 4] = "notFoundCat";
    validatePathResult[validatePathResult["notFoundMkfifo"] = 5] = "notFoundMkfifo";
    validatePathResult[validatePathResult["notFoundPkill"] = 6] = "notFoundPkill";
    validatePathResult[validatePathResult["timeout"] = 7] = "timeout";
    validatePathResult[validatePathResult["cannotChmod"] = 8] = "cannotChmod";
    validatePathResult[validatePathResult["unsupportedZshVersion"] = 9] = "unsupportedZshVersion";
    validatePathResult[validatePathResult["unknown"] = 10] = "unknown";
})(validatePathResult || (validatePathResult = {}));
function _validatePath(cwd, pathZsh, pathZshdb, pathCat, pathMkfifo, pathPkill, spawnTimeout = 5000) {
    const vpr = validatePathResult;
    const proc = spawnZsh_1.spawnZshScriptSync(((pathZshdb.indexOf("zshdb_dir") > 0) ? `chmod +x "${pathZshdb}" || exit ${vpr.cannotChmod};` : ``) +
        `type "${pathZshdb}" || exit ${vpr.notFoundZshdb};` +
        `type "${pathCat}" || exit ${vpr.notFoundCat};` +
        `type "${pathMkfifo}" || exit ${vpr.notFoundMkfifo};` +
        `type "${pathPkill}" || exit ${vpr.notFoundPkill};` +
        `test -d "${cwd}" || exit ${vpr.notExistCwd};`, pathZsh, spawnTimeout);
    if (proc.error !== undefined) {
        if (proc.error.code === "ENOENT") {
            return [vpr.notFoundZsh, ""];
        }
        if (proc.error.code === "ETIMEDOUT") {
            return [vpr.timeout, ""];
        }
        return [vpr.unknown, ""];
    }
    const errorString = proc.stderr.toString();
    return [proc.status, errorString];
}
function validatePath(cwd, pathZsh, pathZshdb, pathCat, pathMkfifo, pathPkill) {
    const rc = _validatePath(cwd, pathZsh, pathZshdb, pathCat, pathMkfifo, pathPkill);
    const askReport = `If it is reproducible, please report it to https://github.com/rogalmic/vscode-zsh-debug/issues.`;
    const stderrContent = `\n\n${rc["1"]}`;
    switch (rc["0"]) {
        case validatePathResult.success: {
            return ``;
        }
        case validatePathResult.notExistCwd: {
            return `Error: cwd (${cwd}) does not exist.` + stderrContent;
        }
        case validatePathResult.notFoundZsh: {
            return `Error: zsh not found. (pathZsh: ${pathZsh})` + stderrContent;
        }
        case validatePathResult.notFoundZshdb: {
            return `Error: zshdb not found. (pathZshdb: ${pathZshdb})` + stderrContent;
        }
        case validatePathResult.notFoundCat: {
            return `Error: cat not found. (pathCat: ${pathCat})` + stderrContent;
        }
        case validatePathResult.notFoundMkfifo: {
            return `Error: mkfifo not found. (pathMkfifo: ${pathMkfifo})` + stderrContent;
        }
        case validatePathResult.notFoundPkill: {
            return `Error: pkill not found. (pathPkill: ${pathPkill})` + stderrContent;
        }
        case validatePathResult.timeout: {
            return `Error: BUG: timeout while validating environment. ` + askReport + stderrContent;
        }
        case validatePathResult.cannotChmod: {
            return `Error: Cannot chmod +x internal zshdb copy.` + stderrContent;
        }
        case validatePathResult.unsupportedZshVersion: {
            return `Error: Only zsh versions 4.* are supported.` + stderrContent;
        }
        case validatePathResult.unknown: {
            return `Error: BUG: unknown error ocurred while validating environment. ` + askReport + stderrContent;
        }
    }
    return `Error: BUG: reached to unreachable code while validating environment (code ${rc}). ` + askReport + stderrContent;
}
exports.validatePath = validatePath;
//# sourceMappingURL=zshRuntime.js.map