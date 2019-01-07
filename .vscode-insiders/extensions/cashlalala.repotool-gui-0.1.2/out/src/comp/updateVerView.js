'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const ext = require("../extension");
const baseView = require("./baseView");
const constant = require("../util/const");
class VersionSwitchView extends baseView.BaseContentProvider {
    constructor(context) {
        super();
        this.context = context;
        this.repoChannel = ext.Global.repoChannel;
        this.title = `Switch Version`;
        this.scheme = "version-switch";
        this.previewUri = `${this.scheme}://version-switch`;
    }
    renderHeader() {
        return `
            <head>
                <link rel="stylesheet" href="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'css', 'bootstrap.min.css'))}" >
                <link rel="stylesheet" href="${this.getScriptFilePath(path.join('jq-chosen', 'chosen.min.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath(path.join('font-awesome-4.7.0', 'css', 'font-awesome.min.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath(path.join('versionswitch.css'))}" >
                
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js'))}"></script>              
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'js', 'bootstrap.min.js'))}"></script>
                <script type="text/javascript" src="${this.getScriptFilePath(path.join('jq-chosen', 'chosen.jquery.min.js'))}"></script>
                <script type="text/javascript" src="${this.getScriptFilePath(path.join('versionswitch.js'))}"></script>
                
            </head>
        `;
    }
    renderVersionSelection(errMsg = "") {
        if (errMsg) {
            return errMsg.replace("\n", "<br>");
        }
        let view = fs.readFileSync(this.getHtmlFilePath('version.html')).toString();
        let refreshCmd = vscode.Uri.parse(`command:${constant.cmd.getcodeGui}?${JSON.stringify(["1"])}`);
        view = view.replace(/\${refreshCmd}/g, refreshCmd.toString());
        view = view.replace(/\${dataline}/g, "");
        var msg = `${this.renderHeader()}
                    ${view}`;
        return msg;
    }
    ;
    switch(root) {
        return this.renderVersionSelection();
    }
    createSnippet(uri) {
        console.log("updating %s", uri.toString());
        return this.switch(ext.Global.realpath);
    }
}
exports.VersionSwitchView = VersionSwitchView;
//# sourceMappingURL=updateVerView.js.map