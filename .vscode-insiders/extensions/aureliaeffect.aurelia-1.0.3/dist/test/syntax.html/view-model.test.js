"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe(`The Aurelia HTML syntax view-model attribute`, () => {
    it(`must tokenize (view-model).bind attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view-model).one-way attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model.one-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view-model).two-way attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model.two-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view-model).one-time attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model.one-time="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view-model).ref attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model.ref="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 15);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view-model)="foo" attribute with scope "view-model.attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<compose model.bind="item" view-model="foo" />');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 27, 37);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (view-model-foo)="foo" attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div view-model-foo="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 19);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (foo-view-model)="foo" attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div foo-view-model="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 5, 19);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize a="(view-model)" attribute with scope "attribute.html.au"`, () => {
        // arrange
        let scope = 'view-model.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<div a="view-model">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 8, 18);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=view-model.test.js.map