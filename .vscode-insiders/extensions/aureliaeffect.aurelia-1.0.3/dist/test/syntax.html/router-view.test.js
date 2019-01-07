"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax router-view element', () => {
    it('must tokenize router-view start element with scope "router-view.element.html.au"', () => {
        // arrange
        let scope = 'router-view.element.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<router-view>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 12);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize router-view end element with scope "router-view.element.html.au"', () => {
        // arrange
        let scope = 'router-view.element.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('</router-view>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 2, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=router-view.test.js.map