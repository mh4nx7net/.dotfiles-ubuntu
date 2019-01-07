"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const path = require("path");
const constants_1 = require("../common/constants");
const types_1 = require("../common/process/types");
const types_2 = require("../common/types");
const types_3 = require("../ioc/types");
let TemplateEngine = class TemplateEngine {
    constructor(serviceContainer) {
        this.executionServiceFactory = serviceContainer.get(types_1.IPythonExecutionFactory);
        this.currentProcess = serviceContainer.get(types_1.ICurrentProcess);
        this.logger = serviceContainer.get(types_2.ILogger);
        this.executionService = new Map();
    }
    render(template, variables, workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.renderInternal(variables, workspaceFolder, template);
        });
    }
    renderFile(templateFile, variables, workspaceFolder) {
        return this.renderInternal(variables, workspaceFolder, undefined, templateFile);
    }
    renderInternal(variables, workspaceFolder, template, templateFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (templateFile) {
                this.logger.info(`Rendering tempalte file '${templateFile}'`);
            }
            else {
                this.logger.info(`Rendering tempalte '${template.substring(0, 50)}...'`);
            }
            if (!this.executionService.has(workspaceFolder.fsPath)) {
                this.executionService.set(workspaceFolder.fsPath, yield this.executionServiceFactory.create({ resource: workspaceFolder }));
            }
            const executionService = this.executionService.get(workspaceFolder.fsPath);
            const PYTHONPATH = path.join(constants_1.ExtensionRootDirectory, 'python_files', 'packages');
            const file = path.join(constants_1.ExtensionRootDirectory, 'python_files', 'render_template.py');
            // When using templates within variable, we look for items prefixed with `cookiecutter.`
            // This will be used when rendering the templates
            const cookiecutter = {};
            Object.keys(variables).forEach(key => {
                cookiecutter[key] = variables[key];
            });
            const input = { template_vars: Object.assign({}, variables, { cookiecutter }), content: template, file: templateFile };
            const processEnv = this.currentProcess.env;
            const output = yield executionService.exec([file, JSON.stringify(input)], { env: Object.assign({ PYTHONPATH }, processEnv), throwOnStdErr: true });
            return output.stdout;
        });
    }
};
TemplateEngine = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_3.IServiceContainer))
], TemplateEngine);
exports.TemplateEngine = TemplateEngine;
//# sourceMappingURL=engine.js.map