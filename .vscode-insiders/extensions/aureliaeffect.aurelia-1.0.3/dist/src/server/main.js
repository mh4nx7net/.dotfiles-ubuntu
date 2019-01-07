"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const vscode_languageserver_1 = require("vscode-languageserver");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const CompletionItemFactory_1 = require("./CompletionItemFactory");
const _elementLibrary_1 = require("./Completions/Library/_elementLibrary");
const AureliaSettings_1 = require("./AureliaSettings");
const ProcessFiles_1 = require("./FileParser/ProcessFiles");
const HtmlValidator_1 = require("./Validations/HtmlValidator");
const HtmlInvalidCaseCodeAction_1 = require("./CodeActions/HtmlInvalidCaseCodeAction");
const OneWayBindingDeprecatedCodeAction_1 = require("./CodeActions/OneWayBindingDeprecatedCodeAction");
const AureliaApplication_1 = require("./FileParser/Model/AureliaApplication");
const NormalizePath_1 = require("./Util/NormalizePath");
// Bind console.log & error to the Aurelia output
const connection = vscode_languageserver_1.createConnection();
console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);
const documents = new vscode_languageserver_1.TextDocuments();
documents.listen(connection);
// Setup Aurelia dependency injection
const globalContainer = new aurelia_dependency_injection_1.Container();
const completionItemFactory = globalContainer.get(CompletionItemFactory_1.default);
const aureliaApplication = globalContainer.get(AureliaApplication_1.AureliaApplication);
const settings = globalContainer.get(AureliaSettings_1.default);
// Register characters to lisen for
connection.onInitialize((params) => __awaiter(this, void 0, void 0, function* () {
    // TODO: find better way/place to init this
    const dummy = globalContainer.get(_elementLibrary_1.default);
    return {
        capabilities: {
            completionProvider: { resolveProvider: false, triggerCharacters: ['<', ' ', '.', '[', '"', '\''] },
            codeActionProvider: true,
            textDocumentSync: documents.syncKind,
        },
    };
}));
const codeActions = [
    new HtmlInvalidCaseCodeAction_1.HtmlInvalidCaseCodeAction(),
    new OneWayBindingDeprecatedCodeAction_1.OneWayBindingDeprecatedCodeAction()
];
connection.onCodeAction((codeActionParams) => __awaiter(this, void 0, void 0, function* () {
    const diagnostics = codeActionParams.context.diagnostics;
    const document = documents.get(codeActionParams.textDocument.uri);
    const commands = [];
    for (const diagnostic of diagnostics) {
        const action = codeActions.find(i => i.name == diagnostic.code);
        if (action) {
            commands.push(yield action.commands(diagnostic, document));
        }
    }
    return commands;
}));
// Register and get changes to Aurelia settings
connection.onDidChangeConfiguration((change) => __awaiter(this, void 0, void 0, function* () {
    settings.quote = change.settings.aurelia.autocomplete.quotes === 'single' ? '\'' : '"';
    settings.validation = change.settings.aurelia.validation;
    settings.bindings.data = change.settings.aurelia.autocomplete.bindings.data;
    settings.featureToggles = change.settings.aurelia.featureToggles;
    yield featureToggles(settings.featureToggles);
}));
// Setup Validation
const validator = globalContainer.get(HtmlValidator_1.HtmlValidator);
documents.onDidChangeContent((change) => __awaiter(this, void 0, void 0, function* () {
    const diagnostics = yield validator.doValidation(change.document);
    connection.sendDiagnostics({ uri: change.document.uri, diagnostics });
}));
// Lisen for completion requests
connection.onCompletion(textDocumentPosition => {
    let document = documents.get(textDocumentPosition.textDocument.uri);
    let text = document.getText();
    let offset = document.offsetAt(textDocumentPosition.position);
    let triggerCharacter = text.substring(offset - 1, offset);
    let position = textDocumentPosition.position;
    return completionItemFactory.create(triggerCharacter, position, text, offset, textDocumentPosition.textDocument.uri);
});
connection.onRequest('aurelia-view-information', (filePath) => {
    return aureliaApplication.components.find(doc => doc.paths.indexOf(NormalizePath_1.normalizePath(filePath)) > -1);
});
connection.listen();
function featureToggles(featureToggles) {
    return __awaiter(this, void 0, void 0, function* () {
        if (settings.featureToggles.smartAutocomplete) {
            console.log('smart auto complete init');
            try {
                let fileProcessor = new ProcessFiles_1.default();
                yield fileProcessor.processPath();
                aureliaApplication.components = fileProcessor.components;
            }
            catch (ex) {
                console.log('------------- FILE PROCESSOR ERROR ---------------------');
                console.log(JSON.stringify(ex));
            }
        }
    });
}
//# sourceMappingURL=main.js.map