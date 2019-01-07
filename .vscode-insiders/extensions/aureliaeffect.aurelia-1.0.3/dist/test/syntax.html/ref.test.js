"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax ref attribute', () => {
    it('must tokenize any.(ref) attribute with scope "ref.attribute.html.au"', () => {
        // arrange
        let scope = 'ref.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div any.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 12);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize view-model.(ref) attribute with scope "ref.attribute.html.au"', () => {
        // arrange
        let scope = 'ref.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 16, 19);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize model.(ref) attribute with scope "ref.attribute.html.au"', () => {
        // arrange
        let scope = 'ref.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div model.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 11, 14);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize view.(ref) attribute with scope "ref.attribute.html.au"', () => {
        // arrange
        let scope = 'ref.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize controller.(ref) attribute with scope "ref.attribute.html.au"', () => {
        // arrange
        let scope = 'ref.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div controller.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 16, 19);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize ref attribute with scope "ref.attribute.html.au"', () => {
        // arrange
        let scope = 'ref.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 8);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize ref part in body of other attribute', () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<meta name="referrer" content="origin-when-crossorigin">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 20);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize client.ref* part in body of other attribute', () => {
        // arrange
        let scope = 'meta.tag.block.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div data-reference-id="client.referenceId">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 24, 42);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=ref.test.js.map