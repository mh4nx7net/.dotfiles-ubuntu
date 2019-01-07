'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}
exports.strMapToObj = strMapToObj;
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
exports.objToStrMap = objToStrMap;
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}
exports.strMapToJson = strMapToJson;
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
exports.jsonToStrMap = jsonToStrMap;
//# sourceMappingURL=mapUtil.js.map