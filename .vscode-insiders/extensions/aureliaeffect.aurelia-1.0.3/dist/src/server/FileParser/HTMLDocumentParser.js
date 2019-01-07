"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse5_1 = require("parse5");
const stream_1 = require("stream");
class HTMLDocumentParser {
    parse(text) {
        return new Promise((resolve, reject) => {
            let stream = new stream_1.Readable();
            stream.push(text);
            stream.push(null);
            let stack = [];
            const parser = new parse5_1.SAXParser({ locationInfo: true });
            parser.on('startTag', (name, attrs, selfClosing, location) => {
                stack.push(new TagDefinition(true, name, location.startOffset, location.endOffset, selfClosing, attrs.map(i => new AttributeDefinition(i.name, i.value, location.attrs[i.name]))));
            });
            parser.on("endTag", (name, location) => {
                stack.push(new TagDefinition(false, name, location.startOffset, location.endOffset));
            });
            stream.on('end', x => {
                resolve(stack);
            });
            stream.pipe(parser);
        });
    }
    getElementAtPosition(text, start, end) {
        return new Promise((resolve, reject) => {
            let stream = new stream_1.Readable();
            stream.push(text);
            stream.push(null);
            let tagDefinition;
            const parser = new parse5_1.SAXParser({ locationInfo: true });
            parser.on('startTag', (name, attrs, selfClosing, location) => {
                if (location.startOffset <= start && location.endOffset >= end) {
                    tagDefinition = new TagDefinition(true, name, location.startOffset, location.endOffset, selfClosing, attrs.map(i => new AttributeDefinition(i.name, i.value, location.attrs[i.name])));
                }
            });
            stream.on('end', x => {
                resolve(tagDefinition);
            });
            stream.pipe(parser);
        });
    }
}
exports.HTMLDocumentParser = HTMLDocumentParser;
class TagDefinition {
    constructor(startTag, name, startOffset, endOffset, selfClosing = null, attributes = []) {
        this.startTag = startTag;
        this.name = name;
        this.startOffset = startOffset;
        this.endOffset = endOffset;
        this.selfClosing = selfClosing;
        this.attributes = attributes;
    }
}
exports.TagDefinition = TagDefinition;
class AttributeDefinition {
    constructor(name, value, location) {
        this.value = value;
        if (name) {
            let parts = name.split('.');
            if (parts.length == 2) {
                this.name = parts[0];
                this.binding = parts[1];
            }
            else {
                this.name = name;
            }
        }
        if (location) {
            this.startOffset = location.startOffset;
            this.endOffset = location.endOffset;
        }
    }
}
exports.AttributeDefinition = AttributeDefinition;
//# sourceMappingURL=HTMLDocumentParser.js.map