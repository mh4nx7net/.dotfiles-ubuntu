"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax route-href attribute', () => {
    it(`must tokenize (route-href).bind="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (route-href).one-way="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href.one-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (route-href).two-way="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href.two-way="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (route-href).one-time="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href.one-time="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must tokenize (route-href)="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 13);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (route-href-foo)="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href-foo="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (foo-route-href)="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a foo-route-href="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (route-href-foo).bind="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a route-href-foo.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize (foo-route-href).bind="foo" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a foo-route-href.bind="foo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 17);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a="route-href" attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a a="route-href">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 6, 16);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
    it(`must not tokenize a='route-href' attribute with scope "route-href.attribute.html.au"`, () => {
        // arrange
        let scope = 'route-href.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<a a=\'route-href\'>');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 6, 16);
        chai_1.assert.isOk(!test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=route-href.test.js.map