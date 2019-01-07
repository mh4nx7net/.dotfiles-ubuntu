"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_debugadapter_1 = require("vscode-debugadapter");
const path_1 = require("path");
const fs = require("fs");
const which = require("npm-which");
const zshRuntime_1 = require("./zshRuntime");
const handlePath_1 = require("./handlePath");
const eventSource_1 = require("./eventSource");
const spawnZsh_1 = require("./spawnZsh");
class ZshDebugSession extends vscode_debugadapter_1.LoggingDebugSession {
    constructor() {
        super("zsh-debug.txt");
        this.currentBreakpointIds = new Map();
        this.proxyData = new Map();
        this.fullDebugOutput = [""];
        this.fullDebugOutputIndex = 0;
        this.debuggerExecutableBusy = false;
        this.debuggerExecutableClosing = false;
        this.outputEventSource = new eventSource_1.EventSource();
        this.debuggerProcessParentId = -1;
        this.setDebuggerLinesStartAt1(true);
        this.setDebuggerColumnsStartAt1(true);
    }
    initializeRequest(response, _args) {
        response.body = response.body || {};
        response.body.supportsConditionalBreakpoints = true;
        response.body.supportsConfigurationDoneRequest = false;
        response.body.supportsEvaluateForHovers = true;
        response.body.supportsStepBack = false;
        response.body.supportsSetVariable = false;
        this.sendResponse(response);
    }
    disconnectRequest(response, _args) {
        this.debuggerExecutableBusy = false;
        spawnZsh_1.spawnZshScript(`${this.launchArgs.pathPkill} -KILL -P "${this.debuggerProcessParentId}"; ${this.launchArgs.pathPkill} -TERM -P "${this.proxyData["PROXYID"]}"`, this.launchArgs.pathZsh, data => this.sendEvent(new vscode_debugadapter_1.OutputEvent(`${data}`, 'console')));
        this.proxyProcess.on("exit", () => {
            this.debuggerExecutableClosing = true;
            this.sendResponse(response);
        });
    }
    launchRequest(response, args) {
        this.launchArgs = args;
        vscode_debugadapter_1.logger.setup(args.trace ? vscode_debugadapter_1.Logger.LogLevel.Verbose : vscode_debugadapter_1.Logger.LogLevel.Stop, false);
        if (process.platform === "win32") {
            args.cwdEffective = `${handlePath_1.getWSLPath(args.cwd)}`;
            args.programEffective = `${handlePath_1.getWSLPath(args.program)}`;
        }
        else {
            args.cwdEffective = args.cwd;
            args.programEffective = args.program;
        }
        {
            const errorMessage = zshRuntime_1.validatePath(args.cwdEffective, args.pathZsh, args.pathZshdb, args.pathCat, args.pathMkfifo, args.pathPkill);
            if (errorMessage !== "") {
                response.success = false;
                response.message = errorMessage;
                this.sendResponse(response);
                return;
            }
        }
        if (process.platform === "darwin" && args.pathPkill === "pkill") {
            const pathPkill = which(__dirname).sync('pkill');
            if (pathPkill === "/usr/local/bin/pkill") {
                const url = "https://github.com/rogalmic/vscode-zsh-debug/wiki/macOS:-avoid-use-of--usr-local-bin-pkill";
                const msg = `Using /usr/bin/pkill instead of /usr/local/bin/pkill (see ${url} for details)`;
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(msg, 'console'));
                args.pathPkill = "/usr/bin/pkill";
            }
        }
        const fifo_path = "/tmp/vscode-zsh-debug-fifo-" + (Math.floor(Math.random() * 10000) + 10000);
        this.proxyProcess = spawnZsh_1.spawnZshScript(`cleanup()
		{
			exit_code=$?
			trap '' ERR SIGINT SIGTERM EXIT
			exec 4>&-
			rm "${fifo_path}_in"
			rm "${fifo_path}"
			exit $exit_code
		}
		echo "::PROXYID::$$" >&2
		trap 'cleanup' ERR SIGINT SIGTERM EXIT
		mkfifo "${fifo_path}"
		mkfifo "${fifo_path}_in"

		"${args.pathCat}" "${fifo_path}" &
		exec 4>"${fifo_path}"
		"${args.pathCat}" >"${fifo_path}_in"`
            .replace("\r", ""), this.launchArgs.pathZsh);
        this.proxyProcess.stdin.write(`examine Debug environment: zsh_ver=$ZSH_VERSION, zshdb_ver=$_Dbg_release, program=$0, args=$*\nprint "$PPID"\nhandle INT stop\nprint '${ZshDebugSession.END_MARKER}'\n`);
        const currentShell = (process.platform === "win32") ? handlePath_1.getWSLLauncherPath(true) : args.pathZsh;
        const optionalZshPathArgument = (currentShell !== args.pathZsh) ? args.pathZsh : "";
        const termArgs = {
            kind: this.launchArgs.terminalKind,
            title: "Zsh Debug Console",
            cwd: ".",
            args: [currentShell, optionalZshPathArgument, `-c`,
                `cd "${args.cwdEffective}"; while [[ ! -p "${fifo_path}" ]]; do sleep 0.25; done
			"${args.pathZsh}" -f "${args.pathZshdb}" --quiet --tty "${fifo_path}" --tty_in "${fifo_path}_in" --library "${args.pathZshdbLib}" -- "${args.programEffective}" ${args.args.map(e => `"` + e.replace(`"`, `\\\"`) + `"`).join(` `)}`
                    .replace("\r", "").replace("\n", "; ")
            ].filter(arg => arg !== ""),
        };
        this.runInTerminalRequest(termArgs, 10000, (response) => {
            if (!response.success) {
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`${JSON.stringify(response)}`, 'console'));
            }
        });
        this.proxyProcess.on("error", (error) => {
            this.sendEvent(new vscode_debugadapter_1.OutputEvent(`${error}`, 'console'));
        });
        this.processDebugTerminalOutput();
        this.proxyProcess.stdio[1].on("data", (data) => {
            if (args.showDebugOutput) {
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`${data}`, 'stdout'));
            }
        });
        this.proxyProcess.stdio[2].on("data", (data) => {
            if (args.showDebugOutput) {
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`${data}`, 'stderr'));
            }
        });
        this.debuggerExecutableBusy = true;
        this.scheduleExecution(() => this.launchRequestFinalize(response, args));
    }
    launchRequestFinalize(response, args) {
        for (let i = 0; i < this.fullDebugOutput.length; i++) {
            if (this.fullDebugOutput[i] === ZshDebugSession.END_MARKER) {
                this.debuggerProcessParentId = parseInt(this.fullDebugOutput[i - 1]);
                ZshDebugSession.END_MARKER = `${this.debuggerProcessParentId}${ZshDebugSession.END_MARKER}`;
                this.sendResponse(response);
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`Sending InitializedEvent`, 'telemetry'));
                this.debuggerExecutableBusy = false;
                this.sendEvent(new vscode_debugadapter_1.InitializedEvent());
                return;
            }
        }
        this.scheduleExecution(() => this.launchRequestFinalize(response, args));
    }
    setBreakPointsRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.setBreakPointsRequest(response, args));
            return;
        }
        if (!args.source.path) {
            this.sendEvent(new vscode_debugadapter_1.OutputEvent("Error: setBreakPointsRequest(): args.source.path is undefined.", 'console'));
            return;
        }
        let sourcePath = (process.platform === "win32") ? handlePath_1.getWSLPath(args.source.path) : args.source.path;
        if (sourcePath !== undefined) {
            sourcePath = handlePath_1.escapeCharactersInZshdbArg(sourcePath);
        }
        let setBreakpointsCommand = ``;
        if (this.currentBreakpointIds[args.source.path] === undefined) {
            this.currentBreakpointIds[args.source.path] = [];
            setBreakpointsCommand += `load ${sourcePath}\n`;
        }
        setBreakpointsCommand += (this.currentBreakpointIds[args.source.path].length > 0)
            ? `print 'delete <${this.currentBreakpointIds[args.source.path].join(" ")}>'\ndelete ${this.currentBreakpointIds[args.source.path].join(" ")}\nyes\n`
            : ``;
        if (args.breakpoints) {
            args.breakpoints.forEach((b) => { setBreakpointsCommand += `print 'break <${sourcePath}:${b.line} ${b.condition ? b.condition : ""}> '\nbreak ${sourcePath}:${b.line} ${b.condition ? handlePath_1.escapeCharactersInZshdbArg(b.condition) : ""}\n`; });
        }
        if (this.launchArgs.showDebugOutput) {
            setBreakpointsCommand += `info files\ninfo breakpoints\n`;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`${setBreakpointsCommand}print '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.setBreakPointsRequestFinalize(response, args, currentLine));
    }
    setBreakPointsRequestFinalize(response, args, currentOutputLength) {
        if (!args.source.path) {
            this.sendEvent(new vscode_debugadapter_1.OutputEvent("Error: setBreakPointsRequestFinalize(): args.source.path is undefined.", 'console'));
            return;
        }
        if (this.promptReached(currentOutputLength)) {
            this.currentBreakpointIds[args.source.path] = [];
            const breakpoints = new Array();
            for (let i = currentOutputLength; i < this.fullDebugOutput.length - 2; i++) {
                if (this.fullDebugOutput[i - 1].indexOf("break <") === 0 && this.fullDebugOutput[i - 1].indexOf("> ") > 0) {
                    const lineNodes = this.fullDebugOutput[i].split(" ");
                    const bp = new vscode_debugadapter_1.Breakpoint(true, this.convertDebuggerLineToClient(parseInt(lineNodes[lineNodes.length - 1].replace(".", ""))));
                    bp.id = parseInt(lineNodes[1]);
                    breakpoints.push(bp);
                    this.currentBreakpointIds[args.source.path].push(bp.id);
                }
            }
            response.body = { breakpoints: breakpoints };
            this.debuggerExecutableBusy = false;
            this.sendResponse(response);
            return;
        }
        this.scheduleExecution(() => this.setBreakPointsRequestFinalize(response, args, currentOutputLength));
    }
    threadsRequest(response) {
        response.body = { threads: [new vscode_debugadapter_1.Thread(ZshDebugSession.THREAD_ID, "Zsh thread")] };
        this.sendResponse(response);
    }
    stackTraceRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.stackTraceRequest(response, args));
            return;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`print backtrace\nbacktrace\nprint '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.stackTraceRequestFinalize(response, args, currentLine));
    }
    stackTraceRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            const lastStackLineIndex = this.fullDebugOutput.length - 3;
            let frames = new Array();
            for (let i = currentOutputLength; i <= lastStackLineIndex; i++) {
                const lineContent = this.fullDebugOutput[i];
                const frameIndex = parseInt(lineContent.substr(2, 2));
                const frameText = lineContent;
                let frameSourcePath = lineContent.substr(lineContent.lastIndexOf("`") + 1, lineContent.lastIndexOf("'") - lineContent.lastIndexOf("`") - 1);
                const frameLine = parseInt(lineContent.substr(lineContent.lastIndexOf(" ")));
                if ((process.platform === "win32")) {
                    frameSourcePath = handlePath_1.reverseWSLPath(frameSourcePath);
                }
                frameSourcePath = path_1.isAbsolute(frameSourcePath) ? frameSourcePath : path_1.normalize(path_1.join(this.launchArgs.cwd, frameSourcePath));
                frames.push(new vscode_debugadapter_1.StackFrame(frameIndex, frameText, fs.existsSync(frameSourcePath) ? new vscode_debugadapter_1.Source(path_1.basename(frameSourcePath), this.convertDebuggerPathToClient(frameSourcePath), undefined, undefined, 'zsh-adapter-data') : undefined, this.convertDebuggerLineToClient(frameLine)));
            }
            if (frames.length > 0) {
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`Execution breaks at '${frames[0].name}'\n`, 'telemetry'));
            }
            const totalFrames = this.fullDebugOutput.length - currentOutputLength - 1;
            const startFrame = typeof args.startFrame === 'number' ? args.startFrame : 0;
            const maxLevels = typeof args.levels === 'number' ? args.levels : 100;
            frames = frames.slice(startFrame, Math.min(startFrame + maxLevels, frames.length));
            response.body = { stackFrames: frames, totalFrames: totalFrames };
            this.debuggerExecutableBusy = false;
            this.sendResponse(response);
            return;
        }
        this.scheduleExecution(() => this.stackTraceRequestFinalize(response, args, currentOutputLength));
    }
    scopesRequest(response, _args) {
        const scopes = [new vscode_debugadapter_1.Scope("Local", this.fullDebugOutputIndex, false)];
        response.body = { scopes: scopes };
        this.sendResponse(response);
    }
    variablesRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.variablesRequest(response, args));
            return;
        }
        let getVariablesCommand = `info program\n`;
        const count = typeof args.count === 'number' ? args.count : 100;
        const start = typeof args.start === 'number' ? args.start : 0;
        let variableDefinitions = ["$PWD", "$? \\\# from '$_Dbg_last_zsh_command'"];
        variableDefinitions = variableDefinitions.slice(start, Math.min(start + count, variableDefinitions.length));
        variableDefinitions.forEach((v) => { getVariablesCommand += `print 'examine <${v}> '\nexamine ${v}\n`; });
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`${getVariablesCommand}print '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.variablesRequestFinalize(response, args, currentLine));
    }
    variablesRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            let variables = [];
            for (let i = currentOutputLength; i < this.fullDebugOutput.length - 2; i++) {
                if (this.fullDebugOutput[i - 1].indexOf("examine <") === 0 && this.fullDebugOutput[i - 1].indexOf("> ") > 0) {
                    variables.push({
                        name: `${this.fullDebugOutput[i - 1].replace("examine <", "").replace("> ", "").split('#')[0]}`,
                        type: "string",
                        value: this.fullDebugOutput[i],
                        variablesReference: 0
                    });
                }
            }
            response.body = { variables: variables };
            this.debuggerExecutableBusy = false;
            this.sendResponse(response);
            return;
        }
        this.scheduleExecution(() => this.variablesRequestFinalize(response, args, currentOutputLength));
    }
    continueRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.continueRequest(response, args));
            return;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`print continue\ncontinue\nprint '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.continueRequestFinalize(response, args, currentLine));
        this.sendResponse(response);
    }
    continueRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            this.debuggerExecutableBusy = false;
            return;
        }
        this.scheduleExecution(() => this.continueRequestFinalize(response, args, currentOutputLength));
    }
    nextRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.nextRequest(response, args));
            return;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`print next\nnext\nprint '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.nextRequestFinalize(response, args, currentLine));
        this.sendResponse(response);
    }
    nextRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            this.debuggerExecutableBusy = false;
            return;
        }
        this.scheduleExecution(() => this.nextRequestFinalize(response, args, currentOutputLength));
    }
    stepInRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.stepInRequest(response, args));
            return;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`print step\nstep\nprint '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.stepInRequestFinalize(response, args, currentLine));
        this.sendResponse(response);
    }
    stepInRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            this.debuggerExecutableBusy = false;
            return;
        }
        this.scheduleExecution(() => this.stepInRequestFinalize(response, args, currentOutputLength));
    }
    stepOutRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.stepOutRequest(response, args));
            return;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        this.proxyProcess.stdin.write(`print finish\nfinish\nprint '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.stepOutRequestFinalize(response, args, currentLine));
        this.sendResponse(response);
    }
    stepOutRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            this.debuggerExecutableBusy = false;
            return;
        }
        this.scheduleExecution(() => this.stepOutRequestFinalize(response, args, currentOutputLength));
    }
    evaluateRequest(response, args) {
        if (this.debuggerExecutableBusy) {
            this.scheduleExecution(() => this.evaluateRequest(response, args));
            return;
        }
        this.debuggerExecutableBusy = true;
        const currentLine = this.fullDebugOutput.length;
        let expression = (args.context === "hover") ? `${args.expression.replace(/['"]+/g, "")}` : `${args.expression}`;
        expression = handlePath_1.escapeCharactersInZshdbArg(expression);
        this.proxyProcess.stdin.write(`print 'examine <${expression}>'\nexamine ${expression}\nprint '${ZshDebugSession.END_MARKER}'\n`);
        this.scheduleExecution(() => this.evaluateRequestFinalize(response, args, currentLine));
    }
    evaluateRequestFinalize(response, args, currentOutputLength) {
        if (this.promptReached(currentOutputLength)) {
            response.body = { result: `'${this.fullDebugOutput[currentOutputLength]}'`, variablesReference: 0 };
            this.debuggerExecutableBusy = false;
            this.sendResponse(response);
            return;
        }
        this.scheduleExecution(() => this.evaluateRequestFinalize(response, args, currentOutputLength));
    }
    pauseRequest(response, args) {
        if (args.threadId === ZshDebugSession.THREAD_ID) {
            spawnZsh_1.spawnZshScript(`${this.launchArgs.pathPkill} -INT -P ${this.debuggerProcessParentId} -f zshdb`, this.launchArgs.pathZsh, data => this.sendEvent(new vscode_debugadapter_1.OutputEvent(`${data}`, 'console')))
                .on("exit", () => this.sendResponse(response));
            return;
        }
        response.success = false;
        this.sendResponse(response);
    }
    removePrompt(line) {
        if (line.indexOf("zshdb<") === 0) {
            return line.substr(line.indexOf("> ") + 2);
        }
        return line;
    }
    promptReached(currentOutputLength) {
        return this.fullDebugOutput.length > currentOutputLength && this.fullDebugOutput[this.fullDebugOutput.length - 2] === ZshDebugSession.END_MARKER;
    }
    processDebugTerminalOutput() {
        this.proxyProcess.stdio[2].on('data', (data) => {
            const list = data.toString().split("\n");
            list.forEach(l => {
                let nodes = l.split("::");
                if (nodes.length === 3) {
                    this.proxyData[nodes[1]] = nodes[2];
                }
            });
        });
        this.outputEventSource.schedule(() => {
            for (; this.fullDebugOutputIndex < this.fullDebugOutput.length - 1; this.fullDebugOutputIndex++) {
                const line = this.fullDebugOutput[this.fullDebugOutputIndex];
                if (line.indexOf("(") === 0 && line.indexOf("):") === line.length - 2) {
                    this.sendEvent(new vscode_debugadapter_1.OutputEvent(`Sending StoppedEvent`, 'telemetry'));
                    this.sendEvent(new vscode_debugadapter_1.StoppedEvent("break", ZshDebugSession.THREAD_ID));
                }
                else if (line.indexOf("Program received signal ") === 0) {
                    this.sendEvent(new vscode_debugadapter_1.OutputEvent(`Sending StoppedEvent`, 'telemetry'));
                    this.sendEvent(new vscode_debugadapter_1.StoppedEvent("break", ZshDebugSession.THREAD_ID));
                }
                else if (line.indexOf("Debugged program terminated") === 0) {
                    this.proxyProcess.stdin.write(`\nq\n`);
                    this.sendEvent(new vscode_debugadapter_1.OutputEvent(`Sending TerminatedEvent`, 'telemetry'));
                    this.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
                }
            }
        });
        this.proxyProcess.stdio[1].on('data', (data) => {
            const list = data.toString().split("\n", -1);
            const fullLine = `${this.fullDebugOutput.pop()}${list.shift()}`;
            this.fullDebugOutput.push(this.removePrompt(fullLine));
            list.forEach(l => this.fullDebugOutput.push(this.removePrompt(l)));
            this.outputEventSource.setEvent();
        });
    }
    scheduleExecution(callback) {
        if (!this.debuggerExecutableClosing) {
            this.outputEventSource.scheduleOnce(callback);
        }
    }
}
ZshDebugSession.THREAD_ID = 42;
ZshDebugSession.END_MARKER = "############################################################";
exports.ZshDebugSession = ZshDebugSession;
vscode_debugadapter_1.DebugSession.run(ZshDebugSession);
//# sourceMappingURL=zshDebug.js.map