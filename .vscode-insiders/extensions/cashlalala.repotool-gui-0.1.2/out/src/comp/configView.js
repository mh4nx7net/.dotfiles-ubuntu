'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const ext = require("../extension");
const baseView = require("./baseView");
const pfutil = require("../util/platformUtil");
const cmnUtil = require("../util/commonUtil");
class ConfigView extends baseView.BaseContentProvider {
    constructor(context) {
        super();
        this.context = context;
        this.title = "Repotool GUI Config";
        this.scheme = "plugin-cfg";
        this.previewUri = `${this.scheme}://plugin-cfg/setting`;
    }
    renderHeader() {
        return `
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'css', 'bootstrap.min.css'))}" >
                <link rel="stylesheet" href="${this.getScriptFilePath(path.join('bootstrap-select-1.12.1', 'css', 'bootstrap-select.min.css'))}" >
                
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js'))}"></script>              
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'js', 'bootstrap.min.js'))}"></script>
                <script type="text/javascript" src="${this.getScriptFilePath(path.join('bootstrap-select-1.12.1', 'js', 'bootstrap-select.min.js'))}"></script>
                <style>
                body {
                    margin: 10px;
                }
                .save-btn {
                    margin: 10px;
                }
                </style>
            </head>
        `;
    }
    renderConfig(errMsg = "") {
        if (errMsg) {
            return errMsg.replace("\n", "<br>");
        }
        let view = fs.readFileSync(this.getHtmlFilePath('config.html')).toString();
        var msg = `${this.renderHeader()}
                    <script type="text/javascript">
                        var sysCfg=${JSON.stringify(ext.Global.config)};
                        var isWindows = ${(pfutil.isWindows()) ? "true" : "false"};
                    </script>
                   ${view}
                   <script type="text/javascript" src="${this.getScriptFilePath(path.join('config.js'))}"></script>`;
        // cmnUtil.showConsoleMessage(msg);
        return msg;
    }
    ;
    config(root) {
        return this.renderConfig();
    }
    createSnippet(uri) {
        cmnUtil.showConsoleMessage("updating " + uri.toString());
        return this.config(ext.Global.realpath);
    }
}
exports.ConfigView = ConfigView;
//# sourceMappingURL=configView.js.map