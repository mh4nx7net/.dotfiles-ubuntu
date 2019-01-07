"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax view attribute', () => {
    it(`must tokenize view='' attribute with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<tr repeat.for="r of [\'A\',\'B\',\'A\',\'B\']" as-element="compose" view=\'./template_${r}.html\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 61, 65);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize view="" attribute with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<tr repeat.for="r of [\'A\',\'B\',\'A\',\'B\']" as-element="compose" view="./template_${r}.html">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 61, 65);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize view="" attribute with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<tr repeat.for="r of [\'A\',\'B\',\'A\',\'B\']" as-element="compose" view="./template_${r}.html">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 61, 65);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize as-element="compose"view="" attribute with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'entity.other.attribute-name.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<tr as-element="compose"view="./template_${r}.html">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 24, 28);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class="(view)" with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.block.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class="view">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 16);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize class='(view)' with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.block.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div class=\'view\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 12, 16);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize some(view)="" with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose someview="" />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize some(view)='' with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose someview=\'\' />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (view)some="" with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose viewsome="" />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (view)some='' with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose viewsome=\'\' />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 17);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize some-view="" with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose some-view="" />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize some-view='' with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose some-view=\'\' />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize view-some="" with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose view-some="" />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize view-some='' with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'meta.tag.inline.any.html';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose view-some=\'\' />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 18);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize (view).ref="foo"> attribute with scope "view.attribute.html.au"', () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose view.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize (view).ref="foo" > attribute with scope "view.attribute.html.au"', () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose view.ref="foo" >');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view).ref='foo'> attribute with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose view.ref=\'foo\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view).ref='foo' > attribute with scope "view.attribute.html.au"`, () => {
        // arrange
        let scope = 'view.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose view.ref=\'foo\' >');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 9, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=view.test.js.map