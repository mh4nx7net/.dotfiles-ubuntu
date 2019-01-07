'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const namedRegexp = require('named-js-regexp');
function genRepoStatus(proj) {
    let tmp = {};
    return tmp[proj] = {
        'branch': "",
        'changes': []
    };
}
exports.genRepoStatus = genRepoStatus;
function parseRepoStatus(input) {
    /* sample output
    
    project art/                                    branch cash_test
     -m     NOTICE
    project abi/cpp/                                branch cash_test
     Mm     src/class_type_info.cc
     --     src/test.h
    project developers/samples/android/             (*** NO BRANCH ***)
     -m     README.txt
    
    {
        'projName' : {
            'branch' : "",
            changes : [
                {'f1' : 'status'},
                {'f2' : 'status'}
            ]
        }
    }
    */
    let changedRepos = new Map();
    input.split('project').forEach((v) => {
        if (!v || v == '\n' || v.indexOf('nothing to commit (working directory clean)') > -1)
            return;
        let repoStatus = new Object();
        repoStatus['changes'] = [];
        let repoProj = "";
        v.split('\n').forEach((token, idx) => {
            if (!token || token.indexOf("is submitted to") > -1) {
                return;
            }
            if (idx == 0) {
                let nr = namedRegexp(/(:<proj>\S+)\s+(branch (:<branch>\S+)|(:<branch>\(\*\*\* NO BRANCH \*\*\*\)))/g);
                let m = nr.exec(token);
                repoProj = m.groups()['proj'];
                repoStatus['project'] = repoProj;
                repoStatus['branch'] = m.groups()['branch'];
            }
            else {
                let nr = namedRegexp(/ (:<status>\S+)\s+(:<fp>\S+)/g);
                let m = nr.exec(token);
                repoStatus['changes'].push({ 'file': m.groups()['fp'], 'status': m.groups()['status'] });
            }
        });
        if (!repoProj)
            return;
        changedRepos.set(repoProj, repoStatus);
    });
    return changedRepos;
}
exports.parseRepoStatus = parseRepoStatus;
function parseRepoStatusAsync(input) {
    return new Promise((resolve, reject) => {
        try {
            resolve(parseRepoStatus(input));
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.parseRepoStatusAsync = parseRepoStatusAsync;
function parseRepoInfo(input, keepManifst = true) {
    let repos = [];
    input.split("----------------------------").forEach((val, idx) => {
        let obj = new Object();
        let regex = null;
        let m = null;
        if (!val || val == "\n")
            return;
        if (idx > 0) {
            regex = /Project: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['project'] = m[1];
            }
            regex = /Mount path: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['mount-path'] = m[1];
            }
            regex = /Current revision: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['current-version'] = m[1];
            }
            regex = /Local Branches: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['local-branch'] = m[1];
            }
        }
        else {
            regex = /Manifest branch: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['manifest-branch'] = m[1];
            }
            regex = /Manifest merge branch: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['manifest-merged-branch'] = m[1];
            }
            regex = /Manifest groups: (.*)/g;
            m = regex.exec(val);
            if (m) {
                obj['manifest-group'] = m[1];
            }
            if (!keepManifst) {
                return;
            }
        }
        repos.push(obj);
    });
    return repos;
}
exports.parseRepoInfo = parseRepoInfo;
function parseRepoInfoAsync(input, keepManifst = true) {
    return new Promise((resolve, reject) => {
        try {
            resolve(parseRepoInfo(input, keepManifst));
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.parseRepoInfoAsync = parseRepoInfoAsync;
//# sourceMappingURL=repoParser.js.map