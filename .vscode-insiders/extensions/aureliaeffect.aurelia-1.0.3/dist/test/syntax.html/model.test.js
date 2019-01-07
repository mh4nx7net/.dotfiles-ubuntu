"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax model attribute', () => {
    it('must tokenize model attribute with scope "model.attribute.html.au"', () => {
        // arrange
        let scope = 'model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div model.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 10);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize attribute body that contains model keyword with scope "model.attribute.html.au"', () => {
        // arrange
        let scope = 'meta.tag.block.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div value.bind="model.value">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 17, 28);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=model.test.js.map