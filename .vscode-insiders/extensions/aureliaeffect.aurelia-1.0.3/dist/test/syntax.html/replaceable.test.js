"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax replaceable attribute', () => {
    it('must tokenize (replaceable)> attribute with scope "replaceable.attribute.html.au"', () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replaceable>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize (replaceable) other> attribute with scope "replaceable.attribute.html.au"', () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replaceable other>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize (replaceable)="" attribute with scope "replaceable.attribute.html.au"', () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replaceable="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize (replaceable)="" other=""> attribute with scope "replaceable.attribute.html.au"', () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replaceable="" other="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (replaceable)='' attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replaceable=\'\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (replaceable)='' other=''> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template replaceable=\'\' other=\'\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class="replaceable" attribute body with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class="replaceable">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 23);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class='replaceable' attribute body with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class=\'replaceable\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 23);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    // TODO: fix
    // it(`must not tokenize class=replaceable attribute body with scope "replaceable.attribute.html.au"`, () => {
    //   // arrange
    //   let scope = 'replaceable.attribute.html.au';
    //   // act
    //   let lineToken = tokenizeLine('<div class=replaceable>');
    //   // assert
    //   let token = getTokenOnCharRange(lineToken, 10, 22);
    //   assert.isOk(!hasScope(token.scopes, scope));
    // });
    it(`must not tokenize (replaceable-some)> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div replaceable-some>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replaceable-some)=""> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div replaceable-some="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replaceable-some)=''> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div replaceable-some=\'\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-replaceable)> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some-replaceable>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-replaceable)=""> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some-replaceable="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (some-replaceable)=''> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div some-replaceable=\'\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 21);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (somereplaceable)> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div somereplaceable>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (somereplaceable)=""> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div somereplaceable="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (somereplaceable)=''> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div somereplaceable=\'\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replaceablesome)> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div replaceablesome>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replaceablesome)=""> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div replaceablesome="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (replaceablesome)=''> attribute with scope "replaceable.attribute.html.au"`, () => {
        // arrange
        let scope = 'replaceable.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div replaceablesome=\'\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 20);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=replaceable.test.js.map