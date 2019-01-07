"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const Path = require("path");
const vscode_1 = require("vscode");
function isWindows() {
    return process.platform === 'win32';
}
function getBasePath() {
    return new Promise((resolve, reject) => {
        const npmBin = isWindows() ? 'npm.cmd' : 'npm';
        child_process_1.execFile(npmBin, ['bin', '-g'], (err, stdout) => {
            if (err) {
                reject(err);
            }
            const basePath = stdout.replace(/(\n|\r)+$/, '').trim();
            resolve(basePath);
        });
    });
}
function getServerInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        let command = vscode_1.workspace.getConfiguration('bashIde').get('path') || '';
        if (!command) {
            const basePath = yield getBasePath();
            const name = isWindows() ? 'bash-language-server.cmd' : 'bash-language-server';
            command = Path.join(basePath, name);
        }
        return new Promise((resolve, reject) => {
            child_process_1.execFile(command, ['-v'], (err, stdout) => {
                if (err) {
                    reject(err);
                }
                const versionMatch = stdout.match(/\d+[.]\d+[.]\d+/);
                const version = (versionMatch && versionMatch[0]) || '0.0.0';
                resolve({ command, version });
            });
        });
    });
}
exports.getServerInfo = getServerInfo;
//# sourceMappingURL=util.js.map