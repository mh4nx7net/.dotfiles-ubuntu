"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax compile-spy attribute', () => {
    it('must tokenize compile-spy attribute with scope "compile-spy.attribute.html.au"', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p compile-spy foo="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 14);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize compile-spy="" attribute', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p compile-spy="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 14);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize compile-spy-foo="" attribute', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p compile-spy-foo="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 18);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize foo-compile-spy="" attribute', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p foo-compile-spy="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 18);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize foo-compile-spy="boo" attribute', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p foo-compile-spy="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 18);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize compile-spyfoo="boo" attribute', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<p compile-spyfoo="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 3, 17);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize compile-spy attribute', () => {
        // arrange
        let scope = 'compile-spy.attribute.html.au';
        // act
        let template = '<template compile-spy></template>';
        let lineToken = test_utils_1.tokenizeLine(template);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 21);
        chai_1.assert.isDefined(token);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=compile-spy.test.js.map