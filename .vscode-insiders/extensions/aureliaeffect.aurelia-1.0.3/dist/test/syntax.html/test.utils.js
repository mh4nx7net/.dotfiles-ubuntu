"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_textmate_1 = require("vscode-textmate");
let registry = new vscode_textmate_1.Registry();
registry.loadGrammarFromPathSync('./syntaxes/html.json');
let grammar = registry.grammarForScopeName('au.html');
function tokenizeLine(line) {
    return grammar.tokenizeLine(line, undefined);
}
exports.tokenizeLine = tokenizeLine;
function getTokenOnCharRange(lineToken, startIndex, endIndex) {
    let tokens = lineToken.tokens.filter(token => token.startIndex === startIndex && token.endIndex === endIndex);
    return tokens.length === 1 ? tokens[0] : null;
}
exports.getTokenOnCharRange = getTokenOnCharRange;
function hasScope(scopes, scope) {
    let foundScopes = scopes.filter(s => s === scope);
    return foundScopes.length === 1;
}
exports.hasScope = hasScope;
function writeOut(lineToken, text) {
    for (let lt of lineToken.tokens) {
        // tslint:disable-next-line:no-console
        console.log(`${lt.startIndex} - ${lt.endIndex} => ${text.substring(lt.startIndex, lt.endIndex)}`);
        for (let s of lt.scopes) {
            // tslint:disable-next-line:no-console
            console.log(`- ${s}`);
        }
    }
}
exports.writeOut = writeOut;
//# sourceMappingURL=test.utils.js.map