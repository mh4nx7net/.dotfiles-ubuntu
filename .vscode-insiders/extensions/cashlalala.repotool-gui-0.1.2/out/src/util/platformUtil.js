'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function isLinux() {
    return process.platform == "linux";
}
exports.isLinux = isLinux;
function isWindows() {
    return process.platform == "win32";
}
exports.isWindows = isWindows;
function getUserSettingPath() {
    var usrHome = "";
    if (isLinux()) {
        usrHome = path.posix.join(process.env.HOME, ".config", "Code", "User", "settings.json");
    }
    else if (isWindows()) {
        usrHome = path.win32.join(process.env.APPDATA, "Code", "User", "settings.json");
    }
    else {
        throw new Error(`Not supported platform! ${process.platform}`);
    }
    return usrHome;
}
exports.getUserSettingPath = getUserSettingPath;
//# sourceMappingURL=platformUtil.js.map