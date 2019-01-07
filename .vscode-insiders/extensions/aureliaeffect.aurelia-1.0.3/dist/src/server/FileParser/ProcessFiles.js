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
const Path = require("path");
const typescript_1 = require("typescript");
const WebComponent_1 = require("./Model/WebComponent");
const AureliaHtmlParser_1 = require("./Parsers/AureliaHtmlParser");
const ViewModelDocument_1 = require("./Model/ViewModelDocument");
const NormalizePath_1 = require("./../Util/NormalizePath");
class ProcessFiles {
    constructor() {
        this.components = new Array();
    }
    processPath() {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceDirectory = Path.join(typescript_1.sys.getCurrentDirectory(), '/src/');
            const paths = typescript_1.sys.readDirectory(sourceDirectory, ['ts', 'js', 'html']);
            for (let path of paths) {
                path = NormalizePath_1.normalizePath(path);
                try {
                    const name = Path.basename(path).replace(/\.(ts|js|html)$/, '').split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-');
                    const component = this.findOrCreateWebComponentBy(name);
                    if (component.paths.indexOf(path) === -1) {
                        component.paths.push(path);
                    }
                    switch (Path.extname(path)) {
                        case '.ts':
                            const fileContent = typescript_1.sys.readFile(path, 'utf8');
                            const result = processSourceFile(path, fileContent, 'typescript');
                            component.viewModel = new ViewModelDocument_1.ViewModelDocument();
                            component.viewModel.type = "typescript";
                            if (result && result.result.length) {
                                var defaultExport = result.result.find(cl => cl.modifiers && cl.modifiers.indexOf('default') > -1);
                                if (defaultExport) {
                                    component.viewModel.properties = defaultExport.properties;
                                    component.viewModel.methods = defaultExport.methods;
                                }
                                else {
                                    component.viewModel.properties = result.result[0].properties;
                                    component.viewModel.methods = result.result[0].methods;
                                }
                                for (const classDef of result.result) {
                                    if (classDef === defaultExport) {
                                        continue;
                                    }
                                    if (classDef.modifiers && classDef.modifiers.indexOf('export') > -1) {
                                        component.classes.push({
                                            name: classDef.name,
                                            methods: classDef.methods
                                        });
                                    }
                                }
                            }
                            break;
                        case '.js':
                            //console.log('proces js', path);
                            break;
                        case '.html':
                            const htmlTemplate = yield new AureliaHtmlParser_1.AureliaHtmlParser().processFile(path);
                            component.document = htmlTemplate;
                            break;
                    }
                    // replace it
                    const idx = this.components.findIndex(c => c.name === component.name);
                    if (idx === -1) {
                        this.components.push(component);
                    }
                    else {
                        this.components[idx] = component;
                    }
                }
                catch (ex) {
                    console.log(`failed to parse path ${path}`);
                    console.log(JSON.stringify(ex));
                }
            }
        });
    }
    findOrCreateWebComponentBy(name) {
        let component = this.components.find(c => c.name === name);
        if (!component) {
            component = new WebComponent_1.WebComponent(name);
        }
        return component;
    }
}
exports.default = ProcessFiles;
function processSourceFile(fileName, content, type) {
    let sourceFile = typescript_1.createSourceFile(fileName, content, typescript_1.ScriptTarget.Latest, true, type === "typescript" ? typescript_1.ScriptKind.TS : typescript_1.ScriptKind.JS);
    return {
        result: processFile(sourceFile),
        uri: fileName
    };
}
exports.processSourceFile = processSourceFile;
function processFile(sourceFile) {
    let getCodeInformation = (node) => {
        let classes = [];
        typescript_1.forEachChild(node, n => {
            if (n.kind === typescript_1.SyntaxKind.ClassDeclaration) {
                classes.push(processClassDeclaration(n));
            }
        });
        return classes;
    };
    return getCodeInformation(sourceFile);
}
function processClassDeclaration(node) {
    let properties = [];
    let methods = [];
    if (!node) {
        return { properties, methods };
    }
    let declaration = node;
    if (declaration.members) {
        for (let member of declaration.members) {
            switch (member.kind) {
                case typescript_1.SyntaxKind.PropertyDeclaration:
                    let property = member;
                    const propertyModifiers = property.modifiers.map(i => i.getText());
                    if (propertyModifiers.indexOf("private") > -1) {
                        continue;
                    }
                    const propertyName = property.name.getText();
                    let propertyType = undefined;
                    if (property.type) {
                        propertyType = property.type.getText();
                    }
                    properties.push({
                        name: propertyName,
                        modifiers: propertyModifiers,
                        type: propertyType
                    });
                    break;
                case typescript_1.SyntaxKind.GetAccessor:
                    break;
                case typescript_1.SyntaxKind.MethodDeclaration:
                    let memberDeclaration = member;
                    const memberModifiers = memberDeclaration.modifiers.map(i => i.getText());
                    if (memberModifiers.indexOf("private") > -1) {
                        continue;
                    }
                    let memberName = memberDeclaration.name.getText();
                    let memberReturnType = undefined;
                    if (memberDeclaration.type) {
                        memberReturnType = memberDeclaration.type.getText();
                    }
                    let params = [];
                    if (memberDeclaration.parameters) {
                        for (let param of memberDeclaration.parameters) {
                            const p = param;
                            params.push(p.name.getText());
                        }
                    }
                    methods.push({
                        name: memberName,
                        returnType: memberReturnType,
                        modifiers: memberModifiers,
                        parameters: params
                    });
                    break;
            }
        }
    }
    let classModifiers = [];
    if (declaration.modifiers) {
        classModifiers = declaration.modifiers.map(m => m.getText());
    }
    return {
        name: declaration.name.getText(),
        properties,
        methods,
        modifiers: classModifiers
    };
}
//# sourceMappingURL=ProcessFiles.js.map