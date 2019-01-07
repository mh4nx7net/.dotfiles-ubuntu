"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe(`The Aurelia HTML syntax bindable attribute`, function () {
    it(`must tokenize (bindable)="greeting,name" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template bindable="greeting,name">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable).bind="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable).one-way="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable.one-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable).two-way="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable.two-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable).one-time="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable.one-time="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable).foo="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable.foo="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable).ref="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 13);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (foo-bindable)="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div foo-bindable="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (bindable-foo)="foo" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div bindable-foo="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="(bindable)" attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="bindable">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 16);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a='(bindable)' attribute with scope "bindable.attribute.html.au"`, () => {
        // arrange
        let scope = 'bindable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a=\'bindable\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 16);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=bindable.test.js.map