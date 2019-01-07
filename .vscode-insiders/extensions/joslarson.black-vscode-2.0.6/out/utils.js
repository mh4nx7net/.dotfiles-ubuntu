"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const minBlackVersion = require('../package.json').minBlackVersion;
function replaceVarInPath(pathTemplate, searchValue, replaceValue) {
    // searchValue not present, early exit
    if (pathTemplate.indexOf(searchValue) === -1)
        return pathTemplate;
    const pathParts = pathTemplate.split(searchValue).reduce((result, part, i, parts) => {
        const isLastPart = i === parts.length - 1;
        return isLastPart ? [...result, part] : [...result, part, replaceValue];
    }, []);
    // add back leading "./" when present in pathTemplate
    return `${pathTemplate.startsWith('./') ? './' : ''}${path.join(...pathParts)}`;
}
exports.replaceVarInPath = replaceVarInPath;
class Version {
    constructor(version) {
        const matches = version.match(/(\d+)\.(\d+)(a|b|c|\.)(\d+)/);
        if (!matches)
            throw Error(`Invalid version string "${version}".`);
        this.year = parseInt(matches[1]);
        this.month = parseInt(matches[2]);
        this.type = matches[3];
        this.micro = parseInt(matches[4]);
    }
    valueOf() {
        const { type, year, month, micro } = this;
        let typeVal = 4;
        if (type === 'a')
            typeVal = 1;
        else if (type === 'b')
            typeVal = 2;
        else if (type === 'c')
            typeVal = 3;
        return year * 1000000 + month * 10000 + typeVal * 1000 + micro;
    }
    toString() {
        const { type, year, month, micro } = this;
        return `${year}.${month}${type}${micro}`;
    }
}
exports.Version = Version;
function blackVersionIsIncompatible(provider) {
    return new Promise((resolve, reject) => {
        let exitCode;
        const checkVersionCmd = `${provider.getCommand(provider.getConfig(null))}-version`;
        child_process_1.exec(checkVersionCmd, (error, stdout, stderr) => {
            if (exitCode === 0) {
                try {
                    const minVersion = new Version(minBlackVersion);
                    const envVersion = new Version(stdout);
                    if (envVersion < minVersion) {
                        const versionErrorMessage = `Black v${envVersion} is no longer supported, v${minVersion} or greater is required. Try \`pip install -U black\`.`;
                        resolve(versionErrorMessage);
                    }
                }
                catch (_a) {
                    // pass
                }
            }
            resolve();
        }).on('exit', code => {
            exitCode = code;
        });
    });
}
exports.blackVersionIsIncompatible = blackVersionIsIncompatible;
//# sourceMappingURL=utils.js.map