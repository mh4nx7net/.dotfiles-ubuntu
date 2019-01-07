"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class FormElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <form> element represents a document section that contains interactive controls to submit information to a web server.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form';
        this.ariaRoles.push(...['group', 'presentation']);
        this.attributes.set('accept-charset', new _elementStructure_1.BindableAttribute(`A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string "UNKNOWN", indicates the same encoding as that of the document containing the form element.
In previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.`));
        this.attributes.set('action', new _elementStructure_1.BindableAttribute(`The URI of a program that processes the form information. This value can be overridden by a formaction attribute on a <button> or <input> element.`));
        this.attributes.set('autocomplete', new _elementStructure_1.BindableAttribute(`Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an autocomplete attribute on an element belonging to the form.`, null, null, null, null, new Map([
            ['off', new _elementStructure_1.Value(`The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.`)],
            ['on', new _elementStructure_1.Value(`The browser can automatically complete values based on values that the user has previously entered in the form.`)],
        ])));
        this.attributes.set('enctype', new _elementStructure_1.BindableAttribute(`When the value of the method attribute is post, enctype is the MIME type of content that is used to submit the form to the server.`, null, null, null, null, new Map([
            ['application/x-www-form-urlencoded', new _elementStructure_1.Value(`The default value if the attribute is not specified.`)],
            ['multipart/form-data', new _elementStructure_1.Value(`The value used for an <input> element with the type attribute set to "file".`)],
            ['text/plain', new _elementStructure_1.Value(`HTML5`)],
        ])));
        this.attributes.set('method', new _elementStructure_1.BindableAttribute(`The HTTP method that the browser uses to submit the form.`, null, null, null, null, new Map([
            ['post', new _elementStructure_1.Value(`Corresponds to the HTTP POST method; form data are included in the body of the form and sent to the server.`)],
            ['get', new _elementStructure_1.Value(`Corresponds to the HTTP GET method; form data are appended to the action attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.`)],
        ])));
        this.attributes.set('name', new _elementStructure_1.BindableAttribute(`The name of the form. In HTML 4, its use is deprecated (id should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5.`));
        this.attributes.set('novalidate', new _elementStructure_1.BindableAttribute(`This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a formnovalidate attribute on a <button> or <input> element belonging to the form.`));
        this.attributes.set('target', new _elementStructure_1.BindableAttribute(`A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a browsing context (for example, tab, window, or inline frame).`, null, null, null, null, new Map([
            ['_self', new _elementStructure_1.Value(`Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.`)],
            ['_blank', new _elementStructure_1.Value(`Load the response into a new unnamed HTML 4 window or HTML5 browsing context.`)],
            ['_parent', new _elementStructure_1.Value(`Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as _self.`)],
            ['_top', new _elementStructure_1.Value(`Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as _self.`)]
        ])));
        this.events.set('submit', new _elementStructure_1.Event(`The submit event is fired when a form is submitted.`, `https://developer.mozilla.org/en-US/docs/Web/Events/submit`, false, false));
    }
}
exports.default = FormElement;
//# sourceMappingURL=formElement.js.map