"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const util = require("../utils");
const utils_1 = require("../utils");
const log_1 = require("../utils/log");
const outlines = {};
const occurrences = {};
const folding = {};
class OpenFileTracker {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.disposables = [];
        this.lastPriorityFiles = [];
        this.disposables.push(vscode_1.workspace.onDidOpenTextDocument((td) => this.updatePriorityFiles()));
        this.disposables.push(vscode_1.workspace.onDidCloseTextDocument((td) => {
            delete outlines[utils_1.fsPath(td.uri)];
            delete occurrences[utils_1.fsPath(td.uri)];
            delete folding[utils_1.fsPath(td.uri)];
            this.updatePriorityFiles();
        }));
        this.disposables.push(vscode_1.window.onDidChangeActiveTextEditor((e) => this.updatePriorityFiles()));
        this.disposables.push(this.analyzer.registerForAnalysisOutline((o) => outlines[o.file] = o.outline));
        this.disposables.push(this.analyzer.registerForAnalysisOccurrences((o) => occurrences[o.file] = o.occurrences));
        this.disposables.push(this.analyzer.registerForAnalysisFolding((f) => folding[f.file] = f.regions));
        this.updatePriorityFiles(); // Handle already-open files.
    }
    updatePriorityFiles() {
        const isAnalyzeable = this.analyzer.capabilities.supportsPriorityFilesOutsideAnalysisRoots
            ? util.isAnalyzable
            : util.isAnalyzableAndInWorkspace;
        const validPathsFor = (paths) => paths
            .filter((doc) => !doc.isClosed && isAnalyzeable(doc))
            .map((doc) => utils_1.fsPath(doc.uri))
            .sort((path1, path2) => path1.localeCompare(path2));
        // Within visible/otherActive we sort by name so we get the same results if files are in a different
        // order; this is to reduce changing too much in the AS (causing more work) since we don't really care about
        // about the relative difference within these groups.
        const visibleDocumentPaths = validPathsFor(vscode_1.window.visibleTextEditors.map((editor) => editor.document));
        const otherOpenDocuments = validPathsFor(vscode_1.workspace.textDocuments)
            .filter((path) => visibleDocumentPaths.indexOf(path) === -1);
        const priorityFiles = visibleDocumentPaths.concat(otherOpenDocuments);
        // Check the files have changed before sending the results.
        const filesHaveChanged = this.lastPriorityFiles.length !== priorityFiles.length
            || this.lastPriorityFiles.some((f, i) => f !== priorityFiles[i]);
        if (!filesHaveChanged)
            return;
        // Keep track of files to compare next time.
        this.lastPriorityFiles = priorityFiles;
        // Set priority files.
        this.analyzer.analysisSetPriorityFiles({
            files: priorityFiles,
        }).then(() => { }, (e) => log_1.logError(e)); // tslint:disable-line:no-empty
        // Set subscriptions.
        this.analyzer.analysisSetSubscriptions({
            subscriptions: {
                CLOSING_LABELS: this.analyzer.capabilities.supportsClosingLabels ? priorityFiles : undefined,
                FOLDING: priorityFiles,
                OCCURRENCES: priorityFiles,
                OUTLINE: priorityFiles,
            },
        }).then(() => { }, (e) => log_1.logError(e)); // tslint:disable-line:no-empty
    }
    static getOutlineFor(file) {
        return outlines[utils_1.fsPath(file)];
    }
    static getOccurrencesFor(file) {
        return occurrences[utils_1.fsPath(file)];
    }
    static getFoldingRegionsFor(file) {
        return folding[utils_1.fsPath(file)];
    }
    dispose() {
        this.disposables.forEach((d) => d.dispose());
    }
}
exports.OpenFileTracker = OpenFileTracker;
//# sourceMappingURL=open_file_tracker.js.map