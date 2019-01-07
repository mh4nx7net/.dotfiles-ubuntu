"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax invoke attributes', () => {
    it('must tokenize call attribute with scope "invoke.attribute.html.au"', () => {
        // arrange
        let scope = 'invoke.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div click.call="test()">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 11, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize triger attribute with scope "invoke.attribute.html.au"', () => {
        // arrange
        let scope = 'invoke.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div click.trigger="test()">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 11, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize delegate attribute with scope "invoke.attribute.html.au"', () => {
        // arrange
        let scope = 'invoke.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div click.delegate="test()">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 11, 19);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize capture attribute with scope "invoke.attribute.html.au"', () => {
        // arrange
        let scope = 'invoke.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div click.capture="test()">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 11, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize attribute body that contains click.trigger keyword', () => {
        // arrange-
        let scope = 'meta.tag.block.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div value.bind="click.trigger">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 17, 30);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize invokes in attribute body with scope "invoke.attribute.html.au"', () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a b="draw.call:animate(data)">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 6, 29);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=invoke.test.js.map