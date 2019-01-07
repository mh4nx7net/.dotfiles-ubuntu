"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax let element', () => {
    it('must tokenize let start element with scope "let.element.html.au"', () => {
        // arrange
        let scope = 'let.element.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<let>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 4);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize let end element with scope "let.element.html.au"', () => {
        // arrange
        let scope = 'let.element.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('</let>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 2, 5);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=let.test.js.map