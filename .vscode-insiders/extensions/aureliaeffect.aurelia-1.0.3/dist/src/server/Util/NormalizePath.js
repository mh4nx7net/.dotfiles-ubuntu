"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizePath(input) {
    const isExtendedLengthPath = /^\\\\\?\\/.test(input);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(input);
    if (isExtendedLengthPath || hasNonAscii) {
        return input;
    }
    return input.replace(/\\/g, '/');
}
exports.normalizePath = normalizePath;
//# sourceMappingURL=NormalizePath.js.map