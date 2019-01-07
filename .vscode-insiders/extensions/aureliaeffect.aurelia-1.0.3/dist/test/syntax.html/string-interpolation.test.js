"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax string interpolation', () => {
    it('must tokenize string interpolation in element with scope correct scopes', () => {
        // act
        const lineToken = test_utils_1.tokenizeLine('<div>${foo}</div>');
        // assert
        const startToken = test_utils_1.getTokenOnCharRange(lineToken, 5, 7);
        const middleToken = test_utils_1.getTokenOnCharRange(lineToken, 7, 10);
        const endToken = test_utils_1.getTokenOnCharRange(lineToken, 10, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(startToken.scopes, 'punctuation.definition.string.interpolation.start'));
        chai_1.assert.isOk(test_utils_1.hasScope(middleToken.scopes, 'meta.string.interpolation'));
        chai_1.assert.isOk(test_utils_1.hasScope(endToken.scopes, 'punctuation.definition.string.interpolation.end'));
    });
    it('must tokenize string interpolation in element with scope "punctuation.definition.string.interpolation.start"', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.start';
        // act
        const lineToken = test_utils_1.tokenizeLine('<div>${foo}</div>');
        // assert
        const token = test_utils_1.getTokenOnCharRange(lineToken, 5, 7);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize string interpolation in element with scope "punctuation.definition.string.interpolation.end"', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.end';
        // act
        const lineToken = test_utils_1.tokenizeLine('<div>${foo}</div>');
        // assert
        const token = test_utils_1.getTokenOnCharRange(lineToken, 10, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize string interpolation in attribute with correct scopes', () => {
        // act
        const lineToken = test_utils_1.tokenizeLine('<div class="${foo}"></div>');
        // assert
        const startToken = test_utils_1.getTokenOnCharRange(lineToken, 12, 14);
        const middleToken = test_utils_1.getTokenOnCharRange(lineToken, 14, 17);
        const endToken = test_utils_1.getTokenOnCharRange(lineToken, 17, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(startToken.scopes, 'punctuation.definition.string.interpolation.start'));
        chai_1.assert.isOk(test_utils_1.hasScope(middleToken.scopes, 'meta.string.interpolation'));
        chai_1.assert.isOk(test_utils_1.hasScope(endToken.scopes, 'punctuation.definition.string.interpolation.end'));
    });
    it('must tokenize string interpolation in attribute with scope "punctuation.definition.string.interpolation.start"', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.start';
        // act
        const lineToken = test_utils_1.tokenizeLine('<div class="${foo}"></div>');
        // assert
        const token = test_utils_1.getTokenOnCharRange(lineToken, 12, 14);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize string interpolation in attribute with scope "punctuation.definition.string.interpolation.end"', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.end';
        // act
        const lineToken = test_utils_1.tokenizeLine('<div class="${foo}"></div>');
        // assert
        const token = test_utils_1.getTokenOnCharRange(lineToken, 17, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize string interpolation with condition with correct scopes', () => {
        // act
        const lineToken = test_utils_1.tokenizeLine('${foo === true ? "a" : "b"}');
        // assert
        const startToken = test_utils_1.getTokenOnCharRange(lineToken, 0, 2);
        const middleToken = test_utils_1.getTokenOnCharRange(lineToken, 2, 26);
        const endToken = test_utils_1.getTokenOnCharRange(lineToken, 26, 27);
        chai_1.assert.isOk(test_utils_1.hasScope(startToken.scopes, 'punctuation.definition.string.interpolation.start'));
        chai_1.assert.isOk(test_utils_1.hasScope(middleToken.scopes, 'meta.string.interpolation'));
        chai_1.assert.isOk(test_utils_1.hasScope(endToken.scopes, 'punctuation.definition.string.interpolation.end'));
    });
    it('must tokenize string interpolation with condition with scope "punctuation.definition.string.interpolation.start"', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.start';
        // act
        const lineToken = test_utils_1.tokenizeLine('${foo === true ? "a" : "b"}');
        // assert
        const token = test_utils_1.getTokenOnCharRange(lineToken, 0, 2);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize string interpolation with condition with scope "punctuation.definition.string.interpolation.end"', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.end';
        // act
        const lineToken = test_utils_1.tokenizeLine('${foo === true ? "a" : "b"}');
        // assert
        const token = test_utils_1.getTokenOnCharRange(lineToken, 26, 27);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize only the last } with the scope "punctuation.definition.string.interpolation.end", resolves issue #48', () => {
        // arrange
        const scope = 'punctuation.definition.string.interpolation.end';
        // act
        const lineToken = test_utils_1.tokenizeLine('<span innerHTML="${\'foo\' & t: {a: \'/foo\'}}"></span>');
        // assert
        const closeToken = test_utils_1.getTokenOnCharRange(lineToken, 41, 42);
        chai_1.assert.isOk(test_utils_1.hasScope(closeToken.scopes, scope));
        const tokenInText = test_utils_1.getTokenOnCharRange(lineToken, 19, 41);
        chai_1.assert.isNotOk(test_utils_1.hasScope(tokenInText.scopes, scope));
    });
});
//# sourceMappingURL=string-interpolation.test.js.map