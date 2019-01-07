"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax', () => {
    it('must tokenize element with dash with scope "entity.name.tag.other.html"', () => {
        // arrange
        let scope = 'entity.name.tag.other.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<any-element>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 12);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize closing element with dash with scope "entity.name.tag.other.html"', () => {
        // arrange
        let scope = 'entity.name.tag.other.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('</any-element>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 2, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize element with scope "entity.name.tag.other.html"', () => {
        // arrange
        let scope = 'entity.name.tag.other.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<anyelement>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize closing element with scope "entity.name.tag.other.html"', () => {
        // arrange
        let scope = 'entity.name.tag.other.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('</anyelement>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 2, 12);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize inline element with dash as scope "entity.name.tag.other.html"', () => {
        // arrange
        let scope = 'entity.name.tag.other.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<input-type>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize block element with dash as scope "entity.name.tag.other.html"', () => {
        // arrange
        let scope = 'entity.name.tag.other.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<aside-type>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 1, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=generic.test.js.map