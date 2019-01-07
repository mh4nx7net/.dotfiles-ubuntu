'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const util = require("util");
const ext = require("../extension");
const baseView = require("./baseView");
const constant = require("../util/const");
const cmnUtil = require("../util/commonUtil");
class InfoViewProvider extends baseView.BaseContentProvider {
    constructor(context) {
        super();
        this.context = context;
        this.isLoading = false;
        this.title = "Current Repo Info";
        this.scheme = "repo-info-preview";
        this.previewUri = `${this.scheme}://authority/repo-info-preview`;
    }
    renderInfo(errMsg = "") {
        if (errMsg) {
            return errMsg.replace("\n", "<br>");
        }
        let dataline = "";
        for (var v in ext.Global.codebaseInfo) {
            let val = ext.Global.codebaseInfo[v];
            dataline += util.format("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>", val['project'], val['mount-path'], val['current-version'], val['local-branch']);
        }
        let refreshCmd = vscode.Uri.parse(`command:${constant.cmd.showInfo}?${JSON.stringify(["1"])}`);
        var msg = `
            <head>
                <link rel="stylesheet" href="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'css', 'bootstrap.min.css'))}" >
                <link rel="stylesheet" href="${this.getNodeModulesPath(path.join('jquery-bootgrid', 'dist', 'jquery.bootgrid.min.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath(path.join('font-awesome-4.7.0', 'css', 'font-awesome.min.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath('custom.css')}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath('loading.css')}" >                
                
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js'))}"></script>              
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'js', 'bootstrap.min.js'))}"></script>
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery-bootgrid', 'dist', 'jquery.bootgrid.fa.min.js'))}"></script>
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery-bootgrid', 'dist', 'jquery.bootgrid.min.js'))}"></script>
                <script type="text/javascript" src="${this.getScriptFilePath(path.join('bootstrap-waitingfor-1.2.4', 'build', 'bootstrap-waitingfor.min.js'))}"></script>
            </head>
            <body>
                    <div class="row" style="margin:10px;">
                        <div class="col-md-11"></div>
                        <div class=" col-md-1" >
                            <div class="btn-group" >
                                <a href="${refreshCmd}" class="btn btn-primary" id="refresh" data-placement="bottom" data-toggle="tooltip" title="Refresh-Repo-Info">
                                    <i class="fa fa-refresh" aria-hidden="true" ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="loadingDlg" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">
                        <div class="modal-dialog modal-m">
                            <div id="ide-loader" ></div>
                        </div>
                    </div>                      
                    </div>
                        <table id="grid-data" class="table table-condensed table-hover table-striped"> 
                        <thead>
                            <tr>
                                <th data-column-id="project">project</th>
                                <th data-column-id="mount-path">mount-path</th>
                                <th data-column-id="current-version">current-version</th>
                                <th data-column-id="local-branch">local-branch</th>
                            </tr>
                        </thead>
                        <tbody>${dataline}</tbody>
                        </table>
                    <script> 
                        var isLoading = ${JSON.stringify(this.isLoading)};
                        $("#grid-data").bootgrid();
                        $('[data-toggle="tooltip"]').tooltip();
                        if (isLoading){
                            $("#loadingDlg").modal();
                        }
                    </script>
                </body>`;
        return msg;
    }
    ;
    renderFinishLoading(id) {
        this.isLoading = false;
        this.update(vscode.Uri.parse(`${this.previewUri}?id=${id}`));
    }
    renderLoading(id) {
        this.isLoading = true;
        this.update(vscode.Uri.parse(`${this.previewUri}?id=${id}`));
    }
    createSnippet(uri) {
        cmnUtil.showConsoleMessage("updating " + uri.toString());
        return this.renderInfo();
    }
}
exports.InfoViewProvider = InfoViewProvider;
//# sourceMappingURL=repoInfoView.js.map