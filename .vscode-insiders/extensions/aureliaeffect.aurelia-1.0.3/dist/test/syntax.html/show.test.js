"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax show attribute', () => {
    it(`must tokenize (show).bind="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (show).one-way="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show.one-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (show).two-way="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show.two-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (show).one-time="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show.one-time="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (show)="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 9);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (show-foo)="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show-foo="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (foo-show)="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div foo-show="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (show-foo).bind="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div show-foo.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (foo-show).bind="foo" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div foo-show.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="show" attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="show">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 12);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a='show' attribute with scope "show.attribute.html.au"`, () => {
        // arrange
        let scope = 'show.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a=\'show\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 12);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=show.test.js.map