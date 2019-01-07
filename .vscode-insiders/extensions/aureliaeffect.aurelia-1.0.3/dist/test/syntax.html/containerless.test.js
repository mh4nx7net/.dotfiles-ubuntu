"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("./test.utils");
describe('The Aurelia HTML syntax containerles attribute', () => {
    it('must tokenize containerless attribute with scope "containerless.attribute.html.au"', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template containerless foo="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 23);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize containerless="" attribute', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template containerless="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 23);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize containerless-foo="" attribute', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template containerless-foo="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize foo-containerles="" attribute', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template foo-containerless="">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize foo-containerless="boo" attribute', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template foo-containerless="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 27);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must not tokenize containerlessfoo="boo" attribute', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let lineToken = test_utils_1.tokenizeLine('<template containerlessfoo="boo">');
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 26);
        chai_1.assert.isDefined(token);
        chai_1.assert.isNotOk(test_utils_1.hasScope(token.scopes, scope));
    });
    it('must tokenize containerless attribute', () => {
        // arrange
        let scope = 'containerless.attribute.html.au';
        // act
        let template = '<template containerless></template>';
        let lineToken = test_utils_1.tokenizeLine(template);
        // assert
        let token = test_utils_1.getTokenOnCharRange(lineToken, 10, 23);
        chai_1.assert.isDefined(token);
        chai_1.assert.isOk(test_utils_1.hasScope(token.scopes, scope));
    });
});
//# sourceMappingURL=containerless.test.js.map