"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class ArticleElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <article> element represents a self-contained composition in a document, page, 
  application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). 
  Examples include: a forum post, a magazine or newspaper article, or a blog entry.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article';
        this.ariaRoles.push(...['application', 'document', 'feed', 'main', 'presentation', 'region']);
    }
}
exports.default = ArticleElement;
//# sourceMappingURL=articleElement.js.map