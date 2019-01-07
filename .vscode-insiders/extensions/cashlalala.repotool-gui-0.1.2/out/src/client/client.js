'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const pfutil = require("../util/platformUtil");
const winClint = require("./windows");
const linuxClint = require("./linux");
const cfg = require("../function/config");
let currentCli = null;
function getInstance() {
    if (!currentCli) {
        if (!cfg.checkConfiguratoin(false))
            return currentCli;
        // platform check
        if (pfutil.isLinux()) {
            currentCli = new linuxClint.LinuxClient();
        }
        else if (pfutil.isWindows()) {
            currentCli = new winClint.WindowsClient();
        }
        else {
            throw new Error("Unsupported platform!");
        }
    }
    return currentCli;
}
exports.getInstance = getInstance;
//# sourceMappingURL=client.js.map