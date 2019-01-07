"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax as-element attribute', () => {
    it(`must tokenize (as-element)="item-template" attribute with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-element="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 20);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (as-element)='item-template' attribute with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-element=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 20);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (as-element) attribute with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-element>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class="as-element" attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class="as-element">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 22);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class='as-element' attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class=\'as-element\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 22);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (someas-element)="item-template" attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template someas-element="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (someas-element)='item-template' attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template someas-element=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (as-elementsome)="item-template" attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-elementsome="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (as-elementsome)='item-template' attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-elementsome=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 24);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (as-element-some)="item-template" attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-element-some="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 25);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (as-element-some)='item-template' attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template as-element-some=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 25);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-as-element)="item-template" attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template some-as-element="item-template">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 25);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-as-element)='item-template' attribute body with scope "as-element.attribute.html.au"`, () => {
        // arrange
        let scope = 'as-element.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template some-as-element=\'item-template\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 25);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=as-element.test.js.map