'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function parseGitStatus(input) {
    return new Promise((resolve, reject) => {
        try {
            resolve(input);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.parseGitStatus = parseGitStatus;
//# sourceMappingURL=gitParser.js.map