"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax compose element', () => {
    it('must tokenize compose start element with scope "compose.element.html.au"', () => {
        // arrange
        let scope = 'compose.element.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 8);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize compose end element with scope "compose.element.html.au"', () => {
        // arrange
        let scope = 'compose.element.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('</compose>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 2, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=compose.test.js.map