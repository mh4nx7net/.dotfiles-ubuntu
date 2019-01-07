"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax view-spy attribute', () => {
    it('must tokenize view-spy attribute with scope "view-spy.attribute.html.au"', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p view-spy foo="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 11);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize view-spy="" attribute', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p view-spy="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 11);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize view-spy-foo="" attribute', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p view-spy-foo="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 15);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize foo-containerles="" attribute', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p foo-view-spy="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 15);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize foo-view-spy="boo" attribute', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p foo-view-spy="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 15);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize view-spyfoo="boo" attribute', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p view-spyfoo="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 14);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize compile-spy attribute', () => {
        // arrange
        let scope = 'view-spy.attribute.html.au';
        // act
        let template = '<template view-spy></template>';
        let lineToken = test_utils_1.tokenizeLine(template);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 18);
        chai_1.assert.isDefined(token);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=view-spy.test.js.map