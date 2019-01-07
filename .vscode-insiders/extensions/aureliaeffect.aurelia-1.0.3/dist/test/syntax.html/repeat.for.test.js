"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe(`The Aurelia HTML syntax repeat.for attribute`, () => {
    it(`must tokenize (repeat).for attribute with scope "repeat.attribute.html.au"`, () => {
        // arrange
        let scope = 'repeat.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div repeat.for="foo of foos">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize repeat.(for) attribute with scope "for.attribute.html.au"`, () => {
        // arrange
        let scope = 'for.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div repeat.for="foo of foos">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize repeat.(for) attribute with scope "for.attribute.html.au"`, () => {
        // arrange
        let scope = 'for.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="repeat.for">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 18);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="(repeat.for)" attribute with scope "for.attribute.html.au"`, () => {
        // arrange
        let scope = 'for.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="repeat.for">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 18);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a='(repeat.for)' attribute with scope "for.attribute.html.au"`, () => {
        // arrange
        let scope = 'for.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a=\'repeat.for\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 18);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=repeat.for.test.js.map