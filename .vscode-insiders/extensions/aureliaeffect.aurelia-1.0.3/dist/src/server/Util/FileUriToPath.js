"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
function fileUriToPath(uri) {
    const rest = decodeURI(uri.substring(7));
    const firstSlash = rest.indexOf('/');
    let host = rest.substring(0, firstSlash);
    let path = rest.substring(firstSlash + 1);
    if ('localhost' == host)
        host = '';
    if (host) {
        host = Path.sep + Path.sep + host;
    }
    path = path.replace(/^(.+)\|/, '$1:');
    if (Path.sep == '\\') {
        path = path.replace(/\//g, '\\');
    }
    path = path.replace('%3A', ':');
    return host + path;
}
exports.fileUriToPath = fileUriToPath;
//# sourceMappingURL=FileUriToPath.js.map