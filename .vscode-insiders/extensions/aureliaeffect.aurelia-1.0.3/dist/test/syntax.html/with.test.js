"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe(`The Aurelia HTML syntax with attribute`, () => {
    it(`must tokenize (with).bind attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div with.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (with).one-way attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div with.one-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (with).two-way attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div with.two-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (with).one-time attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div with.one-time="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (with)="foo" attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose model.bind="item" with="foo" />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 27, 31);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (with-foo)="foo" attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div with-foo="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (foo-with)="foo" attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div foo-with="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize a="(with)" attribute with scope "with.attribute.html.au"`, () => {
        // arrange
        let scope = 'with.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="with">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 12);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=with.test.js.map