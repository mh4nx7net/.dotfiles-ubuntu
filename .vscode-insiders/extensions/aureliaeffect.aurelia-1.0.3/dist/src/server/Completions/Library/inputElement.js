"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class InputElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <input> element is used to create interactive controls for web-based forms in 
  order to accept data from the user. How an <input> works varies considerably depending on the value of its 
  type attribute.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input';
        this.attributes.set('type', new _elementStructure_1.BindableAttribute('The type of control to display. The default type is text, if this attribute is not specified.', null, null, null, null, new Map([
            ['button', new _elementStructure_1.Value(`A push button with no default behavior.`)],
            ['checkbox', new _elementStructure_1.Value(`A check box. You must use the value attribute to define the value submitted by this item. Use the checked attribute to indicate whether this item is selected. You can also use the indeterminate attribute (which can only be set programmatically) to indicate that the checkbox is in an indeterminate state (on most platforms, this draws a horizontal line across the checkbox).`)],
            ['color', new _elementStructure_1.Value(`HTML5 A control for specifying a color. A color picker's UI has no required features other than accepting simple colors as text (more info).`)],
            ['date', new _elementStructure_1.Value(`HTML5 A control for entering a date (year, month, and day, with no time).`)],
            ['datetime-local', new _elementStructure_1.Value(`HTML5 A control for entering a date and time, with no time zone.`)],
            ['email', new _elementStructure_1.Value(`HTML5 A field for editing an e-mail address. The input value is validated to contain either the empty string or a single valid e-mail address before submitting. The :valid and :invalid CSS pseudo-classes are applied as appropriate.`)],
            ['file', new _elementStructure_1.Value(`A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select.`)],
            ['hidden', new _elementStructure_1.Value(`A control that is not displayed but whose value is submitted to the server.`)],
            ['image', new _elementStructure_1.Value(`A graphical submit button. You must use the src attribute to define the source of the image and the alt attribute to define alternative text. You can use the height and width attributes to define the size of the image in pixels.`)],
            ['month', new _elementStructure_1.Value(`A control for entering a month and year, with no time zone.`)],
            ['number', new _elementStructure_1.Value(`A control for entering a floating point number.`)],
            ['password', new _elementStructure_1.Value(`A single-line text field whose value is obscured. Use the maxlength attribute to specify the maximum length of the value that can be entered.`)],
            ['radio', new _elementStructure_1.Value(`A radio button. You must use the value attribute to define the value submitted by this item. Use the checked attribute to indicate whether this item is selected by default. Radio buttons that have the same value for the name attribute are in the same \"radio button group\". Only one radio button in a group can be selected at a time.`)],
            ['range', new _elementStructure_1.Value(`A control for entering a number whose exact value is not important. This type control uses the following default values if the corresponding attributes are not specified:\n   \n    min: 0\n    max: 100\n    value: min + (max - min) / 2, or min if max is less than min\n    step: 1\n   \n`)],
            ['reset', new _elementStructure_1.Value(`A button that resets the contents of the form to default values.`)],
            ['search', new _elementStructure_1.Value(`A single-line text field for entering search strings. Line-breaks are automatically removed from the input value.`)],
            ['submit', new _elementStructure_1.Value(`A button that submits the form.`)],
            ['tel', new _elementStructure_1.Value(`A control for entering a telephone number. Line-breaks are automatically removed from the input value, but no other syntax is enforced. You can use attributes such as pattern and maxlength to restrict values entered in the control. The :valid and :invalid CSS pseudo-classes are applied as appropriate.`)],
            ['text', new _elementStructure_1.Value(`A single-line text field. Line-breaks are automatically removed from the input value.`)],
            ['time', new _elementStructure_1.Value(`A control for entering a time value with no time zone.`)],
            ['url', new _elementStructure_1.Value(`A field for editing a URL. The input value is validated to contain either the empty string or a valid absolute URL before submitting. Line-breaks and leading or trailing whitespace are automatically removed from the input value. You can use attributes such as pattern and maxlength to restrict values entered in the control. The :valid and :invalid CSS pseudo-classes are applied as appropriate.`)],
            ['week', new _elementStructure_1.Value(`A control for entering a date consisting of a week-year number and a week number with no time zone.`)]
        ])));
        this.attributes.set('accept', new _elementStructure_1.BindableAttribute(`If the value of the type attribute is file, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored.`));
        this.attributes.set('autocomplete', new _elementStructure_1.BindableAttribute(`This attribute indicates whether the value of the control can be automatically completed by the browser.`, null, null, null, null, new Map([
            ['off', new _elementStructure_1.Value(`The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method. The browser does not automatically complete the entry.`)],
            ['on', new _elementStructure_1.Value(`The browser is allowed to automatically complete the value based on values that the user has entered during previous uses, however on does not provide any further information about what kind of data the user might be expected to enter.`)],
            ['name', new _elementStructure_1.Value(`Full name`)],
            ['honorific-prefix', new _elementStructure_1.Value(`Prefix or title (e.g. \"Mr.\", \"Ms.\", \"Dr.\", \"Mlle\").`)],
            ['given-name', new _elementStructure_1.Value(`First name.`)],
            ['additional-name', new _elementStructure_1.Value(`Middle name.`)],
            ['family-name', new _elementStructure_1.Value(`Last name.`)],
            ['honorific-suffix', new _elementStructure_1.Value(`Suffix (e.g. \"Jr.\", \"B.Sc.\", \"MBASW\", \"II\").`)],
            ['nickname', new _elementStructure_1.Value(`nickname`)],
            ['email', new _elementStructure_1.Value(`email`)],
            ['username', new _elementStructure_1.Value(`username`)],
            ['new-password', new _elementStructure_1.Value(`A new password (e.g. when creating an account or changing a password).`)],
            ['current-password', new _elementStructure_1.Value(`current-password`)],
            ['organization-title', new _elementStructure_1.Value(`Job title (e.g. \"Software Engineer\", \"Senior Vice President\", \"Deputy Managing Director\").`)],
            ['organization', new _elementStructure_1.Value(`organization`)],
            ['street-address', new _elementStructure_1.Value(`street-address`)],
            ['address-line1', new _elementStructure_1.Value(`address-line1`)],
            ['country', new _elementStructure_1.Value(`country`)],
            ['country-name', new _elementStructure_1.Value(`country-name`)],
            ['postal-code', new _elementStructure_1.Value(`postal-code`)],
            ['cc-name', new _elementStructure_1.Value(`Full name as given on the payment instrument.`)],
            ['cc-given-name', new _elementStructure_1.Value(`cc-given-name`)],
            ['cc-additional-name', new _elementStructure_1.Value(`cc-additional-name`)],
            ['cc-family-name', new _elementStructure_1.Value(`cc-family-name`)],
            ['cc-number', new _elementStructure_1.Value(`Code identifying the payment instrument (e.g. the credit card number).`)],
            ['cc-exp', new _elementStructure_1.Value(`Expiration date of the payment instrument.`)],
            ['cc-exp-month', new _elementStructure_1.Value(`cc-exp-month`)],
            ['cc-exp-year', new _elementStructure_1.Value(`cc-exp-year`)],
            ['cc-csc', new _elementStructure_1.Value(`Security code for the payment instrument.`)],
            ['cc-type', new _elementStructure_1.Value(`Type of payment instrument (e.g. Visa).`)],
            ['transaction-currency', new _elementStructure_1.Value(`transaction-currency`)],
            ['transaction-amount', new _elementStructure_1.Value(`transaction-amount`)],
            ['language', new _elementStructure_1.Value(`Preferred language, valid BCP 47 language tag.`)],
            ['bday', new _elementStructure_1.Value(`bday`)],
            ['bday-day', new _elementStructure_1.Value(`bday-day`)],
            ['bday-month', new _elementStructure_1.Value(`bday-month`)],
            ['bday-year', new _elementStructure_1.Value(`bday-year`)],
            ['sex', new _elementStructure_1.Value(`Gender identity (e.g. Female, Fa'afafine), free-form text, no newlines.`)],
            ['tel', new _elementStructure_1.Value(`tel`)],
            ['url', new _elementStructure_1.Value(`Home page or other Web page corresponding to the company, person, address, or contact information in the other fields associated with this field.`)],
            ['photo', new _elementStructure_1.Value(`Photograph, icon, or other image corresponding to the company, person, address, or contact information in the other fields associated with this field.`)],
        ])));
    }
}
exports.default = InputElement;
//# sourceMappingURL=inputElement.js.map