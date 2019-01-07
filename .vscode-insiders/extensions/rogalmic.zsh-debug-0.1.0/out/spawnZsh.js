"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const handlePath_1 = require("./handlePath");
function spawnZshScript(scriptCode, pathZsh, outputHandler) {
    const currentShell = (process.platform === "win32") ? handlePath_1.getWSLLauncherPath(false) : pathZsh;
    const optionalZshPathArgument = (currentShell !== pathZsh) ? pathZsh : "";
    let spawnedProcess = child_process_1.spawn(currentShell, [optionalZshPathArgument, "-c", scriptCode].filter(arg => arg !== ""), { stdio: ["pipe", "pipe", "pipe"], shell: false });
    if (outputHandler) {
        spawnedProcess.on("error", (error) => {
            outputHandler(`${error}`);
        });
        spawnedProcess.stderr.on("data", (data) => {
            outputHandler(`${data}`);
        });
        spawnedProcess.stdout.on("data", (data) => {
            outputHandler(`${data}`);
        });
    }
    return spawnedProcess;
}
exports.spawnZshScript = spawnZshScript;
function spawnZshScriptSync(scriptCode, pathZsh, spawnTimeout) {
    const currentShell = (process.platform === "win32") ? handlePath_1.getWSLLauncherPath(false) : pathZsh;
    const optionalZshPathArgument = (currentShell !== pathZsh) ? pathZsh : "";
    return child_process_1.spawnSync(currentShell, [optionalZshPathArgument, "-c", scriptCode].filter(arg => arg !== ""), { timeout: spawnTimeout, shell: false });
}
exports.spawnZshScriptSync = spawnZshScriptSync;
//# sourceMappingURL=spawnZsh.js.map