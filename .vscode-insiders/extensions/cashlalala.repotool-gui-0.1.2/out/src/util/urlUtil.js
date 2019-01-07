'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function getQueryVariable(query, variable) {
    var qryObj = getQueryVariables(query);
    return qryObj[variable];
}
exports.getQueryVariable = getQueryVariable;
function getQueryVariables(query) {
    var vars = query.split('&');
    var result = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return result;
}
exports.getQueryVariables = getQueryVariables;
function encodeBase64(src) {
    return new Buffer(src).toString('base64');
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(src) {
    return new Buffer(src, 'base64').toString('ascii');
}
exports.decodeBase64 = decodeBase64;
function getId() {
    return new Date().getTime().toString();
}
exports.getId = getId;
function diff(x, y) {
    return x.filter((i) => { return 0 > y.indexOf(i); });
}
exports.diff = diff;
//# sourceMappingURL=urlUtil.js.map