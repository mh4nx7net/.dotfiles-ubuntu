"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax databinding attributes', () => {
    it(`must tokenize (some).bind="foo" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 14);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (some).one-way="foo" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some.one-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (some).two-way="foo" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some.two-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (some).one-time="foo" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some.one-time="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (some).from-view="foo" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some.from-view="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 19);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (some).to-view="foo" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some.to-view="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(bind)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.bind">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 14);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x; x.(bind)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x; x.bind">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(bind)='x'; x" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.bind=\'x\'; x">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(one-way)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.one-way">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x; x.(one-way)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x; x.one-way">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(one-way)='x'; x" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.one-way=\'x\'; x">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(two-way)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.two-way">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x; x.(two-way)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x; x.two-way">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(two-way)='x; x" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.two-way=\'x\'; x">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(one-time)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.one-time">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 18);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x; x.(one-time)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x; x.one-time">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(one-time)='\'x\; x" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.one-time=\'x\'; x">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 25);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(from-view)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.from-view">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 19);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x; x.(from-view)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x; x.from-view">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 22);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(from-view)='\'x\; x" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.from-view=\'x\'; x">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 26);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(to-view)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.to-view">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x; x.(to-view)" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x; x.to-view">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="x.(to-view)='\'x\; x" attribute with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="x.to-view=\'x\'; x">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=databinding.test.js.map