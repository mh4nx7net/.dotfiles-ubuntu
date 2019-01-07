"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax replace-part attribute', () => {
    it(`must tokenize (replace-part)="item-template" attribute with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-part="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 22);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (replace-part)='item-template' attribute with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-part=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 22);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replace-part) attribute with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-part>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 22);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class="replace-part" attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class="replace-part">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class='replace-part' attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class=\'replace-part\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (somereplace-part)="item-template" attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template somereplace-part="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 26);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (somereplace-part)='item-template' attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template somereplace-part=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 26);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replace-partsome)="item-template" attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-partsome="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 26);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replace-partsome)='item-template' attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-partsome=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 26);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replace-part-some)="item-template" attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-part-some="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replace-part-some)='item-template' attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replace-part-some=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-replace-part)="item-template" attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template some-replace-part="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-replace-part)='item-template' attribute body with scope "replace-part.attribute.html.au"`, () => {
        // arrange
        let scope = 'replace-part.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template some-replace-part=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=replace-part.test.js.map