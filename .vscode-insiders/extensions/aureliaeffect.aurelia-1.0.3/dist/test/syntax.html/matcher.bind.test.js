"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe(`The Aurelia HTML syntax matcher attribute`, () => {
    it(`must tokenize (matcher).bind attribute on select element with scope "matcher.attribute.html.au"`, () => {
        // arrange
        let scope = 'matcher.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.bind="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 36, 43);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (matcher).one-way attribute on select element with scope "matcher.attribute.html.au"`, () => {
        // arrange
        let scope = 'matcher.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.one-way="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 36, 43);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (matcher).two-way attribute on select element with scope "matcher.attribute.html.au"`, () => {
        // arrange
        let scope = 'matcher.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.two-way="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 36, 43);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (matcher).one-time attribute on select element with scope "matcher.attribute.html.au"`, () => {
        // arrange
        let scope = 'matcher.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.one-time="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 36, 43);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize matcher.(bind) attribute on select element with scope "matcher.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.bind="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 44, 48);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize matcher.(one-way) attribute on select element with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.one-way="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 44, 51);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize matcher.(two-way) attribute on select element with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.two-way="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 44, 51);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize matcher.(one-time) attribute on select element with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'databinding.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher.one-time="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 44, 52);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (matcher)="" attribute on select element with scope "databinding.attribute.html.au"`, () => {
        // arrange
        let scope = 'matcher.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine(`<select value.bind="group.users[0]" matcher="userComparer">`);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 36, 43);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize matcher.bind part in body of other attribute', () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<select name="matcher.bind">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 14, 26);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize matcher.bind* part in body of other attribute', () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<select name="matcher.binding">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 14, 29);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize matcher.foo part in body of other attribute', () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<select name="matcher.foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 14, 25);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize matcher part in body of other attribute', () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<select name="matcher">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 14, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=matcher.bind.test.js.map