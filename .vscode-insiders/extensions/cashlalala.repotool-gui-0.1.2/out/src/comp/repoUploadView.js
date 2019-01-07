'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const baseView_1 = require("../comp/baseView");
const repoStatusView_1 = require("../comp/repoStatusView");
const uriUtil = require("../util/urlUtil");
const cmnUtil = require("../util/commonUtil");
class RepoUploadContentProvider extends baseView_1.BaseContentProvider {
    constructor(context) {
        super();
        this.context = context;
        this.selectedProjStatus = new Map();
        this.isLoading = false;
        this.selectedProjInfo = {};
        this.scheme = "repo-upload-preview";
        this.previewUri = `${this.scheme}://authority/repo-upload-preview`;
        this.title = 'Upload Change';
    }
    renderFinishLoading(id) {
        this.isLoading = false;
        this.update(vscode.Uri.parse(`${this.previewUri}?id=${id}`));
    }
    renderLoading(id) {
        this.isLoading = true;
        this.update(vscode.Uri.parse(`${this.previewUri}?id=${id}`));
    }
    renderHtmlHeader() {
        return `
            <head>
                <link rel="stylesheet" href="${this.getNodeModulesPath(path.join('jquery-ui-dist', 'jquery-ui.min.css'))}" >
                <link rel="stylesheet" href="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'css', 'bootstrap.min.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath(path.join('custom', 'styles.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath(path.join('font-awesome-4.7.0', 'css', 'font-awesome.min.css'))}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath('custom.css')}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath('cardeffect.css')}" >
                <link rel="stylesheet" href="${this.getStyleSheetPath('loading.css')}" > 
                
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js'))}"></script>
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('masonry-layout', 'dist', 'masonry.pkgd.min.js'))}"></script>                
                <script type="text/javascript" src="${this.getNodeModulesPath(path.join('bootstrap', 'dist', 'js', 'bootstrap.min.js'))}"></script>
                <script type="text/javascript" src="${this.getScriptFilePath('jquery.appear.min.js')}"></script>
                <script type="text/javascript" src="${this.getScriptFilePath(path.join('bootstrap-waitingfor-1.2.4', 'build', 'bootstrap-waitingfor.min.js'))}"></script>
            </head>`;
    }
    renderUploadRepo(key) {
        let repoInfo = this.selectedProjInfo[key];
        let id = uriUtil.encodeBase64(key);
        return `
            <div class="card panel panel-default">
                <div class="panel-heading">${key}</div>
                <div class="panel-body">
                    <div class="form-group input-group margin-bottom-sm up-repo-margin-top" data-placement="top" data-toggle="tooltip" title="SourceBranch">
                        <div class="input-group-addon"><i class="fa icon-flow-branch fa-fw" aria-hidden="true"></i></div>
                        <input id="lb-${id}" class="form-control" value="${repoInfo.localBranch}" type="text" placeholder="Branch to upload (Your local branch)">
                    </div>
                    <div class="form-group input-group" data-placement="top" data-toggle="tooltip" title="DestinationBranch">
                        <div class="input-group-addon"><i class="fa icon-flow-branch fa-fw" aria-hidden="true"></i></div>
                        <input id="rb-${id}" class="form-control" value="${repoInfo.remoteBranch}" type="text" placeholder="Submit for review on this target branch (The remote branch)">
                    </div>
                    <div class="form-group input-group" data-placement="top" data-toggle="tooltip" title="ChangeID">
                        <div class="input-group-addon"><i class="fa fa-code fa-fw" ></i></div>
                        <input id="cg-${id}" class="form-control " value="${repoInfo.changeId}" type="text" placeholder="(Optional) Input change ID.">
                    </div>
                    <div class="form-group input-group" data-placement="top" data-toggle="tooltip" title="Commit message">
                        <div class="input-group-addon"><i class="fa fa-envelope-o fa-fw" ></i></div>
                        <textarea id="mg-${id}" class="form-control " placeholder="Input your commit message">${repoInfo.message}</textarea>
                    </div>
                </div>
            </div>`;
    }
    renderUplaodHtmlBody() {
        return `<body>
                <div class="up-repo-pad-top" style="margin:10px;">
                    ${repoStatusView_1.renderMasonryRepoStatus(this.selectedProjStatus, false, false, false, true)}
                    <div class="up-repo-margin-top">
                        ${(() => {
            let reposForm = "";
            let keys = cmnUtil.getObjectKey(this.selectedProjInfo);
            keys.forEach((v, idx) => {
                reposForm += this.renderUploadRepo(v);
            });
            return reposForm;
        })()}
                    </div>
                    <div id="loadingDlg" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">
                        <div class="modal-dialog modal-m">
                            <div id="ide-loader" ></div>
                        </div>
                    </div>  
                    <div align="center"><a id="uplaodBtnView" class="btn btn-primary">
                        Upload
                    </a></div>
                </div>
                <footer>
                    <script type="text/javascript" src="${this.getScriptFilePath('uploadview.js')}"></script>
                    <script type="text/javascript"  >
                        upload = ${JSON.stringify(this.selectedProjInfo)};
                        var isLoading = ${JSON.stringify(this.isLoading)};
                        if (isLoading){
                            $("#loadingDlg").modal();
                        }
                    </script>
                </footer>
            </body>`;
    }
    createSnippet(uri) {
        return new Promise((resolve, reject) => {
            try {
                let form = `${this.renderHtmlHeader()}
                            ${this.renderUplaodHtmlBody()}`;
                // console.log(form);
                return resolve(form);
            }
            catch (err) {
                console.trace(err);
                return reject(err);
            }
        });
    }
}
exports.RepoUploadContentProvider = RepoUploadContentProvider;
//# sourceMappingURL=repoUploadView.js.map