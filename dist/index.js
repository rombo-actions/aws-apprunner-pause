/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7415:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultUserAgent = exports.UA_APP_ID_INI_NAME = exports.UA_APP_ID_ENV_NAME = void 0;
const node_config_provider_1 = __nccwpck_require__(9125);
const os_1 = __nccwpck_require__(2037);
const process_1 = __nccwpck_require__(7282);
const is_crt_available_1 = __nccwpck_require__(1525);
exports.UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
exports.UA_APP_ID_INI_NAME = "sdk-ua-app-id";
const defaultUserAgent = ({ serviceId, clientVersion }) => {
    const sections = [
        ["aws-sdk-js", clientVersion],
        [`os/${(0, os_1.platform)()}`, (0, os_1.release)()],
        ["lang/js"],
        ["md/nodejs", `${process_1.versions.node}`],
    ];
    const crtAvailable = (0, is_crt_available_1.isCrtAvailable)();
    if (crtAvailable) {
        sections.push(crtAvailable);
    }
    if (serviceId) {
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    if (process_1.env.AWS_EXECUTION_ENV) {
        sections.push([`exec-env/${process_1.env.AWS_EXECUTION_ENV}`]);
    }
    const appIdPromise = (0, node_config_provider_1.loadConfig)({
        environmentVariableSelector: (env) => env[exports.UA_APP_ID_ENV_NAME],
        configFileSelector: (profile) => profile[exports.UA_APP_ID_INI_NAME],
        default: undefined,
    })();
    let resolvedUserAgent = undefined;
    return async () => {
        if (!resolvedUserAgent) {
            const appId = await appIdPromise;
            resolvedUserAgent = appId ? [...sections, [`app/${appId}`]] : [...sections];
        }
        return resolvedUserAgent;
    };
};
exports.defaultUserAgent = defaultUserAgent;


/***/ }),

/***/ 1525:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isCrtAvailable = void 0;
const isCrtAvailable = () => {
    try {
        if ( true && __nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'aws-crt'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))) {
            return ["md/crt-avail"];
        }
        return null;
    }
    catch (e) {
        return null;
    }
};
exports.isCrtAvailable = isCrtAvailable;


/***/ }),

/***/ 4824:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(7932);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 3060:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(4824);
const file_command_1 = __nccwpck_require__(905);
const utils_1 = __nccwpck_require__(7932);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const uuid_1 = __nccwpck_require__(9986);
const oidc_utils_1 = __nccwpck_require__(2229);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = `ghadelimiter_${uuid_1.v4()}`;
        // These should realistically never happen, but just in case someone finds a way to exploit uuid generation let's not allow keys or values that contain the delimiter.
        if (name.includes(delimiter)) {
            throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
        }
        if (convertedVal.includes(delimiter)) {
            throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
        }
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(3486);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(3486);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(411);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 905:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(7932);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 2229:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(4439);
const auth_1 = __nccwpck_require__(5383);
const core_1 = __nccwpck_require__(3060);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 411:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(1017));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 3486:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(2037);
const fs_1 = __nccwpck_require__(7147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 7932:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 5383:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 4439:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(3685));
const https = __importStar(__nccwpck_require__(5687));
const pm = __importStar(__nccwpck_require__(4239));
const tunnel = __importStar(__nccwpck_require__(7735));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4239:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 7808:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppRunner = void 0;
const AppRunnerClient_1 = __nccwpck_require__(5525);
const AssociateCustomDomainCommand_1 = __nccwpck_require__(1239);
const CreateAutoScalingConfigurationCommand_1 = __nccwpck_require__(157);
const CreateConnectionCommand_1 = __nccwpck_require__(724);
const CreateObservabilityConfigurationCommand_1 = __nccwpck_require__(6967);
const CreateServiceCommand_1 = __nccwpck_require__(9377);
const CreateVpcConnectorCommand_1 = __nccwpck_require__(7602);
const DeleteAutoScalingConfigurationCommand_1 = __nccwpck_require__(4834);
const DeleteConnectionCommand_1 = __nccwpck_require__(6030);
const DeleteObservabilityConfigurationCommand_1 = __nccwpck_require__(7636);
const DeleteServiceCommand_1 = __nccwpck_require__(3916);
const DeleteVpcConnectorCommand_1 = __nccwpck_require__(6607);
const DescribeAutoScalingConfigurationCommand_1 = __nccwpck_require__(9461);
const DescribeCustomDomainsCommand_1 = __nccwpck_require__(8557);
const DescribeObservabilityConfigurationCommand_1 = __nccwpck_require__(8429);
const DescribeServiceCommand_1 = __nccwpck_require__(1374);
const DescribeVpcConnectorCommand_1 = __nccwpck_require__(7856);
const DisassociateCustomDomainCommand_1 = __nccwpck_require__(8177);
const ListAutoScalingConfigurationsCommand_1 = __nccwpck_require__(7541);
const ListConnectionsCommand_1 = __nccwpck_require__(6669);
const ListObservabilityConfigurationsCommand_1 = __nccwpck_require__(5433);
const ListOperationsCommand_1 = __nccwpck_require__(4786);
const ListServicesCommand_1 = __nccwpck_require__(5752);
const ListTagsForResourceCommand_1 = __nccwpck_require__(8607);
const ListVpcConnectorsCommand_1 = __nccwpck_require__(5260);
const PauseServiceCommand_1 = __nccwpck_require__(1838);
const ResumeServiceCommand_1 = __nccwpck_require__(8145);
const StartDeploymentCommand_1 = __nccwpck_require__(804);
const TagResourceCommand_1 = __nccwpck_require__(27);
const UntagResourceCommand_1 = __nccwpck_require__(7043);
const UpdateServiceCommand_1 = __nccwpck_require__(9970);
class AppRunner extends AppRunnerClient_1.AppRunnerClient {
    associateCustomDomain(args, optionsOrCb, cb) {
        const command = new AssociateCustomDomainCommand_1.AssociateCustomDomainCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createAutoScalingConfiguration(args, optionsOrCb, cb) {
        const command = new CreateAutoScalingConfigurationCommand_1.CreateAutoScalingConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createConnection(args, optionsOrCb, cb) {
        const command = new CreateConnectionCommand_1.CreateConnectionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createObservabilityConfiguration(args, optionsOrCb, cb) {
        const command = new CreateObservabilityConfigurationCommand_1.CreateObservabilityConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createService(args, optionsOrCb, cb) {
        const command = new CreateServiceCommand_1.CreateServiceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createVpcConnector(args, optionsOrCb, cb) {
        const command = new CreateVpcConnectorCommand_1.CreateVpcConnectorCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteAutoScalingConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteAutoScalingConfigurationCommand_1.DeleteAutoScalingConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteConnection(args, optionsOrCb, cb) {
        const command = new DeleteConnectionCommand_1.DeleteConnectionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteObservabilityConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteObservabilityConfigurationCommand_1.DeleteObservabilityConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteService(args, optionsOrCb, cb) {
        const command = new DeleteServiceCommand_1.DeleteServiceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteVpcConnector(args, optionsOrCb, cb) {
        const command = new DeleteVpcConnectorCommand_1.DeleteVpcConnectorCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeAutoScalingConfiguration(args, optionsOrCb, cb) {
        const command = new DescribeAutoScalingConfigurationCommand_1.DescribeAutoScalingConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeCustomDomains(args, optionsOrCb, cb) {
        const command = new DescribeCustomDomainsCommand_1.DescribeCustomDomainsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeObservabilityConfiguration(args, optionsOrCb, cb) {
        const command = new DescribeObservabilityConfigurationCommand_1.DescribeObservabilityConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeService(args, optionsOrCb, cb) {
        const command = new DescribeServiceCommand_1.DescribeServiceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeVpcConnector(args, optionsOrCb, cb) {
        const command = new DescribeVpcConnectorCommand_1.DescribeVpcConnectorCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    disassociateCustomDomain(args, optionsOrCb, cb) {
        const command = new DisassociateCustomDomainCommand_1.DisassociateCustomDomainCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listAutoScalingConfigurations(args, optionsOrCb, cb) {
        const command = new ListAutoScalingConfigurationsCommand_1.ListAutoScalingConfigurationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listConnections(args, optionsOrCb, cb) {
        const command = new ListConnectionsCommand_1.ListConnectionsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listObservabilityConfigurations(args, optionsOrCb, cb) {
        const command = new ListObservabilityConfigurationsCommand_1.ListObservabilityConfigurationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listOperations(args, optionsOrCb, cb) {
        const command = new ListOperationsCommand_1.ListOperationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listServices(args, optionsOrCb, cb) {
        const command = new ListServicesCommand_1.ListServicesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTagsForResource(args, optionsOrCb, cb) {
        const command = new ListTagsForResourceCommand_1.ListTagsForResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listVpcConnectors(args, optionsOrCb, cb) {
        const command = new ListVpcConnectorsCommand_1.ListVpcConnectorsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    pauseService(args, optionsOrCb, cb) {
        const command = new PauseServiceCommand_1.PauseServiceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    resumeService(args, optionsOrCb, cb) {
        const command = new ResumeServiceCommand_1.ResumeServiceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startDeployment(args, optionsOrCb, cb) {
        const command = new StartDeploymentCommand_1.StartDeploymentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    tagResource(args, optionsOrCb, cb) {
        const command = new TagResourceCommand_1.TagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    untagResource(args, optionsOrCb, cb) {
        const command = new UntagResourceCommand_1.UntagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateService(args, optionsOrCb, cb) {
        const command = new UpdateServiceCommand_1.UpdateServiceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.AppRunner = AppRunner;


/***/ }),

/***/ 5525:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppRunnerClient = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const middleware_content_length_1 = __nccwpck_require__(8396);
const middleware_host_header_1 = __nccwpck_require__(8822);
const middleware_logger_1 = __nccwpck_require__(3801);
const middleware_recursion_detection_1 = __nccwpck_require__(3444);
const middleware_retry_1 = __nccwpck_require__(1130);
const middleware_signing_1 = __nccwpck_require__(3334);
const middleware_user_agent_1 = __nccwpck_require__(6855);
const smithy_client_1 = __nccwpck_require__(3623);
const runtimeConfig_1 = __nccwpck_require__(4858);
class AppRunnerClient extends smithy_client_1.Client {
    constructor(configuration) {
        const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration);
        const _config_1 = (0, config_resolver_1.resolveRegionConfig)(_config_0);
        const _config_2 = (0, config_resolver_1.resolveEndpointsConfig)(_config_1);
        const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
        const _config_4 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_3);
        const _config_5 = (0, middleware_signing_1.resolveAwsAuthConfig)(_config_4);
        const _config_6 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_5);
        super(_config_6);
        this.config = _config_6;
        this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
        this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(this.config));
        this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}
exports.AppRunnerClient = AppRunnerClient;


/***/ }),

/***/ 1239:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssociateCustomDomainCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class AssociateCustomDomainCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "AssociateCustomDomainCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.AssociateCustomDomainRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.AssociateCustomDomainResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0AssociateCustomDomainCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0AssociateCustomDomainCommand)(output, context);
    }
}
exports.AssociateCustomDomainCommand = AssociateCustomDomainCommand;


/***/ }),

/***/ 157:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAutoScalingConfigurationCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class CreateAutoScalingConfigurationCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "CreateAutoScalingConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateAutoScalingConfigurationRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateAutoScalingConfigurationResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0CreateAutoScalingConfigurationCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0CreateAutoScalingConfigurationCommand)(output, context);
    }
}
exports.CreateAutoScalingConfigurationCommand = CreateAutoScalingConfigurationCommand;


/***/ }),

/***/ 724:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateConnectionCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class CreateConnectionCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "CreateConnectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateConnectionRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateConnectionResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0CreateConnectionCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0CreateConnectionCommand)(output, context);
    }
}
exports.CreateConnectionCommand = CreateConnectionCommand;


/***/ }),

/***/ 6967:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateObservabilityConfigurationCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class CreateObservabilityConfigurationCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "CreateObservabilityConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateObservabilityConfigurationRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateObservabilityConfigurationResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0CreateObservabilityConfigurationCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0CreateObservabilityConfigurationCommand)(output, context);
    }
}
exports.CreateObservabilityConfigurationCommand = CreateObservabilityConfigurationCommand;


/***/ }),

/***/ 9377:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateServiceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class CreateServiceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "CreateServiceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateServiceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateServiceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0CreateServiceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0CreateServiceCommand)(output, context);
    }
}
exports.CreateServiceCommand = CreateServiceCommand;


/***/ }),

/***/ 7602:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateVpcConnectorCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class CreateVpcConnectorCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "CreateVpcConnectorCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateVpcConnectorRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateVpcConnectorResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0CreateVpcConnectorCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0CreateVpcConnectorCommand)(output, context);
    }
}
exports.CreateVpcConnectorCommand = CreateVpcConnectorCommand;


/***/ }),

/***/ 4834:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteAutoScalingConfigurationCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DeleteAutoScalingConfigurationCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DeleteAutoScalingConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteAutoScalingConfigurationRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteAutoScalingConfigurationResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DeleteAutoScalingConfigurationCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DeleteAutoScalingConfigurationCommand)(output, context);
    }
}
exports.DeleteAutoScalingConfigurationCommand = DeleteAutoScalingConfigurationCommand;


/***/ }),

/***/ 6030:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteConnectionCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DeleteConnectionCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DeleteConnectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteConnectionRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteConnectionResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DeleteConnectionCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DeleteConnectionCommand)(output, context);
    }
}
exports.DeleteConnectionCommand = DeleteConnectionCommand;


/***/ }),

/***/ 7636:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteObservabilityConfigurationCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DeleteObservabilityConfigurationCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DeleteObservabilityConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteObservabilityConfigurationRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteObservabilityConfigurationResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DeleteObservabilityConfigurationCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DeleteObservabilityConfigurationCommand)(output, context);
    }
}
exports.DeleteObservabilityConfigurationCommand = DeleteObservabilityConfigurationCommand;


/***/ }),

/***/ 3916:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteServiceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DeleteServiceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DeleteServiceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteServiceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteServiceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DeleteServiceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DeleteServiceCommand)(output, context);
    }
}
exports.DeleteServiceCommand = DeleteServiceCommand;


/***/ }),

/***/ 6607:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteVpcConnectorCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DeleteVpcConnectorCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DeleteVpcConnectorCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteVpcConnectorRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteVpcConnectorResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DeleteVpcConnectorCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DeleteVpcConnectorCommand)(output, context);
    }
}
exports.DeleteVpcConnectorCommand = DeleteVpcConnectorCommand;


/***/ }),

/***/ 9461:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DescribeAutoScalingConfigurationCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DescribeAutoScalingConfigurationCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DescribeAutoScalingConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeAutoScalingConfigurationRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeAutoScalingConfigurationResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DescribeAutoScalingConfigurationCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DescribeAutoScalingConfigurationCommand)(output, context);
    }
}
exports.DescribeAutoScalingConfigurationCommand = DescribeAutoScalingConfigurationCommand;


/***/ }),

/***/ 8557:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DescribeCustomDomainsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DescribeCustomDomainsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DescribeCustomDomainsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeCustomDomainsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeCustomDomainsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DescribeCustomDomainsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DescribeCustomDomainsCommand)(output, context);
    }
}
exports.DescribeCustomDomainsCommand = DescribeCustomDomainsCommand;


/***/ }),

/***/ 8429:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DescribeObservabilityConfigurationCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DescribeObservabilityConfigurationCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DescribeObservabilityConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeObservabilityConfigurationRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeObservabilityConfigurationResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DescribeObservabilityConfigurationCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DescribeObservabilityConfigurationCommand)(output, context);
    }
}
exports.DescribeObservabilityConfigurationCommand = DescribeObservabilityConfigurationCommand;


/***/ }),

/***/ 1374:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DescribeServiceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DescribeServiceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DescribeServiceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeServiceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeServiceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DescribeServiceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DescribeServiceCommand)(output, context);
    }
}
exports.DescribeServiceCommand = DescribeServiceCommand;


/***/ }),

/***/ 7856:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DescribeVpcConnectorCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DescribeVpcConnectorCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DescribeVpcConnectorCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeVpcConnectorRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeVpcConnectorResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DescribeVpcConnectorCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DescribeVpcConnectorCommand)(output, context);
    }
}
exports.DescribeVpcConnectorCommand = DescribeVpcConnectorCommand;


/***/ }),

/***/ 8177:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisassociateCustomDomainCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class DisassociateCustomDomainCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "DisassociateCustomDomainCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DisassociateCustomDomainRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DisassociateCustomDomainResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0DisassociateCustomDomainCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0DisassociateCustomDomainCommand)(output, context);
    }
}
exports.DisassociateCustomDomainCommand = DisassociateCustomDomainCommand;


/***/ }),

/***/ 7541:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListAutoScalingConfigurationsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListAutoScalingConfigurationsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListAutoScalingConfigurationsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListAutoScalingConfigurationsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListAutoScalingConfigurationsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListAutoScalingConfigurationsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListAutoScalingConfigurationsCommand)(output, context);
    }
}
exports.ListAutoScalingConfigurationsCommand = ListAutoScalingConfigurationsCommand;


/***/ }),

/***/ 6669:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListConnectionsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListConnectionsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListConnectionsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListConnectionsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListConnectionsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListConnectionsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListConnectionsCommand)(output, context);
    }
}
exports.ListConnectionsCommand = ListConnectionsCommand;


/***/ }),

/***/ 5433:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListObservabilityConfigurationsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListObservabilityConfigurationsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListObservabilityConfigurationsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListObservabilityConfigurationsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListObservabilityConfigurationsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListObservabilityConfigurationsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListObservabilityConfigurationsCommand)(output, context);
    }
}
exports.ListObservabilityConfigurationsCommand = ListObservabilityConfigurationsCommand;


/***/ }),

/***/ 4786:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListOperationsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListOperationsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListOperationsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListOperationsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListOperationsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListOperationsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListOperationsCommand)(output, context);
    }
}
exports.ListOperationsCommand = ListOperationsCommand;


/***/ }),

/***/ 5752:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListServicesCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListServicesCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListServicesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListServicesRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListServicesResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListServicesCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListServicesCommand)(output, context);
    }
}
exports.ListServicesCommand = ListServicesCommand;


/***/ }),

/***/ 8607:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListTagsForResourceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListTagsForResourceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListTagsForResourceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListTagsForResourceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListTagsForResourceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListTagsForResourceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListTagsForResourceCommand)(output, context);
    }
}
exports.ListTagsForResourceCommand = ListTagsForResourceCommand;


/***/ }),

/***/ 5260:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListVpcConnectorsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ListVpcConnectorsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ListVpcConnectorsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListVpcConnectorsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListVpcConnectorsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ListVpcConnectorsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ListVpcConnectorsCommand)(output, context);
    }
}
exports.ListVpcConnectorsCommand = ListVpcConnectorsCommand;


/***/ }),

/***/ 1838:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PauseServiceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class PauseServiceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "PauseServiceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PauseServiceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.PauseServiceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0PauseServiceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0PauseServiceCommand)(output, context);
    }
}
exports.PauseServiceCommand = PauseServiceCommand;


/***/ }),

/***/ 8145:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeServiceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class ResumeServiceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "ResumeServiceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ResumeServiceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ResumeServiceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0ResumeServiceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0ResumeServiceCommand)(output, context);
    }
}
exports.ResumeServiceCommand = ResumeServiceCommand;


/***/ }),

/***/ 804:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StartDeploymentCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class StartDeploymentCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "StartDeploymentCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.StartDeploymentRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.StartDeploymentResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0StartDeploymentCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0StartDeploymentCommand)(output, context);
    }
}
exports.StartDeploymentCommand = StartDeploymentCommand;


/***/ }),

/***/ 27:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagResourceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class TagResourceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "TagResourceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.TagResourceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.TagResourceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0TagResourceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0TagResourceCommand)(output, context);
    }
}
exports.TagResourceCommand = TagResourceCommand;


/***/ }),

/***/ 7043:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UntagResourceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class UntagResourceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "UntagResourceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.UntagResourceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.UntagResourceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0UntagResourceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0UntagResourceCommand)(output, context);
    }
}
exports.UntagResourceCommand = UntagResourceCommand;


/***/ }),

/***/ 9970:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateServiceCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(8543);
const Aws_json1_0_1 = __nccwpck_require__(5818);
class UpdateServiceCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "AppRunnerClient";
        const commandName = "UpdateServiceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.UpdateServiceRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.UpdateServiceResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_json1_0_1.serializeAws_json1_0UpdateServiceCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_json1_0_1.deserializeAws_json1_0UpdateServiceCommand)(output, context);
    }
}
exports.UpdateServiceCommand = UpdateServiceCommand;


/***/ }),

/***/ 8916:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(1239), exports);
tslib_1.__exportStar(__nccwpck_require__(157), exports);
tslib_1.__exportStar(__nccwpck_require__(724), exports);
tslib_1.__exportStar(__nccwpck_require__(6967), exports);
tslib_1.__exportStar(__nccwpck_require__(9377), exports);
tslib_1.__exportStar(__nccwpck_require__(7602), exports);
tslib_1.__exportStar(__nccwpck_require__(4834), exports);
tslib_1.__exportStar(__nccwpck_require__(6030), exports);
tslib_1.__exportStar(__nccwpck_require__(7636), exports);
tslib_1.__exportStar(__nccwpck_require__(3916), exports);
tslib_1.__exportStar(__nccwpck_require__(6607), exports);
tslib_1.__exportStar(__nccwpck_require__(9461), exports);
tslib_1.__exportStar(__nccwpck_require__(8557), exports);
tslib_1.__exportStar(__nccwpck_require__(8429), exports);
tslib_1.__exportStar(__nccwpck_require__(1374), exports);
tslib_1.__exportStar(__nccwpck_require__(7856), exports);
tslib_1.__exportStar(__nccwpck_require__(8177), exports);
tslib_1.__exportStar(__nccwpck_require__(7541), exports);
tslib_1.__exportStar(__nccwpck_require__(6669), exports);
tslib_1.__exportStar(__nccwpck_require__(5433), exports);
tslib_1.__exportStar(__nccwpck_require__(4786), exports);
tslib_1.__exportStar(__nccwpck_require__(5752), exports);
tslib_1.__exportStar(__nccwpck_require__(8607), exports);
tslib_1.__exportStar(__nccwpck_require__(5260), exports);
tslib_1.__exportStar(__nccwpck_require__(1838), exports);
tslib_1.__exportStar(__nccwpck_require__(8145), exports);
tslib_1.__exportStar(__nccwpck_require__(804), exports);
tslib_1.__exportStar(__nccwpck_require__(27), exports);
tslib_1.__exportStar(__nccwpck_require__(7043), exports);
tslib_1.__exportStar(__nccwpck_require__(9970), exports);


/***/ }),

/***/ 1654:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultRegionInfoProvider = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const regionHash = {
    "us-east-1": {
        variants: [
            {
                hostname: "apprunner-fips.us-east-1.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-east-2": {
        variants: [
            {
                hostname: "apprunner-fips.us-east-2.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-west-2": {
        variants: [
            {
                hostname: "apprunner-fips.us-west-2.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
};
const partitionHash = {
    aws: {
        regions: [
            "af-south-1",
            "ap-east-1",
            "ap-northeast-1",
            "ap-northeast-2",
            "ap-northeast-3",
            "ap-south-1",
            "ap-southeast-1",
            "ap-southeast-2",
            "ap-southeast-3",
            "ca-central-1",
            "eu-central-1",
            "eu-north-1",
            "eu-south-1",
            "eu-west-1",
            "eu-west-2",
            "eu-west-3",
            "fips-us-east-1",
            "fips-us-east-2",
            "fips-us-west-2",
            "me-central-1",
            "me-south-1",
            "sa-east-1",
            "us-east-1",
            "us-east-2",
            "us-west-1",
            "us-west-2",
        ],
        regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "apprunner.{region}.amazonaws.com",
                tags: [],
            },
            {
                hostname: "apprunner-fips.{region}.amazonaws.com",
                tags: ["fips"],
            },
            {
                hostname: "apprunner-fips.{region}.api.aws",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "apprunner.{region}.api.aws",
                tags: ["dualstack"],
            },
        ],
    },
    "aws-cn": {
        regions: ["cn-north-1", "cn-northwest-1"],
        regionRegex: "^cn\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "apprunner.{region}.amazonaws.com.cn",
                tags: [],
            },
            {
                hostname: "apprunner-fips.{region}.amazonaws.com.cn",
                tags: ["fips"],
            },
            {
                hostname: "apprunner-fips.{region}.api.amazonwebservices.com.cn",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "apprunner.{region}.api.amazonwebservices.com.cn",
                tags: ["dualstack"],
            },
        ],
    },
    "aws-iso": {
        regions: ["us-iso-east-1", "us-iso-west-1"],
        regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "apprunner.{region}.c2s.ic.gov",
                tags: [],
            },
            {
                hostname: "apprunner-fips.{region}.c2s.ic.gov",
                tags: ["fips"],
            },
        ],
    },
    "aws-iso-b": {
        regions: ["us-isob-east-1"],
        regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "apprunner.{region}.sc2s.sgov.gov",
                tags: [],
            },
            {
                hostname: "apprunner-fips.{region}.sc2s.sgov.gov",
                tags: ["fips"],
            },
        ],
    },
    "aws-us-gov": {
        regions: ["us-gov-east-1", "us-gov-west-1"],
        regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "apprunner.{region}.amazonaws.com",
                tags: [],
            },
            {
                hostname: "apprunner-fips.{region}.amazonaws.com",
                tags: ["fips"],
            },
            {
                hostname: "apprunner-fips.{region}.api.aws",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "apprunner.{region}.api.aws",
                tags: ["dualstack"],
            },
        ],
    },
};
const defaultRegionInfoProvider = async (region, options) => (0, config_resolver_1.getRegionInfo)(region, {
    ...options,
    signingService: "apprunner",
    regionHash,
    partitionHash,
});
exports.defaultRegionInfoProvider = defaultRegionInfoProvider;


/***/ }),

/***/ 2556:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppRunnerServiceException = void 0;
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7808), exports);
tslib_1.__exportStar(__nccwpck_require__(5525), exports);
tslib_1.__exportStar(__nccwpck_require__(8916), exports);
tslib_1.__exportStar(__nccwpck_require__(1512), exports);
tslib_1.__exportStar(__nccwpck_require__(2598), exports);
var AppRunnerServiceException_1 = __nccwpck_require__(957);
Object.defineProperty(exports, "AppRunnerServiceException", ({ enumerable: true, get: function () { return AppRunnerServiceException_1.AppRunnerServiceException; } }));


/***/ }),

/***/ 957:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppRunnerServiceException = void 0;
const smithy_client_1 = __nccwpck_require__(3623);
class AppRunnerServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, AppRunnerServiceException.prototype);
    }
}
exports.AppRunnerServiceException = AppRunnerServiceException;


/***/ }),

/***/ 1512:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(8543), exports);


/***/ }),

/***/ 8543:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageRepositoryFilterSensitiveLog = exports.ImageConfigurationFilterSensitiveLog = exports.CodeRepositoryFilterSensitiveLog = exports.SourceCodeVersionFilterSensitiveLog = exports.CodeConfigurationFilterSensitiveLog = exports.CodeConfigurationValuesFilterSensitiveLog = exports.AuthenticationConfigurationFilterSensitiveLog = exports.ServiceObservabilityConfigurationFilterSensitiveLog = exports.NetworkConfigurationFilterSensitiveLog = exports.EgressConfigurationFilterSensitiveLog = exports.InstanceConfigurationFilterSensitiveLog = exports.HealthCheckConfigurationFilterSensitiveLog = exports.EncryptionConfigurationFilterSensitiveLog = exports.CreateObservabilityConfigurationResponseFilterSensitiveLog = exports.ObservabilityConfigurationFilterSensitiveLog = exports.CreateObservabilityConfigurationRequestFilterSensitiveLog = exports.TraceConfigurationFilterSensitiveLog = exports.CreateConnectionResponseFilterSensitiveLog = exports.ConnectionFilterSensitiveLog = exports.CreateConnectionRequestFilterSensitiveLog = exports.CreateAutoScalingConfigurationResponseFilterSensitiveLog = exports.AutoScalingConfigurationFilterSensitiveLog = exports.CreateAutoScalingConfigurationRequestFilterSensitiveLog = exports.TagFilterSensitiveLog = exports.AssociateCustomDomainResponseFilterSensitiveLog = exports.CustomDomainFilterSensitiveLog = exports.CertificateValidationRecordFilterSensitiveLog = exports.AssociateCustomDomainRequestFilterSensitiveLog = exports.OperationType = exports.OperationStatus = exports.ResourceNotFoundException = exports.VpcConnectorStatus = exports.ServiceStatus = exports.ImageRepositoryType = exports.SourceCodeVersionType = exports.ConfigurationSource = exports.Runtime = exports.EgressType = exports.HealthCheckProtocol = exports.ObservabilityConfigurationStatus = exports.TracingVendor = exports.ConnectionStatus = exports.ProviderType = exports.ServiceQuotaExceededException = exports.AutoScalingConfigurationStatus = exports.InvalidStateException = exports.InvalidRequestException = exports.InternalServiceErrorException = exports.CustomDomainAssociationStatus = exports.CertificateValidationRecordStatus = void 0;
exports.PauseServiceResponseFilterSensitiveLog = exports.PauseServiceRequestFilterSensitiveLog = exports.ListVpcConnectorsResponseFilterSensitiveLog = exports.ListVpcConnectorsRequestFilterSensitiveLog = exports.ListTagsForResourceResponseFilterSensitiveLog = exports.ListTagsForResourceRequestFilterSensitiveLog = exports.ListServicesResponseFilterSensitiveLog = exports.ServiceSummaryFilterSensitiveLog = exports.ListServicesRequestFilterSensitiveLog = exports.ListOperationsResponseFilterSensitiveLog = exports.OperationSummaryFilterSensitiveLog = exports.ListOperationsRequestFilterSensitiveLog = exports.ListObservabilityConfigurationsResponseFilterSensitiveLog = exports.ObservabilityConfigurationSummaryFilterSensitiveLog = exports.ListObservabilityConfigurationsRequestFilterSensitiveLog = exports.ListConnectionsResponseFilterSensitiveLog = exports.ConnectionSummaryFilterSensitiveLog = exports.ListConnectionsRequestFilterSensitiveLog = exports.ListAutoScalingConfigurationsResponseFilterSensitiveLog = exports.ListAutoScalingConfigurationsRequestFilterSensitiveLog = exports.DisassociateCustomDomainResponseFilterSensitiveLog = exports.DisassociateCustomDomainRequestFilterSensitiveLog = exports.DescribeVpcConnectorResponseFilterSensitiveLog = exports.DescribeVpcConnectorRequestFilterSensitiveLog = exports.DescribeServiceResponseFilterSensitiveLog = exports.DescribeServiceRequestFilterSensitiveLog = exports.DescribeObservabilityConfigurationResponseFilterSensitiveLog = exports.DescribeObservabilityConfigurationRequestFilterSensitiveLog = exports.DescribeCustomDomainsResponseFilterSensitiveLog = exports.DescribeCustomDomainsRequestFilterSensitiveLog = exports.DescribeAutoScalingConfigurationResponseFilterSensitiveLog = exports.DescribeAutoScalingConfigurationRequestFilterSensitiveLog = exports.DeleteVpcConnectorResponseFilterSensitiveLog = exports.DeleteVpcConnectorRequestFilterSensitiveLog = exports.DeleteServiceResponseFilterSensitiveLog = exports.DeleteServiceRequestFilterSensitiveLog = exports.DeleteObservabilityConfigurationResponseFilterSensitiveLog = exports.DeleteObservabilityConfigurationRequestFilterSensitiveLog = exports.DeleteConnectionResponseFilterSensitiveLog = exports.DeleteConnectionRequestFilterSensitiveLog = exports.DeleteAutoScalingConfigurationResponseFilterSensitiveLog = exports.DeleteAutoScalingConfigurationRequestFilterSensitiveLog = exports.CreateVpcConnectorResponseFilterSensitiveLog = exports.VpcConnectorFilterSensitiveLog = exports.CreateVpcConnectorRequestFilterSensitiveLog = exports.CreateServiceResponseFilterSensitiveLog = exports.ServiceFilterSensitiveLog = exports.AutoScalingConfigurationSummaryFilterSensitiveLog = exports.CreateServiceRequestFilterSensitiveLog = exports.SourceConfigurationFilterSensitiveLog = void 0;
exports.UpdateServiceResponseFilterSensitiveLog = exports.UpdateServiceRequestFilterSensitiveLog = exports.UntagResourceResponseFilterSensitiveLog = exports.UntagResourceRequestFilterSensitiveLog = exports.TagResourceResponseFilterSensitiveLog = exports.TagResourceRequestFilterSensitiveLog = exports.StartDeploymentResponseFilterSensitiveLog = exports.StartDeploymentRequestFilterSensitiveLog = exports.ResumeServiceResponseFilterSensitiveLog = exports.ResumeServiceRequestFilterSensitiveLog = void 0;
const smithy_client_1 = __nccwpck_require__(3623);
const AppRunnerServiceException_1 = __nccwpck_require__(957);
var CertificateValidationRecordStatus;
(function (CertificateValidationRecordStatus) {
    CertificateValidationRecordStatus["FAILED"] = "FAILED";
    CertificateValidationRecordStatus["PENDING_VALIDATION"] = "PENDING_VALIDATION";
    CertificateValidationRecordStatus["SUCCESS"] = "SUCCESS";
})(CertificateValidationRecordStatus = exports.CertificateValidationRecordStatus || (exports.CertificateValidationRecordStatus = {}));
var CustomDomainAssociationStatus;
(function (CustomDomainAssociationStatus) {
    CustomDomainAssociationStatus["ACTIVE"] = "ACTIVE";
    CustomDomainAssociationStatus["BINDING_CERTIFICATE"] = "BINDING_CERTIFICATE";
    CustomDomainAssociationStatus["CREATE_FAILED"] = "CREATE_FAILED";
    CustomDomainAssociationStatus["CREATING"] = "CREATING";
    CustomDomainAssociationStatus["DELETE_FAILED"] = "DELETE_FAILED";
    CustomDomainAssociationStatus["DELETING"] = "DELETING";
    CustomDomainAssociationStatus["PENDING_CERTIFICATE_DNS_VALIDATION"] = "PENDING_CERTIFICATE_DNS_VALIDATION";
})(CustomDomainAssociationStatus = exports.CustomDomainAssociationStatus || (exports.CustomDomainAssociationStatus = {}));
class InternalServiceErrorException extends AppRunnerServiceException_1.AppRunnerServiceException {
    constructor(opts) {
        super({
            name: "InternalServiceErrorException",
            $fault: "server",
            ...opts,
        });
        this.name = "InternalServiceErrorException";
        this.$fault = "server";
        Object.setPrototypeOf(this, InternalServiceErrorException.prototype);
        this.Message = opts.Message;
    }
}
exports.InternalServiceErrorException = InternalServiceErrorException;
class InvalidRequestException extends AppRunnerServiceException_1.AppRunnerServiceException {
    constructor(opts) {
        super({
            name: "InvalidRequestException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidRequestException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidRequestException.prototype);
        this.Message = opts.Message;
    }
}
exports.InvalidRequestException = InvalidRequestException;
class InvalidStateException extends AppRunnerServiceException_1.AppRunnerServiceException {
    constructor(opts) {
        super({
            name: "InvalidStateException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidStateException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidStateException.prototype);
        this.Message = opts.Message;
    }
}
exports.InvalidStateException = InvalidStateException;
var AutoScalingConfigurationStatus;
(function (AutoScalingConfigurationStatus) {
    AutoScalingConfigurationStatus["ACTIVE"] = "ACTIVE";
    AutoScalingConfigurationStatus["INACTIVE"] = "INACTIVE";
})(AutoScalingConfigurationStatus = exports.AutoScalingConfigurationStatus || (exports.AutoScalingConfigurationStatus = {}));
class ServiceQuotaExceededException extends AppRunnerServiceException_1.AppRunnerServiceException {
    constructor(opts) {
        super({
            name: "ServiceQuotaExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "ServiceQuotaExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ServiceQuotaExceededException.prototype);
        this.Message = opts.Message;
    }
}
exports.ServiceQuotaExceededException = ServiceQuotaExceededException;
var ProviderType;
(function (ProviderType) {
    ProviderType["GITHUB"] = "GITHUB";
})(ProviderType = exports.ProviderType || (exports.ProviderType = {}));
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["AVAILABLE"] = "AVAILABLE";
    ConnectionStatus["DELETED"] = "DELETED";
    ConnectionStatus["ERROR"] = "ERROR";
    ConnectionStatus["PENDING_HANDSHAKE"] = "PENDING_HANDSHAKE";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));
var TracingVendor;
(function (TracingVendor) {
    TracingVendor["AWSXRAY"] = "AWSXRAY";
})(TracingVendor = exports.TracingVendor || (exports.TracingVendor = {}));
var ObservabilityConfigurationStatus;
(function (ObservabilityConfigurationStatus) {
    ObservabilityConfigurationStatus["ACTIVE"] = "ACTIVE";
    ObservabilityConfigurationStatus["INACTIVE"] = "INACTIVE";
})(ObservabilityConfigurationStatus = exports.ObservabilityConfigurationStatus || (exports.ObservabilityConfigurationStatus = {}));
var HealthCheckProtocol;
(function (HealthCheckProtocol) {
    HealthCheckProtocol["HTTP"] = "HTTP";
    HealthCheckProtocol["TCP"] = "TCP";
})(HealthCheckProtocol = exports.HealthCheckProtocol || (exports.HealthCheckProtocol = {}));
var EgressType;
(function (EgressType) {
    EgressType["DEFAULT"] = "DEFAULT";
    EgressType["VPC"] = "VPC";
})(EgressType = exports.EgressType || (exports.EgressType = {}));
var Runtime;
(function (Runtime) {
    Runtime["CORRETTO_11"] = "CORRETTO_11";
    Runtime["CORRETTO_8"] = "CORRETTO_8";
    Runtime["NODEJS_12"] = "NODEJS_12";
    Runtime["NODEJS_14"] = "NODEJS_14";
    Runtime["NODEJS_16"] = "NODEJS_16";
    Runtime["PYTHON_3"] = "PYTHON_3";
})(Runtime = exports.Runtime || (exports.Runtime = {}));
var ConfigurationSource;
(function (ConfigurationSource) {
    ConfigurationSource["API"] = "API";
    ConfigurationSource["REPOSITORY"] = "REPOSITORY";
})(ConfigurationSource = exports.ConfigurationSource || (exports.ConfigurationSource = {}));
var SourceCodeVersionType;
(function (SourceCodeVersionType) {
    SourceCodeVersionType["BRANCH"] = "BRANCH";
})(SourceCodeVersionType = exports.SourceCodeVersionType || (exports.SourceCodeVersionType = {}));
var ImageRepositoryType;
(function (ImageRepositoryType) {
    ImageRepositoryType["ECR"] = "ECR";
    ImageRepositoryType["ECR_PUBLIC"] = "ECR_PUBLIC";
})(ImageRepositoryType = exports.ImageRepositoryType || (exports.ImageRepositoryType = {}));
var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus["CREATE_FAILED"] = "CREATE_FAILED";
    ServiceStatus["DELETED"] = "DELETED";
    ServiceStatus["DELETE_FAILED"] = "DELETE_FAILED";
    ServiceStatus["OPERATION_IN_PROGRESS"] = "OPERATION_IN_PROGRESS";
    ServiceStatus["PAUSED"] = "PAUSED";
    ServiceStatus["RUNNING"] = "RUNNING";
})(ServiceStatus = exports.ServiceStatus || (exports.ServiceStatus = {}));
var VpcConnectorStatus;
(function (VpcConnectorStatus) {
    VpcConnectorStatus["ACTIVE"] = "ACTIVE";
    VpcConnectorStatus["INACTIVE"] = "INACTIVE";
})(VpcConnectorStatus = exports.VpcConnectorStatus || (exports.VpcConnectorStatus = {}));
class ResourceNotFoundException extends AppRunnerServiceException_1.AppRunnerServiceException {
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
        this.Message = opts.Message;
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
var OperationStatus;
(function (OperationStatus) {
    OperationStatus["FAILED"] = "FAILED";
    OperationStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OperationStatus["PENDING"] = "PENDING";
    OperationStatus["ROLLBACK_FAILED"] = "ROLLBACK_FAILED";
    OperationStatus["ROLLBACK_IN_PROGRESS"] = "ROLLBACK_IN_PROGRESS";
    OperationStatus["ROLLBACK_SUCCEEDED"] = "ROLLBACK_SUCCEEDED";
    OperationStatus["SUCCEEDED"] = "SUCCEEDED";
})(OperationStatus = exports.OperationStatus || (exports.OperationStatus = {}));
var OperationType;
(function (OperationType) {
    OperationType["CREATE_SERVICE"] = "CREATE_SERVICE";
    OperationType["DELETE_SERVICE"] = "DELETE_SERVICE";
    OperationType["PAUSE_SERVICE"] = "PAUSE_SERVICE";
    OperationType["RESUME_SERVICE"] = "RESUME_SERVICE";
    OperationType["START_DEPLOYMENT"] = "START_DEPLOYMENT";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
const AssociateCustomDomainRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssociateCustomDomainRequestFilterSensitiveLog = AssociateCustomDomainRequestFilterSensitiveLog;
const CertificateValidationRecordFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CertificateValidationRecordFilterSensitiveLog = CertificateValidationRecordFilterSensitiveLog;
const CustomDomainFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CustomDomainFilterSensitiveLog = CustomDomainFilterSensitiveLog;
const AssociateCustomDomainResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssociateCustomDomainResponseFilterSensitiveLog = AssociateCustomDomainResponseFilterSensitiveLog;
const TagFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.TagFilterSensitiveLog = TagFilterSensitiveLog;
const CreateAutoScalingConfigurationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateAutoScalingConfigurationRequestFilterSensitiveLog = CreateAutoScalingConfigurationRequestFilterSensitiveLog;
const AutoScalingConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AutoScalingConfigurationFilterSensitiveLog = AutoScalingConfigurationFilterSensitiveLog;
const CreateAutoScalingConfigurationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateAutoScalingConfigurationResponseFilterSensitiveLog = CreateAutoScalingConfigurationResponseFilterSensitiveLog;
const CreateConnectionRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateConnectionRequestFilterSensitiveLog = CreateConnectionRequestFilterSensitiveLog;
const ConnectionFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ConnectionFilterSensitiveLog = ConnectionFilterSensitiveLog;
const CreateConnectionResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateConnectionResponseFilterSensitiveLog = CreateConnectionResponseFilterSensitiveLog;
const TraceConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.TraceConfigurationFilterSensitiveLog = TraceConfigurationFilterSensitiveLog;
const CreateObservabilityConfigurationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateObservabilityConfigurationRequestFilterSensitiveLog = CreateObservabilityConfigurationRequestFilterSensitiveLog;
const ObservabilityConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ObservabilityConfigurationFilterSensitiveLog = ObservabilityConfigurationFilterSensitiveLog;
const CreateObservabilityConfigurationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateObservabilityConfigurationResponseFilterSensitiveLog = CreateObservabilityConfigurationResponseFilterSensitiveLog;
const EncryptionConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.EncryptionConfigurationFilterSensitiveLog = EncryptionConfigurationFilterSensitiveLog;
const HealthCheckConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.HealthCheckConfigurationFilterSensitiveLog = HealthCheckConfigurationFilterSensitiveLog;
const InstanceConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.InstanceConfigurationFilterSensitiveLog = InstanceConfigurationFilterSensitiveLog;
const EgressConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.EgressConfigurationFilterSensitiveLog = EgressConfigurationFilterSensitiveLog;
const NetworkConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.NetworkConfigurationFilterSensitiveLog = NetworkConfigurationFilterSensitiveLog;
const ServiceObservabilityConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ServiceObservabilityConfigurationFilterSensitiveLog = ServiceObservabilityConfigurationFilterSensitiveLog;
const AuthenticationConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AuthenticationConfigurationFilterSensitiveLog = AuthenticationConfigurationFilterSensitiveLog;
const CodeConfigurationValuesFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.BuildCommand && { BuildCommand: smithy_client_1.SENSITIVE_STRING }),
    ...(obj.StartCommand && { StartCommand: smithy_client_1.SENSITIVE_STRING }),
    ...(obj.RuntimeEnvironmentVariables && { RuntimeEnvironmentVariables: smithy_client_1.SENSITIVE_STRING }),
});
exports.CodeConfigurationValuesFilterSensitiveLog = CodeConfigurationValuesFilterSensitiveLog;
const CodeConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.CodeConfigurationValues && {
        CodeConfigurationValues: (0, exports.CodeConfigurationValuesFilterSensitiveLog)(obj.CodeConfigurationValues),
    }),
});
exports.CodeConfigurationFilterSensitiveLog = CodeConfigurationFilterSensitiveLog;
const SourceCodeVersionFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.SourceCodeVersionFilterSensitiveLog = SourceCodeVersionFilterSensitiveLog;
const CodeRepositoryFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.CodeConfiguration && { CodeConfiguration: (0, exports.CodeConfigurationFilterSensitiveLog)(obj.CodeConfiguration) }),
});
exports.CodeRepositoryFilterSensitiveLog = CodeRepositoryFilterSensitiveLog;
const ImageConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.RuntimeEnvironmentVariables && { RuntimeEnvironmentVariables: smithy_client_1.SENSITIVE_STRING }),
    ...(obj.StartCommand && { StartCommand: smithy_client_1.SENSITIVE_STRING }),
});
exports.ImageConfigurationFilterSensitiveLog = ImageConfigurationFilterSensitiveLog;
const ImageRepositoryFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.ImageConfiguration && { ImageConfiguration: (0, exports.ImageConfigurationFilterSensitiveLog)(obj.ImageConfiguration) }),
});
exports.ImageRepositoryFilterSensitiveLog = ImageRepositoryFilterSensitiveLog;
const SourceConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.CodeRepository && { CodeRepository: (0, exports.CodeRepositoryFilterSensitiveLog)(obj.CodeRepository) }),
    ...(obj.ImageRepository && { ImageRepository: (0, exports.ImageRepositoryFilterSensitiveLog)(obj.ImageRepository) }),
});
exports.SourceConfigurationFilterSensitiveLog = SourceConfigurationFilterSensitiveLog;
const CreateServiceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.SourceConfiguration && {
        SourceConfiguration: (0, exports.SourceConfigurationFilterSensitiveLog)(obj.SourceConfiguration),
    }),
});
exports.CreateServiceRequestFilterSensitiveLog = CreateServiceRequestFilterSensitiveLog;
const AutoScalingConfigurationSummaryFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AutoScalingConfigurationSummaryFilterSensitiveLog = AutoScalingConfigurationSummaryFilterSensitiveLog;
const ServiceFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.SourceConfiguration && {
        SourceConfiguration: (0, exports.SourceConfigurationFilterSensitiveLog)(obj.SourceConfiguration),
    }),
});
exports.ServiceFilterSensitiveLog = ServiceFilterSensitiveLog;
const CreateServiceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Service && { Service: (0, exports.ServiceFilterSensitiveLog)(obj.Service) }),
});
exports.CreateServiceResponseFilterSensitiveLog = CreateServiceResponseFilterSensitiveLog;
const CreateVpcConnectorRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateVpcConnectorRequestFilterSensitiveLog = CreateVpcConnectorRequestFilterSensitiveLog;
const VpcConnectorFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.VpcConnectorFilterSensitiveLog = VpcConnectorFilterSensitiveLog;
const CreateVpcConnectorResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CreateVpcConnectorResponseFilterSensitiveLog = CreateVpcConnectorResponseFilterSensitiveLog;
const DeleteAutoScalingConfigurationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteAutoScalingConfigurationRequestFilterSensitiveLog = DeleteAutoScalingConfigurationRequestFilterSensitiveLog;
const DeleteAutoScalingConfigurationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteAutoScalingConfigurationResponseFilterSensitiveLog = DeleteAutoScalingConfigurationResponseFilterSensitiveLog;
const DeleteConnectionRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteConnectionRequestFilterSensitiveLog = DeleteConnectionRequestFilterSensitiveLog;
const DeleteConnectionResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteConnectionResponseFilterSensitiveLog = DeleteConnectionResponseFilterSensitiveLog;
const DeleteObservabilityConfigurationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteObservabilityConfigurationRequestFilterSensitiveLog = DeleteObservabilityConfigurationRequestFilterSensitiveLog;
const DeleteObservabilityConfigurationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteObservabilityConfigurationResponseFilterSensitiveLog = DeleteObservabilityConfigurationResponseFilterSensitiveLog;
const DeleteServiceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteServiceRequestFilterSensitiveLog = DeleteServiceRequestFilterSensitiveLog;
const DeleteServiceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Service && { Service: (0, exports.ServiceFilterSensitiveLog)(obj.Service) }),
});
exports.DeleteServiceResponseFilterSensitiveLog = DeleteServiceResponseFilterSensitiveLog;
const DeleteVpcConnectorRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteVpcConnectorRequestFilterSensitiveLog = DeleteVpcConnectorRequestFilterSensitiveLog;
const DeleteVpcConnectorResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DeleteVpcConnectorResponseFilterSensitiveLog = DeleteVpcConnectorResponseFilterSensitiveLog;
const DescribeAutoScalingConfigurationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeAutoScalingConfigurationRequestFilterSensitiveLog = DescribeAutoScalingConfigurationRequestFilterSensitiveLog;
const DescribeAutoScalingConfigurationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeAutoScalingConfigurationResponseFilterSensitiveLog = DescribeAutoScalingConfigurationResponseFilterSensitiveLog;
const DescribeCustomDomainsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeCustomDomainsRequestFilterSensitiveLog = DescribeCustomDomainsRequestFilterSensitiveLog;
const DescribeCustomDomainsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeCustomDomainsResponseFilterSensitiveLog = DescribeCustomDomainsResponseFilterSensitiveLog;
const DescribeObservabilityConfigurationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeObservabilityConfigurationRequestFilterSensitiveLog = DescribeObservabilityConfigurationRequestFilterSensitiveLog;
const DescribeObservabilityConfigurationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeObservabilityConfigurationResponseFilterSensitiveLog = DescribeObservabilityConfigurationResponseFilterSensitiveLog;
const DescribeServiceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeServiceRequestFilterSensitiveLog = DescribeServiceRequestFilterSensitiveLog;
const DescribeServiceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Service && { Service: (0, exports.ServiceFilterSensitiveLog)(obj.Service) }),
});
exports.DescribeServiceResponseFilterSensitiveLog = DescribeServiceResponseFilterSensitiveLog;
const DescribeVpcConnectorRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeVpcConnectorRequestFilterSensitiveLog = DescribeVpcConnectorRequestFilterSensitiveLog;
const DescribeVpcConnectorResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DescribeVpcConnectorResponseFilterSensitiveLog = DescribeVpcConnectorResponseFilterSensitiveLog;
const DisassociateCustomDomainRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DisassociateCustomDomainRequestFilterSensitiveLog = DisassociateCustomDomainRequestFilterSensitiveLog;
const DisassociateCustomDomainResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DisassociateCustomDomainResponseFilterSensitiveLog = DisassociateCustomDomainResponseFilterSensitiveLog;
const ListAutoScalingConfigurationsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListAutoScalingConfigurationsRequestFilterSensitiveLog = ListAutoScalingConfigurationsRequestFilterSensitiveLog;
const ListAutoScalingConfigurationsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListAutoScalingConfigurationsResponseFilterSensitiveLog = ListAutoScalingConfigurationsResponseFilterSensitiveLog;
const ListConnectionsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListConnectionsRequestFilterSensitiveLog = ListConnectionsRequestFilterSensitiveLog;
const ConnectionSummaryFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ConnectionSummaryFilterSensitiveLog = ConnectionSummaryFilterSensitiveLog;
const ListConnectionsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListConnectionsResponseFilterSensitiveLog = ListConnectionsResponseFilterSensitiveLog;
const ListObservabilityConfigurationsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListObservabilityConfigurationsRequestFilterSensitiveLog = ListObservabilityConfigurationsRequestFilterSensitiveLog;
const ObservabilityConfigurationSummaryFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ObservabilityConfigurationSummaryFilterSensitiveLog = ObservabilityConfigurationSummaryFilterSensitiveLog;
const ListObservabilityConfigurationsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListObservabilityConfigurationsResponseFilterSensitiveLog = ListObservabilityConfigurationsResponseFilterSensitiveLog;
const ListOperationsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListOperationsRequestFilterSensitiveLog = ListOperationsRequestFilterSensitiveLog;
const OperationSummaryFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.OperationSummaryFilterSensitiveLog = OperationSummaryFilterSensitiveLog;
const ListOperationsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListOperationsResponseFilterSensitiveLog = ListOperationsResponseFilterSensitiveLog;
const ListServicesRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListServicesRequestFilterSensitiveLog = ListServicesRequestFilterSensitiveLog;
const ServiceSummaryFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ServiceSummaryFilterSensitiveLog = ServiceSummaryFilterSensitiveLog;
const ListServicesResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListServicesResponseFilterSensitiveLog = ListServicesResponseFilterSensitiveLog;
const ListTagsForResourceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListTagsForResourceRequestFilterSensitiveLog = ListTagsForResourceRequestFilterSensitiveLog;
const ListTagsForResourceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListTagsForResourceResponseFilterSensitiveLog = ListTagsForResourceResponseFilterSensitiveLog;
const ListVpcConnectorsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListVpcConnectorsRequestFilterSensitiveLog = ListVpcConnectorsRequestFilterSensitiveLog;
const ListVpcConnectorsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListVpcConnectorsResponseFilterSensitiveLog = ListVpcConnectorsResponseFilterSensitiveLog;
const PauseServiceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.PauseServiceRequestFilterSensitiveLog = PauseServiceRequestFilterSensitiveLog;
const PauseServiceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Service && { Service: (0, exports.ServiceFilterSensitiveLog)(obj.Service) }),
});
exports.PauseServiceResponseFilterSensitiveLog = PauseServiceResponseFilterSensitiveLog;
const ResumeServiceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ResumeServiceRequestFilterSensitiveLog = ResumeServiceRequestFilterSensitiveLog;
const ResumeServiceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Service && { Service: (0, exports.ServiceFilterSensitiveLog)(obj.Service) }),
});
exports.ResumeServiceResponseFilterSensitiveLog = ResumeServiceResponseFilterSensitiveLog;
const StartDeploymentRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.StartDeploymentRequestFilterSensitiveLog = StartDeploymentRequestFilterSensitiveLog;
const StartDeploymentResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.StartDeploymentResponseFilterSensitiveLog = StartDeploymentResponseFilterSensitiveLog;
const TagResourceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.TagResourceRequestFilterSensitiveLog = TagResourceRequestFilterSensitiveLog;
const TagResourceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.TagResourceResponseFilterSensitiveLog = TagResourceResponseFilterSensitiveLog;
const UntagResourceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.UntagResourceRequestFilterSensitiveLog = UntagResourceRequestFilterSensitiveLog;
const UntagResourceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.UntagResourceResponseFilterSensitiveLog = UntagResourceResponseFilterSensitiveLog;
const UpdateServiceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.SourceConfiguration && {
        SourceConfiguration: (0, exports.SourceConfigurationFilterSensitiveLog)(obj.SourceConfiguration),
    }),
});
exports.UpdateServiceRequestFilterSensitiveLog = UpdateServiceRequestFilterSensitiveLog;
const UpdateServiceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Service && { Service: (0, exports.ServiceFilterSensitiveLog)(obj.Service) }),
});
exports.UpdateServiceResponseFilterSensitiveLog = UpdateServiceResponseFilterSensitiveLog;


/***/ }),

/***/ 7172:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateDescribeCustomDomains = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const DescribeCustomDomainsCommand_1 = __nccwpck_require__(8557);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new DescribeCustomDomainsCommand_1.DescribeCustomDomainsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.describeCustomDomains(input, ...args);
};
async function* paginateDescribeCustomDomains(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateDescribeCustomDomains = paginateDescribeCustomDomains;


/***/ }),

/***/ 4365:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 2625:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListAutoScalingConfigurations = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const ListAutoScalingConfigurationsCommand_1 = __nccwpck_require__(7541);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListAutoScalingConfigurationsCommand_1.ListAutoScalingConfigurationsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listAutoScalingConfigurations(input, ...args);
};
async function* paginateListAutoScalingConfigurations(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListAutoScalingConfigurations = paginateListAutoScalingConfigurations;


/***/ }),

/***/ 5391:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListConnections = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const ListConnectionsCommand_1 = __nccwpck_require__(6669);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListConnectionsCommand_1.ListConnectionsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listConnections(input, ...args);
};
async function* paginateListConnections(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListConnections = paginateListConnections;


/***/ }),

/***/ 1724:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListObservabilityConfigurations = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const ListObservabilityConfigurationsCommand_1 = __nccwpck_require__(5433);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListObservabilityConfigurationsCommand_1.ListObservabilityConfigurationsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listObservabilityConfigurations(input, ...args);
};
async function* paginateListObservabilityConfigurations(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListObservabilityConfigurations = paginateListObservabilityConfigurations;


/***/ }),

/***/ 8685:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListOperations = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const ListOperationsCommand_1 = __nccwpck_require__(4786);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListOperationsCommand_1.ListOperationsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listOperations(input, ...args);
};
async function* paginateListOperations(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListOperations = paginateListOperations;


/***/ }),

/***/ 9474:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListServices = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const ListServicesCommand_1 = __nccwpck_require__(5752);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListServicesCommand_1.ListServicesCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listServices(input, ...args);
};
async function* paginateListServices(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListServices = paginateListServices;


/***/ }),

/***/ 5888:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListVpcConnectors = void 0;
const AppRunner_1 = __nccwpck_require__(7808);
const AppRunnerClient_1 = __nccwpck_require__(5525);
const ListVpcConnectorsCommand_1 = __nccwpck_require__(5260);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListVpcConnectorsCommand_1.ListVpcConnectorsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listVpcConnectors(input, ...args);
};
async function* paginateListVpcConnectors(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof AppRunner_1.AppRunner) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof AppRunnerClient_1.AppRunnerClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected AppRunner | AppRunnerClient");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListVpcConnectors = paginateListVpcConnectors;


/***/ }),

/***/ 2598:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7172), exports);
tslib_1.__exportStar(__nccwpck_require__(4365), exports);
tslib_1.__exportStar(__nccwpck_require__(2625), exports);
tslib_1.__exportStar(__nccwpck_require__(5391), exports);
tslib_1.__exportStar(__nccwpck_require__(1724), exports);
tslib_1.__exportStar(__nccwpck_require__(8685), exports);
tslib_1.__exportStar(__nccwpck_require__(9474), exports);
tslib_1.__exportStar(__nccwpck_require__(5888), exports);


/***/ }),

/***/ 5818:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserializeAws_json1_0ListObservabilityConfigurationsCommand = exports.deserializeAws_json1_0ListConnectionsCommand = exports.deserializeAws_json1_0ListAutoScalingConfigurationsCommand = exports.deserializeAws_json1_0DisassociateCustomDomainCommand = exports.deserializeAws_json1_0DescribeVpcConnectorCommand = exports.deserializeAws_json1_0DescribeServiceCommand = exports.deserializeAws_json1_0DescribeObservabilityConfigurationCommand = exports.deserializeAws_json1_0DescribeCustomDomainsCommand = exports.deserializeAws_json1_0DescribeAutoScalingConfigurationCommand = exports.deserializeAws_json1_0DeleteVpcConnectorCommand = exports.deserializeAws_json1_0DeleteServiceCommand = exports.deserializeAws_json1_0DeleteObservabilityConfigurationCommand = exports.deserializeAws_json1_0DeleteConnectionCommand = exports.deserializeAws_json1_0DeleteAutoScalingConfigurationCommand = exports.deserializeAws_json1_0CreateVpcConnectorCommand = exports.deserializeAws_json1_0CreateServiceCommand = exports.deserializeAws_json1_0CreateObservabilityConfigurationCommand = exports.deserializeAws_json1_0CreateConnectionCommand = exports.deserializeAws_json1_0CreateAutoScalingConfigurationCommand = exports.deserializeAws_json1_0AssociateCustomDomainCommand = exports.serializeAws_json1_0UpdateServiceCommand = exports.serializeAws_json1_0UntagResourceCommand = exports.serializeAws_json1_0TagResourceCommand = exports.serializeAws_json1_0StartDeploymentCommand = exports.serializeAws_json1_0ResumeServiceCommand = exports.serializeAws_json1_0PauseServiceCommand = exports.serializeAws_json1_0ListVpcConnectorsCommand = exports.serializeAws_json1_0ListTagsForResourceCommand = exports.serializeAws_json1_0ListServicesCommand = exports.serializeAws_json1_0ListOperationsCommand = exports.serializeAws_json1_0ListObservabilityConfigurationsCommand = exports.serializeAws_json1_0ListConnectionsCommand = exports.serializeAws_json1_0ListAutoScalingConfigurationsCommand = exports.serializeAws_json1_0DisassociateCustomDomainCommand = exports.serializeAws_json1_0DescribeVpcConnectorCommand = exports.serializeAws_json1_0DescribeServiceCommand = exports.serializeAws_json1_0DescribeObservabilityConfigurationCommand = exports.serializeAws_json1_0DescribeCustomDomainsCommand = exports.serializeAws_json1_0DescribeAutoScalingConfigurationCommand = exports.serializeAws_json1_0DeleteVpcConnectorCommand = exports.serializeAws_json1_0DeleteServiceCommand = exports.serializeAws_json1_0DeleteObservabilityConfigurationCommand = exports.serializeAws_json1_0DeleteConnectionCommand = exports.serializeAws_json1_0DeleteAutoScalingConfigurationCommand = exports.serializeAws_json1_0CreateVpcConnectorCommand = exports.serializeAws_json1_0CreateServiceCommand = exports.serializeAws_json1_0CreateObservabilityConfigurationCommand = exports.serializeAws_json1_0CreateConnectionCommand = exports.serializeAws_json1_0CreateAutoScalingConfigurationCommand = exports.serializeAws_json1_0AssociateCustomDomainCommand = void 0;
exports.deserializeAws_json1_0UpdateServiceCommand = exports.deserializeAws_json1_0UntagResourceCommand = exports.deserializeAws_json1_0TagResourceCommand = exports.deserializeAws_json1_0StartDeploymentCommand = exports.deserializeAws_json1_0ResumeServiceCommand = exports.deserializeAws_json1_0PauseServiceCommand = exports.deserializeAws_json1_0ListVpcConnectorsCommand = exports.deserializeAws_json1_0ListTagsForResourceCommand = exports.deserializeAws_json1_0ListServicesCommand = exports.deserializeAws_json1_0ListOperationsCommand = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const smithy_client_1 = __nccwpck_require__(3623);
const AppRunnerServiceException_1 = __nccwpck_require__(957);
const models_0_1 = __nccwpck_require__(8543);
const serializeAws_json1_0AssociateCustomDomainCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.AssociateCustomDomain",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0AssociateCustomDomainRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0AssociateCustomDomainCommand = serializeAws_json1_0AssociateCustomDomainCommand;
const serializeAws_json1_0CreateAutoScalingConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.CreateAutoScalingConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0CreateAutoScalingConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0CreateAutoScalingConfigurationCommand = serializeAws_json1_0CreateAutoScalingConfigurationCommand;
const serializeAws_json1_0CreateConnectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.CreateConnection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0CreateConnectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0CreateConnectionCommand = serializeAws_json1_0CreateConnectionCommand;
const serializeAws_json1_0CreateObservabilityConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.CreateObservabilityConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0CreateObservabilityConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0CreateObservabilityConfigurationCommand = serializeAws_json1_0CreateObservabilityConfigurationCommand;
const serializeAws_json1_0CreateServiceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.CreateService",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0CreateServiceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0CreateServiceCommand = serializeAws_json1_0CreateServiceCommand;
const serializeAws_json1_0CreateVpcConnectorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.CreateVpcConnector",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0CreateVpcConnectorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0CreateVpcConnectorCommand = serializeAws_json1_0CreateVpcConnectorCommand;
const serializeAws_json1_0DeleteAutoScalingConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DeleteAutoScalingConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DeleteAutoScalingConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DeleteAutoScalingConfigurationCommand = serializeAws_json1_0DeleteAutoScalingConfigurationCommand;
const serializeAws_json1_0DeleteConnectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DeleteConnection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DeleteConnectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DeleteConnectionCommand = serializeAws_json1_0DeleteConnectionCommand;
const serializeAws_json1_0DeleteObservabilityConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DeleteObservabilityConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DeleteObservabilityConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DeleteObservabilityConfigurationCommand = serializeAws_json1_0DeleteObservabilityConfigurationCommand;
const serializeAws_json1_0DeleteServiceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DeleteService",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DeleteServiceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DeleteServiceCommand = serializeAws_json1_0DeleteServiceCommand;
const serializeAws_json1_0DeleteVpcConnectorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DeleteVpcConnector",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DeleteVpcConnectorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DeleteVpcConnectorCommand = serializeAws_json1_0DeleteVpcConnectorCommand;
const serializeAws_json1_0DescribeAutoScalingConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DescribeAutoScalingConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DescribeAutoScalingConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DescribeAutoScalingConfigurationCommand = serializeAws_json1_0DescribeAutoScalingConfigurationCommand;
const serializeAws_json1_0DescribeCustomDomainsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DescribeCustomDomains",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DescribeCustomDomainsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DescribeCustomDomainsCommand = serializeAws_json1_0DescribeCustomDomainsCommand;
const serializeAws_json1_0DescribeObservabilityConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DescribeObservabilityConfiguration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DescribeObservabilityConfigurationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DescribeObservabilityConfigurationCommand = serializeAws_json1_0DescribeObservabilityConfigurationCommand;
const serializeAws_json1_0DescribeServiceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DescribeService",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DescribeServiceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DescribeServiceCommand = serializeAws_json1_0DescribeServiceCommand;
const serializeAws_json1_0DescribeVpcConnectorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DescribeVpcConnector",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DescribeVpcConnectorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DescribeVpcConnectorCommand = serializeAws_json1_0DescribeVpcConnectorCommand;
const serializeAws_json1_0DisassociateCustomDomainCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.DisassociateCustomDomain",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0DisassociateCustomDomainRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0DisassociateCustomDomainCommand = serializeAws_json1_0DisassociateCustomDomainCommand;
const serializeAws_json1_0ListAutoScalingConfigurationsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListAutoScalingConfigurations",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListAutoScalingConfigurationsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListAutoScalingConfigurationsCommand = serializeAws_json1_0ListAutoScalingConfigurationsCommand;
const serializeAws_json1_0ListConnectionsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListConnections",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListConnectionsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListConnectionsCommand = serializeAws_json1_0ListConnectionsCommand;
const serializeAws_json1_0ListObservabilityConfigurationsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListObservabilityConfigurations",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListObservabilityConfigurationsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListObservabilityConfigurationsCommand = serializeAws_json1_0ListObservabilityConfigurationsCommand;
const serializeAws_json1_0ListOperationsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListOperations",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListOperationsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListOperationsCommand = serializeAws_json1_0ListOperationsCommand;
const serializeAws_json1_0ListServicesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListServices",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListServicesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListServicesCommand = serializeAws_json1_0ListServicesCommand;
const serializeAws_json1_0ListTagsForResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListTagsForResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListTagsForResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListTagsForResourceCommand = serializeAws_json1_0ListTagsForResourceCommand;
const serializeAws_json1_0ListVpcConnectorsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ListVpcConnectors",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ListVpcConnectorsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ListVpcConnectorsCommand = serializeAws_json1_0ListVpcConnectorsCommand;
const serializeAws_json1_0PauseServiceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.PauseService",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0PauseServiceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0PauseServiceCommand = serializeAws_json1_0PauseServiceCommand;
const serializeAws_json1_0ResumeServiceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.ResumeService",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0ResumeServiceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0ResumeServiceCommand = serializeAws_json1_0ResumeServiceCommand;
const serializeAws_json1_0StartDeploymentCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.StartDeployment",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0StartDeploymentRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0StartDeploymentCommand = serializeAws_json1_0StartDeploymentCommand;
const serializeAws_json1_0TagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.TagResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0TagResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0TagResourceCommand = serializeAws_json1_0TagResourceCommand;
const serializeAws_json1_0UntagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.UntagResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0UntagResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0UntagResourceCommand = serializeAws_json1_0UntagResourceCommand;
const serializeAws_json1_0UpdateServiceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "AppRunner.UpdateService",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_0UpdateServiceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_0UpdateServiceCommand = serializeAws_json1_0UpdateServiceCommand;
const deserializeAws_json1_0AssociateCustomDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0AssociateCustomDomainCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0AssociateCustomDomainResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0AssociateCustomDomainCommand = deserializeAws_json1_0AssociateCustomDomainCommand;
const deserializeAws_json1_0AssociateCustomDomainCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0CreateAutoScalingConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0CreateAutoScalingConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0CreateAutoScalingConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0CreateAutoScalingConfigurationCommand = deserializeAws_json1_0CreateAutoScalingConfigurationCommand;
const deserializeAws_json1_0CreateAutoScalingConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.apprunner#ServiceQuotaExceededException":
            throw await deserializeAws_json1_0ServiceQuotaExceededExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0CreateConnectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0CreateConnectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0CreateConnectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0CreateConnectionCommand = deserializeAws_json1_0CreateConnectionCommand;
const deserializeAws_json1_0CreateConnectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.apprunner#ServiceQuotaExceededException":
            throw await deserializeAws_json1_0ServiceQuotaExceededExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0CreateObservabilityConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0CreateObservabilityConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0CreateObservabilityConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0CreateObservabilityConfigurationCommand = deserializeAws_json1_0CreateObservabilityConfigurationCommand;
const deserializeAws_json1_0CreateObservabilityConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.apprunner#ServiceQuotaExceededException":
            throw await deserializeAws_json1_0ServiceQuotaExceededExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0CreateServiceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0CreateServiceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0CreateServiceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0CreateServiceCommand = deserializeAws_json1_0CreateServiceCommand;
const deserializeAws_json1_0CreateServiceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.apprunner#ServiceQuotaExceededException":
            throw await deserializeAws_json1_0ServiceQuotaExceededExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0CreateVpcConnectorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0CreateVpcConnectorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0CreateVpcConnectorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0CreateVpcConnectorCommand = deserializeAws_json1_0CreateVpcConnectorCommand;
const deserializeAws_json1_0CreateVpcConnectorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.apprunner#ServiceQuotaExceededException":
            throw await deserializeAws_json1_0ServiceQuotaExceededExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DeleteAutoScalingConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DeleteAutoScalingConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DeleteAutoScalingConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DeleteAutoScalingConfigurationCommand = deserializeAws_json1_0DeleteAutoScalingConfigurationCommand;
const deserializeAws_json1_0DeleteAutoScalingConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DeleteConnectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DeleteConnectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DeleteConnectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DeleteConnectionCommand = deserializeAws_json1_0DeleteConnectionCommand;
const deserializeAws_json1_0DeleteConnectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DeleteObservabilityConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DeleteObservabilityConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DeleteObservabilityConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DeleteObservabilityConfigurationCommand = deserializeAws_json1_0DeleteObservabilityConfigurationCommand;
const deserializeAws_json1_0DeleteObservabilityConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DeleteServiceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DeleteServiceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DeleteServiceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DeleteServiceCommand = deserializeAws_json1_0DeleteServiceCommand;
const deserializeAws_json1_0DeleteServiceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DeleteVpcConnectorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DeleteVpcConnectorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DeleteVpcConnectorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DeleteVpcConnectorCommand = deserializeAws_json1_0DeleteVpcConnectorCommand;
const deserializeAws_json1_0DeleteVpcConnectorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DescribeAutoScalingConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DescribeAutoScalingConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DescribeAutoScalingConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DescribeAutoScalingConfigurationCommand = deserializeAws_json1_0DescribeAutoScalingConfigurationCommand;
const deserializeAws_json1_0DescribeAutoScalingConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DescribeCustomDomainsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DescribeCustomDomainsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DescribeCustomDomainsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DescribeCustomDomainsCommand = deserializeAws_json1_0DescribeCustomDomainsCommand;
const deserializeAws_json1_0DescribeCustomDomainsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DescribeObservabilityConfigurationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DescribeObservabilityConfigurationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DescribeObservabilityConfigurationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DescribeObservabilityConfigurationCommand = deserializeAws_json1_0DescribeObservabilityConfigurationCommand;
const deserializeAws_json1_0DescribeObservabilityConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DescribeServiceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DescribeServiceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DescribeServiceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DescribeServiceCommand = deserializeAws_json1_0DescribeServiceCommand;
const deserializeAws_json1_0DescribeServiceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DescribeVpcConnectorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DescribeVpcConnectorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DescribeVpcConnectorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DescribeVpcConnectorCommand = deserializeAws_json1_0DescribeVpcConnectorCommand;
const deserializeAws_json1_0DescribeVpcConnectorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0DisassociateCustomDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0DisassociateCustomDomainCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0DisassociateCustomDomainResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0DisassociateCustomDomainCommand = deserializeAws_json1_0DisassociateCustomDomainCommand;
const deserializeAws_json1_0DisassociateCustomDomainCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListAutoScalingConfigurationsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListAutoScalingConfigurationsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListAutoScalingConfigurationsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListAutoScalingConfigurationsCommand = deserializeAws_json1_0ListAutoScalingConfigurationsCommand;
const deserializeAws_json1_0ListAutoScalingConfigurationsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListConnectionsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListConnectionsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListConnectionsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListConnectionsCommand = deserializeAws_json1_0ListConnectionsCommand;
const deserializeAws_json1_0ListConnectionsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListObservabilityConfigurationsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListObservabilityConfigurationsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListObservabilityConfigurationsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListObservabilityConfigurationsCommand = deserializeAws_json1_0ListObservabilityConfigurationsCommand;
const deserializeAws_json1_0ListObservabilityConfigurationsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListOperationsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListOperationsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListOperationsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListOperationsCommand = deserializeAws_json1_0ListOperationsCommand;
const deserializeAws_json1_0ListOperationsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListServicesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListServicesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListServicesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListServicesCommand = deserializeAws_json1_0ListServicesCommand;
const deserializeAws_json1_0ListServicesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListTagsForResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListTagsForResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListTagsForResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListTagsForResourceCommand = deserializeAws_json1_0ListTagsForResourceCommand;
const deserializeAws_json1_0ListTagsForResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ListVpcConnectorsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ListVpcConnectorsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ListVpcConnectorsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ListVpcConnectorsCommand = deserializeAws_json1_0ListVpcConnectorsCommand;
const deserializeAws_json1_0ListVpcConnectorsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0PauseServiceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0PauseServiceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0PauseServiceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0PauseServiceCommand = deserializeAws_json1_0PauseServiceCommand;
const deserializeAws_json1_0PauseServiceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0ResumeServiceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0ResumeServiceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0ResumeServiceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0ResumeServiceCommand = deserializeAws_json1_0ResumeServiceCommand;
const deserializeAws_json1_0ResumeServiceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0StartDeploymentCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0StartDeploymentCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0StartDeploymentResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0StartDeploymentCommand = deserializeAws_json1_0StartDeploymentCommand;
const deserializeAws_json1_0StartDeploymentCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0TagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0TagResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0TagResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0TagResourceCommand = deserializeAws_json1_0TagResourceCommand;
const deserializeAws_json1_0TagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0UntagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0UntagResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0UntagResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0UntagResourceCommand = deserializeAws_json1_0UntagResourceCommand;
const deserializeAws_json1_0UntagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0UpdateServiceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_0UpdateServiceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_0UpdateServiceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_0UpdateServiceCommand = deserializeAws_json1_0UpdateServiceCommand;
const deserializeAws_json1_0UpdateServiceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServiceErrorException":
        case "com.amazonaws.apprunner#InternalServiceErrorException":
            throw await deserializeAws_json1_0InternalServiceErrorExceptionResponse(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.apprunner#InvalidRequestException":
            throw await deserializeAws_json1_0InvalidRequestExceptionResponse(parsedOutput, context);
        case "InvalidStateException":
        case "com.amazonaws.apprunner#InvalidStateException":
            throw await deserializeAws_json1_0InvalidStateExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.apprunner#ResourceNotFoundException":
            throw await deserializeAws_json1_0ResourceNotFoundExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: AppRunnerServiceException_1.AppRunnerServiceException,
                errorCode,
            });
    }
};
const deserializeAws_json1_0InternalServiceErrorExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_0InternalServiceErrorException(body, context);
    const exception = new models_0_1.InternalServiceErrorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_json1_0InvalidRequestExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_0InvalidRequestException(body, context);
    const exception = new models_0_1.InvalidRequestException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_json1_0InvalidStateExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_0InvalidStateException(body, context);
    const exception = new models_0_1.InvalidStateException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_json1_0ResourceNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_0ResourceNotFoundException(body, context);
    const exception = new models_0_1.ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_json1_0ServiceQuotaExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_0ServiceQuotaExceededException(body, context);
    const exception = new models_0_1.ServiceQuotaExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const serializeAws_json1_0AssociateCustomDomainRequest = (input, context) => {
    return {
        ...(input.DomainName != null && { DomainName: input.DomainName }),
        ...(input.EnableWWWSubdomain != null && { EnableWWWSubdomain: input.EnableWWWSubdomain }),
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0AuthenticationConfiguration = (input, context) => {
    return {
        ...(input.AccessRoleArn != null && { AccessRoleArn: input.AccessRoleArn }),
        ...(input.ConnectionArn != null && { ConnectionArn: input.ConnectionArn }),
    };
};
const serializeAws_json1_0CodeConfiguration = (input, context) => {
    return {
        ...(input.CodeConfigurationValues != null && {
            CodeConfigurationValues: serializeAws_json1_0CodeConfigurationValues(input.CodeConfigurationValues, context),
        }),
        ...(input.ConfigurationSource != null && { ConfigurationSource: input.ConfigurationSource }),
    };
};
const serializeAws_json1_0CodeConfigurationValues = (input, context) => {
    return {
        ...(input.BuildCommand != null && { BuildCommand: input.BuildCommand }),
        ...(input.Port != null && { Port: input.Port }),
        ...(input.Runtime != null && { Runtime: input.Runtime }),
        ...(input.RuntimeEnvironmentVariables != null && {
            RuntimeEnvironmentVariables: serializeAws_json1_0RuntimeEnvironmentVariables(input.RuntimeEnvironmentVariables, context),
        }),
        ...(input.StartCommand != null && { StartCommand: input.StartCommand }),
    };
};
const serializeAws_json1_0CodeRepository = (input, context) => {
    return {
        ...(input.CodeConfiguration != null && {
            CodeConfiguration: serializeAws_json1_0CodeConfiguration(input.CodeConfiguration, context),
        }),
        ...(input.RepositoryUrl != null && { RepositoryUrl: input.RepositoryUrl }),
        ...(input.SourceCodeVersion != null && {
            SourceCodeVersion: serializeAws_json1_0SourceCodeVersion(input.SourceCodeVersion, context),
        }),
    };
};
const serializeAws_json1_0CreateAutoScalingConfigurationRequest = (input, context) => {
    return {
        ...(input.AutoScalingConfigurationName != null && {
            AutoScalingConfigurationName: input.AutoScalingConfigurationName,
        }),
        ...(input.MaxConcurrency != null && { MaxConcurrency: input.MaxConcurrency }),
        ...(input.MaxSize != null && { MaxSize: input.MaxSize }),
        ...(input.MinSize != null && { MinSize: input.MinSize }),
        ...(input.Tags != null && { Tags: serializeAws_json1_0TagList(input.Tags, context) }),
    };
};
const serializeAws_json1_0CreateConnectionRequest = (input, context) => {
    return {
        ...(input.ConnectionName != null && { ConnectionName: input.ConnectionName }),
        ...(input.ProviderType != null && { ProviderType: input.ProviderType }),
        ...(input.Tags != null && { Tags: serializeAws_json1_0TagList(input.Tags, context) }),
    };
};
const serializeAws_json1_0CreateObservabilityConfigurationRequest = (input, context) => {
    return {
        ...(input.ObservabilityConfigurationName != null && {
            ObservabilityConfigurationName: input.ObservabilityConfigurationName,
        }),
        ...(input.Tags != null && { Tags: serializeAws_json1_0TagList(input.Tags, context) }),
        ...(input.TraceConfiguration != null && {
            TraceConfiguration: serializeAws_json1_0TraceConfiguration(input.TraceConfiguration, context),
        }),
    };
};
const serializeAws_json1_0CreateServiceRequest = (input, context) => {
    return {
        ...(input.AutoScalingConfigurationArn != null && {
            AutoScalingConfigurationArn: input.AutoScalingConfigurationArn,
        }),
        ...(input.EncryptionConfiguration != null && {
            EncryptionConfiguration: serializeAws_json1_0EncryptionConfiguration(input.EncryptionConfiguration, context),
        }),
        ...(input.HealthCheckConfiguration != null && {
            HealthCheckConfiguration: serializeAws_json1_0HealthCheckConfiguration(input.HealthCheckConfiguration, context),
        }),
        ...(input.InstanceConfiguration != null && {
            InstanceConfiguration: serializeAws_json1_0InstanceConfiguration(input.InstanceConfiguration, context),
        }),
        ...(input.NetworkConfiguration != null && {
            NetworkConfiguration: serializeAws_json1_0NetworkConfiguration(input.NetworkConfiguration, context),
        }),
        ...(input.ObservabilityConfiguration != null && {
            ObservabilityConfiguration: serializeAws_json1_0ServiceObservabilityConfiguration(input.ObservabilityConfiguration, context),
        }),
        ...(input.ServiceName != null && { ServiceName: input.ServiceName }),
        ...(input.SourceConfiguration != null && {
            SourceConfiguration: serializeAws_json1_0SourceConfiguration(input.SourceConfiguration, context),
        }),
        ...(input.Tags != null && { Tags: serializeAws_json1_0TagList(input.Tags, context) }),
    };
};
const serializeAws_json1_0CreateVpcConnectorRequest = (input, context) => {
    return {
        ...(input.SecurityGroups != null && {
            SecurityGroups: serializeAws_json1_0StringList(input.SecurityGroups, context),
        }),
        ...(input.Subnets != null && { Subnets: serializeAws_json1_0StringList(input.Subnets, context) }),
        ...(input.Tags != null && { Tags: serializeAws_json1_0TagList(input.Tags, context) }),
        ...(input.VpcConnectorName != null && { VpcConnectorName: input.VpcConnectorName }),
    };
};
const serializeAws_json1_0DeleteAutoScalingConfigurationRequest = (input, context) => {
    return {
        ...(input.AutoScalingConfigurationArn != null && {
            AutoScalingConfigurationArn: input.AutoScalingConfigurationArn,
        }),
    };
};
const serializeAws_json1_0DeleteConnectionRequest = (input, context) => {
    return {
        ...(input.ConnectionArn != null && { ConnectionArn: input.ConnectionArn }),
    };
};
const serializeAws_json1_0DeleteObservabilityConfigurationRequest = (input, context) => {
    return {
        ...(input.ObservabilityConfigurationArn != null && {
            ObservabilityConfigurationArn: input.ObservabilityConfigurationArn,
        }),
    };
};
const serializeAws_json1_0DeleteServiceRequest = (input, context) => {
    return {
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0DeleteVpcConnectorRequest = (input, context) => {
    return {
        ...(input.VpcConnectorArn != null && { VpcConnectorArn: input.VpcConnectorArn }),
    };
};
const serializeAws_json1_0DescribeAutoScalingConfigurationRequest = (input, context) => {
    return {
        ...(input.AutoScalingConfigurationArn != null && {
            AutoScalingConfigurationArn: input.AutoScalingConfigurationArn,
        }),
    };
};
const serializeAws_json1_0DescribeCustomDomainsRequest = (input, context) => {
    return {
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0DescribeObservabilityConfigurationRequest = (input, context) => {
    return {
        ...(input.ObservabilityConfigurationArn != null && {
            ObservabilityConfigurationArn: input.ObservabilityConfigurationArn,
        }),
    };
};
const serializeAws_json1_0DescribeServiceRequest = (input, context) => {
    return {
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0DescribeVpcConnectorRequest = (input, context) => {
    return {
        ...(input.VpcConnectorArn != null && { VpcConnectorArn: input.VpcConnectorArn }),
    };
};
const serializeAws_json1_0DisassociateCustomDomainRequest = (input, context) => {
    return {
        ...(input.DomainName != null && { DomainName: input.DomainName }),
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0EgressConfiguration = (input, context) => {
    return {
        ...(input.EgressType != null && { EgressType: input.EgressType }),
        ...(input.VpcConnectorArn != null && { VpcConnectorArn: input.VpcConnectorArn }),
    };
};
const serializeAws_json1_0EncryptionConfiguration = (input, context) => {
    return {
        ...(input.KmsKey != null && { KmsKey: input.KmsKey }),
    };
};
const serializeAws_json1_0HealthCheckConfiguration = (input, context) => {
    return {
        ...(input.HealthyThreshold != null && { HealthyThreshold: input.HealthyThreshold }),
        ...(input.Interval != null && { Interval: input.Interval }),
        ...(input.Path != null && { Path: input.Path }),
        ...(input.Protocol != null && { Protocol: input.Protocol }),
        ...(input.Timeout != null && { Timeout: input.Timeout }),
        ...(input.UnhealthyThreshold != null && { UnhealthyThreshold: input.UnhealthyThreshold }),
    };
};
const serializeAws_json1_0ImageConfiguration = (input, context) => {
    return {
        ...(input.Port != null && { Port: input.Port }),
        ...(input.RuntimeEnvironmentVariables != null && {
            RuntimeEnvironmentVariables: serializeAws_json1_0RuntimeEnvironmentVariables(input.RuntimeEnvironmentVariables, context),
        }),
        ...(input.StartCommand != null && { StartCommand: input.StartCommand }),
    };
};
const serializeAws_json1_0ImageRepository = (input, context) => {
    return {
        ...(input.ImageConfiguration != null && {
            ImageConfiguration: serializeAws_json1_0ImageConfiguration(input.ImageConfiguration, context),
        }),
        ...(input.ImageIdentifier != null && { ImageIdentifier: input.ImageIdentifier }),
        ...(input.ImageRepositoryType != null && { ImageRepositoryType: input.ImageRepositoryType }),
    };
};
const serializeAws_json1_0InstanceConfiguration = (input, context) => {
    return {
        ...(input.Cpu != null && { Cpu: input.Cpu }),
        ...(input.InstanceRoleArn != null && { InstanceRoleArn: input.InstanceRoleArn }),
        ...(input.Memory != null && { Memory: input.Memory }),
    };
};
const serializeAws_json1_0ListAutoScalingConfigurationsRequest = (input, context) => {
    return {
        ...(input.AutoScalingConfigurationName != null && {
            AutoScalingConfigurationName: input.AutoScalingConfigurationName,
        }),
        ...(input.LatestOnly != null && { LatestOnly: input.LatestOnly }),
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_0ListConnectionsRequest = (input, context) => {
    return {
        ...(input.ConnectionName != null && { ConnectionName: input.ConnectionName }),
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_0ListObservabilityConfigurationsRequest = (input, context) => {
    return {
        ...(input.LatestOnly != null && { LatestOnly: input.LatestOnly }),
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
        ...(input.ObservabilityConfigurationName != null && {
            ObservabilityConfigurationName: input.ObservabilityConfigurationName,
        }),
    };
};
const serializeAws_json1_0ListOperationsRequest = (input, context) => {
    return {
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0ListServicesRequest = (input, context) => {
    return {
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_0ListTagsForResourceRequest = (input, context) => {
    return {
        ...(input.ResourceArn != null && { ResourceArn: input.ResourceArn }),
    };
};
const serializeAws_json1_0ListVpcConnectorsRequest = (input, context) => {
    return {
        ...(input.MaxResults != null && { MaxResults: input.MaxResults }),
        ...(input.NextToken != null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_0NetworkConfiguration = (input, context) => {
    return {
        ...(input.EgressConfiguration != null && {
            EgressConfiguration: serializeAws_json1_0EgressConfiguration(input.EgressConfiguration, context),
        }),
    };
};
const serializeAws_json1_0PauseServiceRequest = (input, context) => {
    return {
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0ResumeServiceRequest = (input, context) => {
    return {
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0RuntimeEnvironmentVariables = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const serializeAws_json1_0ServiceObservabilityConfiguration = (input, context) => {
    return {
        ...(input.ObservabilityConfigurationArn != null && {
            ObservabilityConfigurationArn: input.ObservabilityConfigurationArn,
        }),
        ...(input.ObservabilityEnabled != null && { ObservabilityEnabled: input.ObservabilityEnabled }),
    };
};
const serializeAws_json1_0SourceCodeVersion = (input, context) => {
    return {
        ...(input.Type != null && { Type: input.Type }),
        ...(input.Value != null && { Value: input.Value }),
    };
};
const serializeAws_json1_0SourceConfiguration = (input, context) => {
    return {
        ...(input.AuthenticationConfiguration != null && {
            AuthenticationConfiguration: serializeAws_json1_0AuthenticationConfiguration(input.AuthenticationConfiguration, context),
        }),
        ...(input.AutoDeploymentsEnabled != null && { AutoDeploymentsEnabled: input.AutoDeploymentsEnabled }),
        ...(input.CodeRepository != null && {
            CodeRepository: serializeAws_json1_0CodeRepository(input.CodeRepository, context),
        }),
        ...(input.ImageRepository != null && {
            ImageRepository: serializeAws_json1_0ImageRepository(input.ImageRepository, context),
        }),
    };
};
const serializeAws_json1_0StartDeploymentRequest = (input, context) => {
    return {
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
    };
};
const serializeAws_json1_0StringList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return entry;
    });
};
const serializeAws_json1_0Tag = (input, context) => {
    return {
        ...(input.Key != null && { Key: input.Key }),
        ...(input.Value != null && { Value: input.Value }),
    };
};
const serializeAws_json1_0TagKeyList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return entry;
    });
};
const serializeAws_json1_0TagList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return serializeAws_json1_0Tag(entry, context);
    });
};
const serializeAws_json1_0TagResourceRequest = (input, context) => {
    return {
        ...(input.ResourceArn != null && { ResourceArn: input.ResourceArn }),
        ...(input.Tags != null && { Tags: serializeAws_json1_0TagList(input.Tags, context) }),
    };
};
const serializeAws_json1_0TraceConfiguration = (input, context) => {
    return {
        ...(input.Vendor != null && { Vendor: input.Vendor }),
    };
};
const serializeAws_json1_0UntagResourceRequest = (input, context) => {
    return {
        ...(input.ResourceArn != null && { ResourceArn: input.ResourceArn }),
        ...(input.TagKeys != null && { TagKeys: serializeAws_json1_0TagKeyList(input.TagKeys, context) }),
    };
};
const serializeAws_json1_0UpdateServiceRequest = (input, context) => {
    return {
        ...(input.AutoScalingConfigurationArn != null && {
            AutoScalingConfigurationArn: input.AutoScalingConfigurationArn,
        }),
        ...(input.HealthCheckConfiguration != null && {
            HealthCheckConfiguration: serializeAws_json1_0HealthCheckConfiguration(input.HealthCheckConfiguration, context),
        }),
        ...(input.InstanceConfiguration != null && {
            InstanceConfiguration: serializeAws_json1_0InstanceConfiguration(input.InstanceConfiguration, context),
        }),
        ...(input.NetworkConfiguration != null && {
            NetworkConfiguration: serializeAws_json1_0NetworkConfiguration(input.NetworkConfiguration, context),
        }),
        ...(input.ObservabilityConfiguration != null && {
            ObservabilityConfiguration: serializeAws_json1_0ServiceObservabilityConfiguration(input.ObservabilityConfiguration, context),
        }),
        ...(input.ServiceArn != null && { ServiceArn: input.ServiceArn }),
        ...(input.SourceConfiguration != null && {
            SourceConfiguration: serializeAws_json1_0SourceConfiguration(input.SourceConfiguration, context),
        }),
    };
};
const deserializeAws_json1_0AssociateCustomDomainResponse = (output, context) => {
    return {
        CustomDomain: output.CustomDomain != null ? deserializeAws_json1_0CustomDomain(output.CustomDomain, context) : undefined,
        DNSTarget: (0, smithy_client_1.expectString)(output.DNSTarget),
        ServiceArn: (0, smithy_client_1.expectString)(output.ServiceArn),
    };
};
const deserializeAws_json1_0AuthenticationConfiguration = (output, context) => {
    return {
        AccessRoleArn: (0, smithy_client_1.expectString)(output.AccessRoleArn),
        ConnectionArn: (0, smithy_client_1.expectString)(output.ConnectionArn),
    };
};
const deserializeAws_json1_0AutoScalingConfiguration = (output, context) => {
    return {
        AutoScalingConfigurationArn: (0, smithy_client_1.expectString)(output.AutoScalingConfigurationArn),
        AutoScalingConfigurationName: (0, smithy_client_1.expectString)(output.AutoScalingConfigurationName),
        AutoScalingConfigurationRevision: (0, smithy_client_1.expectInt32)(output.AutoScalingConfigurationRevision),
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        DeletedAt: output.DeletedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.DeletedAt))) : undefined,
        Latest: (0, smithy_client_1.expectBoolean)(output.Latest),
        MaxConcurrency: (0, smithy_client_1.expectInt32)(output.MaxConcurrency),
        MaxSize: (0, smithy_client_1.expectInt32)(output.MaxSize),
        MinSize: (0, smithy_client_1.expectInt32)(output.MinSize),
        Status: (0, smithy_client_1.expectString)(output.Status),
    };
};
const deserializeAws_json1_0AutoScalingConfigurationSummary = (output, context) => {
    return {
        AutoScalingConfigurationArn: (0, smithy_client_1.expectString)(output.AutoScalingConfigurationArn),
        AutoScalingConfigurationName: (0, smithy_client_1.expectString)(output.AutoScalingConfigurationName),
        AutoScalingConfigurationRevision: (0, smithy_client_1.expectInt32)(output.AutoScalingConfigurationRevision),
    };
};
const deserializeAws_json1_0AutoScalingConfigurationSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0AutoScalingConfigurationSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0CertificateValidationRecord = (output, context) => {
    return {
        Name: (0, smithy_client_1.expectString)(output.Name),
        Status: (0, smithy_client_1.expectString)(output.Status),
        Type: (0, smithy_client_1.expectString)(output.Type),
        Value: (0, smithy_client_1.expectString)(output.Value),
    };
};
const deserializeAws_json1_0CertificateValidationRecordList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0CertificateValidationRecord(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0CodeConfiguration = (output, context) => {
    return {
        CodeConfigurationValues: output.CodeConfigurationValues != null
            ? deserializeAws_json1_0CodeConfigurationValues(output.CodeConfigurationValues, context)
            : undefined,
        ConfigurationSource: (0, smithy_client_1.expectString)(output.ConfigurationSource),
    };
};
const deserializeAws_json1_0CodeConfigurationValues = (output, context) => {
    return {
        BuildCommand: (0, smithy_client_1.expectString)(output.BuildCommand),
        Port: (0, smithy_client_1.expectString)(output.Port),
        Runtime: (0, smithy_client_1.expectString)(output.Runtime),
        RuntimeEnvironmentVariables: output.RuntimeEnvironmentVariables != null
            ? deserializeAws_json1_0RuntimeEnvironmentVariables(output.RuntimeEnvironmentVariables, context)
            : undefined,
        StartCommand: (0, smithy_client_1.expectString)(output.StartCommand),
    };
};
const deserializeAws_json1_0CodeRepository = (output, context) => {
    return {
        CodeConfiguration: output.CodeConfiguration != null
            ? deserializeAws_json1_0CodeConfiguration(output.CodeConfiguration, context)
            : undefined,
        RepositoryUrl: (0, smithy_client_1.expectString)(output.RepositoryUrl),
        SourceCodeVersion: output.SourceCodeVersion != null
            ? deserializeAws_json1_0SourceCodeVersion(output.SourceCodeVersion, context)
            : undefined,
    };
};
const deserializeAws_json1_0Connection = (output, context) => {
    return {
        ConnectionArn: (0, smithy_client_1.expectString)(output.ConnectionArn),
        ConnectionName: (0, smithy_client_1.expectString)(output.ConnectionName),
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        ProviderType: (0, smithy_client_1.expectString)(output.ProviderType),
        Status: (0, smithy_client_1.expectString)(output.Status),
    };
};
const deserializeAws_json1_0ConnectionSummary = (output, context) => {
    return {
        ConnectionArn: (0, smithy_client_1.expectString)(output.ConnectionArn),
        ConnectionName: (0, smithy_client_1.expectString)(output.ConnectionName),
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        ProviderType: (0, smithy_client_1.expectString)(output.ProviderType),
        Status: (0, smithy_client_1.expectString)(output.Status),
    };
};
const deserializeAws_json1_0ConnectionSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0ConnectionSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0CreateAutoScalingConfigurationResponse = (output, context) => {
    return {
        AutoScalingConfiguration: output.AutoScalingConfiguration != null
            ? deserializeAws_json1_0AutoScalingConfiguration(output.AutoScalingConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0CreateConnectionResponse = (output, context) => {
    return {
        Connection: output.Connection != null ? deserializeAws_json1_0Connection(output.Connection, context) : undefined,
    };
};
const deserializeAws_json1_0CreateObservabilityConfigurationResponse = (output, context) => {
    return {
        ObservabilityConfiguration: output.ObservabilityConfiguration != null
            ? deserializeAws_json1_0ObservabilityConfiguration(output.ObservabilityConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0CreateServiceResponse = (output, context) => {
    return {
        OperationId: (0, smithy_client_1.expectString)(output.OperationId),
        Service: output.Service != null ? deserializeAws_json1_0Service(output.Service, context) : undefined,
    };
};
const deserializeAws_json1_0CreateVpcConnectorResponse = (output, context) => {
    return {
        VpcConnector: output.VpcConnector != null ? deserializeAws_json1_0VpcConnector(output.VpcConnector, context) : undefined,
    };
};
const deserializeAws_json1_0CustomDomain = (output, context) => {
    return {
        CertificateValidationRecords: output.CertificateValidationRecords != null
            ? deserializeAws_json1_0CertificateValidationRecordList(output.CertificateValidationRecords, context)
            : undefined,
        DomainName: (0, smithy_client_1.expectString)(output.DomainName),
        EnableWWWSubdomain: (0, smithy_client_1.expectBoolean)(output.EnableWWWSubdomain),
        Status: (0, smithy_client_1.expectString)(output.Status),
    };
};
const deserializeAws_json1_0CustomDomainList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0CustomDomain(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0DeleteAutoScalingConfigurationResponse = (output, context) => {
    return {
        AutoScalingConfiguration: output.AutoScalingConfiguration != null
            ? deserializeAws_json1_0AutoScalingConfiguration(output.AutoScalingConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0DeleteConnectionResponse = (output, context) => {
    return {
        Connection: output.Connection != null ? deserializeAws_json1_0Connection(output.Connection, context) : undefined,
    };
};
const deserializeAws_json1_0DeleteObservabilityConfigurationResponse = (output, context) => {
    return {
        ObservabilityConfiguration: output.ObservabilityConfiguration != null
            ? deserializeAws_json1_0ObservabilityConfiguration(output.ObservabilityConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0DeleteServiceResponse = (output, context) => {
    return {
        OperationId: (0, smithy_client_1.expectString)(output.OperationId),
        Service: output.Service != null ? deserializeAws_json1_0Service(output.Service, context) : undefined,
    };
};
const deserializeAws_json1_0DeleteVpcConnectorResponse = (output, context) => {
    return {
        VpcConnector: output.VpcConnector != null ? deserializeAws_json1_0VpcConnector(output.VpcConnector, context) : undefined,
    };
};
const deserializeAws_json1_0DescribeAutoScalingConfigurationResponse = (output, context) => {
    return {
        AutoScalingConfiguration: output.AutoScalingConfiguration != null
            ? deserializeAws_json1_0AutoScalingConfiguration(output.AutoScalingConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0DescribeCustomDomainsResponse = (output, context) => {
    return {
        CustomDomains: output.CustomDomains != null ? deserializeAws_json1_0CustomDomainList(output.CustomDomains, context) : undefined,
        DNSTarget: (0, smithy_client_1.expectString)(output.DNSTarget),
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
        ServiceArn: (0, smithy_client_1.expectString)(output.ServiceArn),
    };
};
const deserializeAws_json1_0DescribeObservabilityConfigurationResponse = (output, context) => {
    return {
        ObservabilityConfiguration: output.ObservabilityConfiguration != null
            ? deserializeAws_json1_0ObservabilityConfiguration(output.ObservabilityConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0DescribeServiceResponse = (output, context) => {
    return {
        Service: output.Service != null ? deserializeAws_json1_0Service(output.Service, context) : undefined,
    };
};
const deserializeAws_json1_0DescribeVpcConnectorResponse = (output, context) => {
    return {
        VpcConnector: output.VpcConnector != null ? deserializeAws_json1_0VpcConnector(output.VpcConnector, context) : undefined,
    };
};
const deserializeAws_json1_0DisassociateCustomDomainResponse = (output, context) => {
    return {
        CustomDomain: output.CustomDomain != null ? deserializeAws_json1_0CustomDomain(output.CustomDomain, context) : undefined,
        DNSTarget: (0, smithy_client_1.expectString)(output.DNSTarget),
        ServiceArn: (0, smithy_client_1.expectString)(output.ServiceArn),
    };
};
const deserializeAws_json1_0EgressConfiguration = (output, context) => {
    return {
        EgressType: (0, smithy_client_1.expectString)(output.EgressType),
        VpcConnectorArn: (0, smithy_client_1.expectString)(output.VpcConnectorArn),
    };
};
const deserializeAws_json1_0EncryptionConfiguration = (output, context) => {
    return {
        KmsKey: (0, smithy_client_1.expectString)(output.KmsKey),
    };
};
const deserializeAws_json1_0HealthCheckConfiguration = (output, context) => {
    return {
        HealthyThreshold: (0, smithy_client_1.expectInt32)(output.HealthyThreshold),
        Interval: (0, smithy_client_1.expectInt32)(output.Interval),
        Path: (0, smithy_client_1.expectString)(output.Path),
        Protocol: (0, smithy_client_1.expectString)(output.Protocol),
        Timeout: (0, smithy_client_1.expectInt32)(output.Timeout),
        UnhealthyThreshold: (0, smithy_client_1.expectInt32)(output.UnhealthyThreshold),
    };
};
const deserializeAws_json1_0ImageConfiguration = (output, context) => {
    return {
        Port: (0, smithy_client_1.expectString)(output.Port),
        RuntimeEnvironmentVariables: output.RuntimeEnvironmentVariables != null
            ? deserializeAws_json1_0RuntimeEnvironmentVariables(output.RuntimeEnvironmentVariables, context)
            : undefined,
        StartCommand: (0, smithy_client_1.expectString)(output.StartCommand),
    };
};
const deserializeAws_json1_0ImageRepository = (output, context) => {
    return {
        ImageConfiguration: output.ImageConfiguration != null
            ? deserializeAws_json1_0ImageConfiguration(output.ImageConfiguration, context)
            : undefined,
        ImageIdentifier: (0, smithy_client_1.expectString)(output.ImageIdentifier),
        ImageRepositoryType: (0, smithy_client_1.expectString)(output.ImageRepositoryType),
    };
};
const deserializeAws_json1_0InstanceConfiguration = (output, context) => {
    return {
        Cpu: (0, smithy_client_1.expectString)(output.Cpu),
        InstanceRoleArn: (0, smithy_client_1.expectString)(output.InstanceRoleArn),
        Memory: (0, smithy_client_1.expectString)(output.Memory),
    };
};
const deserializeAws_json1_0InternalServiceErrorException = (output, context) => {
    return {
        Message: (0, smithy_client_1.expectString)(output.Message),
    };
};
const deserializeAws_json1_0InvalidRequestException = (output, context) => {
    return {
        Message: (0, smithy_client_1.expectString)(output.Message),
    };
};
const deserializeAws_json1_0InvalidStateException = (output, context) => {
    return {
        Message: (0, smithy_client_1.expectString)(output.Message),
    };
};
const deserializeAws_json1_0ListAutoScalingConfigurationsResponse = (output, context) => {
    return {
        AutoScalingConfigurationSummaryList: output.AutoScalingConfigurationSummaryList != null
            ? deserializeAws_json1_0AutoScalingConfigurationSummaryList(output.AutoScalingConfigurationSummaryList, context)
            : undefined,
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
    };
};
const deserializeAws_json1_0ListConnectionsResponse = (output, context) => {
    return {
        ConnectionSummaryList: output.ConnectionSummaryList != null
            ? deserializeAws_json1_0ConnectionSummaryList(output.ConnectionSummaryList, context)
            : undefined,
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
    };
};
const deserializeAws_json1_0ListObservabilityConfigurationsResponse = (output, context) => {
    return {
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
        ObservabilityConfigurationSummaryList: output.ObservabilityConfigurationSummaryList != null
            ? deserializeAws_json1_0ObservabilityConfigurationSummaryList(output.ObservabilityConfigurationSummaryList, context)
            : undefined,
    };
};
const deserializeAws_json1_0ListOperationsResponse = (output, context) => {
    return {
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
        OperationSummaryList: output.OperationSummaryList != null
            ? deserializeAws_json1_0OperationSummaryList(output.OperationSummaryList, context)
            : undefined,
    };
};
const deserializeAws_json1_0ListServicesResponse = (output, context) => {
    return {
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
        ServiceSummaryList: output.ServiceSummaryList != null
            ? deserializeAws_json1_0ServiceSummaryList(output.ServiceSummaryList, context)
            : undefined,
    };
};
const deserializeAws_json1_0ListTagsForResourceResponse = (output, context) => {
    return {
        Tags: output.Tags != null ? deserializeAws_json1_0TagList(output.Tags, context) : undefined,
    };
};
const deserializeAws_json1_0ListVpcConnectorsResponse = (output, context) => {
    return {
        NextToken: (0, smithy_client_1.expectString)(output.NextToken),
        VpcConnectors: output.VpcConnectors != null ? deserializeAws_json1_0VpcConnectors(output.VpcConnectors, context) : undefined,
    };
};
const deserializeAws_json1_0NetworkConfiguration = (output, context) => {
    return {
        EgressConfiguration: output.EgressConfiguration != null
            ? deserializeAws_json1_0EgressConfiguration(output.EgressConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0ObservabilityConfiguration = (output, context) => {
    return {
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        DeletedAt: output.DeletedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.DeletedAt))) : undefined,
        Latest: (0, smithy_client_1.expectBoolean)(output.Latest),
        ObservabilityConfigurationArn: (0, smithy_client_1.expectString)(output.ObservabilityConfigurationArn),
        ObservabilityConfigurationName: (0, smithy_client_1.expectString)(output.ObservabilityConfigurationName),
        ObservabilityConfigurationRevision: (0, smithy_client_1.expectInt32)(output.ObservabilityConfigurationRevision),
        Status: (0, smithy_client_1.expectString)(output.Status),
        TraceConfiguration: output.TraceConfiguration != null
            ? deserializeAws_json1_0TraceConfiguration(output.TraceConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_0ObservabilityConfigurationSummary = (output, context) => {
    return {
        ObservabilityConfigurationArn: (0, smithy_client_1.expectString)(output.ObservabilityConfigurationArn),
        ObservabilityConfigurationName: (0, smithy_client_1.expectString)(output.ObservabilityConfigurationName),
        ObservabilityConfigurationRevision: (0, smithy_client_1.expectInt32)(output.ObservabilityConfigurationRevision),
    };
};
const deserializeAws_json1_0ObservabilityConfigurationSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0ObservabilityConfigurationSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0OperationSummary = (output, context) => {
    return {
        EndedAt: output.EndedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.EndedAt))) : undefined,
        Id: (0, smithy_client_1.expectString)(output.Id),
        StartedAt: output.StartedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.StartedAt))) : undefined,
        Status: (0, smithy_client_1.expectString)(output.Status),
        TargetArn: (0, smithy_client_1.expectString)(output.TargetArn),
        Type: (0, smithy_client_1.expectString)(output.Type),
        UpdatedAt: output.UpdatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.UpdatedAt))) : undefined,
    };
};
const deserializeAws_json1_0OperationSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0OperationSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0PauseServiceResponse = (output, context) => {
    return {
        OperationId: (0, smithy_client_1.expectString)(output.OperationId),
        Service: output.Service != null ? deserializeAws_json1_0Service(output.Service, context) : undefined,
    };
};
const deserializeAws_json1_0ResourceNotFoundException = (output, context) => {
    return {
        Message: (0, smithy_client_1.expectString)(output.Message),
    };
};
const deserializeAws_json1_0ResumeServiceResponse = (output, context) => {
    return {
        OperationId: (0, smithy_client_1.expectString)(output.OperationId),
        Service: output.Service != null ? deserializeAws_json1_0Service(output.Service, context) : undefined,
    };
};
const deserializeAws_json1_0RuntimeEnvironmentVariables = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: (0, smithy_client_1.expectString)(value),
        };
    }, {});
};
const deserializeAws_json1_0Service = (output, context) => {
    return {
        AutoScalingConfigurationSummary: output.AutoScalingConfigurationSummary != null
            ? deserializeAws_json1_0AutoScalingConfigurationSummary(output.AutoScalingConfigurationSummary, context)
            : undefined,
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        DeletedAt: output.DeletedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.DeletedAt))) : undefined,
        EncryptionConfiguration: output.EncryptionConfiguration != null
            ? deserializeAws_json1_0EncryptionConfiguration(output.EncryptionConfiguration, context)
            : undefined,
        HealthCheckConfiguration: output.HealthCheckConfiguration != null
            ? deserializeAws_json1_0HealthCheckConfiguration(output.HealthCheckConfiguration, context)
            : undefined,
        InstanceConfiguration: output.InstanceConfiguration != null
            ? deserializeAws_json1_0InstanceConfiguration(output.InstanceConfiguration, context)
            : undefined,
        NetworkConfiguration: output.NetworkConfiguration != null
            ? deserializeAws_json1_0NetworkConfiguration(output.NetworkConfiguration, context)
            : undefined,
        ObservabilityConfiguration: output.ObservabilityConfiguration != null
            ? deserializeAws_json1_0ServiceObservabilityConfiguration(output.ObservabilityConfiguration, context)
            : undefined,
        ServiceArn: (0, smithy_client_1.expectString)(output.ServiceArn),
        ServiceId: (0, smithy_client_1.expectString)(output.ServiceId),
        ServiceName: (0, smithy_client_1.expectString)(output.ServiceName),
        ServiceUrl: (0, smithy_client_1.expectString)(output.ServiceUrl),
        SourceConfiguration: output.SourceConfiguration != null
            ? deserializeAws_json1_0SourceConfiguration(output.SourceConfiguration, context)
            : undefined,
        Status: (0, smithy_client_1.expectString)(output.Status),
        UpdatedAt: output.UpdatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.UpdatedAt))) : undefined,
    };
};
const deserializeAws_json1_0ServiceObservabilityConfiguration = (output, context) => {
    return {
        ObservabilityConfigurationArn: (0, smithy_client_1.expectString)(output.ObservabilityConfigurationArn),
        ObservabilityEnabled: (0, smithy_client_1.expectBoolean)(output.ObservabilityEnabled),
    };
};
const deserializeAws_json1_0ServiceQuotaExceededException = (output, context) => {
    return {
        Message: (0, smithy_client_1.expectString)(output.Message),
    };
};
const deserializeAws_json1_0ServiceSummary = (output, context) => {
    return {
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        ServiceArn: (0, smithy_client_1.expectString)(output.ServiceArn),
        ServiceId: (0, smithy_client_1.expectString)(output.ServiceId),
        ServiceName: (0, smithy_client_1.expectString)(output.ServiceName),
        ServiceUrl: (0, smithy_client_1.expectString)(output.ServiceUrl),
        Status: (0, smithy_client_1.expectString)(output.Status),
        UpdatedAt: output.UpdatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.UpdatedAt))) : undefined,
    };
};
const deserializeAws_json1_0ServiceSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0ServiceSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0SourceCodeVersion = (output, context) => {
    return {
        Type: (0, smithy_client_1.expectString)(output.Type),
        Value: (0, smithy_client_1.expectString)(output.Value),
    };
};
const deserializeAws_json1_0SourceConfiguration = (output, context) => {
    return {
        AuthenticationConfiguration: output.AuthenticationConfiguration != null
            ? deserializeAws_json1_0AuthenticationConfiguration(output.AuthenticationConfiguration, context)
            : undefined,
        AutoDeploymentsEnabled: (0, smithy_client_1.expectBoolean)(output.AutoDeploymentsEnabled),
        CodeRepository: output.CodeRepository != null ? deserializeAws_json1_0CodeRepository(output.CodeRepository, context) : undefined,
        ImageRepository: output.ImageRepository != null
            ? deserializeAws_json1_0ImageRepository(output.ImageRepository, context)
            : undefined,
    };
};
const deserializeAws_json1_0StartDeploymentResponse = (output, context) => {
    return {
        OperationId: (0, smithy_client_1.expectString)(output.OperationId),
    };
};
const deserializeAws_json1_0StringList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_json1_0Tag = (output, context) => {
    return {
        Key: (0, smithy_client_1.expectString)(output.Key),
        Value: (0, smithy_client_1.expectString)(output.Value),
    };
};
const deserializeAws_json1_0TagList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0Tag(entry, context);
    });
    return retVal;
};
const deserializeAws_json1_0TagResourceResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_0TraceConfiguration = (output, context) => {
    return {
        Vendor: (0, smithy_client_1.expectString)(output.Vendor),
    };
};
const deserializeAws_json1_0UntagResourceResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_0UpdateServiceResponse = (output, context) => {
    return {
        OperationId: (0, smithy_client_1.expectString)(output.OperationId),
        Service: output.Service != null ? deserializeAws_json1_0Service(output.Service, context) : undefined,
    };
};
const deserializeAws_json1_0VpcConnector = (output, context) => {
    return {
        CreatedAt: output.CreatedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.CreatedAt))) : undefined,
        DeletedAt: output.DeletedAt != null ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseEpochTimestamp)((0, smithy_client_1.expectNumber)(output.DeletedAt))) : undefined,
        SecurityGroups: output.SecurityGroups != null ? deserializeAws_json1_0StringList(output.SecurityGroups, context) : undefined,
        Status: (0, smithy_client_1.expectString)(output.Status),
        Subnets: output.Subnets != null ? deserializeAws_json1_0StringList(output.Subnets, context) : undefined,
        VpcConnectorArn: (0, smithy_client_1.expectString)(output.VpcConnectorArn),
        VpcConnectorName: (0, smithy_client_1.expectString)(output.VpcConnectorName),
        VpcConnectorRevision: (0, smithy_client_1.expectInt32)(output.VpcConnectorRevision),
    };
};
const deserializeAws_json1_0VpcConnectors = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_0VpcConnector(entry, context);
    });
    return retVal;
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new protocol_http_1.HttpRequest(contents);
};
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
});
const parseErrorBody = async (errorBody, context) => {
    var _a;
    const value = await parseBody(errorBody, context);
    value.message = (_a = value.message) !== null && _a !== void 0 ? _a : value.Message;
    return value;
};
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
            cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
            cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
};


/***/ }),

/***/ 4858:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRuntimeConfig = void 0;
const tslib_1 = __nccwpck_require__(4503);
const package_json_1 = tslib_1.__importDefault(__nccwpck_require__(638));
const client_sts_1 = __nccwpck_require__(6299);
const config_resolver_1 = __nccwpck_require__(8678);
const credential_provider_node_1 = __nccwpck_require__(2498);
const hash_node_1 = __nccwpck_require__(6324);
const middleware_retry_1 = __nccwpck_require__(1130);
const node_config_provider_1 = __nccwpck_require__(9125);
const node_http_handler_1 = __nccwpck_require__(3556);
const util_base64_node_1 = __nccwpck_require__(7974);
const util_body_length_node_1 = __nccwpck_require__(3458);
const util_user_agent_node_1 = __nccwpck_require__(7415);
const util_utf8_node_1 = __nccwpck_require__(4919);
const runtimeConfig_shared_1 = __nccwpck_require__(968);
const smithy_client_1 = __nccwpck_require__(3623);
const util_defaults_mode_node_1 = __nccwpck_require__(5274);
const smithy_client_2 = __nccwpck_require__(3623);
const getRuntimeConfig = (config) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    (0, smithy_client_2.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        base64Decoder: (_a = config === null || config === void 0 ? void 0 : config.base64Decoder) !== null && _a !== void 0 ? _a : util_base64_node_1.fromBase64,
        base64Encoder: (_b = config === null || config === void 0 ? void 0 : config.base64Encoder) !== null && _b !== void 0 ? _b : util_base64_node_1.toBase64,
        bodyLengthChecker: (_c = config === null || config === void 0 ? void 0 : config.bodyLengthChecker) !== null && _c !== void 0 ? _c : util_body_length_node_1.calculateBodyLength,
        credentialDefaultProvider: (_d = config === null || config === void 0 ? void 0 : config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : (0, client_sts_1.decorateDefaultCredentialProvider)(credential_provider_node_1.defaultProvider),
        defaultUserAgentProvider: (_e = config === null || config === void 0 ? void 0 : config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : (0, util_user_agent_node_1.defaultUserAgent)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
        maxAttempts: (_f = config === null || config === void 0 ? void 0 : config.maxAttempts) !== null && _f !== void 0 ? _f : (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
        region: (_g = config === null || config === void 0 ? void 0 : config.region) !== null && _g !== void 0 ? _g : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS),
        requestHandler: (_h = config === null || config === void 0 ? void 0 : config.requestHandler) !== null && _h !== void 0 ? _h : new node_http_handler_1.NodeHttpHandler(defaultConfigProvider),
        retryMode: (_j = config === null || config === void 0 ? void 0 : config.retryMode) !== null && _j !== void 0 ? _j : (0, node_config_provider_1.loadConfig)({
            ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
            default: async () => (await defaultConfigProvider()).retryMode || middleware_retry_1.DEFAULT_RETRY_MODE,
        }),
        sha256: (_k = config === null || config === void 0 ? void 0 : config.sha256) !== null && _k !== void 0 ? _k : hash_node_1.Hash.bind(null, "sha256"),
        streamCollector: (_l = config === null || config === void 0 ? void 0 : config.streamCollector) !== null && _l !== void 0 ? _l : node_http_handler_1.streamCollector,
        useDualstackEndpoint: (_m = config === null || config === void 0 ? void 0 : config.useDualstackEndpoint) !== null && _m !== void 0 ? _m : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
        useFipsEndpoint: (_o = config === null || config === void 0 ? void 0 : config.useFipsEndpoint) !== null && _o !== void 0 ? _o : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS),
        utf8Decoder: (_p = config === null || config === void 0 ? void 0 : config.utf8Decoder) !== null && _p !== void 0 ? _p : util_utf8_node_1.fromUtf8,
        utf8Encoder: (_q = config === null || config === void 0 ? void 0 : config.utf8Encoder) !== null && _q !== void 0 ? _q : util_utf8_node_1.toUtf8,
    };
};
exports.getRuntimeConfig = getRuntimeConfig;


/***/ }),

/***/ 968:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRuntimeConfig = void 0;
const url_parser_1 = __nccwpck_require__(8477);
const endpoints_1 = __nccwpck_require__(1654);
const getRuntimeConfig = (config) => {
    var _a, _b, _c, _d, _e;
    return ({
        apiVersion: "2020-05-15",
        disableHostPrefix: (_a = config === null || config === void 0 ? void 0 : config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config === null || config === void 0 ? void 0 : config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config === null || config === void 0 ? void 0 : config.regionInfoProvider) !== null && _c !== void 0 ? _c : endpoints_1.defaultRegionInfoProvider,
        serviceId: (_d = config === null || config === void 0 ? void 0 : config.serviceId) !== null && _d !== void 0 ? _d : "AppRunner",
        urlParser: (_e = config === null || config === void 0 ? void 0 : config.urlParser) !== null && _e !== void 0 ? _e : url_parser_1.parseUrl,
    });
};
exports.getRuntimeConfig = getRuntimeConfig;


/***/ }),

/***/ 5815:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SSO = void 0;
const GetRoleCredentialsCommand_1 = __nccwpck_require__(5220);
const ListAccountRolesCommand_1 = __nccwpck_require__(3461);
const ListAccountsCommand_1 = __nccwpck_require__(7496);
const LogoutCommand_1 = __nccwpck_require__(496);
const SSOClient_1 = __nccwpck_require__(1321);
class SSO extends SSOClient_1.SSOClient {
    getRoleCredentials(args, optionsOrCb, cb) {
        const command = new GetRoleCredentialsCommand_1.GetRoleCredentialsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listAccountRoles(args, optionsOrCb, cb) {
        const command = new ListAccountRolesCommand_1.ListAccountRolesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listAccounts(args, optionsOrCb, cb) {
        const command = new ListAccountsCommand_1.ListAccountsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    logout(args, optionsOrCb, cb) {
        const command = new LogoutCommand_1.LogoutCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.SSO = SSO;


/***/ }),

/***/ 1321:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SSOClient = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const middleware_content_length_1 = __nccwpck_require__(8396);
const middleware_host_header_1 = __nccwpck_require__(8822);
const middleware_logger_1 = __nccwpck_require__(3801);
const middleware_recursion_detection_1 = __nccwpck_require__(3444);
const middleware_retry_1 = __nccwpck_require__(1130);
const middleware_user_agent_1 = __nccwpck_require__(6855);
const smithy_client_1 = __nccwpck_require__(3623);
const runtimeConfig_1 = __nccwpck_require__(2263);
class SSOClient extends smithy_client_1.Client {
    constructor(configuration) {
        const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration);
        const _config_1 = (0, config_resolver_1.resolveRegionConfig)(_config_0);
        const _config_2 = (0, config_resolver_1.resolveEndpointsConfig)(_config_1);
        const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
        const _config_4 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_3);
        const _config_5 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_4);
        super(_config_5);
        this.config = _config_5;
        this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
        this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}
exports.SSOClient = SSOClient;


/***/ }),

/***/ 5220:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRoleCredentialsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(360);
const Aws_restJson1_1 = __nccwpck_require__(8715);
class GetRoleCredentialsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SSOClient";
        const commandName = "GetRoleCredentialsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetRoleCredentialsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetRoleCredentialsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_restJson1_1.serializeAws_restJson1GetRoleCredentialsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_restJson1_1.deserializeAws_restJson1GetRoleCredentialsCommand)(output, context);
    }
}
exports.GetRoleCredentialsCommand = GetRoleCredentialsCommand;


/***/ }),

/***/ 3461:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListAccountRolesCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(360);
const Aws_restJson1_1 = __nccwpck_require__(8715);
class ListAccountRolesCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SSOClient";
        const commandName = "ListAccountRolesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListAccountRolesRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListAccountRolesResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_restJson1_1.serializeAws_restJson1ListAccountRolesCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_restJson1_1.deserializeAws_restJson1ListAccountRolesCommand)(output, context);
    }
}
exports.ListAccountRolesCommand = ListAccountRolesCommand;


/***/ }),

/***/ 7496:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListAccountsCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(360);
const Aws_restJson1_1 = __nccwpck_require__(8715);
class ListAccountsCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SSOClient";
        const commandName = "ListAccountsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListAccountsRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListAccountsResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_restJson1_1.serializeAws_restJson1ListAccountsCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_restJson1_1.deserializeAws_restJson1ListAccountsCommand)(output, context);
    }
}
exports.ListAccountsCommand = ListAccountsCommand;


/***/ }),

/***/ 496:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(360);
const Aws_restJson1_1 = __nccwpck_require__(8715);
class LogoutCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SSOClient";
        const commandName = "LogoutCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.LogoutRequestFilterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_restJson1_1.serializeAws_restJson1LogoutCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_restJson1_1.deserializeAws_restJson1LogoutCommand)(output, context);
    }
}
exports.LogoutCommand = LogoutCommand;


/***/ }),

/***/ 7258:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5220), exports);
tslib_1.__exportStar(__nccwpck_require__(3461), exports);
tslib_1.__exportStar(__nccwpck_require__(7496), exports);
tslib_1.__exportStar(__nccwpck_require__(496), exports);


/***/ }),

/***/ 5932:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultRegionInfoProvider = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const regionHash = {
    "ap-east-1": {
        variants: [
            {
                hostname: "portal.sso.ap-east-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-east-1",
    },
    "ap-northeast-1": {
        variants: [
            {
                hostname: "portal.sso.ap-northeast-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-northeast-1",
    },
    "ap-northeast-2": {
        variants: [
            {
                hostname: "portal.sso.ap-northeast-2.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-northeast-2",
    },
    "ap-northeast-3": {
        variants: [
            {
                hostname: "portal.sso.ap-northeast-3.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-northeast-3",
    },
    "ap-south-1": {
        variants: [
            {
                hostname: "portal.sso.ap-south-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-south-1",
    },
    "ap-southeast-1": {
        variants: [
            {
                hostname: "portal.sso.ap-southeast-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-southeast-1",
    },
    "ap-southeast-2": {
        variants: [
            {
                hostname: "portal.sso.ap-southeast-2.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ap-southeast-2",
    },
    "ca-central-1": {
        variants: [
            {
                hostname: "portal.sso.ca-central-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "ca-central-1",
    },
    "eu-central-1": {
        variants: [
            {
                hostname: "portal.sso.eu-central-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "eu-central-1",
    },
    "eu-north-1": {
        variants: [
            {
                hostname: "portal.sso.eu-north-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "eu-north-1",
    },
    "eu-south-1": {
        variants: [
            {
                hostname: "portal.sso.eu-south-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "eu-south-1",
    },
    "eu-west-1": {
        variants: [
            {
                hostname: "portal.sso.eu-west-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "eu-west-1",
    },
    "eu-west-2": {
        variants: [
            {
                hostname: "portal.sso.eu-west-2.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "eu-west-2",
    },
    "eu-west-3": {
        variants: [
            {
                hostname: "portal.sso.eu-west-3.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "eu-west-3",
    },
    "me-south-1": {
        variants: [
            {
                hostname: "portal.sso.me-south-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "me-south-1",
    },
    "sa-east-1": {
        variants: [
            {
                hostname: "portal.sso.sa-east-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "sa-east-1",
    },
    "us-east-1": {
        variants: [
            {
                hostname: "portal.sso.us-east-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "us-east-1",
    },
    "us-east-2": {
        variants: [
            {
                hostname: "portal.sso.us-east-2.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "us-east-2",
    },
    "us-gov-east-1": {
        variants: [
            {
                hostname: "portal.sso.us-gov-east-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "us-gov-east-1",
    },
    "us-gov-west-1": {
        variants: [
            {
                hostname: "portal.sso.us-gov-west-1.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "us-gov-west-1",
    },
    "us-west-2": {
        variants: [
            {
                hostname: "portal.sso.us-west-2.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "us-west-2",
    },
};
const partitionHash = {
    aws: {
        regions: [
            "af-south-1",
            "ap-east-1",
            "ap-northeast-1",
            "ap-northeast-2",
            "ap-northeast-3",
            "ap-south-1",
            "ap-southeast-1",
            "ap-southeast-2",
            "ap-southeast-3",
            "ca-central-1",
            "eu-central-1",
            "eu-north-1",
            "eu-south-1",
            "eu-west-1",
            "eu-west-2",
            "eu-west-3",
            "me-central-1",
            "me-south-1",
            "sa-east-1",
            "us-east-1",
            "us-east-2",
            "us-west-1",
            "us-west-2",
        ],
        regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "portal.sso.{region}.amazonaws.com",
                tags: [],
            },
            {
                hostname: "portal.sso-fips.{region}.amazonaws.com",
                tags: ["fips"],
            },
            {
                hostname: "portal.sso-fips.{region}.api.aws",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "portal.sso.{region}.api.aws",
                tags: ["dualstack"],
            },
        ],
    },
    "aws-cn": {
        regions: ["cn-north-1", "cn-northwest-1"],
        regionRegex: "^cn\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "portal.sso.{region}.amazonaws.com.cn",
                tags: [],
            },
            {
                hostname: "portal.sso-fips.{region}.amazonaws.com.cn",
                tags: ["fips"],
            },
            {
                hostname: "portal.sso-fips.{region}.api.amazonwebservices.com.cn",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "portal.sso.{region}.api.amazonwebservices.com.cn",
                tags: ["dualstack"],
            },
        ],
    },
    "aws-iso": {
        regions: ["us-iso-east-1", "us-iso-west-1"],
        regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "portal.sso.{region}.c2s.ic.gov",
                tags: [],
            },
            {
                hostname: "portal.sso-fips.{region}.c2s.ic.gov",
                tags: ["fips"],
            },
        ],
    },
    "aws-iso-b": {
        regions: ["us-isob-east-1"],
        regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "portal.sso.{region}.sc2s.sgov.gov",
                tags: [],
            },
            {
                hostname: "portal.sso-fips.{region}.sc2s.sgov.gov",
                tags: ["fips"],
            },
        ],
    },
    "aws-us-gov": {
        regions: ["us-gov-east-1", "us-gov-west-1"],
        regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "portal.sso.{region}.amazonaws.com",
                tags: [],
            },
            {
                hostname: "portal.sso-fips.{region}.amazonaws.com",
                tags: ["fips"],
            },
            {
                hostname: "portal.sso-fips.{region}.api.aws",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "portal.sso.{region}.api.aws",
                tags: ["dualstack"],
            },
        ],
    },
};
const defaultRegionInfoProvider = async (region, options) => (0, config_resolver_1.getRegionInfo)(region, {
    ...options,
    signingService: "awsssoportal",
    regionHash,
    partitionHash,
});
exports.defaultRegionInfoProvider = defaultRegionInfoProvider;


/***/ }),

/***/ 8122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SSOServiceException = void 0;
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5815), exports);
tslib_1.__exportStar(__nccwpck_require__(1321), exports);
tslib_1.__exportStar(__nccwpck_require__(7258), exports);
tslib_1.__exportStar(__nccwpck_require__(9409), exports);
tslib_1.__exportStar(__nccwpck_require__(3779), exports);
var SSOServiceException_1 = __nccwpck_require__(3768);
Object.defineProperty(exports, "SSOServiceException", ({ enumerable: true, get: function () { return SSOServiceException_1.SSOServiceException; } }));


/***/ }),

/***/ 3768:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SSOServiceException = void 0;
const smithy_client_1 = __nccwpck_require__(3623);
class SSOServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SSOServiceException.prototype);
    }
}
exports.SSOServiceException = SSOServiceException;


/***/ }),

/***/ 9409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(360), exports);


/***/ }),

/***/ 360:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutRequestFilterSensitiveLog = exports.ListAccountsResponseFilterSensitiveLog = exports.ListAccountsRequestFilterSensitiveLog = exports.ListAccountRolesResponseFilterSensitiveLog = exports.RoleInfoFilterSensitiveLog = exports.ListAccountRolesRequestFilterSensitiveLog = exports.GetRoleCredentialsResponseFilterSensitiveLog = exports.RoleCredentialsFilterSensitiveLog = exports.GetRoleCredentialsRequestFilterSensitiveLog = exports.AccountInfoFilterSensitiveLog = exports.UnauthorizedException = exports.TooManyRequestsException = exports.ResourceNotFoundException = exports.InvalidRequestException = void 0;
const smithy_client_1 = __nccwpck_require__(3623);
const SSOServiceException_1 = __nccwpck_require__(3768);
class InvalidRequestException extends SSOServiceException_1.SSOServiceException {
    constructor(opts) {
        super({
            name: "InvalidRequestException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidRequestException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidRequestException.prototype);
    }
}
exports.InvalidRequestException = InvalidRequestException;
class ResourceNotFoundException extends SSOServiceException_1.SSOServiceException {
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
class TooManyRequestsException extends SSOServiceException_1.SSOServiceException {
    constructor(opts) {
        super({
            name: "TooManyRequestsException",
            $fault: "client",
            ...opts,
        });
        this.name = "TooManyRequestsException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class UnauthorizedException extends SSOServiceException_1.SSOServiceException {
    constructor(opts) {
        super({
            name: "UnauthorizedException",
            $fault: "client",
            ...opts,
        });
        this.name = "UnauthorizedException";
        this.$fault = "client";
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}
exports.UnauthorizedException = UnauthorizedException;
const AccountInfoFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AccountInfoFilterSensitiveLog = AccountInfoFilterSensitiveLog;
const GetRoleCredentialsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
});
exports.GetRoleCredentialsRequestFilterSensitiveLog = GetRoleCredentialsRequestFilterSensitiveLog;
const RoleCredentialsFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.secretAccessKey && { secretAccessKey: smithy_client_1.SENSITIVE_STRING }),
    ...(obj.sessionToken && { sessionToken: smithy_client_1.SENSITIVE_STRING }),
});
exports.RoleCredentialsFilterSensitiveLog = RoleCredentialsFilterSensitiveLog;
const GetRoleCredentialsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.roleCredentials && { roleCredentials: (0, exports.RoleCredentialsFilterSensitiveLog)(obj.roleCredentials) }),
});
exports.GetRoleCredentialsResponseFilterSensitiveLog = GetRoleCredentialsResponseFilterSensitiveLog;
const ListAccountRolesRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
});
exports.ListAccountRolesRequestFilterSensitiveLog = ListAccountRolesRequestFilterSensitiveLog;
const RoleInfoFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.RoleInfoFilterSensitiveLog = RoleInfoFilterSensitiveLog;
const ListAccountRolesResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListAccountRolesResponseFilterSensitiveLog = ListAccountRolesResponseFilterSensitiveLog;
const ListAccountsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
});
exports.ListAccountsRequestFilterSensitiveLog = ListAccountsRequestFilterSensitiveLog;
const ListAccountsResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.ListAccountsResponseFilterSensitiveLog = ListAccountsResponseFilterSensitiveLog;
const LogoutRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
});
exports.LogoutRequestFilterSensitiveLog = LogoutRequestFilterSensitiveLog;


/***/ }),

/***/ 3426:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 9856:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListAccountRoles = void 0;
const ListAccountRolesCommand_1 = __nccwpck_require__(3461);
const SSO_1 = __nccwpck_require__(5815);
const SSOClient_1 = __nccwpck_require__(1321);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListAccountRolesCommand_1.ListAccountRolesCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listAccountRoles(input, ...args);
};
async function* paginateListAccountRoles(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.nextToken = token;
        input["maxResults"] = config.pageSize;
        if (config.client instanceof SSO_1.SSO) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof SSOClient_1.SSOClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected SSO | SSOClient");
        }
        yield page;
        const prevToken = token;
        token = page.nextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListAccountRoles = paginateListAccountRoles;


/***/ }),

/***/ 2843:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateListAccounts = void 0;
const ListAccountsCommand_1 = __nccwpck_require__(7496);
const SSO_1 = __nccwpck_require__(5815);
const SSOClient_1 = __nccwpck_require__(1321);
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new ListAccountsCommand_1.ListAccountsCommand(input), ...args);
};
const makePagedRequest = async (client, input, ...args) => {
    return await client.listAccounts(input, ...args);
};
async function* paginateListAccounts(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.nextToken = token;
        input["maxResults"] = config.pageSize;
        if (config.client instanceof SSO_1.SSO) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof SSOClient_1.SSOClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected SSO | SSOClient");
        }
        yield page;
        const prevToken = token;
        token = page.nextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateListAccounts = paginateListAccounts;


/***/ }),

/***/ 3779:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(3426), exports);
tslib_1.__exportStar(__nccwpck_require__(9856), exports);
tslib_1.__exportStar(__nccwpck_require__(2843), exports);


/***/ }),

/***/ 8715:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserializeAws_restJson1LogoutCommand = exports.deserializeAws_restJson1ListAccountsCommand = exports.deserializeAws_restJson1ListAccountRolesCommand = exports.deserializeAws_restJson1GetRoleCredentialsCommand = exports.serializeAws_restJson1LogoutCommand = exports.serializeAws_restJson1ListAccountsCommand = exports.serializeAws_restJson1ListAccountRolesCommand = exports.serializeAws_restJson1GetRoleCredentialsCommand = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(360);
const SSOServiceException_1 = __nccwpck_require__(3768);
const serializeAws_restJson1GetRoleCredentialsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = map({}, isSerializableHeaderValue, {
        "x-amz-sso_bearer_token": input.accessToken,
    });
    const resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + "/federation/credentials";
    const query = map({
        role_name: [, input.roleName],
        account_id: [, input.accountId],
    });
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1GetRoleCredentialsCommand = serializeAws_restJson1GetRoleCredentialsCommand;
const serializeAws_restJson1ListAccountRolesCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = map({}, isSerializableHeaderValue, {
        "x-amz-sso_bearer_token": input.accessToken,
    });
    const resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + "/assignment/roles";
    const query = map({
        next_token: [, input.nextToken],
        max_result: [() => input.maxResults !== void 0, () => input.maxResults.toString()],
        account_id: [, input.accountId],
    });
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1ListAccountRolesCommand = serializeAws_restJson1ListAccountRolesCommand;
const serializeAws_restJson1ListAccountsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = map({}, isSerializableHeaderValue, {
        "x-amz-sso_bearer_token": input.accessToken,
    });
    const resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + "/assignment/accounts";
    const query = map({
        next_token: [, input.nextToken],
        max_result: [() => input.maxResults !== void 0, () => input.maxResults.toString()],
    });
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1ListAccountsCommand = serializeAws_restJson1ListAccountsCommand;
const serializeAws_restJson1LogoutCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = map({}, isSerializableHeaderValue, {
        "x-amz-sso_bearer_token": input.accessToken,
    });
    const resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + "/logout";
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1LogoutCommand = serializeAws_restJson1LogoutCommand;
const deserializeAws_restJson1GetRoleCredentialsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetRoleCredentialsCommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = (0, smithy_client_1.expectNonNull)((0, smithy_client_1.expectObject)(await parseBody(output.body, context)), "body");
    if (data.roleCredentials != null) {
        contents.roleCredentials = deserializeAws_restJson1RoleCredentials(data.roleCredentials, context);
    }
    return contents;
};
exports.deserializeAws_restJson1GetRoleCredentialsCommand = deserializeAws_restJson1GetRoleCredentialsCommand;
const deserializeAws_restJson1GetRoleCredentialsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidRequestException":
        case "com.amazonaws.sso#InvalidRequestException":
            throw await deserializeAws_restJson1InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.sso#ResourceNotFoundException":
            throw await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context);
        case "TooManyRequestsException":
        case "com.amazonaws.sso#TooManyRequestsException":
            throw await deserializeAws_restJson1TooManyRequestsExceptionResponse(parsedOutput, context);
        case "UnauthorizedException":
        case "com.amazonaws.sso#UnauthorizedException":
            throw await deserializeAws_restJson1UnauthorizedExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: SSOServiceException_1.SSOServiceException,
                errorCode,
            });
    }
};
const deserializeAws_restJson1ListAccountRolesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListAccountRolesCommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = (0, smithy_client_1.expectNonNull)((0, smithy_client_1.expectObject)(await parseBody(output.body, context)), "body");
    if (data.nextToken != null) {
        contents.nextToken = (0, smithy_client_1.expectString)(data.nextToken);
    }
    if (data.roleList != null) {
        contents.roleList = deserializeAws_restJson1RoleListType(data.roleList, context);
    }
    return contents;
};
exports.deserializeAws_restJson1ListAccountRolesCommand = deserializeAws_restJson1ListAccountRolesCommand;
const deserializeAws_restJson1ListAccountRolesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidRequestException":
        case "com.amazonaws.sso#InvalidRequestException":
            throw await deserializeAws_restJson1InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.sso#ResourceNotFoundException":
            throw await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context);
        case "TooManyRequestsException":
        case "com.amazonaws.sso#TooManyRequestsException":
            throw await deserializeAws_restJson1TooManyRequestsExceptionResponse(parsedOutput, context);
        case "UnauthorizedException":
        case "com.amazonaws.sso#UnauthorizedException":
            throw await deserializeAws_restJson1UnauthorizedExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: SSOServiceException_1.SSOServiceException,
                errorCode,
            });
    }
};
const deserializeAws_restJson1ListAccountsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListAccountsCommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = (0, smithy_client_1.expectNonNull)((0, smithy_client_1.expectObject)(await parseBody(output.body, context)), "body");
    if (data.accountList != null) {
        contents.accountList = deserializeAws_restJson1AccountListType(data.accountList, context);
    }
    if (data.nextToken != null) {
        contents.nextToken = (0, smithy_client_1.expectString)(data.nextToken);
    }
    return contents;
};
exports.deserializeAws_restJson1ListAccountsCommand = deserializeAws_restJson1ListAccountsCommand;
const deserializeAws_restJson1ListAccountsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidRequestException":
        case "com.amazonaws.sso#InvalidRequestException":
            throw await deserializeAws_restJson1InvalidRequestExceptionResponse(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.sso#ResourceNotFoundException":
            throw await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context);
        case "TooManyRequestsException":
        case "com.amazonaws.sso#TooManyRequestsException":
            throw await deserializeAws_restJson1TooManyRequestsExceptionResponse(parsedOutput, context);
        case "UnauthorizedException":
        case "com.amazonaws.sso#UnauthorizedException":
            throw await deserializeAws_restJson1UnauthorizedExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: SSOServiceException_1.SSOServiceException,
                errorCode,
            });
    }
};
const deserializeAws_restJson1LogoutCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1LogoutCommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
exports.deserializeAws_restJson1LogoutCommand = deserializeAws_restJson1LogoutCommand;
const deserializeAws_restJson1LogoutCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidRequestException":
        case "com.amazonaws.sso#InvalidRequestException":
            throw await deserializeAws_restJson1InvalidRequestExceptionResponse(parsedOutput, context);
        case "TooManyRequestsException":
        case "com.amazonaws.sso#TooManyRequestsException":
            throw await deserializeAws_restJson1TooManyRequestsExceptionResponse(parsedOutput, context);
        case "UnauthorizedException":
        case "com.amazonaws.sso#UnauthorizedException":
            throw await deserializeAws_restJson1UnauthorizedExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody,
                exceptionCtor: SSOServiceException_1.SSOServiceException,
                errorCode,
            });
    }
};
const map = smithy_client_1.map;
const deserializeAws_restJson1InvalidRequestExceptionResponse = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    if (data.message != null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    const exception = new models_0_1.InvalidRequestException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1ResourceNotFoundExceptionResponse = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    if (data.message != null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    const exception = new models_0_1.ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1TooManyRequestsExceptionResponse = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    if (data.message != null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    const exception = new models_0_1.TooManyRequestsException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1UnauthorizedExceptionResponse = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    if (data.message != null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    const exception = new models_0_1.UnauthorizedException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1AccountInfo = (output, context) => {
    return {
        accountId: (0, smithy_client_1.expectString)(output.accountId),
        accountName: (0, smithy_client_1.expectString)(output.accountName),
        emailAddress: (0, smithy_client_1.expectString)(output.emailAddress),
    };
};
const deserializeAws_restJson1AccountListType = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1AccountInfo(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1RoleCredentials = (output, context) => {
    return {
        accessKeyId: (0, smithy_client_1.expectString)(output.accessKeyId),
        expiration: (0, smithy_client_1.expectLong)(output.expiration),
        secretAccessKey: (0, smithy_client_1.expectString)(output.secretAccessKey),
        sessionToken: (0, smithy_client_1.expectString)(output.sessionToken),
    };
};
const deserializeAws_restJson1RoleInfo = (output, context) => {
    return {
        accountId: (0, smithy_client_1.expectString)(output.accountId),
        roleName: (0, smithy_client_1.expectString)(output.roleName),
    };
};
const deserializeAws_restJson1RoleListType = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RoleInfo(entry, context);
    });
    return retVal;
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const isSerializableHeaderValue = (value) => value !== undefined &&
    value !== null &&
    value !== "" &&
    (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
    (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
});
const parseErrorBody = async (errorBody, context) => {
    var _a;
    const value = await parseBody(errorBody, context);
    value.message = (_a = value.message) !== null && _a !== void 0 ? _a : value.Message;
    return value;
};
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
            cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
            cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
};


/***/ }),

/***/ 2263:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRuntimeConfig = void 0;
const tslib_1 = __nccwpck_require__(4503);
const package_json_1 = tslib_1.__importDefault(__nccwpck_require__(6725));
const config_resolver_1 = __nccwpck_require__(8678);
const hash_node_1 = __nccwpck_require__(6324);
const middleware_retry_1 = __nccwpck_require__(1130);
const node_config_provider_1 = __nccwpck_require__(9125);
const node_http_handler_1 = __nccwpck_require__(3556);
const util_base64_node_1 = __nccwpck_require__(7974);
const util_body_length_node_1 = __nccwpck_require__(3458);
const util_user_agent_node_1 = __nccwpck_require__(7415);
const util_utf8_node_1 = __nccwpck_require__(4919);
const runtimeConfig_shared_1 = __nccwpck_require__(7887);
const smithy_client_1 = __nccwpck_require__(3623);
const util_defaults_mode_node_1 = __nccwpck_require__(5274);
const smithy_client_2 = __nccwpck_require__(3623);
const getRuntimeConfig = (config) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    (0, smithy_client_2.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        base64Decoder: (_a = config === null || config === void 0 ? void 0 : config.base64Decoder) !== null && _a !== void 0 ? _a : util_base64_node_1.fromBase64,
        base64Encoder: (_b = config === null || config === void 0 ? void 0 : config.base64Encoder) !== null && _b !== void 0 ? _b : util_base64_node_1.toBase64,
        bodyLengthChecker: (_c = config === null || config === void 0 ? void 0 : config.bodyLengthChecker) !== null && _c !== void 0 ? _c : util_body_length_node_1.calculateBodyLength,
        defaultUserAgentProvider: (_d = config === null || config === void 0 ? void 0 : config.defaultUserAgentProvider) !== null && _d !== void 0 ? _d : (0, util_user_agent_node_1.defaultUserAgent)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
        maxAttempts: (_e = config === null || config === void 0 ? void 0 : config.maxAttempts) !== null && _e !== void 0 ? _e : (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
        region: (_f = config === null || config === void 0 ? void 0 : config.region) !== null && _f !== void 0 ? _f : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS),
        requestHandler: (_g = config === null || config === void 0 ? void 0 : config.requestHandler) !== null && _g !== void 0 ? _g : new node_http_handler_1.NodeHttpHandler(defaultConfigProvider),
        retryMode: (_h = config === null || config === void 0 ? void 0 : config.retryMode) !== null && _h !== void 0 ? _h : (0, node_config_provider_1.loadConfig)({
            ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
            default: async () => (await defaultConfigProvider()).retryMode || middleware_retry_1.DEFAULT_RETRY_MODE,
        }),
        sha256: (_j = config === null || config === void 0 ? void 0 : config.sha256) !== null && _j !== void 0 ? _j : hash_node_1.Hash.bind(null, "sha256"),
        streamCollector: (_k = config === null || config === void 0 ? void 0 : config.streamCollector) !== null && _k !== void 0 ? _k : node_http_handler_1.streamCollector,
        useDualstackEndpoint: (_l = config === null || config === void 0 ? void 0 : config.useDualstackEndpoint) !== null && _l !== void 0 ? _l : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
        useFipsEndpoint: (_m = config === null || config === void 0 ? void 0 : config.useFipsEndpoint) !== null && _m !== void 0 ? _m : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS),
        utf8Decoder: (_o = config === null || config === void 0 ? void 0 : config.utf8Decoder) !== null && _o !== void 0 ? _o : util_utf8_node_1.fromUtf8,
        utf8Encoder: (_p = config === null || config === void 0 ? void 0 : config.utf8Encoder) !== null && _p !== void 0 ? _p : util_utf8_node_1.toUtf8,
    };
};
exports.getRuntimeConfig = getRuntimeConfig;


/***/ }),

/***/ 7887:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRuntimeConfig = void 0;
const url_parser_1 = __nccwpck_require__(8477);
const endpoints_1 = __nccwpck_require__(5932);
const getRuntimeConfig = (config) => {
    var _a, _b, _c, _d, _e;
    return ({
        apiVersion: "2019-06-10",
        disableHostPrefix: (_a = config === null || config === void 0 ? void 0 : config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config === null || config === void 0 ? void 0 : config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config === null || config === void 0 ? void 0 : config.regionInfoProvider) !== null && _c !== void 0 ? _c : endpoints_1.defaultRegionInfoProvider,
        serviceId: (_d = config === null || config === void 0 ? void 0 : config.serviceId) !== null && _d !== void 0 ? _d : "SSO",
        urlParser: (_e = config === null || config === void 0 ? void 0 : config.urlParser) !== null && _e !== void 0 ? _e : url_parser_1.parseUrl,
    });
};
exports.getRuntimeConfig = getRuntimeConfig;


/***/ }),

/***/ 6319:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STS = void 0;
const AssumeRoleCommand_1 = __nccwpck_require__(5880);
const AssumeRoleWithSAMLCommand_1 = __nccwpck_require__(8183);
const AssumeRoleWithWebIdentityCommand_1 = __nccwpck_require__(8012);
const DecodeAuthorizationMessageCommand_1 = __nccwpck_require__(4283);
const GetAccessKeyInfoCommand_1 = __nccwpck_require__(4619);
const GetCallerIdentityCommand_1 = __nccwpck_require__(7744);
const GetFederationTokenCommand_1 = __nccwpck_require__(58);
const GetSessionTokenCommand_1 = __nccwpck_require__(9443);
const STSClient_1 = __nccwpck_require__(1792);
class STS extends STSClient_1.STSClient {
    assumeRole(args, optionsOrCb, cb) {
        const command = new AssumeRoleCommand_1.AssumeRoleCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    assumeRoleWithSAML(args, optionsOrCb, cb) {
        const command = new AssumeRoleWithSAMLCommand_1.AssumeRoleWithSAMLCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    assumeRoleWithWebIdentity(args, optionsOrCb, cb) {
        const command = new AssumeRoleWithWebIdentityCommand_1.AssumeRoleWithWebIdentityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    decodeAuthorizationMessage(args, optionsOrCb, cb) {
        const command = new DecodeAuthorizationMessageCommand_1.DecodeAuthorizationMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getAccessKeyInfo(args, optionsOrCb, cb) {
        const command = new GetAccessKeyInfoCommand_1.GetAccessKeyInfoCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCallerIdentity(args, optionsOrCb, cb) {
        const command = new GetCallerIdentityCommand_1.GetCallerIdentityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getFederationToken(args, optionsOrCb, cb) {
        const command = new GetFederationTokenCommand_1.GetFederationTokenCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSessionToken(args, optionsOrCb, cb) {
        const command = new GetSessionTokenCommand_1.GetSessionTokenCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.STS = STS;


/***/ }),

/***/ 1792:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STSClient = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const middleware_content_length_1 = __nccwpck_require__(8396);
const middleware_host_header_1 = __nccwpck_require__(8822);
const middleware_logger_1 = __nccwpck_require__(3801);
const middleware_recursion_detection_1 = __nccwpck_require__(3444);
const middleware_retry_1 = __nccwpck_require__(1130);
const middleware_sdk_sts_1 = __nccwpck_require__(5808);
const middleware_user_agent_1 = __nccwpck_require__(6855);
const smithy_client_1 = __nccwpck_require__(3623);
const runtimeConfig_1 = __nccwpck_require__(3908);
class STSClient extends smithy_client_1.Client {
    constructor(configuration) {
        const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration);
        const _config_1 = (0, config_resolver_1.resolveRegionConfig)(_config_0);
        const _config_2 = (0, config_resolver_1.resolveEndpointsConfig)(_config_1);
        const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
        const _config_4 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_3);
        const _config_5 = (0, middleware_sdk_sts_1.resolveStsAuthConfig)(_config_4, { stsClientCtor: STSClient });
        const _config_6 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_5);
        super(_config_6);
        this.config = _config_6;
        this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
        this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}
exports.STSClient = STSClient;


/***/ }),

/***/ 5880:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssumeRoleCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const middleware_signing_1 = __nccwpck_require__(3334);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class AssumeRoleCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "AssumeRoleCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.AssumeRoleRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.AssumeRoleResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryAssumeRoleCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryAssumeRoleCommand)(output, context);
    }
}
exports.AssumeRoleCommand = AssumeRoleCommand;


/***/ }),

/***/ 8183:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssumeRoleWithSAMLCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class AssumeRoleWithSAMLCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "AssumeRoleWithSAMLCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.AssumeRoleWithSAMLRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.AssumeRoleWithSAMLResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryAssumeRoleWithSAMLCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryAssumeRoleWithSAMLCommand)(output, context);
    }
}
exports.AssumeRoleWithSAMLCommand = AssumeRoleWithSAMLCommand;


/***/ }),

/***/ 8012:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssumeRoleWithWebIdentityCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class AssumeRoleWithWebIdentityCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "AssumeRoleWithWebIdentityCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.AssumeRoleWithWebIdentityRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.AssumeRoleWithWebIdentityResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryAssumeRoleWithWebIdentityCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryAssumeRoleWithWebIdentityCommand)(output, context);
    }
}
exports.AssumeRoleWithWebIdentityCommand = AssumeRoleWithWebIdentityCommand;


/***/ }),

/***/ 4283:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecodeAuthorizationMessageCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const middleware_signing_1 = __nccwpck_require__(3334);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class DecodeAuthorizationMessageCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "DecodeAuthorizationMessageCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DecodeAuthorizationMessageRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DecodeAuthorizationMessageResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryDecodeAuthorizationMessageCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryDecodeAuthorizationMessageCommand)(output, context);
    }
}
exports.DecodeAuthorizationMessageCommand = DecodeAuthorizationMessageCommand;


/***/ }),

/***/ 4619:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetAccessKeyInfoCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const middleware_signing_1 = __nccwpck_require__(3334);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class GetAccessKeyInfoCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "GetAccessKeyInfoCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetAccessKeyInfoRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetAccessKeyInfoResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryGetAccessKeyInfoCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryGetAccessKeyInfoCommand)(output, context);
    }
}
exports.GetAccessKeyInfoCommand = GetAccessKeyInfoCommand;


/***/ }),

/***/ 7744:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCallerIdentityCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const middleware_signing_1 = __nccwpck_require__(3334);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class GetCallerIdentityCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "GetCallerIdentityCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetCallerIdentityRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetCallerIdentityResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryGetCallerIdentityCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryGetCallerIdentityCommand)(output, context);
    }
}
exports.GetCallerIdentityCommand = GetCallerIdentityCommand;


/***/ }),

/***/ 58:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetFederationTokenCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const middleware_signing_1 = __nccwpck_require__(3334);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class GetFederationTokenCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "GetFederationTokenCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetFederationTokenRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetFederationTokenResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryGetFederationTokenCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryGetFederationTokenCommand)(output, context);
    }
}
exports.GetFederationTokenCommand = GetFederationTokenCommand;


/***/ }),

/***/ 9443:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSessionTokenCommand = void 0;
const middleware_serde_1 = __nccwpck_require__(2647);
const middleware_signing_1 = __nccwpck_require__(3334);
const smithy_client_1 = __nccwpck_require__(3623);
const models_0_1 = __nccwpck_require__(9012);
const Aws_query_1 = __nccwpck_require__(9673);
class GetSessionTokenCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use((0, middleware_signing_1.getAwsAuthPlugin)(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "GetSessionTokenCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetSessionTokenRequestFilterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetSessionTokenResponseFilterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_query_1.serializeAws_queryGetSessionTokenCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_query_1.deserializeAws_queryGetSessionTokenCommand)(output, context);
    }
}
exports.GetSessionTokenCommand = GetSessionTokenCommand;


/***/ }),

/***/ 7871:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5880), exports);
tslib_1.__exportStar(__nccwpck_require__(8183), exports);
tslib_1.__exportStar(__nccwpck_require__(8012), exports);
tslib_1.__exportStar(__nccwpck_require__(4283), exports);
tslib_1.__exportStar(__nccwpck_require__(4619), exports);
tslib_1.__exportStar(__nccwpck_require__(7744), exports);
tslib_1.__exportStar(__nccwpck_require__(58), exports);
tslib_1.__exportStar(__nccwpck_require__(9443), exports);


/***/ }),

/***/ 5152:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decorateDefaultCredentialProvider = exports.getDefaultRoleAssumerWithWebIdentity = exports.getDefaultRoleAssumer = void 0;
const defaultStsRoleAssumers_1 = __nccwpck_require__(1002);
const STSClient_1 = __nccwpck_require__(1792);
const getCustomizableStsClientCtor = (baseCtor, customizations) => {
    if (!customizations)
        return baseCtor;
    else
        return class CustomizableSTSClient extends baseCtor {
            constructor(config) {
                super(config);
                for (const customization of customizations) {
                    this.middlewareStack.use(customization);
                }
            }
        };
};
const getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => (0, defaultStsRoleAssumers_1.getDefaultRoleAssumer)(stsOptions, getCustomizableStsClientCtor(STSClient_1.STSClient, stsPlugins));
exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
const getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => (0, defaultStsRoleAssumers_1.getDefaultRoleAssumerWithWebIdentity)(stsOptions, getCustomizableStsClientCtor(STSClient_1.STSClient, stsPlugins));
exports.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
const decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: (0, exports.getDefaultRoleAssumer)(input),
    roleAssumerWithWebIdentity: (0, exports.getDefaultRoleAssumerWithWebIdentity)(input),
    ...input,
});
exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;


/***/ }),

/***/ 1002:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decorateDefaultCredentialProvider = exports.getDefaultRoleAssumerWithWebIdentity = exports.getDefaultRoleAssumer = void 0;
const AssumeRoleCommand_1 = __nccwpck_require__(5880);
const AssumeRoleWithWebIdentityCommand_1 = __nccwpck_require__(8012);
const ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
const decorateDefaultRegion = (region) => {
    if (typeof region !== "function") {
        return region === undefined ? ASSUME_ROLE_DEFAULT_REGION : region;
    }
    return async () => {
        try {
            return await region();
        }
        catch (e) {
            return ASSUME_ROLE_DEFAULT_REGION;
        }
    };
};
const getDefaultRoleAssumer = (stsOptions, stsClientCtor) => {
    let stsClient;
    let closureSourceCreds;
    return async (sourceCreds, params) => {
        closureSourceCreds = sourceCreds;
        if (!stsClient) {
            const { logger, region, requestHandler } = stsOptions;
            stsClient = new stsClientCtor({
                logger,
                credentialDefaultProvider: () => async () => closureSourceCreds,
                region: decorateDefaultRegion(region || stsOptions.region),
                ...(requestHandler ? { requestHandler } : {}),
            });
        }
        const { Credentials } = await stsClient.send(new AssumeRoleCommand_1.AssumeRoleCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
        }
        return {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
        };
    };
};
exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
const getDefaultRoleAssumerWithWebIdentity = (stsOptions, stsClientCtor) => {
    let stsClient;
    return async (params) => {
        if (!stsClient) {
            const { logger, region, requestHandler } = stsOptions;
            stsClient = new stsClientCtor({
                logger,
                region: decorateDefaultRegion(region || stsOptions.region),
                ...(requestHandler ? { requestHandler } : {}),
            });
        }
        const { Credentials } = await stsClient.send(new AssumeRoleWithWebIdentityCommand_1.AssumeRoleWithWebIdentityCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
        }
        return {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
        };
    };
};
exports.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
const decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: (0, exports.getDefaultRoleAssumer)(input, input.stsClientCtor),
    roleAssumerWithWebIdentity: (0, exports.getDefaultRoleAssumerWithWebIdentity)(input, input.stsClientCtor),
    ...input,
});
exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;


/***/ }),

/***/ 9624:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultRegionInfoProvider = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const regionHash = {
    "aws-global": {
        variants: [
            {
                hostname: "sts.amazonaws.com",
                tags: [],
            },
        ],
        signingRegion: "us-east-1",
    },
    "us-east-1": {
        variants: [
            {
                hostname: "sts-fips.us-east-1.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-east-2": {
        variants: [
            {
                hostname: "sts-fips.us-east-2.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-gov-east-1": {
        variants: [
            {
                hostname: "sts.us-gov-east-1.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-gov-west-1": {
        variants: [
            {
                hostname: "sts.us-gov-west-1.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-west-1": {
        variants: [
            {
                hostname: "sts-fips.us-west-1.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
    "us-west-2": {
        variants: [
            {
                hostname: "sts-fips.us-west-2.amazonaws.com",
                tags: ["fips"],
            },
        ],
    },
};
const partitionHash = {
    aws: {
        regions: [
            "af-south-1",
            "ap-east-1",
            "ap-northeast-1",
            "ap-northeast-2",
            "ap-northeast-3",
            "ap-south-1",
            "ap-southeast-1",
            "ap-southeast-2",
            "ap-southeast-3",
            "aws-global",
            "ca-central-1",
            "eu-central-1",
            "eu-north-1",
            "eu-south-1",
            "eu-west-1",
            "eu-west-2",
            "eu-west-3",
            "me-central-1",
            "me-south-1",
            "sa-east-1",
            "us-east-1",
            "us-east-1-fips",
            "us-east-2",
            "us-east-2-fips",
            "us-west-1",
            "us-west-1-fips",
            "us-west-2",
            "us-west-2-fips",
        ],
        regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "sts.{region}.amazonaws.com",
                tags: [],
            },
            {
                hostname: "sts-fips.{region}.amazonaws.com",
                tags: ["fips"],
            },
            {
                hostname: "sts-fips.{region}.api.aws",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "sts.{region}.api.aws",
                tags: ["dualstack"],
            },
        ],
    },
    "aws-cn": {
        regions: ["cn-north-1", "cn-northwest-1"],
        regionRegex: "^cn\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "sts.{region}.amazonaws.com.cn",
                tags: [],
            },
            {
                hostname: "sts-fips.{region}.amazonaws.com.cn",
                tags: ["fips"],
            },
            {
                hostname: "sts-fips.{region}.api.amazonwebservices.com.cn",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "sts.{region}.api.amazonwebservices.com.cn",
                tags: ["dualstack"],
            },
        ],
    },
    "aws-iso": {
        regions: ["us-iso-east-1", "us-iso-west-1"],
        regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "sts.{region}.c2s.ic.gov",
                tags: [],
            },
            {
                hostname: "sts-fips.{region}.c2s.ic.gov",
                tags: ["fips"],
            },
        ],
    },
    "aws-iso-b": {
        regions: ["us-isob-east-1"],
        regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "sts.{region}.sc2s.sgov.gov",
                tags: [],
            },
            {
                hostname: "sts-fips.{region}.sc2s.sgov.gov",
                tags: ["fips"],
            },
        ],
    },
    "aws-us-gov": {
        regions: ["us-gov-east-1", "us-gov-east-1-fips", "us-gov-west-1", "us-gov-west-1-fips"],
        regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
        variants: [
            {
                hostname: "sts.{region}.amazonaws.com",
                tags: [],
            },
            {
                hostname: "sts.{region}.amazonaws.com",
                tags: ["fips"],
            },
            {
                hostname: "sts-fips.{region}.api.aws",
                tags: ["dualstack", "fips"],
            },
            {
                hostname: "sts.{region}.api.aws",
                tags: ["dualstack"],
            },
        ],
    },
};
const defaultRegionInfoProvider = async (region, options) => (0, config_resolver_1.getRegionInfo)(region, {
    ...options,
    signingService: "sts",
    regionHash,
    partitionHash,
});
exports.defaultRegionInfoProvider = defaultRegionInfoProvider;


/***/ }),

/***/ 6299:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STSServiceException = void 0;
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(6319), exports);
tslib_1.__exportStar(__nccwpck_require__(1792), exports);
tslib_1.__exportStar(__nccwpck_require__(7871), exports);
tslib_1.__exportStar(__nccwpck_require__(5152), exports);
tslib_1.__exportStar(__nccwpck_require__(773), exports);
var STSServiceException_1 = __nccwpck_require__(2806);
Object.defineProperty(exports, "STSServiceException", ({ enumerable: true, get: function () { return STSServiceException_1.STSServiceException; } }));


/***/ }),

/***/ 2806:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STSServiceException = void 0;
const smithy_client_1 = __nccwpck_require__(3623);
class STSServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, STSServiceException.prototype);
    }
}
exports.STSServiceException = STSServiceException;


/***/ }),

/***/ 773:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(9012), exports);


/***/ }),

/***/ 9012:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSessionTokenResponseFilterSensitiveLog = exports.GetSessionTokenRequestFilterSensitiveLog = exports.GetFederationTokenResponseFilterSensitiveLog = exports.FederatedUserFilterSensitiveLog = exports.GetFederationTokenRequestFilterSensitiveLog = exports.GetCallerIdentityResponseFilterSensitiveLog = exports.GetCallerIdentityRequestFilterSensitiveLog = exports.GetAccessKeyInfoResponseFilterSensitiveLog = exports.GetAccessKeyInfoRequestFilterSensitiveLog = exports.DecodeAuthorizationMessageResponseFilterSensitiveLog = exports.DecodeAuthorizationMessageRequestFilterSensitiveLog = exports.AssumeRoleWithWebIdentityResponseFilterSensitiveLog = exports.AssumeRoleWithWebIdentityRequestFilterSensitiveLog = exports.AssumeRoleWithSAMLResponseFilterSensitiveLog = exports.AssumeRoleWithSAMLRequestFilterSensitiveLog = exports.AssumeRoleResponseFilterSensitiveLog = exports.CredentialsFilterSensitiveLog = exports.AssumeRoleRequestFilterSensitiveLog = exports.TagFilterSensitiveLog = exports.PolicyDescriptorTypeFilterSensitiveLog = exports.AssumedRoleUserFilterSensitiveLog = exports.InvalidAuthorizationMessageException = exports.IDPCommunicationErrorException = exports.InvalidIdentityTokenException = exports.IDPRejectedClaimException = exports.RegionDisabledException = exports.PackedPolicyTooLargeException = exports.MalformedPolicyDocumentException = exports.ExpiredTokenException = void 0;
const STSServiceException_1 = __nccwpck_require__(2806);
class ExpiredTokenException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...opts,
        });
        this.name = "ExpiredTokenException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
    }
}
exports.ExpiredTokenException = ExpiredTokenException;
class MalformedPolicyDocumentException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "MalformedPolicyDocumentException",
            $fault: "client",
            ...opts,
        });
        this.name = "MalformedPolicyDocumentException";
        this.$fault = "client";
        Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
    }
}
exports.MalformedPolicyDocumentException = MalformedPolicyDocumentException;
class PackedPolicyTooLargeException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "PackedPolicyTooLargeException",
            $fault: "client",
            ...opts,
        });
        this.name = "PackedPolicyTooLargeException";
        this.$fault = "client";
        Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
    }
}
exports.PackedPolicyTooLargeException = PackedPolicyTooLargeException;
class RegionDisabledException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "RegionDisabledException",
            $fault: "client",
            ...opts,
        });
        this.name = "RegionDisabledException";
        this.$fault = "client";
        Object.setPrototypeOf(this, RegionDisabledException.prototype);
    }
}
exports.RegionDisabledException = RegionDisabledException;
class IDPRejectedClaimException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "IDPRejectedClaimException",
            $fault: "client",
            ...opts,
        });
        this.name = "IDPRejectedClaimException";
        this.$fault = "client";
        Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
    }
}
exports.IDPRejectedClaimException = IDPRejectedClaimException;
class InvalidIdentityTokenException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "InvalidIdentityTokenException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidIdentityTokenException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
    }
}
exports.InvalidIdentityTokenException = InvalidIdentityTokenException;
class IDPCommunicationErrorException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "IDPCommunicationErrorException",
            $fault: "client",
            ...opts,
        });
        this.name = "IDPCommunicationErrorException";
        this.$fault = "client";
        Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
    }
}
exports.IDPCommunicationErrorException = IDPCommunicationErrorException;
class InvalidAuthorizationMessageException extends STSServiceException_1.STSServiceException {
    constructor(opts) {
        super({
            name: "InvalidAuthorizationMessageException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidAuthorizationMessageException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidAuthorizationMessageException.prototype);
    }
}
exports.InvalidAuthorizationMessageException = InvalidAuthorizationMessageException;
const AssumedRoleUserFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumedRoleUserFilterSensitiveLog = AssumedRoleUserFilterSensitiveLog;
const PolicyDescriptorTypeFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.PolicyDescriptorTypeFilterSensitiveLog = PolicyDescriptorTypeFilterSensitiveLog;
const TagFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.TagFilterSensitiveLog = TagFilterSensitiveLog;
const AssumeRoleRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumeRoleRequestFilterSensitiveLog = AssumeRoleRequestFilterSensitiveLog;
const CredentialsFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.CredentialsFilterSensitiveLog = CredentialsFilterSensitiveLog;
const AssumeRoleResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumeRoleResponseFilterSensitiveLog = AssumeRoleResponseFilterSensitiveLog;
const AssumeRoleWithSAMLRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumeRoleWithSAMLRequestFilterSensitiveLog = AssumeRoleWithSAMLRequestFilterSensitiveLog;
const AssumeRoleWithSAMLResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumeRoleWithSAMLResponseFilterSensitiveLog = AssumeRoleWithSAMLResponseFilterSensitiveLog;
const AssumeRoleWithWebIdentityRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumeRoleWithWebIdentityRequestFilterSensitiveLog = AssumeRoleWithWebIdentityRequestFilterSensitiveLog;
const AssumeRoleWithWebIdentityResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.AssumeRoleWithWebIdentityResponseFilterSensitiveLog = AssumeRoleWithWebIdentityResponseFilterSensitiveLog;
const DecodeAuthorizationMessageRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DecodeAuthorizationMessageRequestFilterSensitiveLog = DecodeAuthorizationMessageRequestFilterSensitiveLog;
const DecodeAuthorizationMessageResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.DecodeAuthorizationMessageResponseFilterSensitiveLog = DecodeAuthorizationMessageResponseFilterSensitiveLog;
const GetAccessKeyInfoRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetAccessKeyInfoRequestFilterSensitiveLog = GetAccessKeyInfoRequestFilterSensitiveLog;
const GetAccessKeyInfoResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetAccessKeyInfoResponseFilterSensitiveLog = GetAccessKeyInfoResponseFilterSensitiveLog;
const GetCallerIdentityRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetCallerIdentityRequestFilterSensitiveLog = GetCallerIdentityRequestFilterSensitiveLog;
const GetCallerIdentityResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetCallerIdentityResponseFilterSensitiveLog = GetCallerIdentityResponseFilterSensitiveLog;
const GetFederationTokenRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetFederationTokenRequestFilterSensitiveLog = GetFederationTokenRequestFilterSensitiveLog;
const FederatedUserFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.FederatedUserFilterSensitiveLog = FederatedUserFilterSensitiveLog;
const GetFederationTokenResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetFederationTokenResponseFilterSensitiveLog = GetFederationTokenResponseFilterSensitiveLog;
const GetSessionTokenRequestFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetSessionTokenRequestFilterSensitiveLog = GetSessionTokenRequestFilterSensitiveLog;
const GetSessionTokenResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
exports.GetSessionTokenResponseFilterSensitiveLog = GetSessionTokenResponseFilterSensitiveLog;


/***/ }),

/***/ 9673:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserializeAws_queryGetSessionTokenCommand = exports.deserializeAws_queryGetFederationTokenCommand = exports.deserializeAws_queryGetCallerIdentityCommand = exports.deserializeAws_queryGetAccessKeyInfoCommand = exports.deserializeAws_queryDecodeAuthorizationMessageCommand = exports.deserializeAws_queryAssumeRoleWithWebIdentityCommand = exports.deserializeAws_queryAssumeRoleWithSAMLCommand = exports.deserializeAws_queryAssumeRoleCommand = exports.serializeAws_queryGetSessionTokenCommand = exports.serializeAws_queryGetFederationTokenCommand = exports.serializeAws_queryGetCallerIdentityCommand = exports.serializeAws_queryGetAccessKeyInfoCommand = exports.serializeAws_queryDecodeAuthorizationMessageCommand = exports.serializeAws_queryAssumeRoleWithWebIdentityCommand = exports.serializeAws_queryAssumeRoleWithSAMLCommand = exports.serializeAws_queryAssumeRoleCommand = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const smithy_client_1 = __nccwpck_require__(3623);
const entities_1 = __nccwpck_require__(9446);
const fast_xml_parser_1 = __nccwpck_require__(2173);
const models_0_1 = __nccwpck_require__(9012);
const STSServiceException_1 = __nccwpck_require__(2806);
const serializeAws_queryAssumeRoleCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryAssumeRoleRequest(input, context),
        Action: "AssumeRole",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryAssumeRoleCommand = serializeAws_queryAssumeRoleCommand;
const serializeAws_queryAssumeRoleWithSAMLCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryAssumeRoleWithSAMLRequest(input, context),
        Action: "AssumeRoleWithSAML",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryAssumeRoleWithSAMLCommand = serializeAws_queryAssumeRoleWithSAMLCommand;
const serializeAws_queryAssumeRoleWithWebIdentityCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryAssumeRoleWithWebIdentityRequest(input, context),
        Action: "AssumeRoleWithWebIdentity",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryAssumeRoleWithWebIdentityCommand = serializeAws_queryAssumeRoleWithWebIdentityCommand;
const serializeAws_queryDecodeAuthorizationMessageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryDecodeAuthorizationMessageRequest(input, context),
        Action: "DecodeAuthorizationMessage",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryDecodeAuthorizationMessageCommand = serializeAws_queryDecodeAuthorizationMessageCommand;
const serializeAws_queryGetAccessKeyInfoCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryGetAccessKeyInfoRequest(input, context),
        Action: "GetAccessKeyInfo",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryGetAccessKeyInfoCommand = serializeAws_queryGetAccessKeyInfoCommand;
const serializeAws_queryGetCallerIdentityCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryGetCallerIdentityRequest(input, context),
        Action: "GetCallerIdentity",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryGetCallerIdentityCommand = serializeAws_queryGetCallerIdentityCommand;
const serializeAws_queryGetFederationTokenCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryGetFederationTokenRequest(input, context),
        Action: "GetFederationToken",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryGetFederationTokenCommand = serializeAws_queryGetFederationTokenCommand;
const serializeAws_queryGetSessionTokenCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryGetSessionTokenRequest(input, context),
        Action: "GetSessionToken",
        Version: "2011-06-15",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryGetSessionTokenCommand = serializeAws_queryGetSessionTokenCommand;
const deserializeAws_queryAssumeRoleCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryAssumeRoleCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryAssumeRoleResponse(data.AssumeRoleResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryAssumeRoleCommand = deserializeAws_queryAssumeRoleCommand;
const deserializeAws_queryAssumeRoleCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ExpiredTokenException":
        case "com.amazonaws.sts#ExpiredTokenException":
            throw await deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context);
        case "MalformedPolicyDocument":
        case "com.amazonaws.sts#MalformedPolicyDocumentException":
            throw await deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context);
        case "PackedPolicyTooLarge":
        case "com.amazonaws.sts#PackedPolicyTooLargeException":
            throw await deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context);
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
            throw await deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: STSServiceException_1.STSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryAssumeRoleWithSAMLCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryAssumeRoleWithSAMLCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryAssumeRoleWithSAMLResponse(data.AssumeRoleWithSAMLResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryAssumeRoleWithSAMLCommand = deserializeAws_queryAssumeRoleWithSAMLCommand;
const deserializeAws_queryAssumeRoleWithSAMLCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ExpiredTokenException":
        case "com.amazonaws.sts#ExpiredTokenException":
            throw await deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context);
        case "IDPRejectedClaim":
        case "com.amazonaws.sts#IDPRejectedClaimException":
            throw await deserializeAws_queryIDPRejectedClaimExceptionResponse(parsedOutput, context);
        case "InvalidIdentityToken":
        case "com.amazonaws.sts#InvalidIdentityTokenException":
            throw await deserializeAws_queryInvalidIdentityTokenExceptionResponse(parsedOutput, context);
        case "MalformedPolicyDocument":
        case "com.amazonaws.sts#MalformedPolicyDocumentException":
            throw await deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context);
        case "PackedPolicyTooLarge":
        case "com.amazonaws.sts#PackedPolicyTooLargeException":
            throw await deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context);
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
            throw await deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: STSServiceException_1.STSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryAssumeRoleWithWebIdentityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryAssumeRoleWithWebIdentityCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryAssumeRoleWithWebIdentityResponse(data.AssumeRoleWithWebIdentityResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryAssumeRoleWithWebIdentityCommand = deserializeAws_queryAssumeRoleWithWebIdentityCommand;
const deserializeAws_queryAssumeRoleWithWebIdentityCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ExpiredTokenException":
        case "com.amazonaws.sts#ExpiredTokenException":
            throw await deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context);
        case "IDPCommunicationError":
        case "com.amazonaws.sts#IDPCommunicationErrorException":
            throw await deserializeAws_queryIDPCommunicationErrorExceptionResponse(parsedOutput, context);
        case "IDPRejectedClaim":
        case "com.amazonaws.sts#IDPRejectedClaimException":
            throw await deserializeAws_queryIDPRejectedClaimExceptionResponse(parsedOutput, context);
        case "InvalidIdentityToken":
        case "com.amazonaws.sts#InvalidIdentityTokenException":
            throw await deserializeAws_queryInvalidIdentityTokenExceptionResponse(parsedOutput, context);
        case "MalformedPolicyDocument":
        case "com.amazonaws.sts#MalformedPolicyDocumentException":
            throw await deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context);
        case "PackedPolicyTooLarge":
        case "com.amazonaws.sts#PackedPolicyTooLargeException":
            throw await deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context);
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
            throw await deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: STSServiceException_1.STSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryDecodeAuthorizationMessageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryDecodeAuthorizationMessageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryDecodeAuthorizationMessageResponse(data.DecodeAuthorizationMessageResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryDecodeAuthorizationMessageCommand = deserializeAws_queryDecodeAuthorizationMessageCommand;
const deserializeAws_queryDecodeAuthorizationMessageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidAuthorizationMessageException":
        case "com.amazonaws.sts#InvalidAuthorizationMessageException":
            throw await deserializeAws_queryInvalidAuthorizationMessageExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: STSServiceException_1.STSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryGetAccessKeyInfoCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryGetAccessKeyInfoCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryGetAccessKeyInfoResponse(data.GetAccessKeyInfoResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryGetAccessKeyInfoCommand = deserializeAws_queryGetAccessKeyInfoCommand;
const deserializeAws_queryGetAccessKeyInfoCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: STSServiceException_1.STSServiceException,
        errorCode,
    });
};
const deserializeAws_queryGetCallerIdentityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryGetCallerIdentityCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryGetCallerIdentityResponse(data.GetCallerIdentityResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryGetCallerIdentityCommand = deserializeAws_queryGetCallerIdentityCommand;
const deserializeAws_queryGetCallerIdentityCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: STSServiceException_1.STSServiceException,
        errorCode,
    });
};
const deserializeAws_queryGetFederationTokenCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryGetFederationTokenCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryGetFederationTokenResponse(data.GetFederationTokenResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryGetFederationTokenCommand = deserializeAws_queryGetFederationTokenCommand;
const deserializeAws_queryGetFederationTokenCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "MalformedPolicyDocument":
        case "com.amazonaws.sts#MalformedPolicyDocumentException":
            throw await deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context);
        case "PackedPolicyTooLarge":
        case "com.amazonaws.sts#PackedPolicyTooLargeException":
            throw await deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context);
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
            throw await deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: STSServiceException_1.STSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryGetSessionTokenCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryGetSessionTokenCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryGetSessionTokenResponse(data.GetSessionTokenResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryGetSessionTokenCommand = deserializeAws_queryGetSessionTokenCommand;
const deserializeAws_queryGetSessionTokenCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
            throw await deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: STSServiceException_1.STSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryExpiredTokenExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryExpiredTokenException(body.Error, context);
    const exception = new models_0_1.ExpiredTokenException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryIDPCommunicationErrorExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryIDPCommunicationErrorException(body.Error, context);
    const exception = new models_0_1.IDPCommunicationErrorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryIDPRejectedClaimExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryIDPRejectedClaimException(body.Error, context);
    const exception = new models_0_1.IDPRejectedClaimException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryInvalidAuthorizationMessageExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryInvalidAuthorizationMessageException(body.Error, context);
    const exception = new models_0_1.InvalidAuthorizationMessageException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryInvalidIdentityTokenExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryInvalidIdentityTokenException(body.Error, context);
    const exception = new models_0_1.InvalidIdentityTokenException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryMalformedPolicyDocumentExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryMalformedPolicyDocumentException(body.Error, context);
    const exception = new models_0_1.MalformedPolicyDocumentException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryPackedPolicyTooLargeExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryPackedPolicyTooLargeException(body.Error, context);
    const exception = new models_0_1.PackedPolicyTooLargeException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryRegionDisabledExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryRegionDisabledException(body.Error, context);
    const exception = new models_0_1.RegionDisabledException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const serializeAws_queryAssumeRoleRequest = (input, context) => {
    const entries = {};
    if (input.RoleArn != null) {
        entries["RoleArn"] = input.RoleArn;
    }
    if (input.RoleSessionName != null) {
        entries["RoleSessionName"] = input.RoleSessionName;
    }
    if (input.PolicyArns != null) {
        const memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `PolicyArns.${key}`;
            entries[loc] = value;
        });
    }
    if (input.Policy != null) {
        entries["Policy"] = input.Policy;
    }
    if (input.DurationSeconds != null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    if (input.Tags != null) {
        const memberEntries = serializeAws_querytagListType(input.Tags, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Tags.${key}`;
            entries[loc] = value;
        });
    }
    if (input.TransitiveTagKeys != null) {
        const memberEntries = serializeAws_querytagKeyListType(input.TransitiveTagKeys, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `TransitiveTagKeys.${key}`;
            entries[loc] = value;
        });
    }
    if (input.ExternalId != null) {
        entries["ExternalId"] = input.ExternalId;
    }
    if (input.SerialNumber != null) {
        entries["SerialNumber"] = input.SerialNumber;
    }
    if (input.TokenCode != null) {
        entries["TokenCode"] = input.TokenCode;
    }
    if (input.SourceIdentity != null) {
        entries["SourceIdentity"] = input.SourceIdentity;
    }
    return entries;
};
const serializeAws_queryAssumeRoleWithSAMLRequest = (input, context) => {
    const entries = {};
    if (input.RoleArn != null) {
        entries["RoleArn"] = input.RoleArn;
    }
    if (input.PrincipalArn != null) {
        entries["PrincipalArn"] = input.PrincipalArn;
    }
    if (input.SAMLAssertion != null) {
        entries["SAMLAssertion"] = input.SAMLAssertion;
    }
    if (input.PolicyArns != null) {
        const memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `PolicyArns.${key}`;
            entries[loc] = value;
        });
    }
    if (input.Policy != null) {
        entries["Policy"] = input.Policy;
    }
    if (input.DurationSeconds != null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    return entries;
};
const serializeAws_queryAssumeRoleWithWebIdentityRequest = (input, context) => {
    const entries = {};
    if (input.RoleArn != null) {
        entries["RoleArn"] = input.RoleArn;
    }
    if (input.RoleSessionName != null) {
        entries["RoleSessionName"] = input.RoleSessionName;
    }
    if (input.WebIdentityToken != null) {
        entries["WebIdentityToken"] = input.WebIdentityToken;
    }
    if (input.ProviderId != null) {
        entries["ProviderId"] = input.ProviderId;
    }
    if (input.PolicyArns != null) {
        const memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `PolicyArns.${key}`;
            entries[loc] = value;
        });
    }
    if (input.Policy != null) {
        entries["Policy"] = input.Policy;
    }
    if (input.DurationSeconds != null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    return entries;
};
const serializeAws_queryDecodeAuthorizationMessageRequest = (input, context) => {
    const entries = {};
    if (input.EncodedMessage != null) {
        entries["EncodedMessage"] = input.EncodedMessage;
    }
    return entries;
};
const serializeAws_queryGetAccessKeyInfoRequest = (input, context) => {
    const entries = {};
    if (input.AccessKeyId != null) {
        entries["AccessKeyId"] = input.AccessKeyId;
    }
    return entries;
};
const serializeAws_queryGetCallerIdentityRequest = (input, context) => {
    const entries = {};
    return entries;
};
const serializeAws_queryGetFederationTokenRequest = (input, context) => {
    const entries = {};
    if (input.Name != null) {
        entries["Name"] = input.Name;
    }
    if (input.Policy != null) {
        entries["Policy"] = input.Policy;
    }
    if (input.PolicyArns != null) {
        const memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `PolicyArns.${key}`;
            entries[loc] = value;
        });
    }
    if (input.DurationSeconds != null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    if (input.Tags != null) {
        const memberEntries = serializeAws_querytagListType(input.Tags, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Tags.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryGetSessionTokenRequest = (input, context) => {
    const entries = {};
    if (input.DurationSeconds != null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    if (input.SerialNumber != null) {
        entries["SerialNumber"] = input.SerialNumber;
    }
    if (input.TokenCode != null) {
        entries["TokenCode"] = input.TokenCode;
    }
    return entries;
};
const serializeAws_querypolicyDescriptorListType = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = serializeAws_queryPolicyDescriptorType(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const serializeAws_queryPolicyDescriptorType = (input, context) => {
    const entries = {};
    if (input.arn != null) {
        entries["arn"] = input.arn;
    }
    return entries;
};
const serializeAws_queryTag = (input, context) => {
    const entries = {};
    if (input.Key != null) {
        entries["Key"] = input.Key;
    }
    if (input.Value != null) {
        entries["Value"] = input.Value;
    }
    return entries;
};
const serializeAws_querytagKeyListType = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_querytagListType = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = serializeAws_queryTag(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const deserializeAws_queryAssumedRoleUser = (output, context) => {
    const contents = {
        AssumedRoleId: undefined,
        Arn: undefined,
    };
    if (output["AssumedRoleId"] !== undefined) {
        contents.AssumedRoleId = (0, smithy_client_1.expectString)(output["AssumedRoleId"]);
    }
    if (output["Arn"] !== undefined) {
        contents.Arn = (0, smithy_client_1.expectString)(output["Arn"]);
    }
    return contents;
};
const deserializeAws_queryAssumeRoleResponse = (output, context) => {
    const contents = {
        Credentials: undefined,
        AssumedRoleUser: undefined,
        PackedPolicySize: undefined,
        SourceIdentity: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    if (output["AssumedRoleUser"] !== undefined) {
        contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"], context);
    }
    if (output["PackedPolicySize"] !== undefined) {
        contents.PackedPolicySize = (0, smithy_client_1.strictParseInt32)(output["PackedPolicySize"]);
    }
    if (output["SourceIdentity"] !== undefined) {
        contents.SourceIdentity = (0, smithy_client_1.expectString)(output["SourceIdentity"]);
    }
    return contents;
};
const deserializeAws_queryAssumeRoleWithSAMLResponse = (output, context) => {
    const contents = {
        Credentials: undefined,
        AssumedRoleUser: undefined,
        PackedPolicySize: undefined,
        Subject: undefined,
        SubjectType: undefined,
        Issuer: undefined,
        Audience: undefined,
        NameQualifier: undefined,
        SourceIdentity: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    if (output["AssumedRoleUser"] !== undefined) {
        contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"], context);
    }
    if (output["PackedPolicySize"] !== undefined) {
        contents.PackedPolicySize = (0, smithy_client_1.strictParseInt32)(output["PackedPolicySize"]);
    }
    if (output["Subject"] !== undefined) {
        contents.Subject = (0, smithy_client_1.expectString)(output["Subject"]);
    }
    if (output["SubjectType"] !== undefined) {
        contents.SubjectType = (0, smithy_client_1.expectString)(output["SubjectType"]);
    }
    if (output["Issuer"] !== undefined) {
        contents.Issuer = (0, smithy_client_1.expectString)(output["Issuer"]);
    }
    if (output["Audience"] !== undefined) {
        contents.Audience = (0, smithy_client_1.expectString)(output["Audience"]);
    }
    if (output["NameQualifier"] !== undefined) {
        contents.NameQualifier = (0, smithy_client_1.expectString)(output["NameQualifier"]);
    }
    if (output["SourceIdentity"] !== undefined) {
        contents.SourceIdentity = (0, smithy_client_1.expectString)(output["SourceIdentity"]);
    }
    return contents;
};
const deserializeAws_queryAssumeRoleWithWebIdentityResponse = (output, context) => {
    const contents = {
        Credentials: undefined,
        SubjectFromWebIdentityToken: undefined,
        AssumedRoleUser: undefined,
        PackedPolicySize: undefined,
        Provider: undefined,
        Audience: undefined,
        SourceIdentity: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    if (output["SubjectFromWebIdentityToken"] !== undefined) {
        contents.SubjectFromWebIdentityToken = (0, smithy_client_1.expectString)(output["SubjectFromWebIdentityToken"]);
    }
    if (output["AssumedRoleUser"] !== undefined) {
        contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"], context);
    }
    if (output["PackedPolicySize"] !== undefined) {
        contents.PackedPolicySize = (0, smithy_client_1.strictParseInt32)(output["PackedPolicySize"]);
    }
    if (output["Provider"] !== undefined) {
        contents.Provider = (0, smithy_client_1.expectString)(output["Provider"]);
    }
    if (output["Audience"] !== undefined) {
        contents.Audience = (0, smithy_client_1.expectString)(output["Audience"]);
    }
    if (output["SourceIdentity"] !== undefined) {
        contents.SourceIdentity = (0, smithy_client_1.expectString)(output["SourceIdentity"]);
    }
    return contents;
};
const deserializeAws_queryCredentials = (output, context) => {
    const contents = {
        AccessKeyId: undefined,
        SecretAccessKey: undefined,
        SessionToken: undefined,
        Expiration: undefined,
    };
    if (output["AccessKeyId"] !== undefined) {
        contents.AccessKeyId = (0, smithy_client_1.expectString)(output["AccessKeyId"]);
    }
    if (output["SecretAccessKey"] !== undefined) {
        contents.SecretAccessKey = (0, smithy_client_1.expectString)(output["SecretAccessKey"]);
    }
    if (output["SessionToken"] !== undefined) {
        contents.SessionToken = (0, smithy_client_1.expectString)(output["SessionToken"]);
    }
    if (output["Expiration"] !== undefined) {
        contents.Expiration = (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output["Expiration"]));
    }
    return contents;
};
const deserializeAws_queryDecodeAuthorizationMessageResponse = (output, context) => {
    const contents = {
        DecodedMessage: undefined,
    };
    if (output["DecodedMessage"] !== undefined) {
        contents.DecodedMessage = (0, smithy_client_1.expectString)(output["DecodedMessage"]);
    }
    return contents;
};
const deserializeAws_queryExpiredTokenException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryFederatedUser = (output, context) => {
    const contents = {
        FederatedUserId: undefined,
        Arn: undefined,
    };
    if (output["FederatedUserId"] !== undefined) {
        contents.FederatedUserId = (0, smithy_client_1.expectString)(output["FederatedUserId"]);
    }
    if (output["Arn"] !== undefined) {
        contents.Arn = (0, smithy_client_1.expectString)(output["Arn"]);
    }
    return contents;
};
const deserializeAws_queryGetAccessKeyInfoResponse = (output, context) => {
    const contents = {
        Account: undefined,
    };
    if (output["Account"] !== undefined) {
        contents.Account = (0, smithy_client_1.expectString)(output["Account"]);
    }
    return contents;
};
const deserializeAws_queryGetCallerIdentityResponse = (output, context) => {
    const contents = {
        UserId: undefined,
        Account: undefined,
        Arn: undefined,
    };
    if (output["UserId"] !== undefined) {
        contents.UserId = (0, smithy_client_1.expectString)(output["UserId"]);
    }
    if (output["Account"] !== undefined) {
        contents.Account = (0, smithy_client_1.expectString)(output["Account"]);
    }
    if (output["Arn"] !== undefined) {
        contents.Arn = (0, smithy_client_1.expectString)(output["Arn"]);
    }
    return contents;
};
const deserializeAws_queryGetFederationTokenResponse = (output, context) => {
    const contents = {
        Credentials: undefined,
        FederatedUser: undefined,
        PackedPolicySize: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    if (output["FederatedUser"] !== undefined) {
        contents.FederatedUser = deserializeAws_queryFederatedUser(output["FederatedUser"], context);
    }
    if (output["PackedPolicySize"] !== undefined) {
        contents.PackedPolicySize = (0, smithy_client_1.strictParseInt32)(output["PackedPolicySize"]);
    }
    return contents;
};
const deserializeAws_queryGetSessionTokenResponse = (output, context) => {
    const contents = {
        Credentials: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    return contents;
};
const deserializeAws_queryIDPCommunicationErrorException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryIDPRejectedClaimException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryInvalidAuthorizationMessageException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryInvalidIdentityTokenException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryMalformedPolicyDocumentException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryPackedPolicyTooLargeException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeAws_queryRegionDisabledException = (output, context) => {
    const contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = (0, smithy_client_1.expectString)(output["message"]);
    }
    return contents;
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new protocol_http_1.HttpRequest(contents);
};
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        const parsedObj = (0, fast_xml_parser_1.parse)(encoded, {
            attributeNamePrefix: "",
            ignoreAttributes: false,
            parseNodeValue: false,
            trimValues: false,
            tagValueProcessor: (val) => (val.trim() === "" && val.includes("\n") ? "" : (0, entities_1.decodeHTML)(val)),
        });
        const textNodeName = "#text";
        const key = Object.keys(parsedObj)[0];
        const parsedObjToReturn = parsedObj[key];
        if (parsedObjToReturn[textNodeName]) {
            parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
            delete parsedObjToReturn[textNodeName];
        }
        return (0, smithy_client_1.getValueFromTextNode)(parsedObjToReturn);
    }
    return {};
});
const parseErrorBody = async (errorBody, context) => {
    var _a;
    const value = await parseBody(errorBody, context);
    if (value.Error) {
        value.Error.message = (_a = value.Error.message) !== null && _a !== void 0 ? _a : value.Error.Message;
    }
    return value;
};
const buildFormUrlencodedString = (formEntries) => Object.entries(formEntries)
    .map(([key, value]) => (0, smithy_client_1.extendedEncodeURIComponent)(key) + "=" + (0, smithy_client_1.extendedEncodeURIComponent)(value))
    .join("&");
const loadQueryErrorCode = (output, data) => {
    if (data.Error.Code !== undefined) {
        return data.Error.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
};


/***/ }),

/***/ 3908:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRuntimeConfig = void 0;
const tslib_1 = __nccwpck_require__(4503);
const package_json_1 = tslib_1.__importDefault(__nccwpck_require__(8133));
const defaultStsRoleAssumers_1 = __nccwpck_require__(1002);
const config_resolver_1 = __nccwpck_require__(8678);
const credential_provider_node_1 = __nccwpck_require__(2498);
const hash_node_1 = __nccwpck_require__(6324);
const middleware_retry_1 = __nccwpck_require__(1130);
const node_config_provider_1 = __nccwpck_require__(9125);
const node_http_handler_1 = __nccwpck_require__(3556);
const util_base64_node_1 = __nccwpck_require__(7974);
const util_body_length_node_1 = __nccwpck_require__(3458);
const util_user_agent_node_1 = __nccwpck_require__(7415);
const util_utf8_node_1 = __nccwpck_require__(4919);
const runtimeConfig_shared_1 = __nccwpck_require__(9327);
const smithy_client_1 = __nccwpck_require__(3623);
const util_defaults_mode_node_1 = __nccwpck_require__(5274);
const smithy_client_2 = __nccwpck_require__(3623);
const getRuntimeConfig = (config) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    (0, smithy_client_2.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        base64Decoder: (_a = config === null || config === void 0 ? void 0 : config.base64Decoder) !== null && _a !== void 0 ? _a : util_base64_node_1.fromBase64,
        base64Encoder: (_b = config === null || config === void 0 ? void 0 : config.base64Encoder) !== null && _b !== void 0 ? _b : util_base64_node_1.toBase64,
        bodyLengthChecker: (_c = config === null || config === void 0 ? void 0 : config.bodyLengthChecker) !== null && _c !== void 0 ? _c : util_body_length_node_1.calculateBodyLength,
        credentialDefaultProvider: (_d = config === null || config === void 0 ? void 0 : config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : (0, defaultStsRoleAssumers_1.decorateDefaultCredentialProvider)(credential_provider_node_1.defaultProvider),
        defaultUserAgentProvider: (_e = config === null || config === void 0 ? void 0 : config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : (0, util_user_agent_node_1.defaultUserAgent)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
        maxAttempts: (_f = config === null || config === void 0 ? void 0 : config.maxAttempts) !== null && _f !== void 0 ? _f : (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
        region: (_g = config === null || config === void 0 ? void 0 : config.region) !== null && _g !== void 0 ? _g : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS),
        requestHandler: (_h = config === null || config === void 0 ? void 0 : config.requestHandler) !== null && _h !== void 0 ? _h : new node_http_handler_1.NodeHttpHandler(defaultConfigProvider),
        retryMode: (_j = config === null || config === void 0 ? void 0 : config.retryMode) !== null && _j !== void 0 ? _j : (0, node_config_provider_1.loadConfig)({
            ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
            default: async () => (await defaultConfigProvider()).retryMode || middleware_retry_1.DEFAULT_RETRY_MODE,
        }),
        sha256: (_k = config === null || config === void 0 ? void 0 : config.sha256) !== null && _k !== void 0 ? _k : hash_node_1.Hash.bind(null, "sha256"),
        streamCollector: (_l = config === null || config === void 0 ? void 0 : config.streamCollector) !== null && _l !== void 0 ? _l : node_http_handler_1.streamCollector,
        useDualstackEndpoint: (_m = config === null || config === void 0 ? void 0 : config.useDualstackEndpoint) !== null && _m !== void 0 ? _m : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
        useFipsEndpoint: (_o = config === null || config === void 0 ? void 0 : config.useFipsEndpoint) !== null && _o !== void 0 ? _o : (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS),
        utf8Decoder: (_p = config === null || config === void 0 ? void 0 : config.utf8Decoder) !== null && _p !== void 0 ? _p : util_utf8_node_1.fromUtf8,
        utf8Encoder: (_q = config === null || config === void 0 ? void 0 : config.utf8Encoder) !== null && _q !== void 0 ? _q : util_utf8_node_1.toUtf8,
    };
};
exports.getRuntimeConfig = getRuntimeConfig;


/***/ }),

/***/ 9327:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRuntimeConfig = void 0;
const url_parser_1 = __nccwpck_require__(8477);
const endpoints_1 = __nccwpck_require__(9624);
const getRuntimeConfig = (config) => {
    var _a, _b, _c, _d, _e;
    return ({
        apiVersion: "2011-06-15",
        disableHostPrefix: (_a = config === null || config === void 0 ? void 0 : config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config === null || config === void 0 ? void 0 : config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config === null || config === void 0 ? void 0 : config.regionInfoProvider) !== null && _c !== void 0 ? _c : endpoints_1.defaultRegionInfoProvider,
        serviceId: (_d = config === null || config === void 0 ? void 0 : config.serviceId) !== null && _d !== void 0 ? _d : "STS",
        urlParser: (_e = config === null || config === void 0 ? void 0 : config.urlParser) !== null && _e !== void 0 ? _e : url_parser_1.parseUrl,
    });
};
exports.getRuntimeConfig = getRuntimeConfig;


/***/ }),

/***/ 9370:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = exports.DEFAULT_USE_DUALSTACK_ENDPOINT = exports.CONFIG_USE_DUALSTACK_ENDPOINT = exports.ENV_USE_DUALSTACK_ENDPOINT = void 0;
const util_config_provider_1 = __nccwpck_require__(2660);
exports.ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
exports.CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
exports.DEFAULT_USE_DUALSTACK_ENDPOINT = false;
exports.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => (0, util_config_provider_1.booleanSelector)(env, exports.ENV_USE_DUALSTACK_ENDPOINT, util_config_provider_1.SelectorType.ENV),
    configFileSelector: (profile) => (0, util_config_provider_1.booleanSelector)(profile, exports.CONFIG_USE_DUALSTACK_ENDPOINT, util_config_provider_1.SelectorType.CONFIG),
    default: false,
};


/***/ }),

/***/ 3677:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = exports.DEFAULT_USE_FIPS_ENDPOINT = exports.CONFIG_USE_FIPS_ENDPOINT = exports.ENV_USE_FIPS_ENDPOINT = void 0;
const util_config_provider_1 = __nccwpck_require__(2660);
exports.ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
exports.CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
exports.DEFAULT_USE_FIPS_ENDPOINT = false;
exports.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => (0, util_config_provider_1.booleanSelector)(env, exports.ENV_USE_FIPS_ENDPOINT, util_config_provider_1.SelectorType.ENV),
    configFileSelector: (profile) => (0, util_config_provider_1.booleanSelector)(profile, exports.CONFIG_USE_FIPS_ENDPOINT, util_config_provider_1.SelectorType.CONFIG),
    default: false,
};


/***/ }),

/***/ 5295:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(9370), exports);
tslib_1.__exportStar(__nccwpck_require__(3677), exports);
tslib_1.__exportStar(__nccwpck_require__(5623), exports);
tslib_1.__exportStar(__nccwpck_require__(9241), exports);


/***/ }),

/***/ 5623:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveCustomEndpointsConfig = void 0;
const util_middleware_1 = __nccwpck_require__(4614);
const resolveCustomEndpointsConfig = (input) => {
    var _a;
    const { endpoint, urlParser } = input;
    return {
        ...input,
        tls: (_a = input.tls) !== null && _a !== void 0 ? _a : true,
        endpoint: (0, util_middleware_1.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
        isCustomEndpoint: true,
        useDualstackEndpoint: (0, util_middleware_1.normalizeProvider)(input.useDualstackEndpoint),
    };
};
exports.resolveCustomEndpointsConfig = resolveCustomEndpointsConfig;


/***/ }),

/***/ 9241:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveEndpointsConfig = void 0;
const util_middleware_1 = __nccwpck_require__(4614);
const getEndpointFromRegion_1 = __nccwpck_require__(1168);
const resolveEndpointsConfig = (input) => {
    var _a;
    const useDualstackEndpoint = (0, util_middleware_1.normalizeProvider)(input.useDualstackEndpoint);
    const { endpoint, useFipsEndpoint, urlParser } = input;
    return {
        ...input,
        tls: (_a = input.tls) !== null && _a !== void 0 ? _a : true,
        endpoint: endpoint
            ? (0, util_middleware_1.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint)
            : () => (0, getEndpointFromRegion_1.getEndpointFromRegion)({ ...input, useDualstackEndpoint, useFipsEndpoint }),
        isCustomEndpoint: !!endpoint,
        useDualstackEndpoint,
    };
};
exports.resolveEndpointsConfig = resolveEndpointsConfig;


/***/ }),

/***/ 1168:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEndpointFromRegion = void 0;
const getEndpointFromRegion = async (input) => {
    var _a;
    const { tls = true } = input;
    const region = await input.region();
    const dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
    if (!dnsHostRegex.test(region)) {
        throw new Error("Invalid region in client config");
    }
    const useDualstackEndpoint = await input.useDualstackEndpoint();
    const useFipsEndpoint = await input.useFipsEndpoint();
    const { hostname } = (_a = (await input.regionInfoProvider(region, { useDualstackEndpoint, useFipsEndpoint }))) !== null && _a !== void 0 ? _a : {};
    if (!hostname) {
        throw new Error("Cannot resolve hostname from client config");
    }
    return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
};
exports.getEndpointFromRegion = getEndpointFromRegion;


/***/ }),

/***/ 8678:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5295), exports);
tslib_1.__exportStar(__nccwpck_require__(9607), exports);
tslib_1.__exportStar(__nccwpck_require__(6122), exports);


/***/ }),

/***/ 5692:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_REGION_CONFIG_FILE_OPTIONS = exports.NODE_REGION_CONFIG_OPTIONS = exports.REGION_INI_NAME = exports.REGION_ENV_NAME = void 0;
exports.REGION_ENV_NAME = "AWS_REGION";
exports.REGION_INI_NAME = "region";
exports.NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[exports.REGION_ENV_NAME],
    configFileSelector: (profile) => profile[exports.REGION_INI_NAME],
    default: () => {
        throw new Error("Region is missing");
    },
};
exports.NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials",
};


/***/ }),

/***/ 5562:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRealRegion = void 0;
const isFipsRegion_1 = __nccwpck_require__(1254);
const getRealRegion = (region) => (0, isFipsRegion_1.isFipsRegion)(region)
    ? ["fips-aws-global", "aws-fips"].includes(region)
        ? "us-east-1"
        : region.replace(/fips-(dkr-|prod-)?|-fips/, "")
    : region;
exports.getRealRegion = getRealRegion;


/***/ }),

/***/ 9607:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5692), exports);
tslib_1.__exportStar(__nccwpck_require__(7816), exports);


/***/ }),

/***/ 1254:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFipsRegion = void 0;
const isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
exports.isFipsRegion = isFipsRegion;


/***/ }),

/***/ 7816:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveRegionConfig = void 0;
const getRealRegion_1 = __nccwpck_require__(5562);
const isFipsRegion_1 = __nccwpck_require__(1254);
const resolveRegionConfig = (input) => {
    const { region, useFipsEndpoint } = input;
    if (!region) {
        throw new Error("Region is missing");
    }
    return {
        ...input,
        region: async () => {
            if (typeof region === "string") {
                return (0, getRealRegion_1.getRealRegion)(region);
            }
            const providedRegion = await region();
            return (0, getRealRegion_1.getRealRegion)(providedRegion);
        },
        useFipsEndpoint: async () => {
            const providedRegion = typeof region === "string" ? region : await region();
            if ((0, isFipsRegion_1.isFipsRegion)(providedRegion)) {
                return true;
            }
            return typeof useFipsEndpoint === "boolean" ? Promise.resolve(useFipsEndpoint) : useFipsEndpoint();
        },
    };
};
exports.resolveRegionConfig = resolveRegionConfig;


/***/ }),

/***/ 5952:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 8072:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 4611:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHostnameFromVariants = void 0;
const getHostnameFromVariants = (variants = [], { useFipsEndpoint, useDualstackEndpoint }) => {
    var _a;
    return (_a = variants.find(({ tags }) => useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack"))) === null || _a === void 0 ? void 0 : _a.hostname;
};
exports.getHostnameFromVariants = getHostnameFromVariants;


/***/ }),

/***/ 4983:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegionInfo = void 0;
const getHostnameFromVariants_1 = __nccwpck_require__(4611);
const getResolvedHostname_1 = __nccwpck_require__(8948);
const getResolvedPartition_1 = __nccwpck_require__(5824);
const getResolvedSigningRegion_1 = __nccwpck_require__(7542);
const getRegionInfo = (region, { useFipsEndpoint = false, useDualstackEndpoint = false, signingService, regionHash, partitionHash, }) => {
    var _a, _b, _c, _d, _e, _f;
    const partition = (0, getResolvedPartition_1.getResolvedPartition)(region, { partitionHash });
    const resolvedRegion = region in regionHash ? region : (_b = (_a = partitionHash[partition]) === null || _a === void 0 ? void 0 : _a.endpoint) !== null && _b !== void 0 ? _b : region;
    const hostnameOptions = { useFipsEndpoint, useDualstackEndpoint };
    const regionHostname = (0, getHostnameFromVariants_1.getHostnameFromVariants)((_c = regionHash[resolvedRegion]) === null || _c === void 0 ? void 0 : _c.variants, hostnameOptions);
    const partitionHostname = (0, getHostnameFromVariants_1.getHostnameFromVariants)((_d = partitionHash[partition]) === null || _d === void 0 ? void 0 : _d.variants, hostnameOptions);
    const hostname = (0, getResolvedHostname_1.getResolvedHostname)(resolvedRegion, { regionHostname, partitionHostname });
    if (hostname === undefined) {
        throw new Error(`Endpoint resolution failed for: ${{ resolvedRegion, useFipsEndpoint, useDualstackEndpoint }}`);
    }
    const signingRegion = (0, getResolvedSigningRegion_1.getResolvedSigningRegion)(hostname, {
        signingRegion: (_e = regionHash[resolvedRegion]) === null || _e === void 0 ? void 0 : _e.signingRegion,
        regionRegex: partitionHash[partition].regionRegex,
        useFipsEndpoint,
    });
    return {
        partition,
        signingService,
        hostname,
        ...(signingRegion && { signingRegion }),
        ...(((_f = regionHash[resolvedRegion]) === null || _f === void 0 ? void 0 : _f.signingService) && {
            signingService: regionHash[resolvedRegion].signingService,
        }),
    };
};
exports.getRegionInfo = getRegionInfo;


/***/ }),

/***/ 8948:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getResolvedHostname = void 0;
const getResolvedHostname = (resolvedRegion, { regionHostname, partitionHostname }) => regionHostname
    ? regionHostname
    : partitionHostname
        ? partitionHostname.replace("{region}", resolvedRegion)
        : undefined;
exports.getResolvedHostname = getResolvedHostname;


/***/ }),

/***/ 5824:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getResolvedPartition = void 0;
const getResolvedPartition = (region, { partitionHash }) => { var _a; return (_a = Object.keys(partitionHash || {}).find((key) => partitionHash[key].regions.includes(region))) !== null && _a !== void 0 ? _a : "aws"; };
exports.getResolvedPartition = getResolvedPartition;


/***/ }),

/***/ 7542:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getResolvedSigningRegion = void 0;
const getResolvedSigningRegion = (hostname, { signingRegion, regionRegex, useFipsEndpoint }) => {
    if (signingRegion) {
        return signingRegion;
    }
    else if (useFipsEndpoint) {
        const regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
        const regionRegexmatchArray = hostname.match(regionRegexJs);
        if (regionRegexmatchArray) {
            return regionRegexmatchArray[0].slice(1, -1);
        }
    }
};
exports.getResolvedSigningRegion = getResolvedSigningRegion;


/***/ }),

/***/ 6122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5952), exports);
tslib_1.__exportStar(__nccwpck_require__(8072), exports);
tslib_1.__exportStar(__nccwpck_require__(4983), exports);


/***/ }),

/***/ 4699:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromEnv = exports.ENV_EXPIRATION = exports.ENV_SESSION = exports.ENV_SECRET = exports.ENV_KEY = void 0;
const property_provider_1 = __nccwpck_require__(3995);
exports.ENV_KEY = "AWS_ACCESS_KEY_ID";
exports.ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
exports.ENV_SESSION = "AWS_SESSION_TOKEN";
exports.ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
const fromEnv = () => async () => {
    const accessKeyId = process.env[exports.ENV_KEY];
    const secretAccessKey = process.env[exports.ENV_SECRET];
    const sessionToken = process.env[exports.ENV_SESSION];
    const expiry = process.env[exports.ENV_EXPIRATION];
    if (accessKeyId && secretAccessKey) {
        return {
            accessKeyId,
            secretAccessKey,
            ...(sessionToken && { sessionToken }),
            ...(expiry && { expiration: new Date(expiry) }),
        };
    }
    throw new property_provider_1.CredentialsProviderError("Unable to find environment variable credentials.");
};
exports.fromEnv = fromEnv;


/***/ }),

/***/ 6065:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(4699), exports);


/***/ }),

/***/ 6743:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Endpoint = void 0;
var Endpoint;
(function (Endpoint) {
    Endpoint["IPv4"] = "http://169.254.169.254";
    Endpoint["IPv6"] = "http://[fd00:ec2::254]";
})(Endpoint = exports.Endpoint || (exports.Endpoint = {}));


/***/ }),

/***/ 6948:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENDPOINT_CONFIG_OPTIONS = exports.CONFIG_ENDPOINT_NAME = exports.ENV_ENDPOINT_NAME = void 0;
exports.ENV_ENDPOINT_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT";
exports.CONFIG_ENDPOINT_NAME = "ec2_metadata_service_endpoint";
exports.ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[exports.ENV_ENDPOINT_NAME],
    configFileSelector: (profile) => profile[exports.CONFIG_ENDPOINT_NAME],
    default: undefined,
};


/***/ }),

/***/ 1842:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EndpointMode = void 0;
var EndpointMode;
(function (EndpointMode) {
    EndpointMode["IPv4"] = "IPv4";
    EndpointMode["IPv6"] = "IPv6";
})(EndpointMode = exports.EndpointMode || (exports.EndpointMode = {}));


/***/ }),

/***/ 3525:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENDPOINT_MODE_CONFIG_OPTIONS = exports.CONFIG_ENDPOINT_MODE_NAME = exports.ENV_ENDPOINT_MODE_NAME = void 0;
const EndpointMode_1 = __nccwpck_require__(1842);
exports.ENV_ENDPOINT_MODE_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE";
exports.CONFIG_ENDPOINT_MODE_NAME = "ec2_metadata_service_endpoint_mode";
exports.ENDPOINT_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[exports.ENV_ENDPOINT_MODE_NAME],
    configFileSelector: (profile) => profile[exports.CONFIG_ENDPOINT_MODE_NAME],
    default: EndpointMode_1.EndpointMode.IPv4,
};


/***/ }),

/***/ 9603:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromContainerMetadata = exports.ENV_CMDS_AUTH_TOKEN = exports.ENV_CMDS_RELATIVE_URI = exports.ENV_CMDS_FULL_URI = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const url_1 = __nccwpck_require__(7310);
const httpRequest_1 = __nccwpck_require__(1021);
const ImdsCredentials_1 = __nccwpck_require__(1322);
const RemoteProviderInit_1 = __nccwpck_require__(4487);
const retry_1 = __nccwpck_require__(1253);
exports.ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
exports.ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
exports.ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
const fromContainerMetadata = (init = {}) => {
    const { timeout, maxRetries } = (0, RemoteProviderInit_1.providerConfigFromInit)(init);
    return () => (0, retry_1.retry)(async () => {
        const requestOptions = await getCmdsUri();
        const credsResponse = JSON.parse(await requestFromEcsImds(timeout, requestOptions));
        if (!(0, ImdsCredentials_1.isImdsCredentials)(credsResponse)) {
            throw new property_provider_1.CredentialsProviderError("Invalid response received from instance metadata service.");
        }
        return (0, ImdsCredentials_1.fromImdsCredentials)(credsResponse);
    }, maxRetries);
};
exports.fromContainerMetadata = fromContainerMetadata;
const requestFromEcsImds = async (timeout, options) => {
    if (process.env[exports.ENV_CMDS_AUTH_TOKEN]) {
        options.headers = {
            ...options.headers,
            Authorization: process.env[exports.ENV_CMDS_AUTH_TOKEN],
        };
    }
    const buffer = await (0, httpRequest_1.httpRequest)({
        ...options,
        timeout,
    });
    return buffer.toString();
};
const CMDS_IP = "169.254.170.2";
const GREENGRASS_HOSTS = {
    localhost: true,
    "127.0.0.1": true,
};
const GREENGRASS_PROTOCOLS = {
    "http:": true,
    "https:": true,
};
const getCmdsUri = async () => {
    if (process.env[exports.ENV_CMDS_RELATIVE_URI]) {
        return {
            hostname: CMDS_IP,
            path: process.env[exports.ENV_CMDS_RELATIVE_URI],
        };
    }
    if (process.env[exports.ENV_CMDS_FULL_URI]) {
        const parsed = (0, url_1.parse)(process.env[exports.ENV_CMDS_FULL_URI]);
        if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
            throw new property_provider_1.CredentialsProviderError(`${parsed.hostname} is not a valid container metadata service hostname`, false);
        }
        if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
            throw new property_provider_1.CredentialsProviderError(`${parsed.protocol} is not a valid container metadata service protocol`, false);
        }
        return {
            ...parsed,
            port: parsed.port ? parseInt(parsed.port, 10) : undefined,
        };
    }
    throw new property_provider_1.CredentialsProviderError("The container metadata credential provider cannot be used unless" +
        ` the ${exports.ENV_CMDS_RELATIVE_URI} or ${exports.ENV_CMDS_FULL_URI} environment` +
        " variable is set", false);
};


/***/ }),

/***/ 1274:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromInstanceMetadata = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const httpRequest_1 = __nccwpck_require__(1021);
const ImdsCredentials_1 = __nccwpck_require__(1322);
const RemoteProviderInit_1 = __nccwpck_require__(4487);
const retry_1 = __nccwpck_require__(1253);
const getInstanceMetadataEndpoint_1 = __nccwpck_require__(9204);
const staticStabilityProvider_1 = __nccwpck_require__(1930);
const IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
const IMDS_TOKEN_PATH = "/latest/api/token";
const fromInstanceMetadata = (init = {}) => (0, staticStabilityProvider_1.staticStabilityProvider)(getInstanceImdsProvider(init), { logger: init.logger });
exports.fromInstanceMetadata = fromInstanceMetadata;
const getInstanceImdsProvider = (init) => {
    let disableFetchToken = false;
    const { timeout, maxRetries } = (0, RemoteProviderInit_1.providerConfigFromInit)(init);
    const getCredentials = async (maxRetries, options) => {
        const profile = (await (0, retry_1.retry)(async () => {
            let profile;
            try {
                profile = await getProfile(options);
            }
            catch (err) {
                if (err.statusCode === 401) {
                    disableFetchToken = false;
                }
                throw err;
            }
            return profile;
        }, maxRetries)).trim();
        return (0, retry_1.retry)(async () => {
            let creds;
            try {
                creds = await getCredentialsFromProfile(profile, options);
            }
            catch (err) {
                if (err.statusCode === 401) {
                    disableFetchToken = false;
                }
                throw err;
            }
            return creds;
        }, maxRetries);
    };
    return async () => {
        const endpoint = await (0, getInstanceMetadataEndpoint_1.getInstanceMetadataEndpoint)();
        if (disableFetchToken) {
            return getCredentials(maxRetries, { ...endpoint, timeout });
        }
        else {
            let token;
            try {
                token = (await getMetadataToken({ ...endpoint, timeout })).toString();
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.statusCode) === 400) {
                    throw Object.assign(error, {
                        message: "EC2 Metadata token request returned error",
                    });
                }
                else if (error.message === "TimeoutError" || [403, 404, 405].includes(error.statusCode)) {
                    disableFetchToken = true;
                }
                return getCredentials(maxRetries, { ...endpoint, timeout });
            }
            return getCredentials(maxRetries, {
                ...endpoint,
                headers: {
                    "x-aws-ec2-metadata-token": token,
                },
                timeout,
            });
        }
    };
};
const getMetadataToken = async (options) => (0, httpRequest_1.httpRequest)({
    ...options,
    path: IMDS_TOKEN_PATH,
    method: "PUT",
    headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": "21600",
    },
});
const getProfile = async (options) => (await (0, httpRequest_1.httpRequest)({ ...options, path: IMDS_PATH })).toString();
const getCredentialsFromProfile = async (profile, options) => {
    const credsResponse = JSON.parse((await (0, httpRequest_1.httpRequest)({
        ...options,
        path: IMDS_PATH + profile,
    })).toString());
    if (!(0, ImdsCredentials_1.isImdsCredentials)(credsResponse)) {
        throw new property_provider_1.CredentialsProviderError("Invalid response received from instance metadata service.");
    }
    return (0, ImdsCredentials_1.fromImdsCredentials)(credsResponse);
};


/***/ }),

/***/ 8623:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInstanceMetadataEndpoint = exports.httpRequest = void 0;
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(9603), exports);
tslib_1.__exportStar(__nccwpck_require__(1274), exports);
tslib_1.__exportStar(__nccwpck_require__(4487), exports);
tslib_1.__exportStar(__nccwpck_require__(5017), exports);
var httpRequest_1 = __nccwpck_require__(1021);
Object.defineProperty(exports, "httpRequest", ({ enumerable: true, get: function () { return httpRequest_1.httpRequest; } }));
var getInstanceMetadataEndpoint_1 = __nccwpck_require__(9204);
Object.defineProperty(exports, "getInstanceMetadataEndpoint", ({ enumerable: true, get: function () { return getInstanceMetadataEndpoint_1.getInstanceMetadataEndpoint; } }));


/***/ }),

/***/ 1322:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromImdsCredentials = exports.isImdsCredentials = void 0;
const isImdsCredentials = (arg) => Boolean(arg) &&
    typeof arg === "object" &&
    typeof arg.AccessKeyId === "string" &&
    typeof arg.SecretAccessKey === "string" &&
    typeof arg.Token === "string" &&
    typeof arg.Expiration === "string";
exports.isImdsCredentials = isImdsCredentials;
const fromImdsCredentials = (creds) => ({
    accessKeyId: creds.AccessKeyId,
    secretAccessKey: creds.SecretAccessKey,
    sessionToken: creds.Token,
    expiration: new Date(creds.Expiration),
});
exports.fromImdsCredentials = fromImdsCredentials;


/***/ }),

/***/ 4487:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.providerConfigFromInit = exports.DEFAULT_MAX_RETRIES = exports.DEFAULT_TIMEOUT = void 0;
exports.DEFAULT_TIMEOUT = 1000;
exports.DEFAULT_MAX_RETRIES = 0;
const providerConfigFromInit = ({ maxRetries = exports.DEFAULT_MAX_RETRIES, timeout = exports.DEFAULT_TIMEOUT, }) => ({ maxRetries, timeout });
exports.providerConfigFromInit = providerConfigFromInit;


/***/ }),

/***/ 1021:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.httpRequest = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const buffer_1 = __nccwpck_require__(4300);
const http_1 = __nccwpck_require__(3685);
function httpRequest(options) {
    return new Promise((resolve, reject) => {
        var _a;
        const req = (0, http_1.request)({
            method: "GET",
            ...options,
            hostname: (_a = options.hostname) === null || _a === void 0 ? void 0 : _a.replace(/^\[(.+)\]$/, "$1"),
        });
        req.on("error", (err) => {
            reject(Object.assign(new property_provider_1.ProviderError("Unable to connect to instance metadata service"), err));
            req.destroy();
        });
        req.on("timeout", () => {
            reject(new property_provider_1.ProviderError("TimeoutError from instance metadata service"));
            req.destroy();
        });
        req.on("response", (res) => {
            const { statusCode = 400 } = res;
            if (statusCode < 200 || 300 <= statusCode) {
                reject(Object.assign(new property_provider_1.ProviderError("Error response received from instance metadata service"), { statusCode }));
                req.destroy();
            }
            const chunks = [];
            res.on("data", (chunk) => {
                chunks.push(chunk);
            });
            res.on("end", () => {
                resolve(buffer_1.Buffer.concat(chunks));
                req.destroy();
            });
        });
        req.end();
    });
}
exports.httpRequest = httpRequest;


/***/ }),

/***/ 1253:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.retry = void 0;
const retry = (toRetry, maxRetries) => {
    let promise = toRetry();
    for (let i = 0; i < maxRetries; i++) {
        promise = promise.catch(toRetry);
    }
    return promise;
};
exports.retry = retry;


/***/ }),

/***/ 5017:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 3135:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExtendedInstanceMetadataCredentials = void 0;
const STATIC_STABILITY_REFRESH_INTERVAL_SECONDS = 5 * 60;
const STATIC_STABILITY_REFRESH_INTERVAL_JITTER_WINDOW_SECONDS = 5 * 60;
const STATIC_STABILITY_DOC_URL = "https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html";
const getExtendedInstanceMetadataCredentials = (credentials, logger) => {
    var _a;
    const refreshInterval = STATIC_STABILITY_REFRESH_INTERVAL_SECONDS +
        Math.floor(Math.random() * STATIC_STABILITY_REFRESH_INTERVAL_JITTER_WINDOW_SECONDS);
    const newExpiration = new Date(Date.now() + refreshInterval * 1000);
    logger.warn("Attempting credential expiration extension due to a credential service availability issue. A refresh of these " +
        "credentials will be attempted after ${new Date(newExpiration)}.\nFor more information, please visit: " +
        STATIC_STABILITY_DOC_URL);
    const originalExpiration = (_a = credentials.originalExpiration) !== null && _a !== void 0 ? _a : credentials.expiration;
    return {
        ...credentials,
        ...(originalExpiration ? { originalExpiration } : {}),
        expiration: newExpiration,
    };
};
exports.getExtendedInstanceMetadataCredentials = getExtendedInstanceMetadataCredentials;


/***/ }),

/***/ 9204:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInstanceMetadataEndpoint = void 0;
const node_config_provider_1 = __nccwpck_require__(9125);
const url_parser_1 = __nccwpck_require__(8477);
const Endpoint_1 = __nccwpck_require__(6743);
const EndpointConfigOptions_1 = __nccwpck_require__(6948);
const EndpointMode_1 = __nccwpck_require__(1842);
const EndpointModeConfigOptions_1 = __nccwpck_require__(3525);
const getInstanceMetadataEndpoint = async () => (0, url_parser_1.parseUrl)((await getFromEndpointConfig()) || (await getFromEndpointModeConfig()));
exports.getInstanceMetadataEndpoint = getInstanceMetadataEndpoint;
const getFromEndpointConfig = async () => (0, node_config_provider_1.loadConfig)(EndpointConfigOptions_1.ENDPOINT_CONFIG_OPTIONS)();
const getFromEndpointModeConfig = async () => {
    const endpointMode = await (0, node_config_provider_1.loadConfig)(EndpointModeConfigOptions_1.ENDPOINT_MODE_CONFIG_OPTIONS)();
    switch (endpointMode) {
        case EndpointMode_1.EndpointMode.IPv4:
            return Endpoint_1.Endpoint.IPv4;
        case EndpointMode_1.EndpointMode.IPv6:
            return Endpoint_1.Endpoint.IPv6;
        default:
            throw new Error(`Unsupported endpoint mode: ${endpointMode}.` + ` Select from ${Object.values(EndpointMode_1.EndpointMode)}`);
    }
};


/***/ }),

/***/ 1930:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.staticStabilityProvider = void 0;
const getExtendedInstanceMetadataCredentials_1 = __nccwpck_require__(3135);
const staticStabilityProvider = (provider, options = {}) => {
    const logger = (options === null || options === void 0 ? void 0 : options.logger) || console;
    let pastCredentials;
    return async () => {
        let credentials;
        try {
            credentials = await provider();
            if (credentials.expiration && credentials.expiration.getTime() < Date.now()) {
                credentials = (0, getExtendedInstanceMetadataCredentials_1.getExtendedInstanceMetadataCredentials)(credentials, logger);
            }
        }
        catch (e) {
            if (pastCredentials) {
                logger.warn("Credential renew failed: ", e);
                credentials = (0, getExtendedInstanceMetadataCredentials_1.getExtendedInstanceMetadataCredentials)(pastCredentials, logger);
            }
            else {
                throw e;
            }
        }
        pastCredentials = credentials;
        return credentials;
    };
};
exports.staticStabilityProvider = staticStabilityProvider;


/***/ }),

/***/ 2648:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromIni = void 0;
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const resolveProfileData_1 = __nccwpck_require__(8853);
const fromIni = (init = {}) => async () => {
    const profiles = await (0, shared_ini_file_loader_1.parseKnownFiles)(init);
    return (0, resolveProfileData_1.resolveProfileData)((0, shared_ini_file_loader_1.getProfileName)(init), profiles, init);
};
exports.fromIni = fromIni;


/***/ }),

/***/ 5749:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(2648), exports);


/***/ }),

/***/ 3797:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveAssumeRoleCredentials = exports.isAssumeRoleProfile = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const resolveCredentialSource_1 = __nccwpck_require__(2913);
const resolveProfileData_1 = __nccwpck_require__(8853);
const isAssumeRoleProfile = (arg) => Boolean(arg) &&
    typeof arg === "object" &&
    typeof arg.role_arn === "string" &&
    ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
    ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
    ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1 &&
    (isAssumeRoleWithSourceProfile(arg) || isAssumeRoleWithProviderProfile(arg));
exports.isAssumeRoleProfile = isAssumeRoleProfile;
const isAssumeRoleWithSourceProfile = (arg) => typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
const isAssumeRoleWithProviderProfile = (arg) => typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
const resolveAssumeRoleCredentials = async (profileName, profiles, options, visitedProfiles = {}) => {
    const data = profiles[profileName];
    if (!options.roleAssumer) {
        throw new property_provider_1.CredentialsProviderError(`Profile ${profileName} requires a role to be assumed, but no role assumption callback was provided.`, false);
    }
    const { source_profile } = data;
    if (source_profile && source_profile in visitedProfiles) {
        throw new property_provider_1.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile` +
            ` ${(0, shared_ini_file_loader_1.getProfileName)(options)}. Profiles visited: ` +
            Object.keys(visitedProfiles).join(", "), false);
    }
    const sourceCredsProvider = source_profile
        ? (0, resolveProfileData_1.resolveProfileData)(source_profile, profiles, options, {
            ...visitedProfiles,
            [source_profile]: true,
        })
        : (0, resolveCredentialSource_1.resolveCredentialSource)(data.credential_source, profileName)();
    const params = {
        RoleArn: data.role_arn,
        RoleSessionName: data.role_session_name || `aws-sdk-js-${Date.now()}`,
        ExternalId: data.external_id,
    };
    const { mfa_serial } = data;
    if (mfa_serial) {
        if (!options.mfaCodeProvider) {
            throw new property_provider_1.CredentialsProviderError(`Profile ${profileName} requires multi-factor authentication, but no MFA code callback was provided.`, false);
        }
        params.SerialNumber = mfa_serial;
        params.TokenCode = await options.mfaCodeProvider(mfa_serial);
    }
    const sourceCreds = await sourceCredsProvider;
    return options.roleAssumer(sourceCreds, params);
};
exports.resolveAssumeRoleCredentials = resolveAssumeRoleCredentials;


/***/ }),

/***/ 2913:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveCredentialSource = void 0;
const credential_provider_env_1 = __nccwpck_require__(6065);
const credential_provider_imds_1 = __nccwpck_require__(8623);
const property_provider_1 = __nccwpck_require__(3995);
const resolveCredentialSource = (credentialSource, profileName) => {
    const sourceProvidersMap = {
        EcsContainer: credential_provider_imds_1.fromContainerMetadata,
        Ec2InstanceMetadata: credential_provider_imds_1.fromInstanceMetadata,
        Environment: credential_provider_env_1.fromEnv,
    };
    if (credentialSource in sourceProvidersMap) {
        return sourceProvidersMap[credentialSource]();
    }
    else {
        throw new property_provider_1.CredentialsProviderError(`Unsupported credential source in profile ${profileName}. Got ${credentialSource}, ` +
            `expected EcsContainer or Ec2InstanceMetadata or Environment.`);
    }
};
exports.resolveCredentialSource = resolveCredentialSource;


/***/ }),

/***/ 8853:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveProfileData = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const resolveAssumeRoleCredentials_1 = __nccwpck_require__(3797);
const resolveSsoCredentials_1 = __nccwpck_require__(3011);
const resolveStaticCredentials_1 = __nccwpck_require__(3099);
const resolveWebIdentityCredentials_1 = __nccwpck_require__(6375);
const resolveProfileData = async (profileName, profiles, options, visitedProfiles = {}) => {
    const data = profiles[profileName];
    if (Object.keys(visitedProfiles).length > 0 && (0, resolveStaticCredentials_1.isStaticCredsProfile)(data)) {
        return (0, resolveStaticCredentials_1.resolveStaticCredentials)(data);
    }
    if ((0, resolveAssumeRoleCredentials_1.isAssumeRoleProfile)(data)) {
        return (0, resolveAssumeRoleCredentials_1.resolveAssumeRoleCredentials)(profileName, profiles, options, visitedProfiles);
    }
    if ((0, resolveStaticCredentials_1.isStaticCredsProfile)(data)) {
        return (0, resolveStaticCredentials_1.resolveStaticCredentials)(data);
    }
    if ((0, resolveWebIdentityCredentials_1.isWebIdentityProfile)(data)) {
        return (0, resolveWebIdentityCredentials_1.resolveWebIdentityCredentials)(data, options);
    }
    if ((0, resolveSsoCredentials_1.isSsoProfile)(data)) {
        return (0, resolveSsoCredentials_1.resolveSsoCredentials)(data);
    }
    throw new property_provider_1.CredentialsProviderError(`Profile ${profileName} could not be found or parsed in shared credentials file.`);
};
exports.resolveProfileData = resolveProfileData;


/***/ }),

/***/ 3011:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSsoCredentials = exports.isSsoProfile = void 0;
const credential_provider_sso_1 = __nccwpck_require__(4810);
var credential_provider_sso_2 = __nccwpck_require__(4810);
Object.defineProperty(exports, "isSsoProfile", ({ enumerable: true, get: function () { return credential_provider_sso_2.isSsoProfile; } }));
const resolveSsoCredentials = (data) => {
    const { sso_start_url, sso_account_id, sso_region, sso_role_name } = (0, credential_provider_sso_1.validateSsoProfile)(data);
    return (0, credential_provider_sso_1.fromSSO)({
        ssoStartUrl: sso_start_url,
        ssoAccountId: sso_account_id,
        ssoRegion: sso_region,
        ssoRoleName: sso_role_name,
    })();
};
exports.resolveSsoCredentials = resolveSsoCredentials;


/***/ }),

/***/ 3099:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveStaticCredentials = exports.isStaticCredsProfile = void 0;
const isStaticCredsProfile = (arg) => Boolean(arg) &&
    typeof arg === "object" &&
    typeof arg.aws_access_key_id === "string" &&
    typeof arg.aws_secret_access_key === "string" &&
    ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1;
exports.isStaticCredsProfile = isStaticCredsProfile;
const resolveStaticCredentials = (profile) => Promise.resolve({
    accessKeyId: profile.aws_access_key_id,
    secretAccessKey: profile.aws_secret_access_key,
    sessionToken: profile.aws_session_token,
});
exports.resolveStaticCredentials = resolveStaticCredentials;


/***/ }),

/***/ 6375:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveWebIdentityCredentials = exports.isWebIdentityProfile = void 0;
const credential_provider_web_identity_1 = __nccwpck_require__(3229);
const isWebIdentityProfile = (arg) => Boolean(arg) &&
    typeof arg === "object" &&
    typeof arg.web_identity_token_file === "string" &&
    typeof arg.role_arn === "string" &&
    ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1;
exports.isWebIdentityProfile = isWebIdentityProfile;
const resolveWebIdentityCredentials = async (profile, options) => (0, credential_provider_web_identity_1.fromTokenFile)({
    webIdentityTokenFile: profile.web_identity_token_file,
    roleArn: profile.role_arn,
    roleSessionName: profile.role_session_name,
    roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity,
})();
exports.resolveWebIdentityCredentials = resolveWebIdentityCredentials;


/***/ }),

/***/ 8459:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultProvider = void 0;
const credential_provider_env_1 = __nccwpck_require__(6065);
const credential_provider_ini_1 = __nccwpck_require__(5749);
const credential_provider_process_1 = __nccwpck_require__(4866);
const credential_provider_sso_1 = __nccwpck_require__(4810);
const credential_provider_web_identity_1 = __nccwpck_require__(3229);
const property_provider_1 = __nccwpck_require__(3995);
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const remoteProvider_1 = __nccwpck_require__(2721);
const defaultProvider = (init = {}) => (0, property_provider_1.memoize)((0, property_provider_1.chain)(...(init.profile || process.env[shared_ini_file_loader_1.ENV_PROFILE] ? [] : [(0, credential_provider_env_1.fromEnv)()]), (0, credential_provider_sso_1.fromSSO)(init), (0, credential_provider_ini_1.fromIni)(init), (0, credential_provider_process_1.fromProcess)(init), (0, credential_provider_web_identity_1.fromTokenFile)(init), (0, remoteProvider_1.remoteProvider)(init), async () => {
    throw new property_provider_1.CredentialsProviderError("Could not load credentials from any providers", false);
}), (credentials) => credentials.expiration !== undefined && credentials.expiration.getTime() - Date.now() < 300000, (credentials) => credentials.expiration !== undefined);
exports.defaultProvider = defaultProvider;


/***/ }),

/***/ 2498:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(8459), exports);


/***/ }),

/***/ 2721:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.remoteProvider = exports.ENV_IMDS_DISABLED = void 0;
const credential_provider_imds_1 = __nccwpck_require__(8623);
const property_provider_1 = __nccwpck_require__(3995);
exports.ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
const remoteProvider = (init) => {
    if (process.env[credential_provider_imds_1.ENV_CMDS_RELATIVE_URI] || process.env[credential_provider_imds_1.ENV_CMDS_FULL_URI]) {
        return (0, credential_provider_imds_1.fromContainerMetadata)(init);
    }
    if (process.env[exports.ENV_IMDS_DISABLED]) {
        return async () => {
            throw new property_provider_1.CredentialsProviderError("EC2 Instance Metadata Service access disabled");
        };
    }
    return (0, credential_provider_imds_1.fromInstanceMetadata)(init);
};
exports.remoteProvider = remoteProvider;


/***/ }),

/***/ 8784:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromProcess = void 0;
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const resolveProcessCredentials_1 = __nccwpck_require__(8957);
const fromProcess = (init = {}) => async () => {
    const profiles = await (0, shared_ini_file_loader_1.parseKnownFiles)(init);
    return (0, resolveProcessCredentials_1.resolveProcessCredentials)((0, shared_ini_file_loader_1.getProfileName)(init), profiles);
};
exports.fromProcess = fromProcess;


/***/ }),

/***/ 711:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getValidatedProcessCredentials = void 0;
const getValidatedProcessCredentials = (profileName, data) => {
    if (data.Version !== 1) {
        throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
    }
    if (data.AccessKeyId === undefined || data.SecretAccessKey === undefined) {
        throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
    }
    if (data.Expiration) {
        const currentTime = new Date();
        const expireTime = new Date(data.Expiration);
        if (expireTime < currentTime) {
            throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
        }
    }
    return {
        accessKeyId: data.AccessKeyId,
        secretAccessKey: data.SecretAccessKey,
        ...(data.SessionToken && { sessionToken: data.SessionToken }),
        ...(data.Expiration && { expiration: new Date(data.Expiration) }),
    };
};
exports.getValidatedProcessCredentials = getValidatedProcessCredentials;


/***/ }),

/***/ 4866:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(8784), exports);


/***/ }),

/***/ 8957:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveProcessCredentials = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const child_process_1 = __nccwpck_require__(2081);
const util_1 = __nccwpck_require__(3837);
const getValidatedProcessCredentials_1 = __nccwpck_require__(711);
const resolveProcessCredentials = async (profileName, profiles) => {
    const profile = profiles[profileName];
    if (profiles[profileName]) {
        const credentialProcess = profile["credential_process"];
        if (credentialProcess !== undefined) {
            const execPromise = (0, util_1.promisify)(child_process_1.exec);
            try {
                const { stdout } = await execPromise(credentialProcess);
                let data;
                try {
                    data = JSON.parse(stdout.trim());
                }
                catch (_a) {
                    throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
                }
                return (0, getValidatedProcessCredentials_1.getValidatedProcessCredentials)(profileName, data);
            }
            catch (error) {
                throw new property_provider_1.CredentialsProviderError(error.message);
            }
        }
        else {
            throw new property_provider_1.CredentialsProviderError(`Profile ${profileName} did not contain credential_process.`);
        }
    }
    else {
        throw new property_provider_1.CredentialsProviderError(`Profile ${profileName} could not be found in shared credentials file.`);
    }
};
exports.resolveProcessCredentials = resolveProcessCredentials;


/***/ }),

/***/ 4573:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromSSO = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const isSsoProfile_1 = __nccwpck_require__(7231);
const resolveSSOCredentials_1 = __nccwpck_require__(7585);
const validateSsoProfile_1 = __nccwpck_require__(897);
const fromSSO = (init = {}) => async () => {
    const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoClient } = init;
    if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName) {
        const profiles = await (0, shared_ini_file_loader_1.parseKnownFiles)(init);
        const profileName = (0, shared_ini_file_loader_1.getProfileName)(init);
        const profile = profiles[profileName];
        if (!(0, isSsoProfile_1.isSsoProfile)(profile)) {
            throw new property_provider_1.CredentialsProviderError(`Profile ${profileName} is not configured with SSO credentials.`);
        }
        const { sso_start_url, sso_account_id, sso_region, sso_role_name } = (0, validateSsoProfile_1.validateSsoProfile)(profile);
        return (0, resolveSSOCredentials_1.resolveSSOCredentials)({
            ssoStartUrl: sso_start_url,
            ssoAccountId: sso_account_id,
            ssoRegion: sso_region,
            ssoRoleName: sso_role_name,
            ssoClient: ssoClient,
        });
    }
    else if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) {
        throw new property_provider_1.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl",' +
            ' "ssoAccountId", "ssoRegion", "ssoRoleName"');
    }
    else {
        return (0, resolveSSOCredentials_1.resolveSSOCredentials)({ ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoClient });
    }
};
exports.fromSSO = fromSSO;


/***/ }),

/***/ 4810:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(4573), exports);
tslib_1.__exportStar(__nccwpck_require__(7231), exports);
tslib_1.__exportStar(__nccwpck_require__(5365), exports);
tslib_1.__exportStar(__nccwpck_require__(897), exports);


/***/ }),

/***/ 7231:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSsoProfile = void 0;
const isSsoProfile = (arg) => arg &&
    (typeof arg.sso_start_url === "string" ||
        typeof arg.sso_account_id === "string" ||
        typeof arg.sso_region === "string" ||
        typeof arg.sso_role_name === "string");
exports.isSsoProfile = isSsoProfile;


/***/ }),

/***/ 7585:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSSOCredentials = void 0;
const client_sso_1 = __nccwpck_require__(8122);
const property_provider_1 = __nccwpck_require__(3995);
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const EXPIRE_WINDOW_MS = 15 * 60 * 1000;
const SHOULD_FAIL_CREDENTIAL_CHAIN = false;
const resolveSSOCredentials = async ({ ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, }) => {
    let token;
    const refreshMessage = `To refresh this SSO session run aws sso login with the corresponding profile.`;
    try {
        token = await (0, shared_ini_file_loader_1.getSSOTokenFromFile)(ssoStartUrl);
    }
    catch (e) {
        throw new property_provider_1.CredentialsProviderError(`The SSO session associated with this profile is invalid. ${refreshMessage}`, SHOULD_FAIL_CREDENTIAL_CHAIN);
    }
    if (new Date(token.expiresAt).getTime() - Date.now() <= EXPIRE_WINDOW_MS) {
        throw new property_provider_1.CredentialsProviderError(`The SSO session associated with this profile has expired. ${refreshMessage}`, SHOULD_FAIL_CREDENTIAL_CHAIN);
    }
    const { accessToken } = token;
    const sso = ssoClient || new client_sso_1.SSOClient({ region: ssoRegion });
    let ssoResp;
    try {
        ssoResp = await sso.send(new client_sso_1.GetRoleCredentialsCommand({
            accountId: ssoAccountId,
            roleName: ssoRoleName,
            accessToken,
        }));
    }
    catch (e) {
        throw property_provider_1.CredentialsProviderError.from(e, SHOULD_FAIL_CREDENTIAL_CHAIN);
    }
    const { roleCredentials: { accessKeyId, secretAccessKey, sessionToken, expiration } = {} } = ssoResp;
    if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) {
        throw new property_provider_1.CredentialsProviderError("SSO returns an invalid temporary credential.", SHOULD_FAIL_CREDENTIAL_CHAIN);
    }
    return { accessKeyId, secretAccessKey, sessionToken, expiration: new Date(expiration) };
};
exports.resolveSSOCredentials = resolveSSOCredentials;


/***/ }),

/***/ 5365:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 897:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSsoProfile = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const validateSsoProfile = (profile) => {
    const { sso_start_url, sso_account_id, sso_region, sso_role_name } = profile;
    if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) {
        throw new property_provider_1.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", ` +
            `"sso_role_name", "sso_start_url". Got ${Object.keys(profile).join(", ")}\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, false);
    }
    return profile;
};
exports.validateSsoProfile = validateSsoProfile;


/***/ }),

/***/ 5735:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromTokenFile = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const fs_1 = __nccwpck_require__(7147);
const fromWebToken_1 = __nccwpck_require__(5648);
const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
const fromTokenFile = (init = {}) => async () => {
    return resolveTokenFile(init);
};
exports.fromTokenFile = fromTokenFile;
const resolveTokenFile = (init) => {
    var _a, _b, _c;
    const webIdentityTokenFile = (_a = init === null || init === void 0 ? void 0 : init.webIdentityTokenFile) !== null && _a !== void 0 ? _a : process.env[ENV_TOKEN_FILE];
    const roleArn = (_b = init === null || init === void 0 ? void 0 : init.roleArn) !== null && _b !== void 0 ? _b : process.env[ENV_ROLE_ARN];
    const roleSessionName = (_c = init === null || init === void 0 ? void 0 : init.roleSessionName) !== null && _c !== void 0 ? _c : process.env[ENV_ROLE_SESSION_NAME];
    if (!webIdentityTokenFile || !roleArn) {
        throw new property_provider_1.CredentialsProviderError("Web identity configuration not specified");
    }
    return (0, fromWebToken_1.fromWebToken)({
        ...init,
        webIdentityToken: (0, fs_1.readFileSync)(webIdentityTokenFile, { encoding: "ascii" }),
        roleArn,
        roleSessionName,
    })();
};


/***/ }),

/***/ 5648:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromWebToken = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const fromWebToken = (init) => () => {
    const { roleArn, roleSessionName, webIdentityToken, providerId, policyArns, policy, durationSeconds, roleAssumerWithWebIdentity, } = init;
    if (!roleAssumerWithWebIdentity) {
        throw new property_provider_1.CredentialsProviderError(`Role Arn '${roleArn}' needs to be assumed with web identity,` +
            ` but no role assumption callback was provided.`, false);
    }
    return roleAssumerWithWebIdentity({
        RoleArn: roleArn,
        RoleSessionName: roleSessionName !== null && roleSessionName !== void 0 ? roleSessionName : `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: webIdentityToken,
        ProviderId: providerId,
        PolicyArns: policyArns,
        Policy: policy,
        DurationSeconds: durationSeconds,
    });
};
exports.fromWebToken = fromWebToken;


/***/ }),

/***/ 3229:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5735), exports);
tslib_1.__exportStar(__nccwpck_require__(5648), exports);


/***/ }),

/***/ 6324:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Hash = void 0;
const util_buffer_from_1 = __nccwpck_require__(4379);
const buffer_1 = __nccwpck_require__(4300);
const crypto_1 = __nccwpck_require__(6113);
class Hash {
    constructor(algorithmIdentifier, secret) {
        this.hash = secret ? (0, crypto_1.createHmac)(algorithmIdentifier, castSourceData(secret)) : (0, crypto_1.createHash)(algorithmIdentifier);
    }
    update(toHash, encoding) {
        this.hash.update(castSourceData(toHash, encoding));
    }
    digest() {
        return Promise.resolve(this.hash.digest());
    }
}
exports.Hash = Hash;
function castSourceData(toCast, encoding) {
    if (buffer_1.Buffer.isBuffer(toCast)) {
        return toCast;
    }
    if (typeof toCast === "string") {
        return (0, util_buffer_from_1.fromString)(toCast, encoding);
    }
    if (ArrayBuffer.isView(toCast)) {
        return (0, util_buffer_from_1.fromArrayBuffer)(toCast.buffer, toCast.byteOffset, toCast.byteLength);
    }
    return (0, util_buffer_from_1.fromArrayBuffer)(toCast);
}


/***/ }),

/***/ 4843:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isArrayBuffer = void 0;
const isArrayBuffer = (arg) => (typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer) ||
    Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
exports.isArrayBuffer = isArrayBuffer;


/***/ }),

/***/ 8396:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContentLengthPlugin = exports.contentLengthMiddlewareOptions = exports.contentLengthMiddleware = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
    return (next) => async (args) => {
        const request = args.request;
        if (protocol_http_1.HttpRequest.isInstance(request)) {
            const { body, headers } = request;
            if (body &&
                Object.keys(headers)
                    .map((str) => str.toLowerCase())
                    .indexOf(CONTENT_LENGTH_HEADER) === -1) {
                try {
                    const length = bodyLengthChecker(body);
                    request.headers = {
                        ...request.headers,
                        [CONTENT_LENGTH_HEADER]: String(length),
                    };
                }
                catch (error) {
                }
            }
        }
        return next({
            ...args,
            request,
        });
    };
}
exports.contentLengthMiddleware = contentLengthMiddleware;
exports.contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true,
};
const getContentLengthPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), exports.contentLengthMiddlewareOptions);
    },
});
exports.getContentLengthPlugin = getContentLengthPlugin;


/***/ }),

/***/ 8822:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHostHeaderPlugin = exports.hostHeaderMiddlewareOptions = exports.hostHeaderMiddleware = exports.resolveHostHeaderConfig = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
function resolveHostHeaderConfig(input) {
    return input;
}
exports.resolveHostHeaderConfig = resolveHostHeaderConfig;
const hostHeaderMiddleware = (options) => (next) => async (args) => {
    if (!protocol_http_1.HttpRequest.isInstance(args.request))
        return next(args);
    const { request } = args;
    const { handlerProtocol = "" } = options.requestHandler.metadata || {};
    if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
        delete request.headers["host"];
        request.headers[":authority"] = "";
    }
    else if (!request.headers["host"]) {
        request.headers["host"] = request.hostname;
    }
    return next(args);
};
exports.hostHeaderMiddleware = hostHeaderMiddleware;
exports.hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: ["HOST"],
    override: true,
};
const getHostHeaderPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add((0, exports.hostHeaderMiddleware)(options), exports.hostHeaderMiddlewareOptions);
    },
});
exports.getHostHeaderPlugin = getHostHeaderPlugin;


/***/ }),

/***/ 3801:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(525), exports);


/***/ }),

/***/ 525:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLoggerPlugin = exports.loggerMiddlewareOptions = exports.loggerMiddleware = void 0;
const loggerMiddleware = () => (next, context) => async (args) => {
    const { clientName, commandName, inputFilterSensitiveLog, logger, outputFilterSensitiveLog } = context;
    const response = await next(args);
    if (!logger) {
        return response;
    }
    if (typeof logger.info === "function") {
        const { $metadata, ...outputWithoutMetadata } = response.output;
        logger.info({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            output: outputFilterSensitiveLog(outputWithoutMetadata),
            metadata: $metadata,
        });
    }
    return response;
};
exports.loggerMiddleware = loggerMiddleware;
exports.loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true,
};
const getLoggerPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add((0, exports.loggerMiddleware)(), exports.loggerMiddlewareOptions);
    },
});
exports.getLoggerPlugin = getLoggerPlugin;


/***/ }),

/***/ 3444:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRecursionDetectionPlugin = exports.addRecursionDetectionMiddlewareOptions = exports.recursionDetectionMiddleware = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
const ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
const ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
const recursionDetectionMiddleware = (options) => (next) => async (args) => {
    const { request } = args;
    if (!protocol_http_1.HttpRequest.isInstance(request) ||
        options.runtime !== "node" ||
        request.headers.hasOwnProperty(TRACE_ID_HEADER_NAME)) {
        return next(args);
    }
    const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
    const traceId = process.env[ENV_TRACE_ID];
    const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
    if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
        request.headers[TRACE_ID_HEADER_NAME] = traceId;
    }
    return next({
        ...args,
        request,
    });
};
exports.recursionDetectionMiddleware = recursionDetectionMiddleware;
exports.addRecursionDetectionMiddlewareOptions = {
    step: "build",
    tags: ["RECURSION_DETECTION"],
    name: "recursionDetectionMiddleware",
    override: true,
    priority: "low",
};
const getRecursionDetectionPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add((0, exports.recursionDetectionMiddleware)(options), exports.addRecursionDetectionMiddlewareOptions);
    },
});
exports.getRecursionDetectionPlugin = getRecursionDetectionPlugin;


/***/ }),

/***/ 9310:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdaptiveRetryStrategy = void 0;
const config_1 = __nccwpck_require__(8734);
const DefaultRateLimiter_1 = __nccwpck_require__(3584);
const StandardRetryStrategy_1 = __nccwpck_require__(1199);
class AdaptiveRetryStrategy extends StandardRetryStrategy_1.StandardRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        const { rateLimiter, ...superOptions } = options !== null && options !== void 0 ? options : {};
        super(maxAttemptsProvider, superOptions);
        this.rateLimiter = rateLimiter !== null && rateLimiter !== void 0 ? rateLimiter : new DefaultRateLimiter_1.DefaultRateLimiter();
        this.mode = config_1.RETRY_MODES.ADAPTIVE;
    }
    async retry(next, args) {
        return super.retry(next, args, {
            beforeRequest: async () => {
                return this.rateLimiter.getSendToken();
            },
            afterRequest: (response) => {
                this.rateLimiter.updateClientSendingRate(response);
            },
        });
    }
}
exports.AdaptiveRetryStrategy = AdaptiveRetryStrategy;


/***/ }),

/***/ 3584:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultRateLimiter = void 0;
const service_error_classification_1 = __nccwpck_require__(9588);
class DefaultRateLimiter {
    constructor(options) {
        var _a, _b, _c, _d, _e;
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = (_a = options === null || options === void 0 ? void 0 : options.beta) !== null && _a !== void 0 ? _a : 0.7;
        this.minCapacity = (_b = options === null || options === void 0 ? void 0 : options.minCapacity) !== null && _b !== void 0 ? _b : 1;
        this.minFillRate = (_c = options === null || options === void 0 ? void 0 : options.minFillRate) !== null && _c !== void 0 ? _c : 0.5;
        this.scaleConstant = (_d = options === null || options === void 0 ? void 0 : options.scaleConstant) !== null && _d !== void 0 ? _d : 0.4;
        this.smooth = (_e = options === null || options === void 0 ? void 0 : options.smooth) !== null && _e !== void 0 ? _e : 0.8;
        const currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
    }
    getCurrentTimeInSeconds() {
        return Date.now() / 1000;
    }
    async getSendToken() {
        return this.acquireTokenBucket(1);
    }
    async acquireTokenBucket(amount) {
        if (!this.enabled) {
            return;
        }
        this.refillTokenBucket();
        if (amount > this.currentCapacity) {
            const delay = ((amount - this.currentCapacity) / this.fillRate) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
        this.currentCapacity = this.currentCapacity - amount;
    }
    refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
    }
    updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        if ((0, service_error_classification_1.isThrottlingError)(response)) {
            const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
            this.lastMaxRate = rateToUse;
            this.calculateTimeWindow();
            this.lastThrottleTime = this.getCurrentTimeInSeconds();
            calculatedRate = this.cubicThrottle(rateToUse);
            this.enableTokenBucket();
        }
        else {
            this.calculateTimeWindow();
            calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
    }
    calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow((this.lastMaxRate * (1 - this.beta)) / this.scaleConstant, 1 / 3));
    }
    cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
    }
    cubicSuccess(timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    }
    enableTokenBucket() {
        this.enabled = true;
    }
    updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    }
    updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
            const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
            this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
            this.requestCount = 0;
            this.lastTxRateBucket = timeBucket;
        }
    }
    getPrecise(num) {
        return parseFloat(num.toFixed(8));
    }
}
exports.DefaultRateLimiter = DefaultRateLimiter;


/***/ }),

/***/ 1199:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StandardRetryStrategy = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const service_error_classification_1 = __nccwpck_require__(9588);
const uuid_1 = __nccwpck_require__(9986);
const config_1 = __nccwpck_require__(8734);
const constants_1 = __nccwpck_require__(1342);
const defaultRetryQuota_1 = __nccwpck_require__(9906);
const delayDecider_1 = __nccwpck_require__(7100);
const retryDecider_1 = __nccwpck_require__(5741);
class StandardRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        var _a, _b, _c;
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = config_1.RETRY_MODES.STANDARD;
        this.retryDecider = (_a = options === null || options === void 0 ? void 0 : options.retryDecider) !== null && _a !== void 0 ? _a : retryDecider_1.defaultRetryDecider;
        this.delayDecider = (_b = options === null || options === void 0 ? void 0 : options.delayDecider) !== null && _b !== void 0 ? _b : delayDecider_1.defaultDelayDecider;
        this.retryQuota = (_c = options === null || options === void 0 ? void 0 : options.retryQuota) !== null && _c !== void 0 ? _c : (0, defaultRetryQuota_1.getDefaultRetryQuota)(constants_1.INITIAL_RETRY_TOKENS);
    }
    shouldRetry(error, attempts, maxAttempts) {
        return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
    }
    async getMaxAttempts() {
        let maxAttempts;
        try {
            maxAttempts = await this.maxAttemptsProvider();
        }
        catch (error) {
            maxAttempts = config_1.DEFAULT_MAX_ATTEMPTS;
        }
        return maxAttempts;
    }
    async retry(next, args, options) {
        let retryTokenAmount;
        let attempts = 0;
        let totalDelay = 0;
        const maxAttempts = await this.getMaxAttempts();
        const { request } = args;
        if (protocol_http_1.HttpRequest.isInstance(request)) {
            request.headers[constants_1.INVOCATION_ID_HEADER] = (0, uuid_1.v4)();
        }
        while (true) {
            try {
                if (protocol_http_1.HttpRequest.isInstance(request)) {
                    request.headers[constants_1.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
                }
                if (options === null || options === void 0 ? void 0 : options.beforeRequest) {
                    await options.beforeRequest();
                }
                const { response, output } = await next(args);
                if (options === null || options === void 0 ? void 0 : options.afterRequest) {
                    options.afterRequest(response);
                }
                this.retryQuota.releaseRetryTokens(retryTokenAmount);
                output.$metadata.attempts = attempts + 1;
                output.$metadata.totalRetryDelay = totalDelay;
                return { response, output };
            }
            catch (e) {
                const err = asSdkError(e);
                attempts++;
                if (this.shouldRetry(err, attempts, maxAttempts)) {
                    retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
                    const delayFromDecider = this.delayDecider((0, service_error_classification_1.isThrottlingError)(err) ? constants_1.THROTTLING_RETRY_DELAY_BASE : constants_1.DEFAULT_RETRY_DELAY_BASE, attempts);
                    const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
                    const delay = Math.max(delayFromResponse || 0, delayFromDecider);
                    totalDelay += delay;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }
                if (!err.$metadata) {
                    err.$metadata = {};
                }
                err.$metadata.attempts = attempts;
                err.$metadata.totalRetryDelay = totalDelay;
                throw err;
            }
        }
    }
}
exports.StandardRetryStrategy = StandardRetryStrategy;
const getDelayFromRetryAfterHeader = (response) => {
    if (!protocol_http_1.HttpResponse.isInstance(response))
        return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
        return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
        return retryAfterSeconds * 1000;
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate.getTime() - Date.now();
};
const asSdkError = (error) => {
    if (error instanceof Error)
        return error;
    if (error instanceof Object)
        return Object.assign(new Error(), error);
    if (typeof error === "string")
        return new Error(error);
    return new Error(`AWS SDK error wrapper for ${error}`);
};


/***/ }),

/***/ 8734:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_RETRY_MODE = exports.DEFAULT_MAX_ATTEMPTS = exports.RETRY_MODES = void 0;
var RETRY_MODES;
(function (RETRY_MODES) {
    RETRY_MODES["STANDARD"] = "standard";
    RETRY_MODES["ADAPTIVE"] = "adaptive";
})(RETRY_MODES = exports.RETRY_MODES || (exports.RETRY_MODES = {}));
exports.DEFAULT_MAX_ATTEMPTS = 3;
exports.DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;


/***/ }),

/***/ 5132:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_RETRY_MODE_CONFIG_OPTIONS = exports.CONFIG_RETRY_MODE = exports.ENV_RETRY_MODE = exports.resolveRetryConfig = exports.NODE_MAX_ATTEMPT_CONFIG_OPTIONS = exports.CONFIG_MAX_ATTEMPTS = exports.ENV_MAX_ATTEMPTS = void 0;
const util_middleware_1 = __nccwpck_require__(4614);
const AdaptiveRetryStrategy_1 = __nccwpck_require__(9310);
const config_1 = __nccwpck_require__(8734);
const StandardRetryStrategy_1 = __nccwpck_require__(1199);
exports.ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
exports.CONFIG_MAX_ATTEMPTS = "max_attempts";
exports.NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        const value = env[exports.ENV_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Environment variable ${exports.ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    configFileSelector: (profile) => {
        const value = profile[exports.CONFIG_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Shared config file entry ${exports.CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    default: config_1.DEFAULT_MAX_ATTEMPTS,
};
const resolveRetryConfig = (input) => {
    var _a;
    const maxAttempts = (0, util_middleware_1.normalizeProvider)((_a = input.maxAttempts) !== null && _a !== void 0 ? _a : config_1.DEFAULT_MAX_ATTEMPTS);
    return {
        ...input,
        maxAttempts,
        retryStrategy: async () => {
            if (input.retryStrategy) {
                return input.retryStrategy;
            }
            const retryMode = await (0, util_middleware_1.normalizeProvider)(input.retryMode)();
            if (retryMode === config_1.RETRY_MODES.ADAPTIVE) {
                return new AdaptiveRetryStrategy_1.AdaptiveRetryStrategy(maxAttempts);
            }
            return new StandardRetryStrategy_1.StandardRetryStrategy(maxAttempts);
        },
    };
};
exports.resolveRetryConfig = resolveRetryConfig;
exports.ENV_RETRY_MODE = "AWS_RETRY_MODE";
exports.CONFIG_RETRY_MODE = "retry_mode";
exports.NODE_RETRY_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[exports.ENV_RETRY_MODE],
    configFileSelector: (profile) => profile[exports.CONFIG_RETRY_MODE],
    default: config_1.DEFAULT_RETRY_MODE,
};


/***/ }),

/***/ 1342:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REQUEST_HEADER = exports.INVOCATION_ID_HEADER = exports.NO_RETRY_INCREMENT = exports.TIMEOUT_RETRY_COST = exports.RETRY_COST = exports.INITIAL_RETRY_TOKENS = exports.THROTTLING_RETRY_DELAY_BASE = exports.MAXIMUM_RETRY_DELAY = exports.DEFAULT_RETRY_DELAY_BASE = void 0;
exports.DEFAULT_RETRY_DELAY_BASE = 100;
exports.MAXIMUM_RETRY_DELAY = 20 * 1000;
exports.THROTTLING_RETRY_DELAY_BASE = 500;
exports.INITIAL_RETRY_TOKENS = 500;
exports.RETRY_COST = 5;
exports.TIMEOUT_RETRY_COST = 10;
exports.NO_RETRY_INCREMENT = 1;
exports.INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
exports.REQUEST_HEADER = "amz-sdk-request";


/***/ }),

/***/ 9906:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultRetryQuota = void 0;
const constants_1 = __nccwpck_require__(1342);
const getDefaultRetryQuota = (initialRetryTokens, options) => {
    var _a, _b, _c;
    const MAX_CAPACITY = initialRetryTokens;
    const noRetryIncrement = (_a = options === null || options === void 0 ? void 0 : options.noRetryIncrement) !== null && _a !== void 0 ? _a : constants_1.NO_RETRY_INCREMENT;
    const retryCost = (_b = options === null || options === void 0 ? void 0 : options.retryCost) !== null && _b !== void 0 ? _b : constants_1.RETRY_COST;
    const timeoutRetryCost = (_c = options === null || options === void 0 ? void 0 : options.timeoutRetryCost) !== null && _c !== void 0 ? _c : constants_1.TIMEOUT_RETRY_COST;
    let availableCapacity = initialRetryTokens;
    const getCapacityAmount = (error) => (error.name === "TimeoutError" ? timeoutRetryCost : retryCost);
    const hasRetryTokens = (error) => getCapacityAmount(error) <= availableCapacity;
    const retrieveRetryTokens = (error) => {
        if (!hasRetryTokens(error)) {
            throw new Error("No retry token available");
        }
        const capacityAmount = getCapacityAmount(error);
        availableCapacity -= capacityAmount;
        return capacityAmount;
    };
    const releaseRetryTokens = (capacityReleaseAmount) => {
        availableCapacity += capacityReleaseAmount !== null && capacityReleaseAmount !== void 0 ? capacityReleaseAmount : noRetryIncrement;
        availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
    };
    return Object.freeze({
        hasRetryTokens,
        retrieveRetryTokens,
        releaseRetryTokens,
    });
};
exports.getDefaultRetryQuota = getDefaultRetryQuota;


/***/ }),

/***/ 7100:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultDelayDecider = void 0;
const constants_1 = __nccwpck_require__(1342);
const defaultDelayDecider = (delayBase, attempts) => Math.floor(Math.min(constants_1.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
exports.defaultDelayDecider = defaultDelayDecider;


/***/ }),

/***/ 1130:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(9310), exports);
tslib_1.__exportStar(__nccwpck_require__(3584), exports);
tslib_1.__exportStar(__nccwpck_require__(1199), exports);
tslib_1.__exportStar(__nccwpck_require__(8734), exports);
tslib_1.__exportStar(__nccwpck_require__(5132), exports);
tslib_1.__exportStar(__nccwpck_require__(7100), exports);
tslib_1.__exportStar(__nccwpck_require__(8691), exports);
tslib_1.__exportStar(__nccwpck_require__(5741), exports);
tslib_1.__exportStar(__nccwpck_require__(4377), exports);
tslib_1.__exportStar(__nccwpck_require__(3361), exports);


/***/ }),

/***/ 8691:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOmitRetryHeadersPlugin = exports.omitRetryHeadersMiddlewareOptions = exports.omitRetryHeadersMiddleware = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const constants_1 = __nccwpck_require__(1342);
const omitRetryHeadersMiddleware = () => (next) => async (args) => {
    const { request } = args;
    if (protocol_http_1.HttpRequest.isInstance(request)) {
        delete request.headers[constants_1.INVOCATION_ID_HEADER];
        delete request.headers[constants_1.REQUEST_HEADER];
    }
    return next(args);
};
exports.omitRetryHeadersMiddleware = omitRetryHeadersMiddleware;
exports.omitRetryHeadersMiddlewareOptions = {
    name: "omitRetryHeadersMiddleware",
    tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true,
};
const getOmitRetryHeadersPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0, exports.omitRetryHeadersMiddleware)(), exports.omitRetryHeadersMiddlewareOptions);
    },
});
exports.getOmitRetryHeadersPlugin = getOmitRetryHeadersPlugin;


/***/ }),

/***/ 5741:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultRetryDecider = void 0;
const service_error_classification_1 = __nccwpck_require__(9588);
const defaultRetryDecider = (error) => {
    if (!error) {
        return false;
    }
    return (0, service_error_classification_1.isRetryableByTrait)(error) || (0, service_error_classification_1.isClockSkewError)(error) || (0, service_error_classification_1.isThrottlingError)(error) || (0, service_error_classification_1.isTransientError)(error);
};
exports.defaultRetryDecider = defaultRetryDecider;


/***/ }),

/***/ 4377:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRetryPlugin = exports.retryMiddlewareOptions = exports.retryMiddleware = void 0;
const retryMiddleware = (options) => (next, context) => async (args) => {
    const retryStrategy = await options.retryStrategy();
    if (retryStrategy === null || retryStrategy === void 0 ? void 0 : retryStrategy.mode)
        context.userAgent = [...(context.userAgent || []), ["cfg/retry-mode", retryStrategy.mode]];
    return retryStrategy.retry(next, args);
};
exports.retryMiddleware = retryMiddleware;
exports.retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: ["RETRY"],
    step: "finalizeRequest",
    priority: "high",
    override: true,
};
const getRetryPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add((0, exports.retryMiddleware)(options), exports.retryMiddlewareOptions);
    },
});
exports.getRetryPlugin = getRetryPlugin;


/***/ }),

/***/ 3361:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 5808:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveStsAuthConfig = void 0;
const middleware_signing_1 = __nccwpck_require__(3334);
const resolveStsAuthConfig = (input, { stsClientCtor }) => (0, middleware_signing_1.resolveAwsAuthConfig)({
    ...input,
    stsClientCtor,
});
exports.resolveStsAuthConfig = resolveStsAuthConfig;


/***/ }),

/***/ 9356:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserializerMiddleware = void 0;
const deserializerMiddleware = (options, deserializer) => (next, context) => async (args) => {
    const { response } = await next(args);
    try {
        const parsed = await deserializer(response, options);
        return {
            response,
            output: parsed,
        };
    }
    catch (error) {
        Object.defineProperty(error, "$response", {
            value: response,
        });
        throw error;
    }
};
exports.deserializerMiddleware = deserializerMiddleware;


/***/ }),

/***/ 2647:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(9356), exports);
tslib_1.__exportStar(__nccwpck_require__(4913), exports);
tslib_1.__exportStar(__nccwpck_require__(4832), exports);


/***/ }),

/***/ 4913:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSerdePlugin = exports.serializerMiddlewareOption = exports.deserializerMiddlewareOption = void 0;
const deserializerMiddleware_1 = __nccwpck_require__(9356);
const serializerMiddleware_1 = __nccwpck_require__(4832);
exports.deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: ["DESERIALIZER"],
    override: true,
};
exports.serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: ["SERIALIZER"],
    override: true,
};
function getSerdePlugin(config, serializer, deserializer) {
    return {
        applyToStack: (commandStack) => {
            commandStack.add((0, deserializerMiddleware_1.deserializerMiddleware)(config, deserializer), exports.deserializerMiddlewareOption);
            commandStack.add((0, serializerMiddleware_1.serializerMiddleware)(config, serializer), exports.serializerMiddlewareOption);
        },
    };
}
exports.getSerdePlugin = getSerdePlugin;


/***/ }),

/***/ 4832:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializerMiddleware = void 0;
const serializerMiddleware = (options, serializer) => (next, context) => async (args) => {
    var _a;
    const endpoint = ((_a = context.endpointV2) === null || _a === void 0 ? void 0 : _a.url) && options.urlParser
        ? async () => options.urlParser(context.endpointV2.url)
        : options.endpoint;
    if (!endpoint) {
        throw new Error("No valid endpoint provider available.");
    }
    const request = await serializer(args.input, { ...options, endpoint });
    return next({
        ...args,
        request,
    });
};
exports.serializerMiddleware = serializerMiddleware;


/***/ }),

/***/ 8787:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSigV4AuthConfig = exports.resolveAwsAuthConfig = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const signature_v4_1 = __nccwpck_require__(7865);
const util_middleware_1 = __nccwpck_require__(4614);
const CREDENTIAL_EXPIRE_WINDOW = 300000;
const resolveAwsAuthConfig = (input) => {
    const normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(input);
    const { signingEscapePath = true, systemClockOffset = input.systemClockOffset || 0, sha256 } = input;
    let signer;
    if (input.signer) {
        signer = (0, util_middleware_1.normalizeProvider)(input.signer);
    }
    else if (input.regionInfoProvider) {
        signer = () => (0, util_middleware_1.normalizeProvider)(input.region)()
            .then(async (region) => [
            (await input.regionInfoProvider(region, {
                useFipsEndpoint: await input.useFipsEndpoint(),
                useDualstackEndpoint: await input.useDualstackEndpoint(),
            })) || {},
            region,
        ])
            .then(([regionInfo, region]) => {
            const { signingRegion, signingService } = regionInfo;
            input.signingRegion = input.signingRegion || signingRegion || region;
            input.signingName = input.signingName || signingService || input.serviceId;
            const params = {
                ...input,
                credentials: normalizedCreds,
                region: input.signingRegion,
                service: input.signingName,
                sha256,
                uriEscapePath: signingEscapePath,
            };
            const SignerCtor = input.signerConstructor || signature_v4_1.SignatureV4;
            return new SignerCtor(params);
        });
    }
    else {
        signer = async (authScheme) => {
            if (!authScheme) {
                throw new Error("Unexpected empty auth scheme config");
            }
            const signingRegion = authScheme.signingScope;
            const signingService = authScheme.signingName;
            input.signingRegion = input.signingRegion || signingRegion;
            input.signingName = input.signingName || signingService || input.serviceId;
            const params = {
                ...input,
                credentials: normalizedCreds,
                region: input.signingRegion,
                service: input.signingName,
                sha256,
                uriEscapePath: signingEscapePath,
            };
            const SignerCtor = input.signerConstructor || signature_v4_1.SignatureV4;
            return new SignerCtor(params);
        };
    }
    return {
        ...input,
        systemClockOffset,
        signingEscapePath,
        credentials: normalizedCreds,
        signer,
    };
};
exports.resolveAwsAuthConfig = resolveAwsAuthConfig;
const resolveSigV4AuthConfig = (input) => {
    const normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(input);
    const { signingEscapePath = true, systemClockOffset = input.systemClockOffset || 0, sha256 } = input;
    let signer;
    if (input.signer) {
        signer = (0, util_middleware_1.normalizeProvider)(input.signer);
    }
    else {
        signer = (0, util_middleware_1.normalizeProvider)(new signature_v4_1.SignatureV4({
            credentials: normalizedCreds,
            region: input.region,
            service: input.signingName,
            sha256,
            uriEscapePath: signingEscapePath,
        }));
    }
    return {
        ...input,
        systemClockOffset,
        signingEscapePath,
        credentials: normalizedCreds,
        signer,
    };
};
exports.resolveSigV4AuthConfig = resolveSigV4AuthConfig;
const normalizeCredentialProvider = (credentials) => {
    if (typeof credentials === "function") {
        return (0, property_provider_1.memoize)(credentials, (credentials) => credentials.expiration !== undefined &&
            credentials.expiration.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW, (credentials) => credentials.expiration !== undefined);
    }
    return (0, util_middleware_1.normalizeProvider)(credentials);
};


/***/ }),

/***/ 3334:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(8787), exports);
tslib_1.__exportStar(__nccwpck_require__(2089), exports);


/***/ }),

/***/ 2089:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSigV4AuthPlugin = exports.getAwsAuthPlugin = exports.awsAuthMiddlewareOptions = exports.awsAuthMiddleware = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const getSkewCorrectedDate_1 = __nccwpck_require__(8998);
const getUpdatedSystemClockOffset_1 = __nccwpck_require__(8351);
const awsAuthMiddleware = (options) => (next, context) => async function (args) {
    var _a, _b, _c;
    if (!protocol_http_1.HttpRequest.isInstance(args.request))
        return next(args);
    const authScheme = (_c = (_b = (_a = (context.endpointV2)) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b.authSchemes) === null || _c === void 0 ? void 0 : _c[0];
    const signer = await options.signer(authScheme);
    const output = await next({
        ...args,
        request: await signer.sign(args.request, {
            signingDate: (0, getSkewCorrectedDate_1.getSkewCorrectedDate)(options.systemClockOffset),
            signingRegion: context["signing_region"],
            signingService: context["signing_service"],
        }),
    }).catch((error) => {
        var _a;
        const serverTime = (_a = error.ServerTime) !== null && _a !== void 0 ? _a : getDateHeader(error.$response);
        if (serverTime) {
            options.systemClockOffset = (0, getUpdatedSystemClockOffset_1.getUpdatedSystemClockOffset)(serverTime, options.systemClockOffset);
        }
        throw error;
    });
    const dateHeader = getDateHeader(output.response);
    if (dateHeader) {
        options.systemClockOffset = (0, getUpdatedSystemClockOffset_1.getUpdatedSystemClockOffset)(dateHeader, options.systemClockOffset);
    }
    return output;
};
exports.awsAuthMiddleware = awsAuthMiddleware;
const getDateHeader = (response) => { var _a, _b, _c; return protocol_http_1.HttpResponse.isInstance(response) ? (_b = (_a = response.headers) === null || _a === void 0 ? void 0 : _a.date) !== null && _b !== void 0 ? _b : (_c = response.headers) === null || _c === void 0 ? void 0 : _c.Date : undefined; };
exports.awsAuthMiddlewareOptions = {
    name: "awsAuthMiddleware",
    tags: ["SIGNATURE", "AWSAUTH"],
    relation: "after",
    toMiddleware: "retryMiddleware",
    override: true,
};
const getAwsAuthPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0, exports.awsAuthMiddleware)(options), exports.awsAuthMiddlewareOptions);
    },
});
exports.getAwsAuthPlugin = getAwsAuthPlugin;
exports.getSigV4AuthPlugin = exports.getAwsAuthPlugin;


/***/ }),

/***/ 8998:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSkewCorrectedDate = void 0;
const getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);
exports.getSkewCorrectedDate = getSkewCorrectedDate;


/***/ }),

/***/ 8351:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUpdatedSystemClockOffset = void 0;
const isClockSkewed_1 = __nccwpck_require__(7222);
const getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset) => {
    const clockTimeInMs = Date.parse(clockTime);
    if ((0, isClockSkewed_1.isClockSkewed)(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
    }
    return currentSystemClockOffset;
};
exports.getUpdatedSystemClockOffset = getUpdatedSystemClockOffset;


/***/ }),

/***/ 7222:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isClockSkewed = void 0;
const getSkewCorrectedDate_1 = __nccwpck_require__(8998);
const isClockSkewed = (clockTime, systemClockOffset) => Math.abs((0, getSkewCorrectedDate_1.getSkewCorrectedDate)(systemClockOffset).getTime() - clockTime) >= 300000;
exports.isClockSkewed = isClockSkewed;


/***/ }),

/***/ 5953:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.constructStack = void 0;
const constructStack = () => {
    let absoluteEntries = [];
    let relativeEntries = [];
    const entriesNameSet = new Set();
    const sort = (entries) => entries.sort((a, b) => stepWeights[b.step] - stepWeights[a.step] ||
        priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]);
    const removeByName = (toRemove) => {
        let isRemoved = false;
        const filterCb = (entry) => {
            if (entry.name && entry.name === toRemove) {
                isRemoved = true;
                entriesNameSet.delete(toRemove);
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const removeByReference = (toRemove) => {
        let isRemoved = false;
        const filterCb = (entry) => {
            if (entry.middleware === toRemove) {
                isRemoved = true;
                if (entry.name)
                    entriesNameSet.delete(entry.name);
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const cloneTo = (toStack) => {
        absoluteEntries.forEach((entry) => {
            toStack.add(entry.middleware, { ...entry });
        });
        relativeEntries.forEach((entry) => {
            toStack.addRelativeTo(entry.middleware, { ...entry });
        });
        return toStack;
    };
    const expandRelativeMiddlewareList = (from) => {
        const expandedMiddlewareList = [];
        from.before.forEach((entry) => {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry) => {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        return expandedMiddlewareList;
    };
    const getMiddlewareList = (debug = false) => {
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry) => {
            const normalizedEntry = {
                ...entry,
                before: [],
                after: [],
            };
            if (normalizedEntry.name)
                normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
            normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry) => {
            const normalizedEntry = {
                ...entry,
                before: [],
                after: [],
            };
            if (normalizedEntry.name)
                normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
            normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry) => {
            if (entry.toMiddleware) {
                const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
                if (toMiddleware === undefined) {
                    if (debug) {
                        return;
                    }
                    throw new Error(`${entry.toMiddleware} is not found when adding ${entry.name || "anonymous"} middleware ${entry.relation} ${entry.toMiddleware}`);
                }
                if (entry.relation === "after") {
                    toMiddleware.after.push(entry);
                }
                if (entry.relation === "before") {
                    toMiddleware.before.push(entry);
                }
            }
        });
        const mainChain = sort(normalizedAbsoluteEntries)
            .map(expandRelativeMiddlewareList)
            .reduce((wholeList, expendedMiddlewareList) => {
            wholeList.push(...expendedMiddlewareList);
            return wholeList;
        }, []);
        return mainChain;
    };
    const stack = {
        add: (middleware, options = {}) => {
            const { name, override } = options;
            const entry = {
                step: "initialize",
                priority: "normal",
                middleware,
                ...options,
            };
            if (name) {
                if (entriesNameSet.has(name)) {
                    if (!override)
                        throw new Error(`Duplicate middleware name '${name}'`);
                    const toOverrideIndex = absoluteEntries.findIndex((entry) => entry.name === name);
                    const toOverride = absoluteEntries[toOverrideIndex];
                    if (toOverride.step !== entry.step || toOverride.priority !== entry.priority) {
                        throw new Error(`"${name}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be ` +
                            `overridden by same-name middleware with ${entry.priority} priority in ${entry.step} step.`);
                    }
                    absoluteEntries.splice(toOverrideIndex, 1);
                }
                entriesNameSet.add(name);
            }
            absoluteEntries.push(entry);
        },
        addRelativeTo: (middleware, options) => {
            const { name, override } = options;
            const entry = {
                middleware,
                ...options,
            };
            if (name) {
                if (entriesNameSet.has(name)) {
                    if (!override)
                        throw new Error(`Duplicate middleware name '${name}'`);
                    const toOverrideIndex = relativeEntries.findIndex((entry) => entry.name === name);
                    const toOverride = relativeEntries[toOverrideIndex];
                    if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                        throw new Error(`"${name}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden ` +
                            `by same-name middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
                    }
                    relativeEntries.splice(toOverrideIndex, 1);
                }
                entriesNameSet.add(name);
            }
            relativeEntries.push(entry);
        },
        clone: () => cloneTo((0, exports.constructStack)()),
        use: (plugin) => {
            plugin.applyToStack(stack);
        },
        remove: (toRemove) => {
            if (typeof toRemove === "string")
                return removeByName(toRemove);
            else
                return removeByReference(toRemove);
        },
        removeByTag: (toRemove) => {
            let isRemoved = false;
            const filterCb = (entry) => {
                const { tags, name } = entry;
                if (tags && tags.includes(toRemove)) {
                    if (name)
                        entriesNameSet.delete(name);
                    isRemoved = true;
                    return false;
                }
                return true;
            };
            absoluteEntries = absoluteEntries.filter(filterCb);
            relativeEntries = relativeEntries.filter(filterCb);
            return isRemoved;
        },
        concat: (from) => {
            const cloned = cloneTo((0, exports.constructStack)());
            cloned.use(from);
            return cloned;
        },
        applyToStack: cloneTo,
        identify: () => {
            return getMiddlewareList(true).map((mw) => {
                return mw.name + ": " + (mw.tags || []).join(",");
            });
        },
        resolve: (handler, context) => {
            for (const middleware of getMiddlewareList()
                .map((entry) => entry.middleware)
                .reverse()) {
                handler = middleware(handler, context);
            }
            return handler;
        },
    };
    return stack;
};
exports.constructStack = constructStack;
const stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1,
};
const priorityWeights = {
    high: 3,
    normal: 2,
    low: 1,
};


/***/ }),

/***/ 8514:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5953), exports);


/***/ }),

/***/ 765:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveUserAgentConfig = void 0;
function resolveUserAgentConfig(input) {
    return {
        ...input,
        customUserAgent: typeof input.customUserAgent === "string" ? [[input.customUserAgent]] : input.customUserAgent,
    };
}
exports.resolveUserAgentConfig = resolveUserAgentConfig;


/***/ }),

/***/ 3120:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UA_ESCAPE_REGEX = exports.SPACE = exports.X_AMZ_USER_AGENT = exports.USER_AGENT = void 0;
exports.USER_AGENT = "user-agent";
exports.X_AMZ_USER_AGENT = "x-amz-user-agent";
exports.SPACE = " ";
exports.UA_ESCAPE_REGEX = /[^\!\#\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;


/***/ }),

/***/ 6855:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(765), exports);
tslib_1.__exportStar(__nccwpck_require__(6633), exports);


/***/ }),

/***/ 6633:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserAgentPlugin = exports.getUserAgentMiddlewareOptions = exports.userAgentMiddleware = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const constants_1 = __nccwpck_require__(3120);
const userAgentMiddleware = (options) => (next, context) => async (args) => {
    var _a, _b;
    const { request } = args;
    if (!protocol_http_1.HttpRequest.isInstance(request))
        return next(args);
    const { headers } = request;
    const userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    const customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
    const sdkUserAgentValue = [...defaultUserAgent, ...userAgent, ...customUserAgent].join(constants_1.SPACE);
    const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent,
    ].join(constants_1.SPACE);
    if (options.runtime !== "browser") {
        if (normalUAValue) {
            headers[constants_1.X_AMZ_USER_AGENT] = headers[constants_1.X_AMZ_USER_AGENT]
                ? `${headers[constants_1.USER_AGENT]} ${normalUAValue}`
                : normalUAValue;
        }
        headers[constants_1.USER_AGENT] = sdkUserAgentValue;
    }
    else {
        headers[constants_1.X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }
    return next({
        ...args,
        request,
    });
};
exports.userAgentMiddleware = userAgentMiddleware;
const escapeUserAgent = ([name, version]) => {
    const prefixSeparatorIndex = name.indexOf("/");
    const prefix = name.substring(0, prefixSeparatorIndex);
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter((item) => item && item.length > 0)
        .map((item) => item === null || item === void 0 ? void 0 : item.replace(constants_1.UA_ESCAPE_REGEX, "_"))
        .join("/");
};
exports.getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
const getUserAgentPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add((0, exports.userAgentMiddleware)(config), exports.getUserAgentMiddlewareOptions);
    },
});
exports.getUserAgentPlugin = getUserAgentPlugin;


/***/ }),

/***/ 6884:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadConfig = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const fromEnv_1 = __nccwpck_require__(762);
const fromSharedConfigFiles_1 = __nccwpck_require__(8978);
const fromStatic_1 = __nccwpck_require__(6377);
const loadConfig = ({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => (0, property_provider_1.memoize)((0, property_provider_1.chain)((0, fromEnv_1.fromEnv)(environmentVariableSelector), (0, fromSharedConfigFiles_1.fromSharedConfigFiles)(configFileSelector, configuration), (0, fromStatic_1.fromStatic)(defaultValue)));
exports.loadConfig = loadConfig;


/***/ }),

/***/ 762:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromEnv = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const fromEnv = (envVarSelector) => async () => {
    try {
        const config = envVarSelector(process.env);
        if (config === undefined) {
            throw new Error();
        }
        return config;
    }
    catch (e) {
        throw new property_provider_1.CredentialsProviderError(e.message || `Cannot load config from environment variables with getter: ${envVarSelector}`);
    }
};
exports.fromEnv = fromEnv;


/***/ }),

/***/ 8978:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromSharedConfigFiles = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const shared_ini_file_loader_1 = __nccwpck_require__(7425);
const fromSharedConfigFiles = (configSelector, { preferredFile = "config", ...init } = {}) => async () => {
    const profile = (0, shared_ini_file_loader_1.getProfileName)(init);
    const { configFile, credentialsFile } = await (0, shared_ini_file_loader_1.loadSharedConfigFiles)(init);
    const profileFromCredentials = credentialsFile[profile] || {};
    const profileFromConfig = configFile[profile] || {};
    const mergedProfile = preferredFile === "config"
        ? { ...profileFromCredentials, ...profileFromConfig }
        : { ...profileFromConfig, ...profileFromCredentials };
    try {
        const configValue = configSelector(mergedProfile);
        if (configValue === undefined) {
            throw new Error();
        }
        return configValue;
    }
    catch (e) {
        throw new property_provider_1.CredentialsProviderError(e.message ||
            `Cannot load config for profile ${profile} in SDK configuration files with getter: ${configSelector}`);
    }
};
exports.fromSharedConfigFiles = fromSharedConfigFiles;


/***/ }),

/***/ 6377:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromStatic = void 0;
const property_provider_1 = __nccwpck_require__(3995);
const isFunction = (func) => typeof func === "function";
const fromStatic = (defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : (0, property_provider_1.fromStatic)(defaultValue);
exports.fromStatic = fromStatic;


/***/ }),

/***/ 9125:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(6884), exports);


/***/ }),

/***/ 718:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODEJS_TIMEOUT_ERROR_CODES = void 0;
exports.NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "EPIPE", "ETIMEDOUT"];


/***/ }),

/***/ 8699:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTransformedHeaders = void 0;
const getTransformedHeaders = (headers) => {
    const transformedHeaders = {};
    for (const name of Object.keys(headers)) {
        const headerValues = headers[name];
        transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
    }
    return transformedHeaders;
};
exports.getTransformedHeaders = getTransformedHeaders;


/***/ }),

/***/ 3556:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5554), exports);
tslib_1.__exportStar(__nccwpck_require__(6997), exports);
tslib_1.__exportStar(__nccwpck_require__(2618), exports);


/***/ }),

/***/ 5554:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeHttpHandler = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const querystring_builder_1 = __nccwpck_require__(2377);
const http_1 = __nccwpck_require__(3685);
const https_1 = __nccwpck_require__(5687);
const constants_1 = __nccwpck_require__(718);
const get_transformed_headers_1 = __nccwpck_require__(8699);
const set_connection_timeout_1 = __nccwpck_require__(7122);
const set_socket_timeout_1 = __nccwpck_require__(4306);
const write_request_body_1 = __nccwpck_require__(9507);
class NodeHttpHandler {
    constructor(options) {
        this.metadata = { handlerProtocol: "http/1.1" };
        this.configProvider = new Promise((resolve, reject) => {
            if (typeof options === "function") {
                options()
                    .then((_options) => {
                    resolve(this.resolveDefaultConfig(_options));
                })
                    .catch(reject);
            }
            else {
                resolve(this.resolveDefaultConfig(options));
            }
        });
    }
    resolveDefaultConfig(options) {
        const { connectionTimeout, socketTimeout, httpAgent, httpsAgent } = options || {};
        const keepAlive = true;
        const maxSockets = 50;
        return {
            connectionTimeout,
            socketTimeout,
            httpAgent: httpAgent || new http_1.Agent({ keepAlive, maxSockets }),
            httpsAgent: httpsAgent || new https_1.Agent({ keepAlive, maxSockets }),
        };
    }
    destroy() {
        var _a, _b, _c, _d;
        (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.httpAgent) === null || _b === void 0 ? void 0 : _b.destroy();
        (_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.httpsAgent) === null || _d === void 0 ? void 0 : _d.destroy();
    }
    async handle(request, { abortSignal } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        return new Promise((resolve, reject) => {
            if (!this.config) {
                throw new Error("Node HTTP request handler config is not resolved");
            }
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const isSSL = request.protocol === "https:";
            const queryString = (0, querystring_builder_1.buildQueryString)(request.query || {});
            const nodeHttpsOptions = {
                headers: request.headers,
                host: request.hostname,
                method: request.method,
                path: queryString ? `${request.path}?${queryString}` : request.path,
                port: request.port,
                agent: isSSL ? this.config.httpsAgent : this.config.httpAgent,
            };
            const requestFunc = isSSL ? https_1.request : http_1.request;
            const req = requestFunc(nodeHttpsOptions, (res) => {
                const httpResponse = new protocol_http_1.HttpResponse({
                    statusCode: res.statusCode || -1,
                    headers: (0, get_transformed_headers_1.getTransformedHeaders)(res.headers),
                    body: res,
                });
                resolve({ response: httpResponse });
            });
            req.on("error", (err) => {
                if (constants_1.NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
                    reject(Object.assign(err, { name: "TimeoutError" }));
                }
                else {
                    reject(err);
                }
            });
            (0, set_connection_timeout_1.setConnectionTimeout)(req, reject, this.config.connectionTimeout);
            (0, set_socket_timeout_1.setSocketTimeout)(req, reject, this.config.socketTimeout);
            if (abortSignal) {
                abortSignal.onabort = () => {
                    req.abort();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            (0, write_request_body_1.writeRequestBody)(req, request);
        });
    }
}
exports.NodeHttpHandler = NodeHttpHandler;


/***/ }),

/***/ 6997:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeHttp2Handler = void 0;
const protocol_http_1 = __nccwpck_require__(2455);
const querystring_builder_1 = __nccwpck_require__(2377);
const http2_1 = __nccwpck_require__(5158);
const get_transformed_headers_1 = __nccwpck_require__(8699);
const write_request_body_1 = __nccwpck_require__(9507);
class NodeHttp2Handler {
    constructor(options) {
        this.metadata = { handlerProtocol: "h2" };
        this.configProvider = new Promise((resolve, reject) => {
            if (typeof options === "function") {
                options()
                    .then((opts) => {
                    resolve(opts || {});
                })
                    .catch(reject);
            }
            else {
                resolve(options || {});
            }
        });
        this.sessionCache = new Map();
    }
    destroy() {
        for (const sessions of this.sessionCache.values()) {
            sessions.forEach((session) => this.destroySession(session));
        }
        this.sessionCache.clear();
    }
    async handle(request, { abortSignal } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        const { requestTimeout, disableConcurrentStreams } = this.config;
        return new Promise((resolve, rejectOriginal) => {
            let fulfilled = false;
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                fulfilled = true;
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                rejectOriginal(abortError);
                return;
            }
            const { hostname, method, port, protocol, path, query } = request;
            const authority = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
            const session = this.getSession(authority, disableConcurrentStreams || false);
            const reject = (err) => {
                if (disableConcurrentStreams) {
                    this.destroySession(session);
                }
                fulfilled = true;
                rejectOriginal(err);
            };
            const queryString = (0, querystring_builder_1.buildQueryString)(query || {});
            const req = session.request({
                ...request.headers,
                [http2_1.constants.HTTP2_HEADER_PATH]: queryString ? `${path}?${queryString}` : path,
                [http2_1.constants.HTTP2_HEADER_METHOD]: method,
            });
            session.ref();
            req.on("response", (headers) => {
                const httpResponse = new protocol_http_1.HttpResponse({
                    statusCode: headers[":status"] || -1,
                    headers: (0, get_transformed_headers_1.getTransformedHeaders)(headers),
                    body: req,
                });
                fulfilled = true;
                resolve({ response: httpResponse });
                if (disableConcurrentStreams) {
                    session.close();
                    this.deleteSessionFromCache(authority, session);
                }
            });
            if (requestTimeout) {
                req.setTimeout(requestTimeout, () => {
                    req.close();
                    const timeoutError = new Error(`Stream timed out because of no activity for ${requestTimeout} ms`);
                    timeoutError.name = "TimeoutError";
                    reject(timeoutError);
                });
            }
            if (abortSignal) {
                abortSignal.onabort = () => {
                    req.close();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            req.on("frameError", (type, code, id) => {
                reject(new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
            });
            req.on("error", reject);
            req.on("aborted", () => {
                reject(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${req.rstCode}.`));
            });
            req.on("close", () => {
                session.unref();
                if (disableConcurrentStreams) {
                    session.destroy();
                }
                if (!fulfilled) {
                    reject(new Error("Unexpected error: http2 request did not get a response"));
                }
            });
            (0, write_request_body_1.writeRequestBody)(req, request);
        });
    }
    getSession(authority, disableConcurrentStreams) {
        var _a;
        const sessionCache = this.sessionCache;
        const existingSessions = sessionCache.get(authority) || [];
        if (existingSessions.length > 0 && !disableConcurrentStreams)
            return existingSessions[0];
        const newSession = (0, http2_1.connect)(authority);
        newSession.unref();
        const destroySessionCb = () => {
            this.destroySession(newSession);
            this.deleteSessionFromCache(authority, newSession);
        };
        newSession.on("goaway", destroySessionCb);
        newSession.on("error", destroySessionCb);
        newSession.on("frameError", destroySessionCb);
        newSession.on("close", () => this.deleteSessionFromCache(authority, newSession));
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.sessionTimeout) {
            newSession.setTimeout(this.config.sessionTimeout, destroySessionCb);
        }
        existingSessions.push(newSession);
        sessionCache.set(authority, existingSessions);
        return newSession;
    }
    destroySession(session) {
        if (!session.destroyed) {
            session.destroy();
        }
    }
    deleteSessionFromCache(authority, session) {
        const existingSessions = this.sessionCache.get(authority) || [];
        if (!existingSessions.includes(session)) {
            return;
        }
        this.sessionCache.set(authority, existingSessions.filter((s) => s !== session));
    }
}
exports.NodeHttp2Handler = NodeHttp2Handler;


/***/ }),

/***/ 7122:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setConnectionTimeout = void 0;
const setConnectionTimeout = (request, reject, timeoutInMs = 0) => {
    if (!timeoutInMs) {
        return;
    }
    request.on("socket", (socket) => {
        if (socket.connecting) {
            const timeoutId = setTimeout(() => {
                request.destroy();
                reject(Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
                    name: "TimeoutError",
                }));
            }, timeoutInMs);
            socket.on("connect", () => {
                clearTimeout(timeoutId);
            });
        }
    });
};
exports.setConnectionTimeout = setConnectionTimeout;


/***/ }),

/***/ 4306:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setSocketTimeout = void 0;
const setSocketTimeout = (request, reject, timeoutInMs = 0) => {
    request.setTimeout(timeoutInMs, () => {
        request.destroy();
        reject(Object.assign(new Error(`Connection timed out after ${timeoutInMs} ms`), { name: "TimeoutError" }));
    });
};
exports.setSocketTimeout = setSocketTimeout;


/***/ }),

/***/ 9629:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collector = void 0;
const stream_1 = __nccwpck_require__(2781);
class Collector extends stream_1.Writable {
    constructor() {
        super(...arguments);
        this.bufferedBytes = [];
    }
    _write(chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    }
}
exports.Collector = Collector;


/***/ }),

/***/ 2618:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.streamCollector = void 0;
const collector_1 = __nccwpck_require__(9629);
const streamCollector = (stream) => new Promise((resolve, reject) => {
    const collector = new collector_1.Collector();
    stream.pipe(collector);
    stream.on("error", (err) => {
        collector.end();
        reject(err);
    });
    collector.on("error", reject);
    collector.on("finish", function () {
        const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
        resolve(bytes);
    });
});
exports.streamCollector = streamCollector;


/***/ }),

/***/ 9507:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.writeRequestBody = void 0;
const stream_1 = __nccwpck_require__(2781);
function writeRequestBody(httpRequest, request) {
    const expect = request.headers["Expect"] || request.headers["expect"];
    if (expect === "100-continue") {
        httpRequest.on("continue", () => {
            writeBody(httpRequest, request.body);
        });
    }
    else {
        writeBody(httpRequest, request.body);
    }
}
exports.writeRequestBody = writeRequestBody;
function writeBody(httpRequest, body) {
    if (body instanceof stream_1.Readable) {
        body.pipe(httpRequest);
    }
    else if (body) {
        httpRequest.end(Buffer.from(body));
    }
    else {
        httpRequest.end();
    }
}


/***/ }),

/***/ 7566:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CredentialsProviderError = void 0;
const ProviderError_1 = __nccwpck_require__(5293);
class CredentialsProviderError extends ProviderError_1.ProviderError {
    constructor(message, tryNextLink = true) {
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "CredentialsProviderError";
        Object.setPrototypeOf(this, CredentialsProviderError.prototype);
    }
}
exports.CredentialsProviderError = CredentialsProviderError;


/***/ }),

/***/ 5293:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderError = void 0;
class ProviderError extends Error {
    constructor(message, tryNextLink = true) {
        super(message);
        this.tryNextLink = tryNextLink;
        this.name = "ProviderError";
        Object.setPrototypeOf(this, ProviderError.prototype);
    }
    static from(error, tryNextLink = true) {
        return Object.assign(new this(error.message, tryNextLink), error);
    }
}
exports.ProviderError = ProviderError;


/***/ }),

/***/ 7874:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenProviderError = void 0;
const ProviderError_1 = __nccwpck_require__(5293);
class TokenProviderError extends ProviderError_1.ProviderError {
    constructor(message, tryNextLink = true) {
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "TokenProviderError";
        Object.setPrototypeOf(this, TokenProviderError.prototype);
    }
}
exports.TokenProviderError = TokenProviderError;


/***/ }),

/***/ 2764:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.chain = void 0;
const ProviderError_1 = __nccwpck_require__(5293);
function chain(...providers) {
    return () => {
        let promise = Promise.reject(new ProviderError_1.ProviderError("No providers in chain"));
        for (const provider of providers) {
            promise = promise.catch((err) => {
                if (err === null || err === void 0 ? void 0 : err.tryNextLink) {
                    return provider();
                }
                throw err;
            });
        }
        return promise;
    };
}
exports.chain = chain;


/***/ }),

/***/ 6877:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromStatic = void 0;
const fromStatic = (staticValue) => () => Promise.resolve(staticValue);
exports.fromStatic = fromStatic;


/***/ }),

/***/ 3995:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7566), exports);
tslib_1.__exportStar(__nccwpck_require__(5293), exports);
tslib_1.__exportStar(__nccwpck_require__(7874), exports);
tslib_1.__exportStar(__nccwpck_require__(2764), exports);
tslib_1.__exportStar(__nccwpck_require__(6877), exports);
tslib_1.__exportStar(__nccwpck_require__(7961), exports);


/***/ }),

/***/ 7961:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.memoize = void 0;
const memoize = (provider, isExpired, requiresRefresh) => {
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async () => {
        if (!pending) {
            pending = provider();
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        }
        finally {
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options) => {
            if (!hasResult || (options === null || options === void 0 ? void 0 : options.forceRefresh)) {
                resolved = await coalesceProvider();
            }
            return resolved;
        };
    }
    return async (options) => {
        if (!hasResult || (options === null || options === void 0 ? void 0 : options.forceRefresh)) {
            resolved = await coalesceProvider();
        }
        if (isConstant) {
            return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider();
            return resolved;
        }
        return resolved;
    };
};
exports.memoize = memoize;


/***/ }),

/***/ 65:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 3929:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpRequest = void 0;
class HttpRequest {
    constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol
            ? options.protocol.slice(-1) !== ":"
                ? `${options.protocol}:`
                : options.protocol
            : "https:";
        this.path = options.path ? (options.path.charAt(0) !== "/" ? `/${options.path}` : options.path) : "/";
    }
    static isInstance(request) {
        if (!request)
            return false;
        const req = request;
        return ("method" in req &&
            "protocol" in req &&
            "hostname" in req &&
            "path" in req &&
            typeof req["query"] === "object" &&
            typeof req["headers"] === "object");
    }
    clone() {
        const cloned = new HttpRequest({
            ...this,
            headers: { ...this.headers },
        });
        if (cloned.query)
            cloned.query = cloneQuery(cloned.query);
        return cloned;
    }
}
exports.HttpRequest = HttpRequest;
function cloneQuery(query) {
    return Object.keys(query).reduce((carry, paramName) => {
        const param = query[paramName];
        return {
            ...carry,
            [paramName]: Array.isArray(param) ? [...param] : param,
        };
    }, {});
}


/***/ }),

/***/ 4302:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpResponse = void 0;
class HttpResponse {
    constructor(options) {
        this.statusCode = options.statusCode;
        this.headers = options.headers || {};
        this.body = options.body;
    }
    static isInstance(response) {
        if (!response)
            return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
    }
}
exports.HttpResponse = HttpResponse;


/***/ }),

/***/ 2455:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(65), exports);
tslib_1.__exportStar(__nccwpck_require__(3929), exports);
tslib_1.__exportStar(__nccwpck_require__(4302), exports);
tslib_1.__exportStar(__nccwpck_require__(5671), exports);


/***/ }),

/***/ 5671:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidHostname = void 0;
function isValidHostname(hostname) {
    const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
    return hostPattern.test(hostname);
}
exports.isValidHostname = isValidHostname;


/***/ }),

/***/ 2377:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildQueryString = void 0;
const util_uri_escape_1 = __nccwpck_require__(3588);
function buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()) {
        const value = query[key];
        key = (0, util_uri_escape_1.escapeUri)(key);
        if (Array.isArray(value)) {
            for (let i = 0, iLen = value.length; i < iLen; i++) {
                parts.push(`${key}=${(0, util_uri_escape_1.escapeUri)(value[i])}`);
            }
        }
        else {
            let qsEntry = key;
            if (value || typeof value === "string") {
                qsEntry += `=${(0, util_uri_escape_1.escapeUri)(value)}`;
            }
            parts.push(qsEntry);
        }
    }
    return parts.join("&");
}
exports.buildQueryString = buildQueryString;


/***/ }),

/***/ 2298:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseQueryString = void 0;
function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        for (const pair of querystring.split("&")) {
            let [key, value = null] = pair.split("=");
            key = decodeURIComponent(key);
            if (value) {
                value = decodeURIComponent(value);
            }
            if (!(key in query)) {
                query[key] = value;
            }
            else if (Array.isArray(query[key])) {
                query[key].push(value);
            }
            else {
                query[key] = [query[key], value];
            }
        }
    }
    return query;
}
exports.parseQueryString = parseQueryString;


/***/ }),

/***/ 7125:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSIENT_ERROR_STATUS_CODES = exports.TRANSIENT_ERROR_CODES = exports.THROTTLING_ERROR_CODES = exports.CLOCK_SKEW_ERROR_CODES = void 0;
exports.CLOCK_SKEW_ERROR_CODES = [
    "AuthFailure",
    "InvalidSignatureException",
    "RequestExpired",
    "RequestInTheFuture",
    "RequestTimeTooSkewed",
    "SignatureDoesNotMatch",
];
exports.THROTTLING_ERROR_CODES = [
    "BandwidthLimitExceeded",
    "EC2ThrottledException",
    "LimitExceededException",
    "PriorRequestNotComplete",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "RequestThrottled",
    "RequestThrottledException",
    "SlowDown",
    "ThrottledException",
    "Throttling",
    "ThrottlingException",
    "TooManyRequestsException",
    "TransactionInProgressException",
];
exports.TRANSIENT_ERROR_CODES = ["AbortError", "TimeoutError", "RequestTimeout", "RequestTimeoutException"];
exports.TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];


/***/ }),

/***/ 9588:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTransientError = exports.isThrottlingError = exports.isClockSkewError = exports.isRetryableByTrait = void 0;
const constants_1 = __nccwpck_require__(7125);
const isRetryableByTrait = (error) => error.$retryable !== undefined;
exports.isRetryableByTrait = isRetryableByTrait;
const isClockSkewError = (error) => constants_1.CLOCK_SKEW_ERROR_CODES.includes(error.name);
exports.isClockSkewError = isClockSkewError;
const isThrottlingError = (error) => {
    var _a, _b;
    return ((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) === 429 ||
        constants_1.THROTTLING_ERROR_CODES.includes(error.name) ||
        ((_b = error.$retryable) === null || _b === void 0 ? void 0 : _b.throttling) == true;
};
exports.isThrottlingError = isThrottlingError;
const isTransientError = (error) => {
    var _a;
    return constants_1.TRANSIENT_ERROR_CODES.includes(error.name) ||
        constants_1.TRANSIENT_ERROR_STATUS_CODES.includes(((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) || 0);
};
exports.isTransientError = isTransientError;


/***/ }),

/***/ 9107:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfigFilepath = exports.ENV_CONFIG_PATH = void 0;
const path_1 = __nccwpck_require__(1017);
const getHomeDir_1 = __nccwpck_require__(7745);
exports.ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
const getConfigFilepath = () => process.env[exports.ENV_CONFIG_PATH] || (0, path_1.join)((0, getHomeDir_1.getHomeDir)(), ".aws", "config");
exports.getConfigFilepath = getConfigFilepath;


/***/ }),

/***/ 5977:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCredentialsFilepath = exports.ENV_CREDENTIALS_PATH = void 0;
const path_1 = __nccwpck_require__(1017);
const getHomeDir_1 = __nccwpck_require__(7745);
exports.ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
const getCredentialsFilepath = () => process.env[exports.ENV_CREDENTIALS_PATH] || (0, path_1.join)((0, getHomeDir_1.getHomeDir)(), ".aws", "credentials");
exports.getCredentialsFilepath = getCredentialsFilepath;


/***/ }),

/***/ 7745:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHomeDir = void 0;
const os_1 = __nccwpck_require__(2037);
const path_1 = __nccwpck_require__(1017);
const getHomeDir = () => {
    const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${path_1.sep}` } = process.env;
    if (HOME)
        return HOME;
    if (USERPROFILE)
        return USERPROFILE;
    if (HOMEPATH)
        return `${HOMEDRIVE}${HOMEPATH}`;
    return (0, os_1.homedir)();
};
exports.getHomeDir = getHomeDir;


/***/ }),

/***/ 7026:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProfileData = void 0;
const profileKeyRegex = /^profile\s(["'])?([^\1]+)\1$/;
const getProfileData = (data) => Object.entries(data)
    .filter(([key]) => profileKeyRegex.test(key))
    .reduce((acc, [key, value]) => ({ ...acc, [profileKeyRegex.exec(key)[2]]: value }), {
    ...(data.default && { default: data.default }),
});
exports.getProfileData = getProfileData;


/***/ }),

/***/ 4115:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProfileName = exports.DEFAULT_PROFILE = exports.ENV_PROFILE = void 0;
exports.ENV_PROFILE = "AWS_PROFILE";
exports.DEFAULT_PROFILE = "default";
const getProfileName = (init) => init.profile || process.env[exports.ENV_PROFILE] || exports.DEFAULT_PROFILE;
exports.getProfileName = getProfileName;


/***/ }),

/***/ 7030:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSSOTokenFilepath = void 0;
const crypto_1 = __nccwpck_require__(6113);
const path_1 = __nccwpck_require__(1017);
const getHomeDir_1 = __nccwpck_require__(7745);
const getSSOTokenFilepath = (ssoStartUrl) => {
    const hasher = (0, crypto_1.createHash)("sha1");
    const cacheName = hasher.update(ssoStartUrl).digest("hex");
    return (0, path_1.join)((0, getHomeDir_1.getHomeDir)(), ".aws", "sso", "cache", `${cacheName}.json`);
};
exports.getSSOTokenFilepath = getSSOTokenFilepath;


/***/ }),

/***/ 4395:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSSOTokenFromFile = void 0;
const fs_1 = __nccwpck_require__(7147);
const getSSOTokenFilepath_1 = __nccwpck_require__(7030);
const { readFile } = fs_1.promises;
const getSSOTokenFromFile = async (ssoStartUrl) => {
    const ssoTokenFilepath = (0, getSSOTokenFilepath_1.getSSOTokenFilepath)(ssoStartUrl);
    const ssoTokenText = await readFile(ssoTokenFilepath, "utf8");
    return JSON.parse(ssoTokenText);
};
exports.getSSOTokenFromFile = getSSOTokenFromFile;


/***/ }),

/***/ 2057:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSsoSessionData = void 0;
const ssoSessionKeyRegex = /^sso-session\s(["'])?([^\1]+)\1$/;
const getSsoSessionData = (data) => Object.entries(data)
    .filter(([key]) => ssoSessionKeyRegex.test(key))
    .reduce((acc, [key, value]) => ({ ...acc, [ssoSessionKeyRegex.exec(key)[2]]: value }), {});
exports.getSsoSessionData = getSsoSessionData;


/***/ }),

/***/ 7425:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7745), exports);
tslib_1.__exportStar(__nccwpck_require__(4115), exports);
tslib_1.__exportStar(__nccwpck_require__(7030), exports);
tslib_1.__exportStar(__nccwpck_require__(4395), exports);
tslib_1.__exportStar(__nccwpck_require__(3863), exports);
tslib_1.__exportStar(__nccwpck_require__(8657), exports);
tslib_1.__exportStar(__nccwpck_require__(6316), exports);
tslib_1.__exportStar(__nccwpck_require__(7736), exports);


/***/ }),

/***/ 3863:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadSharedConfigFiles = void 0;
const getConfigFilepath_1 = __nccwpck_require__(9107);
const getCredentialsFilepath_1 = __nccwpck_require__(5977);
const getProfileData_1 = __nccwpck_require__(7026);
const parseIni_1 = __nccwpck_require__(2632);
const slurpFile_1 = __nccwpck_require__(2354);
const swallowError = () => ({});
const loadSharedConfigFiles = async (init = {}) => {
    const { filepath = (0, getCredentialsFilepath_1.getCredentialsFilepath)(), configFilepath = (0, getConfigFilepath_1.getConfigFilepath)() } = init;
    const parsedFiles = await Promise.all([
        (0, slurpFile_1.slurpFile)(configFilepath).then(parseIni_1.parseIni).then(getProfileData_1.getProfileData).catch(swallowError),
        (0, slurpFile_1.slurpFile)(filepath).then(parseIni_1.parseIni).catch(swallowError),
    ]);
    return {
        configFile: parsedFiles[0],
        credentialsFile: parsedFiles[1],
    };
};
exports.loadSharedConfigFiles = loadSharedConfigFiles;


/***/ }),

/***/ 8657:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadSsoSessionData = void 0;
const getConfigFilepath_1 = __nccwpck_require__(9107);
const getSsoSessionData_1 = __nccwpck_require__(2057);
const parseIni_1 = __nccwpck_require__(2632);
const slurpFile_1 = __nccwpck_require__(2354);
const swallowError = () => ({});
const loadSsoSessionData = async (init = {}) => {
    var _a;
    return (0, slurpFile_1.slurpFile)((_a = init.configFilepath) !== null && _a !== void 0 ? _a : (0, getConfigFilepath_1.getConfigFilepath)())
        .then(parseIni_1.parseIni)
        .then(getSsoSessionData_1.getSsoSessionData)
        .catch(swallowError);
};
exports.loadSsoSessionData = loadSsoSessionData;


/***/ }),

/***/ 2632:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseIni = void 0;
const profileNameBlockList = ["__proto__", "profile __proto__"];
const parseIni = (iniData) => {
    const map = {};
    let currentSection;
    for (let line of iniData.split(/\r?\n/)) {
        line = line.split(/(^|\s)[;#]/)[0].trim();
        const isSection = line[0] === "[" && line[line.length - 1] === "]";
        if (isSection) {
            currentSection = line.substring(1, line.length - 1);
            if (profileNameBlockList.includes(currentSection)) {
                throw new Error(`Found invalid profile name "${currentSection}"`);
            }
        }
        else if (currentSection) {
            const indexOfEqualsSign = line.indexOf("=");
            const start = 0;
            const end = line.length - 1;
            const isAssignment = indexOfEqualsSign !== -1 && indexOfEqualsSign !== start && indexOfEqualsSign !== end;
            if (isAssignment) {
                const [name, value] = [
                    line.substring(0, indexOfEqualsSign).trim(),
                    line.substring(indexOfEqualsSign + 1).trim(),
                ];
                map[currentSection] = map[currentSection] || {};
                map[currentSection][name] = value;
            }
        }
    }
    return map;
};
exports.parseIni = parseIni;


/***/ }),

/***/ 6316:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseKnownFiles = void 0;
const loadSharedConfigFiles_1 = __nccwpck_require__(3863);
const parseKnownFiles = async (init) => {
    const parsedFiles = await (0, loadSharedConfigFiles_1.loadSharedConfigFiles)(init);
    return {
        ...parsedFiles.configFile,
        ...parsedFiles.credentialsFile,
    };
};
exports.parseKnownFiles = parseKnownFiles;


/***/ }),

/***/ 2354:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.slurpFile = void 0;
const fs_1 = __nccwpck_require__(7147);
const { readFile } = fs_1.promises;
const filePromisesHash = {};
const slurpFile = (path) => {
    if (!filePromisesHash[path]) {
        filePromisesHash[path] = readFile(path, "utf8");
    }
    return filePromisesHash[path];
};
exports.slurpFile = slurpFile;


/***/ }),

/***/ 7736:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 7982:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignatureV4 = void 0;
const util_hex_encoding_1 = __nccwpck_require__(6382);
const util_middleware_1 = __nccwpck_require__(4614);
const constants_1 = __nccwpck_require__(2277);
const credentialDerivation_1 = __nccwpck_require__(870);
const getCanonicalHeaders_1 = __nccwpck_require__(3791);
const getCanonicalQuery_1 = __nccwpck_require__(3857);
const getPayloadHash_1 = __nccwpck_require__(1588);
const headerUtil_1 = __nccwpck_require__(6892);
const moveHeadersToQuery_1 = __nccwpck_require__(9469);
const prepareRequest_1 = __nccwpck_require__(3244);
const utilDate_1 = __nccwpck_require__(9376);
class SignatureV4 {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true, }) {
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0, util_middleware_1.normalizeProvider)(region);
        this.credentialProvider = (0, util_middleware_1.normalizeProvider)(credentials);
    }
    async presign(originalRequest, options = {}) {
        const { signingDate = new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, signingRegion, signingService, } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion !== null && signingRegion !== void 0 ? signingRegion : (await this.regionProvider());
        const { longDate, shortDate } = formatDate(signingDate);
        if (expiresIn > constants_1.MAX_PRESIGNED_TTL) {
            return Promise.reject("Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future");
        }
        const scope = (0, credentialDerivation_1.createScope)(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
        const request = (0, moveHeadersToQuery_1.moveHeadersToQuery)((0, prepareRequest_1.prepareRequest)(originalRequest), { unhoistableHeaders });
        if (credentials.sessionToken) {
            request.query[constants_1.TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[constants_1.ALGORITHM_QUERY_PARAM] = constants_1.ALGORITHM_IDENTIFIER;
        request.query[constants_1.CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[constants_1.AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[constants_1.EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = (0, getCanonicalHeaders_1.getCanonicalHeaders)(request, unsignableHeaders, signableHeaders);
        request.query[constants_1.SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
        request.query[constants_1.SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await (0, getPayloadHash_1.getPayloadHash)(originalRequest, this.sha256)));
        return request;
    }
    async sign(toSign, options) {
        if (typeof toSign === "string") {
            return this.signString(toSign, options);
        }
        else if (toSign.headers && toSign.payload) {
            return this.signEvent(toSign, options);
        }
        else {
            return this.signRequest(toSign, options);
        }
    }
    async signEvent({ headers, payload }, { signingDate = new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion !== null && signingRegion !== void 0 ? signingRegion : (await this.regionProvider());
        const { shortDate, longDate } = formatDate(signingDate);
        const scope = (0, credentialDerivation_1.createScope)(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
        const hashedPayload = await (0, getPayloadHash_1.getPayloadHash)({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0, util_hex_encoding_1.toHex)(await hash.digest());
        const stringToSign = [
            constants_1.EVENT_ALGORITHM_IDENTIFIER,
            longDate,
            scope,
            priorSignature,
            hashedHeaders,
            hashedPayload,
        ].join("\n");
        return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
    }
    async signString(stringToSign, { signingDate = new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion !== null && signingRegion !== void 0 ? signingRegion : (await this.regionProvider());
        const { shortDate } = formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update(stringToSign);
        return (0, util_hex_encoding_1.toHex)(await hash.digest());
    }
    async signRequest(requestToSign, { signingDate = new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService, } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion !== null && signingRegion !== void 0 ? signingRegion : (await this.regionProvider());
        const request = (0, prepareRequest_1.prepareRequest)(requestToSign);
        const { longDate, shortDate } = formatDate(signingDate);
        const scope = (0, credentialDerivation_1.createScope)(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
        request.headers[constants_1.AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
            request.headers[constants_1.TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await (0, getPayloadHash_1.getPayloadHash)(request, this.sha256);
        if (!(0, headerUtil_1.hasHeader)(constants_1.SHA256_HEADER, request.headers) && this.applyChecksum) {
            request.headers[constants_1.SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = (0, getCanonicalHeaders_1.getCanonicalHeaders)(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[constants_1.AUTH_HEADER] =
            `${constants_1.ALGORITHM_IDENTIFIER} ` +
                `Credential=${credentials.accessKeyId}/${scope}, ` +
                `SignedHeaders=${getCanonicalHeaderList(canonicalHeaders)}, ` +
                `Signature=${signature}`;
        return request;
    }
    createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${(0, getCanonicalQuery_1.getCanonicalQuery)(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
    }
    async createStringToSign(longDate, credentialScope, canonicalRequest) {
        const hash = new this.sha256();
        hash.update(canonicalRequest);
        const hashedRequest = await hash.digest();
        return `${constants_1.ALGORITHM_IDENTIFIER}
${longDate}
${credentialScope}
${(0, util_hex_encoding_1.toHex)(hashedRequest)}`;
    }
    getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
            const normalizedPathSegments = [];
            for (const pathSegment of path.split("/")) {
                if ((pathSegment === null || pathSegment === void 0 ? void 0 : pathSegment.length) === 0)
                    continue;
                if (pathSegment === ".")
                    continue;
                if (pathSegment === "..") {
                    normalizedPathSegments.pop();
                }
                else {
                    normalizedPathSegments.push(pathSegment);
                }
            }
            const normalizedPath = `${(path === null || path === void 0 ? void 0 : path.startsWith("/")) ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && (path === null || path === void 0 ? void 0 : path.endsWith("/")) ? "/" : ""}`;
            const doubleEncoded = encodeURIComponent(normalizedPath);
            return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    }
    async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest);
        const hash = new this.sha256(await keyPromise);
        hash.update(stringToSign);
        return (0, util_hex_encoding_1.toHex)(await hash.digest());
    }
    getSigningKey(credentials, region, shortDate, service) {
        return (0, credentialDerivation_1.getSigningKey)(this.sha256, credentials, shortDate, region, service || this.service);
    }
    validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" ||
            typeof credentials.accessKeyId !== "string" ||
            typeof credentials.secretAccessKey !== "string") {
            throw new Error("Resolved credential object is not valid");
        }
    }
}
exports.SignatureV4 = SignatureV4;
const formatDate = (now) => {
    const longDate = (0, utilDate_1.iso8601)(now).replace(/[\-:]/g, "");
    return {
        longDate,
        shortDate: longDate.slice(0, 8),
    };
};
const getCanonicalHeaderList = (headers) => Object.keys(headers).sort().join(";");


/***/ }),

/***/ 833:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloneQuery = exports.cloneRequest = void 0;
const cloneRequest = ({ headers, query, ...rest }) => ({
    ...rest,
    headers: { ...headers },
    query: query ? (0, exports.cloneQuery)(query) : undefined,
});
exports.cloneRequest = cloneRequest;
const cloneQuery = (query) => Object.keys(query).reduce((carry, paramName) => {
    const param = query[paramName];
    return {
        ...carry,
        [paramName]: Array.isArray(param) ? [...param] : param,
    };
}, {});
exports.cloneQuery = cloneQuery;


/***/ }),

/***/ 2277:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAX_PRESIGNED_TTL = exports.KEY_TYPE_IDENTIFIER = exports.MAX_CACHE_SIZE = exports.UNSIGNED_PAYLOAD = exports.EVENT_ALGORITHM_IDENTIFIER = exports.ALGORITHM_IDENTIFIER_V4A = exports.ALGORITHM_IDENTIFIER = exports.UNSIGNABLE_PATTERNS = exports.SEC_HEADER_PATTERN = exports.PROXY_HEADER_PATTERN = exports.ALWAYS_UNSIGNABLE_HEADERS = exports.HOST_HEADER = exports.TOKEN_HEADER = exports.SHA256_HEADER = exports.SIGNATURE_HEADER = exports.GENERATED_HEADERS = exports.DATE_HEADER = exports.AMZ_DATE_HEADER = exports.AUTH_HEADER = exports.REGION_SET_PARAM = exports.TOKEN_QUERY_PARAM = exports.SIGNATURE_QUERY_PARAM = exports.EXPIRES_QUERY_PARAM = exports.SIGNED_HEADERS_QUERY_PARAM = exports.AMZ_DATE_QUERY_PARAM = exports.CREDENTIAL_QUERY_PARAM = exports.ALGORITHM_QUERY_PARAM = void 0;
exports.ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
exports.CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
exports.AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
exports.SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
exports.EXPIRES_QUERY_PARAM = "X-Amz-Expires";
exports.SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
exports.TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
exports.REGION_SET_PARAM = "X-Amz-Region-Set";
exports.AUTH_HEADER = "authorization";
exports.AMZ_DATE_HEADER = exports.AMZ_DATE_QUERY_PARAM.toLowerCase();
exports.DATE_HEADER = "date";
exports.GENERATED_HEADERS = [exports.AUTH_HEADER, exports.AMZ_DATE_HEADER, exports.DATE_HEADER];
exports.SIGNATURE_HEADER = exports.SIGNATURE_QUERY_PARAM.toLowerCase();
exports.SHA256_HEADER = "x-amz-content-sha256";
exports.TOKEN_HEADER = exports.TOKEN_QUERY_PARAM.toLowerCase();
exports.HOST_HEADER = "host";
exports.ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true,
};
exports.PROXY_HEADER_PATTERN = /^proxy-/;
exports.SEC_HEADER_PATTERN = /^sec-/;
exports.UNSIGNABLE_PATTERNS = [/^proxy-/i, /^sec-/i];
exports.ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
exports.ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
exports.EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
exports.UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
exports.MAX_CACHE_SIZE = 50;
exports.KEY_TYPE_IDENTIFIER = "aws4_request";
exports.MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;


/***/ }),

/***/ 870:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearCredentialCache = exports.getSigningKey = exports.createScope = void 0;
const util_hex_encoding_1 = __nccwpck_require__(6382);
const constants_1 = __nccwpck_require__(2277);
const signingKeyCache = {};
const cacheQueue = [];
const createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${constants_1.KEY_TYPE_IDENTIFIER}`;
exports.createScope = createScope;
const getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
    const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
    const cacheKey = `${shortDate}:${region}:${service}:${(0, util_hex_encoding_1.toHex)(credsHash)}:${credentials.sessionToken}`;
    if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
    }
    cacheQueue.push(cacheKey);
    while (cacheQueue.length > constants_1.MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
    }
    let key = `AWS4${credentials.secretAccessKey}`;
    for (const signable of [shortDate, region, service, constants_1.KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
    }
    return (signingKeyCache[cacheKey] = key);
};
exports.getSigningKey = getSigningKey;
const clearCredentialCache = () => {
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach((cacheKey) => {
        delete signingKeyCache[cacheKey];
    });
};
exports.clearCredentialCache = clearCredentialCache;
const hmac = (ctor, secret, data) => {
    const hash = new ctor(secret);
    hash.update(data);
    return hash.digest();
};


/***/ }),

/***/ 3791:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCanonicalHeaders = void 0;
const constants_1 = __nccwpck_require__(2277);
const getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
    const canonical = {};
    for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == undefined) {
            continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in constants_1.ALWAYS_UNSIGNABLE_HEADERS ||
            (unsignableHeaders === null || unsignableHeaders === void 0 ? void 0 : unsignableHeaders.has(canonicalHeaderName)) ||
            constants_1.PROXY_HEADER_PATTERN.test(canonicalHeaderName) ||
            constants_1.SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
            if (!signableHeaders || (signableHeaders && !signableHeaders.has(canonicalHeaderName))) {
                continue;
            }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
    return canonical;
};
exports.getCanonicalHeaders = getCanonicalHeaders;


/***/ }),

/***/ 3857:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCanonicalQuery = void 0;
const util_uri_escape_1 = __nccwpck_require__(3588);
const constants_1 = __nccwpck_require__(2277);
const getCanonicalQuery = ({ query = {} }) => {
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query).sort()) {
        if (key.toLowerCase() === constants_1.SIGNATURE_HEADER) {
            continue;
        }
        keys.push(key);
        const value = query[key];
        if (typeof value === "string") {
            serialized[key] = `${(0, util_uri_escape_1.escapeUri)(key)}=${(0, util_uri_escape_1.escapeUri)(value)}`;
        }
        else if (Array.isArray(value)) {
            serialized[key] = value
                .slice(0)
                .sort()
                .reduce((encoded, value) => encoded.concat([`${(0, util_uri_escape_1.escapeUri)(key)}=${(0, util_uri_escape_1.escapeUri)(value)}`]), [])
                .join("&");
        }
    }
    return keys
        .map((key) => serialized[key])
        .filter((serialized) => serialized)
        .join("&");
};
exports.getCanonicalQuery = getCanonicalQuery;


/***/ }),

/***/ 1588:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPayloadHash = void 0;
const is_array_buffer_1 = __nccwpck_require__(4843);
const util_hex_encoding_1 = __nccwpck_require__(6382);
const constants_1 = __nccwpck_require__(2277);
const getPayloadHash = async ({ headers, body }, hashConstructor) => {
    for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === constants_1.SHA256_HEADER) {
            return headers[headerName];
        }
    }
    if (body == undefined) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    }
    else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, is_array_buffer_1.isArrayBuffer)(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update(body);
        return (0, util_hex_encoding_1.toHex)(await hashCtor.digest());
    }
    return constants_1.UNSIGNED_PAYLOAD;
};
exports.getPayloadHash = getPayloadHash;


/***/ }),

/***/ 6892:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteHeader = exports.getHeaderValue = exports.hasHeader = void 0;
const hasHeader = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
};
exports.hasHeader = hasHeader;
const getHeaderValue = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return headers[headerName];
        }
    }
    return undefined;
};
exports.getHeaderValue = getHeaderValue;
const deleteHeader = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            delete headers[headerName];
        }
    }
};
exports.deleteHeader = deleteHeader;


/***/ }),

/***/ 7865:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareRequest = exports.moveHeadersToQuery = exports.getPayloadHash = exports.getCanonicalQuery = exports.getCanonicalHeaders = void 0;
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7982), exports);
var getCanonicalHeaders_1 = __nccwpck_require__(3791);
Object.defineProperty(exports, "getCanonicalHeaders", ({ enumerable: true, get: function () { return getCanonicalHeaders_1.getCanonicalHeaders; } }));
var getCanonicalQuery_1 = __nccwpck_require__(3857);
Object.defineProperty(exports, "getCanonicalQuery", ({ enumerable: true, get: function () { return getCanonicalQuery_1.getCanonicalQuery; } }));
var getPayloadHash_1 = __nccwpck_require__(1588);
Object.defineProperty(exports, "getPayloadHash", ({ enumerable: true, get: function () { return getPayloadHash_1.getPayloadHash; } }));
var moveHeadersToQuery_1 = __nccwpck_require__(9469);
Object.defineProperty(exports, "moveHeadersToQuery", ({ enumerable: true, get: function () { return moveHeadersToQuery_1.moveHeadersToQuery; } }));
var prepareRequest_1 = __nccwpck_require__(3244);
Object.defineProperty(exports, "prepareRequest", ({ enumerable: true, get: function () { return prepareRequest_1.prepareRequest; } }));
tslib_1.__exportStar(__nccwpck_require__(870), exports);


/***/ }),

/***/ 9469:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moveHeadersToQuery = void 0;
const cloneRequest_1 = __nccwpck_require__(833);
const moveHeadersToQuery = (request, options = {}) => {
    var _a;
    const { headers, query = {} } = typeof request.clone === "function" ? request.clone() : (0, cloneRequest_1.cloneRequest)(request);
    for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !((_a = options.unhoistableHeaders) === null || _a === void 0 ? void 0 : _a.has(lname))) {
            query[name] = headers[name];
            delete headers[name];
        }
    }
    return {
        ...request,
        headers,
        query,
    };
};
exports.moveHeadersToQuery = moveHeadersToQuery;


/***/ }),

/***/ 3244:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareRequest = void 0;
const cloneRequest_1 = __nccwpck_require__(833);
const constants_1 = __nccwpck_require__(2277);
const prepareRequest = (request) => {
    request = typeof request.clone === "function" ? request.clone() : (0, cloneRequest_1.cloneRequest)(request);
    for (const headerName of Object.keys(request.headers)) {
        if (constants_1.GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
            delete request.headers[headerName];
        }
    }
    return request;
};
exports.prepareRequest = prepareRequest;


/***/ }),

/***/ 9376:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toDate = exports.iso8601 = void 0;
const iso8601 = (time) => (0, exports.toDate)(time)
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z");
exports.iso8601 = iso8601;
const toDate = (time) => {
    if (typeof time === "number") {
        return new Date(time * 1000);
    }
    if (typeof time === "string") {
        if (Number(time)) {
            return new Date(Number(time) * 1000);
        }
        return new Date(time);
    }
    return time;
};
exports.toDate = toDate;


/***/ }),

/***/ 301:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Client = void 0;
const middleware_stack_1 = __nccwpck_require__(8514);
class Client {
    constructor(config) {
        this.middlewareStack = (0, middleware_stack_1.constructStack)();
        this.config = config;
    }
    send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : undefined;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        if (callback) {
            handler(command)
                .then((result) => callback(null, result.output), (err) => callback(err))
                .catch(() => { });
        }
        else {
            return handler(command).then((result) => result.output);
        }
    }
    destroy() {
        if (this.config.requestHandler.destroy)
            this.config.requestHandler.destroy();
    }
}
exports.Client = Client;


/***/ }),

/***/ 9839:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Command = void 0;
const middleware_stack_1 = __nccwpck_require__(8514);
class Command {
    constructor() {
        this.middlewareStack = (0, middleware_stack_1.constructStack)();
    }
}
exports.Command = Command;


/***/ }),

/***/ 9762:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SENSITIVE_STRING = void 0;
exports.SENSITIVE_STRING = "***SensitiveInformation***";


/***/ }),

/***/ 6188:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseEpochTimestamp = exports.parseRfc7231DateTime = exports.parseRfc3339DateTime = exports.dateToUtcString = void 0;
const parse_utils_1 = __nccwpck_require__(5573);
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateToUtcString(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfWeek = date.getUTCDay();
    const dayOfMonthInt = date.getUTCDate();
    const hoursInt = date.getUTCHours();
    const minutesInt = date.getUTCMinutes();
    const secondsInt = date.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
exports.dateToUtcString = dateToUtcString;
const RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
const parseRfc3339DateTime = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year = (0, parse_utils_1.strictParseShort)(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
};
exports.parseRfc3339DateTime = parseRfc3339DateTime;
const IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
const RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
const ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
const parseRfc7231DateTime = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate((0, parse_utils_1.strictParseShort)(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    match = RFC_850_DATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds,
        }));
    }
    match = ASC_TIME.exec(value);
    if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate((0, parse_utils_1.strictParseShort)(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
};
exports.parseRfc7231DateTime = parseRfc7231DateTime;
const parseEpochTimestamp = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    let valueAsDouble;
    if (typeof value === "number") {
        valueAsDouble = value;
    }
    else if (typeof value === "string") {
        valueAsDouble = (0, parse_utils_1.strictParseDouble)(value);
    }
    else {
        throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
        throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1000));
};
exports.parseEpochTimestamp = parseEpochTimestamp;
const buildDate = (year, month, day, time) => {
    const adjustedMonth = month - 1;
    validateDayOfMonth(year, adjustedMonth, day);
    return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
};
const parseTwoDigitYear = (value) => {
    const thisYear = new Date().getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + (0, parse_utils_1.strictParseShort)(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
    }
    return valueInThisCentury;
};
const FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1000;
const adjustRfc850Year = (input) => {
    if (input.getTime() - new Date().getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
};
const parseMonthByShortName = (value) => {
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
};
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const validateDayOfMonth = (year, month, day) => {
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year)) {
        maxDays = 29;
    }
    if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
    }
};
const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
const parseDateValue = (value, type, lower, upper) => {
    const dateVal = (0, parse_utils_1.strictParseByte)(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
};
const parseMilliseconds = (value) => {
    if (value === null || value === undefined) {
        return 0;
    }
    return (0, parse_utils_1.strictParseFloat32)("0." + value) * 1000;
};
const stripLeadingZeroes = (value) => {
    let idx = 0;
    while (idx < value.length - 1 && value.charAt(idx) === "0") {
        idx++;
    }
    if (idx === 0) {
        return value;
    }
    return value.slice(idx);
};


/***/ }),

/***/ 3488:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwDefaultError = void 0;
const exceptions_1 = __nccwpck_require__(8042);
const throwDefaultError = ({ output, parsedBody, exceptionCtor, errorCode }) => {
    const $metadata = deserializeMetadata(output);
    const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : undefined;
    const response = new exceptionCtor({
        name: parsedBody.code || parsedBody.Code || errorCode || statusCode || "UnknowError",
        $fault: "client",
        $metadata,
    });
    throw (0, exceptions_1.decorateServiceException)(response, parsedBody);
};
exports.throwDefaultError = throwDefaultError;
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};


/***/ }),

/***/ 6274:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadConfigsForDefaultMode = void 0;
const loadConfigsForDefaultMode = (mode) => {
    switch (mode) {
        case "standard":
            return {
                retryMode: "standard",
                connectionTimeout: 3100,
            };
        case "in-region":
            return {
                retryMode: "standard",
                connectionTimeout: 1100,
            };
        case "cross-region":
            return {
                retryMode: "standard",
                connectionTimeout: 3100,
            };
        case "mobile":
            return {
                retryMode: "standard",
                connectionTimeout: 30000,
            };
        default:
            return {};
    }
};
exports.loadConfigsForDefaultMode = loadConfigsForDefaultMode;


/***/ }),

/***/ 6345:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.emitWarningIfUnsupportedVersion = void 0;
let warningEmitted = false;
const emitWarningIfUnsupportedVersion = (version) => {
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 14) {
        warningEmitted = true;
        process.emitWarning(`The AWS SDK for JavaScript (v3) will\n` +
            `no longer support Node.js ${version} on November 1, 2022.\n\n` +
            `To continue receiving updates to AWS services, bug fixes, and security\n` +
            `updates please upgrade to Node.js 14.x or later.\n\n` +
            `For details, please refer our blog post: https://a.co/48dbdYz`, `NodeDeprecationWarning`);
    }
};
exports.emitWarningIfUnsupportedVersion = emitWarningIfUnsupportedVersion;


/***/ }),

/***/ 8042:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decorateServiceException = exports.ServiceException = void 0;
class ServiceException extends Error {
    constructor(options) {
        super(options.message);
        Object.setPrototypeOf(this, ServiceException.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
    }
}
exports.ServiceException = ServiceException;
const decorateServiceException = (exception, additions = {}) => {
    Object.entries(additions)
        .filter(([, v]) => v !== undefined)
        .forEach(([k, v]) => {
        if (exception[k] == undefined || exception[k] === "") {
            exception[k] = v;
        }
    });
    const message = exception.message || exception.Message || "UnknownError";
    exception.message = message;
    delete exception.Message;
    return exception;
};
exports.decorateServiceException = decorateServiceException;


/***/ }),

/***/ 3303:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendedEncodeURIComponent = void 0;
function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
exports.extendedEncodeURIComponent = extendedEncodeURIComponent;


/***/ }),

/***/ 2768:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getArrayIfSingleItem = void 0;
const getArrayIfSingleItem = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
exports.getArrayIfSingleItem = getArrayIfSingleItem;


/***/ }),

/***/ 8385:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getValueFromTextNode = void 0;
const getValueFromTextNode = (obj) => {
    const textNodeName = "#text";
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== undefined) {
            obj[key] = obj[key][textNodeName];
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = (0, exports.getValueFromTextNode)(obj[key]);
        }
    }
    return obj;
};
exports.getValueFromTextNode = getValueFromTextNode;


/***/ }),

/***/ 3623:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(301), exports);
tslib_1.__exportStar(__nccwpck_require__(9839), exports);
tslib_1.__exportStar(__nccwpck_require__(9762), exports);
tslib_1.__exportStar(__nccwpck_require__(6188), exports);
tslib_1.__exportStar(__nccwpck_require__(3488), exports);
tslib_1.__exportStar(__nccwpck_require__(6274), exports);
tslib_1.__exportStar(__nccwpck_require__(6345), exports);
tslib_1.__exportStar(__nccwpck_require__(8042), exports);
tslib_1.__exportStar(__nccwpck_require__(3303), exports);
tslib_1.__exportStar(__nccwpck_require__(2768), exports);
tslib_1.__exportStar(__nccwpck_require__(8385), exports);
tslib_1.__exportStar(__nccwpck_require__(3337), exports);
tslib_1.__exportStar(__nccwpck_require__(9891), exports);
tslib_1.__exportStar(__nccwpck_require__(5573), exports);
tslib_1.__exportStar(__nccwpck_require__(142), exports);
tslib_1.__exportStar(__nccwpck_require__(8375), exports);
tslib_1.__exportStar(__nccwpck_require__(3911), exports);


/***/ }),

/***/ 3337:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LazyJsonString = exports.StringWrapper = void 0;
const StringWrapper = function () {
    const Class = Object.getPrototypeOf(this).constructor;
    const Constructor = Function.bind.apply(String, [null, ...arguments]);
    const instance = new Constructor();
    Object.setPrototypeOf(instance, Class.prototype);
    return instance;
};
exports.StringWrapper = StringWrapper;
exports.StringWrapper.prototype = Object.create(String.prototype, {
    constructor: {
        value: exports.StringWrapper,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});
Object.setPrototypeOf(exports.StringWrapper, String);
class LazyJsonString extends exports.StringWrapper {
    deserializeJSON() {
        return JSON.parse(super.toString());
    }
    toJSON() {
        return super.toString();
    }
    static fromObject(object) {
        if (object instanceof LazyJsonString) {
            return object;
        }
        else if (object instanceof String || typeof object === "string") {
            return new LazyJsonString(object);
        }
        return new LazyJsonString(JSON.stringify(object));
    }
}
exports.LazyJsonString = LazyJsonString;


/***/ }),

/***/ 9891:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertMap = exports.map = void 0;
function map(arg0, arg1, arg2) {
    let target;
    let filter;
    let instructions;
    if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
        target = {};
        instructions = arg0;
    }
    else {
        target = arg0;
        if (typeof arg1 === "function") {
            filter = arg1;
            instructions = arg2;
            return mapWithFilter(target, filter, instructions);
        }
        else {
            instructions = arg1;
        }
    }
    for (const key of Object.keys(instructions)) {
        if (!Array.isArray(instructions[key])) {
            target[key] = instructions[key];
            continue;
        }
        let [filter, value] = instructions[key];
        if (typeof value === "function") {
            let _value;
            const defaultFilterPassed = filter === undefined && (_value = value()) != null;
            const customFilterPassed = (typeof filter === "function" && !!filter(void 0)) || (typeof filter !== "function" && !!filter);
            if (defaultFilterPassed) {
                target[key] = _value;
            }
            else if (customFilterPassed) {
                target[key] = value();
            }
        }
        else {
            const defaultFilterPassed = filter === undefined && value != null;
            const customFilterPassed = (typeof filter === "function" && !!filter(value)) || (typeof filter !== "function" && !!filter);
            if (defaultFilterPassed || customFilterPassed) {
                target[key] = value;
            }
        }
    }
    return target;
}
exports.map = map;
const convertMap = (target) => {
    const output = {};
    for (const [k, v] of Object.entries(target || {})) {
        output[k] = [, v];
    }
    return output;
};
exports.convertMap = convertMap;
const mapWithFilter = (target, filter, instructions) => {
    return map(target, Object.entries(instructions).reduce((_instructions, [key, value]) => {
        if (Array.isArray(value)) {
            _instructions[key] = value;
        }
        else {
            if (typeof value === "function") {
                _instructions[key] = [filter, value()];
            }
            else {
                _instructions[key] = [filter, value];
            }
        }
        return _instructions;
    }, {}));
};


/***/ }),

/***/ 5573:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = exports.strictParseByte = exports.strictParseShort = exports.strictParseInt32 = exports.strictParseInt = exports.strictParseLong = exports.limitedParseFloat32 = exports.limitedParseFloat = exports.handleFloat = exports.limitedParseDouble = exports.strictParseFloat32 = exports.strictParseFloat = exports.strictParseDouble = exports.expectUnion = exports.expectString = exports.expectObject = exports.expectNonNull = exports.expectByte = exports.expectShort = exports.expectInt32 = exports.expectInt = exports.expectLong = exports.expectFloat32 = exports.expectNumber = exports.expectBoolean = exports.parseBoolean = void 0;
const parseBoolean = (value) => {
    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error(`Unable to parse boolean value "${value}"`);
    }
};
exports.parseBoolean = parseBoolean;
const expectBoolean = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "number") {
        if (value === 0 || value === 1) {
            exports.logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (value === 0) {
            return false;
        }
        if (value === 1) {
            return true;
        }
    }
    if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
            exports.logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (lower === "false") {
            return false;
        }
        if (lower === "true") {
            return true;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
};
exports.expectBoolean = expectBoolean;
const expectNumber = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            if (String(parsed) !== String(value)) {
                exports.logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
            }
            return parsed;
        }
    }
    if (typeof value === "number") {
        return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
};
exports.expectNumber = expectNumber;
const MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
const expectFloat32 = (value) => {
    const expected = (0, exports.expectNumber)(value);
    if (expected !== undefined && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
            throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
    }
    return expected;
};
exports.expectFloat32 = expectFloat32;
const expectLong = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
};
exports.expectLong = expectLong;
exports.expectInt = exports.expectLong;
const expectInt32 = (value) => expectSizedInt(value, 32);
exports.expectInt32 = expectInt32;
const expectShort = (value) => expectSizedInt(value, 16);
exports.expectShort = expectShort;
const expectByte = (value) => expectSizedInt(value, 8);
exports.expectByte = expectByte;
const expectSizedInt = (value, size) => {
    const expected = (0, exports.expectLong)(value);
    if (expected !== undefined && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
};
const castInt = (value, size) => {
    switch (size) {
        case 32:
            return Int32Array.of(value)[0];
        case 16:
            return Int16Array.of(value)[0];
        case 8:
            return Int8Array.of(value)[0];
    }
};
const expectNonNull = (value, location) => {
    if (value === null || value === undefined) {
        if (location) {
            throw new TypeError(`Expected a non-null value for ${location}`);
        }
        throw new TypeError("Expected a non-null value");
    }
    return value;
};
exports.expectNonNull = expectNonNull;
const expectObject = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
};
exports.expectObject = expectObject;
const expectString = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    if (["boolean", "number", "bigint"].includes(typeof value)) {
        exports.logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
        return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
};
exports.expectString = expectString;
const expectUnion = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    const asObject = (0, exports.expectObject)(value);
    const setKeys = Object.entries(asObject)
        .filter(([, v]) => v != null)
        .map(([k]) => k);
    if (setKeys.length === 0) {
        throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
        throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
};
exports.expectUnion = expectUnion;
const strictParseDouble = (value) => {
    if (typeof value == "string") {
        return (0, exports.expectNumber)(parseNumber(value));
    }
    return (0, exports.expectNumber)(value);
};
exports.strictParseDouble = strictParseDouble;
exports.strictParseFloat = exports.strictParseDouble;
const strictParseFloat32 = (value) => {
    if (typeof value == "string") {
        return (0, exports.expectFloat32)(parseNumber(value));
    }
    return (0, exports.expectFloat32)(value);
};
exports.strictParseFloat32 = strictParseFloat32;
const NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
const parseNumber = (value) => {
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
};
const limitedParseDouble = (value) => {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return (0, exports.expectNumber)(value);
};
exports.limitedParseDouble = limitedParseDouble;
exports.handleFloat = exports.limitedParseDouble;
exports.limitedParseFloat = exports.limitedParseDouble;
const limitedParseFloat32 = (value) => {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return (0, exports.expectFloat32)(value);
};
exports.limitedParseFloat32 = limitedParseFloat32;
const parseFloatString = (value) => {
    switch (value) {
        case "NaN":
            return NaN;
        case "Infinity":
            return Infinity;
        case "-Infinity":
            return -Infinity;
        default:
            throw new Error(`Unable to parse float value: ${value}`);
    }
};
const strictParseLong = (value) => {
    if (typeof value === "string") {
        return (0, exports.expectLong)(parseNumber(value));
    }
    return (0, exports.expectLong)(value);
};
exports.strictParseLong = strictParseLong;
exports.strictParseInt = exports.strictParseLong;
const strictParseInt32 = (value) => {
    if (typeof value === "string") {
        return (0, exports.expectInt32)(parseNumber(value));
    }
    return (0, exports.expectInt32)(value);
};
exports.strictParseInt32 = strictParseInt32;
const strictParseShort = (value) => {
    if (typeof value === "string") {
        return (0, exports.expectShort)(parseNumber(value));
    }
    return (0, exports.expectShort)(value);
};
exports.strictParseShort = strictParseShort;
const strictParseByte = (value) => {
    if (typeof value === "string") {
        return (0, exports.expectByte)(parseNumber(value));
    }
    return (0, exports.expectByte)(value);
};
exports.strictParseByte = strictParseByte;
const stackTraceWarning = (message) => {
    return String(new TypeError(message).stack || message)
        .split("\n")
        .slice(0, 5)
        .filter((s) => !s.includes("stackTraceWarning"))
        .join("\n");
};
exports.logger = {
    warn: console.warn,
};


/***/ }),

/***/ 142:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvedPath = void 0;
const extended_encode_uri_component_1 = __nccwpck_require__(3303);
const resolvedPath = (resolvedPath, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
    if (input != null && input[memberName] !== undefined) {
        const labelValue = labelValueProvider();
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
        }
        resolvedPath = resolvedPath.replace(uriLabel, isGreedyLabel
            ? labelValue
                .split("/")
                .map((segment) => (0, extended_encode_uri_component_1.extendedEncodeURIComponent)(segment))
                .join("/")
            : (0, extended_encode_uri_component_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath;
};
exports.resolvedPath = resolvedPath;


/***/ }),

/***/ 8375:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeFloat = void 0;
const serializeFloat = (value) => {
    if (value !== value) {
        return "NaN";
    }
    switch (value) {
        case Infinity:
            return "Infinity";
        case -Infinity:
            return "-Infinity";
        default:
            return value;
    }
};
exports.serializeFloat = serializeFloat;


/***/ }),

/***/ 3911:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitEvery = void 0;
function splitEvery(value, delimiter, numDelimiters) {
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
        throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    const segments = value.split(delimiter);
    if (numDelimiters === 1) {
        return segments;
    }
    const compoundSegments = [];
    let currentSegment = "";
    for (let i = 0; i < segments.length; i++) {
        if (currentSegment === "") {
            currentSegment = segments[i];
        }
        else {
            currentSegment += delimiter + segments[i];
        }
        if ((i + 1) % numDelimiters === 0) {
            compoundSegments.push(currentSegment);
            currentSegment = "";
        }
    }
    if (currentSegment !== "") {
        compoundSegments.push(currentSegment);
    }
    return compoundSegments;
}
exports.splitEvery = splitEvery;


/***/ }),

/***/ 8477:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseUrl = void 0;
const querystring_parser_1 = __nccwpck_require__(2298);
const parseUrl = (url) => {
    if (typeof url === 'string') {
        return (0, exports.parseUrl)(new URL(url));
    }
    const { hostname, pathname, port, protocol, search } = url;
    let query;
    if (search) {
        query = (0, querystring_parser_1.parseQueryString)(search);
    }
    return {
        hostname,
        port: port ? parseInt(port) : undefined,
        protocol,
        path: pathname,
        query,
    };
};
exports.parseUrl = parseUrl;


/***/ }),

/***/ 7974:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toBase64 = exports.fromBase64 = void 0;
const util_buffer_from_1 = __nccwpck_require__(4379);
const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
function fromBase64(input) {
    if ((input.length * 3) % 4 !== 0) {
        throw new TypeError(`Incorrect padding on base64 string.`);
    }
    if (!BASE64_REGEX.exec(input)) {
        throw new TypeError(`Invalid base64 string.`);
    }
    const buffer = (0, util_buffer_from_1.fromString)(input, "base64");
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}
exports.fromBase64 = fromBase64;
function toBase64(input) {
    return (0, util_buffer_from_1.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("base64");
}
exports.toBase64 = toBase64;


/***/ }),

/***/ 121:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.calculateBodyLength = void 0;
const fs_1 = __nccwpck_require__(7147);
const calculateBodyLength = (body) => {
    if (!body) {
        return 0;
    }
    if (typeof body === "string") {
        return Buffer.from(body).length;
    }
    else if (typeof body.byteLength === "number") {
        return body.byteLength;
    }
    else if (typeof body.size === "number") {
        return body.size;
    }
    else if (typeof body.path === "string" || Buffer.isBuffer(body.path)) {
        return (0, fs_1.lstatSync)(body.path).size;
    }
    else if (typeof body.fd === "number") {
        return (0, fs_1.fstatSync)(body.fd).size;
    }
    throw new Error(`Body Length computation failed for ${body}`);
};
exports.calculateBodyLength = calculateBodyLength;


/***/ }),

/***/ 3458:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(121), exports);


/***/ }),

/***/ 4379:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromString = exports.fromArrayBuffer = void 0;
const is_array_buffer_1 = __nccwpck_require__(4843);
const buffer_1 = __nccwpck_require__(4300);
const fromArrayBuffer = (input, offset = 0, length = input.byteLength - offset) => {
    if (!(0, is_array_buffer_1.isArrayBuffer)(input)) {
        throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
    }
    return buffer_1.Buffer.from(input, offset, length);
};
exports.fromArrayBuffer = fromArrayBuffer;
const fromString = (input, encoding) => {
    if (typeof input !== "string") {
        throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
    }
    return encoding ? buffer_1.Buffer.from(input, encoding) : buffer_1.Buffer.from(input);
};
exports.fromString = fromString;


/***/ }),

/***/ 2940:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.booleanSelector = exports.SelectorType = void 0;
var SelectorType;
(function (SelectorType) {
    SelectorType["ENV"] = "env";
    SelectorType["CONFIG"] = "shared config entry";
})(SelectorType = exports.SelectorType || (exports.SelectorType = {}));
const booleanSelector = (obj, key, type) => {
    if (!(key in obj))
        return undefined;
    if (obj[key] === "true")
        return true;
    if (obj[key] === "false")
        return false;
    throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
};
exports.booleanSelector = booleanSelector;


/***/ }),

/***/ 2660:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(2940), exports);


/***/ }),

/***/ 3610:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IMDS_REGION_PATH = exports.DEFAULTS_MODE_OPTIONS = exports.ENV_IMDS_DISABLED = exports.AWS_DEFAULT_REGION_ENV = exports.AWS_REGION_ENV = exports.AWS_EXECUTION_ENV = void 0;
exports.AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
exports.AWS_REGION_ENV = "AWS_REGION";
exports.AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
exports.ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
exports.DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
exports.IMDS_REGION_PATH = "/latest/meta-data/placement/region";


/***/ }),

/***/ 7292:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_DEFAULTS_MODE_CONFIG_OPTIONS = void 0;
const AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
const AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
exports.NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        return env[AWS_DEFAULTS_MODE_ENV];
    },
    configFileSelector: (profile) => {
        return profile[AWS_DEFAULTS_MODE_CONFIG];
    },
    default: "legacy",
};


/***/ }),

/***/ 5274:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(5695), exports);


/***/ }),

/***/ 5695:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveDefaultsModeConfig = void 0;
const config_resolver_1 = __nccwpck_require__(8678);
const credential_provider_imds_1 = __nccwpck_require__(8623);
const node_config_provider_1 = __nccwpck_require__(9125);
const property_provider_1 = __nccwpck_require__(3995);
const constants_1 = __nccwpck_require__(3610);
const defaultsModeConfig_1 = __nccwpck_require__(7292);
const resolveDefaultsModeConfig = ({ region = (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS), defaultsMode = (0, node_config_provider_1.loadConfig)(defaultsModeConfig_1.NODE_DEFAULTS_MODE_CONFIG_OPTIONS), } = {}) => (0, property_provider_1.memoize)(async () => {
    const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
    switch (mode === null || mode === void 0 ? void 0 : mode.toLowerCase()) {
        case "auto":
            return resolveNodeDefaultsModeAuto(region);
        case "in-region":
        case "cross-region":
        case "mobile":
        case "standard":
        case "legacy":
            return Promise.resolve(mode === null || mode === void 0 ? void 0 : mode.toLocaleLowerCase());
        case undefined:
            return Promise.resolve("legacy");
        default:
            throw new Error(`Invalid parameter for "defaultsMode", expect ${constants_1.DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
    }
});
exports.resolveDefaultsModeConfig = resolveDefaultsModeConfig;
const resolveNodeDefaultsModeAuto = async (clientRegion) => {
    if (clientRegion) {
        const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
        const inferredRegion = await inferPhysicalRegion();
        if (!inferredRegion) {
            return "standard";
        }
        if (resolvedRegion === inferredRegion) {
            return "in-region";
        }
        else {
            return "cross-region";
        }
    }
    return "standard";
};
const inferPhysicalRegion = async () => {
    var _a;
    if (process.env[constants_1.AWS_EXECUTION_ENV] && (process.env[constants_1.AWS_REGION_ENV] || process.env[constants_1.AWS_DEFAULT_REGION_ENV])) {
        return (_a = process.env[constants_1.AWS_REGION_ENV]) !== null && _a !== void 0 ? _a : process.env[constants_1.AWS_DEFAULT_REGION_ENV];
    }
    if (!process.env[constants_1.ENV_IMDS_DISABLED]) {
        try {
            const endpoint = await (0, credential_provider_imds_1.getInstanceMetadataEndpoint)();
            return (await (0, credential_provider_imds_1.httpRequest)({ ...endpoint, path: constants_1.IMDS_REGION_PATH })).toString();
        }
        catch (e) {
        }
    }
};


/***/ }),

/***/ 6382:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toHex = exports.fromHex = void 0;
const SHORT_TO_HEX = {};
const HEX_TO_SHORT = {};
for (let i = 0; i < 256; i++) {
    let encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    const out = new Uint8Array(encoded.length / 2);
    for (let i = 0; i < encoded.length; i += 2) {
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        }
        else {
            throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
    }
    return out;
}
exports.fromHex = fromHex;
function toHex(bytes) {
    let out = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}
exports.toHex = toHex;


/***/ }),

/***/ 4614:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7889), exports);


/***/ }),

/***/ 7889:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalizeProvider = void 0;
const normalizeProvider = (input) => {
    if (typeof input === "function")
        return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
};
exports.normalizeProvider = normalizeProvider;


/***/ }),

/***/ 7630:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeUriPath = void 0;
const escape_uri_1 = __nccwpck_require__(7504);
const escapeUriPath = (uri) => uri.split("/").map(escape_uri_1.escapeUri).join("/");
exports.escapeUriPath = escapeUriPath;


/***/ }),

/***/ 7504:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeUri = void 0;
const escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
exports.escapeUri = escapeUri;
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;


/***/ }),

/***/ 3588:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __nccwpck_require__(4503);
tslib_1.__exportStar(__nccwpck_require__(7504), exports);
tslib_1.__exportStar(__nccwpck_require__(7630), exports);


/***/ }),

/***/ 4919:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toUtf8 = exports.fromUtf8 = void 0;
const util_buffer_from_1 = __nccwpck_require__(4379);
const fromUtf8 = (input) => {
    const buf = (0, util_buffer_from_1.fromString)(input, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
exports.fromUtf8 = fromUtf8;
const toUtf8 = (input) => (0, util_buffer_from_1.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
exports.toUtf8 = toUtf8;


/***/ }),

/***/ 9056:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = void 0;
var entities_json_1 = __importDefault(__nccwpck_require__(5610));
var legacy_json_1 = __importDefault(__nccwpck_require__(664));
var xml_json_1 = __importDefault(__nccwpck_require__(6833));
var decode_codepoint_1 = __importDefault(__nccwpck_require__(1289));
var strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
exports.decodeXML = getStrictDecoder(xml_json_1.default);
exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
function getStrictDecoder(map) {
    var replace = getReplacer(map);
    return function (str) { return String(str).replace(strictEntityRe, replace); };
}
var sorter = function (a, b) { return (a < b ? 1 : -1); };
exports.decodeHTML = (function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        }
        else {
            keys[i] += ";";
        }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1.default);
    function replacer(str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replace(str);
    }
    // TODO consider creating a merged map
    return function (str) { return String(str).replace(re, replacer); };
})();
function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            var secondChar = str.charAt(2);
            if (secondChar === "X" || secondChar === "x") {
                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return map[str.slice(1, -1)] || str;
    };
}


/***/ }),

/***/ 1289:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var decode_json_1 = __importDefault(__nccwpck_require__(8974));
// Adapted from https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
var fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.fromCodePoint ||
    function (codePoint) {
        var output = "";
        if (codePoint > 0xffff) {
            codePoint -= 0x10000;
            output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
            codePoint = 0xdc00 | (codePoint & 0x3ff);
        }
        output += String.fromCharCode(codePoint);
        return output;
    };
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        codePoint = decode_json_1.default[codePoint];
    }
    return fromCodePoint(codePoint);
}
exports["default"] = decodeCodePoint;


/***/ }),

/***/ 4560:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = void 0;
var xml_json_1 = __importDefault(__nccwpck_require__(6833));
var inverseXML = getInverseObj(xml_json_1.default);
var xmlReplacer = getInverseReplacer(inverseXML);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
exports.encodeXML = getASCIIEncoder(inverseXML);
var entities_json_1 = __importDefault(__nccwpck_require__(5610));
var inverseHTML = getInverseObj(entities_json_1.default);
var htmlReplacer = getInverseReplacer(inverseHTML);
/**
 * Encodes all entities and non-ASCII characters in the input.
 *
 * This includes characters that are valid ASCII characters in HTML documents.
 * For example `#` will be encoded as `&num;`. To get a more compact output,
 * consider using the `encodeNonAsciiHTML` function.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in HTML
 * documents using HTML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
exports.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (inverse, name) {
        inverse[obj[name]] = "&" + name + ";";
        return inverse;
    }, {});
}
function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
        var k = _a[_i];
        if (k.length === 1) {
            // Add value to single array
            single.push("\\" + k);
        }
        else {
            // Add value to multiple array
            multiple.push(k);
        }
    }
    // Add ranges to single characters.
    single.sort();
    for (var start = 0; start < single.length - 1; start++) {
        // Find the end of a run of characters
        var end = start;
        while (end < single.length - 1 &&
            single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
            end += 1;
        }
        var count = 1 + end - start;
        // We want to replace at least three characters
        if (count < 3)
            continue;
        single.splice(start, count, single[start] + "-" + single[end]);
    }
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
}
// /[^\0-\x7F]/gu
var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
var getCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt != null
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        function (str) { return str.codePointAt(0); }
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        function (c) {
            return (c.charCodeAt(0) - 0xd800) * 0x400 +
                c.charCodeAt(1) -
                0xdc00 +
                0x10000;
        };
function singleCharReplacer(c) {
    return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0))
        .toString(16)
        .toUpperCase() + ";";
}
function getInverse(inverse, re) {
    return function (data) {
        return data
            .replace(re, function (name) { return inverse[name]; })
            .replace(reNonASCII, singleCharReplacer);
    };
}
var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
 *
 * Have a look at `escapeUTF8` if you want a more concise output at the expense
 * of reduced transportability.
 *
 * @param data String to escape.
 */
function escape(data) {
    return data.replace(reEscapeChars, singleCharReplacer);
}
exports.escape = escape;
/**
 * Encodes all characters not valid in XML documents using numeric hexadecimal
 * reference (eg. `&#xfc;`).
 *
 * Note that the output will be character-set dependent.
 *
 * @param data String to escape.
 */
function escapeUTF8(data) {
    return data.replace(xmlReplacer, singleCharReplacer);
}
exports.escapeUTF8 = escapeUTF8;
function getASCIIEncoder(obj) {
    return function (data) {
        return data.replace(reEscapeChars, function (c) { return obj[c] || singleCharReplacer(c); });
    };
}


/***/ }),

/***/ 9446:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
var decode_1 = __nccwpck_require__(9056);
var encode_1 = __nccwpck_require__(4560);
/**
 * Decodes a string with entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 * @deprecated Use `decodeXML` or `decodeHTML` directly.
 */
function decode(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
}
exports.decode = decode;
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 * @deprecated Use `decodeHTMLStrict` or `decodeXML` directly.
 */
function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
}
exports.decodeStrict = decodeStrict;
/**
 * Encodes a string with entities.
 *
 * @param data String to encode.
 * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
 * @deprecated Use `encodeHTML`, `encodeXML` or `encodeNonAsciiHTML` directly.
 */
function encode(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
}
exports.encode = encode;
var encode_2 = __nccwpck_require__(4560);
Object.defineProperty(exports, "encodeXML", ({ enumerable: true, get: function () { return encode_2.encodeXML; } }));
Object.defineProperty(exports, "encodeHTML", ({ enumerable: true, get: function () { return encode_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeNonAsciiHTML", ({ enumerable: true, get: function () { return encode_2.encodeNonAsciiHTML; } }));
Object.defineProperty(exports, "escape", ({ enumerable: true, get: function () { return encode_2.escape; } }));
Object.defineProperty(exports, "escapeUTF8", ({ enumerable: true, get: function () { return encode_2.escapeUTF8; } }));
// Legacy aliases (deprecated)
Object.defineProperty(exports, "encodeHTML4", ({ enumerable: true, get: function () { return encode_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeHTML5", ({ enumerable: true, get: function () { return encode_2.encodeHTML; } }));
var decode_2 = __nccwpck_require__(9056);
Object.defineProperty(exports, "decodeXML", ({ enumerable: true, get: function () { return decode_2.decodeXML; } }));
Object.defineProperty(exports, "decodeHTML", ({ enumerable: true, get: function () { return decode_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTMLStrict", ({ enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } }));
// Legacy aliases (deprecated)
Object.defineProperty(exports, "decodeHTML4", ({ enumerable: true, get: function () { return decode_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML5", ({ enumerable: true, get: function () { return decode_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML4Strict", ({ enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeHTML5Strict", ({ enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeXMLStrict", ({ enumerable: true, get: function () { return decode_2.decodeXML; } }));


/***/ }),

/***/ 9488:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

//parse Empty Node as self closing node
const buildOptions = (__nccwpck_require__(2159).buildOptions);

const defaultOptions = {
  attributeNamePrefix: '@_',
  attrNodeName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  cdataTagName: false,
  cdataPositionChar: '\\c',
  format: false,
  indentBy: '  ',
  supressEmptyNode: false,
  tagValueProcessor: function(a) {
    return a;
  },
  attrValueProcessor: function(a) {
    return a;
  },
};

const props = [
  'attributeNamePrefix',
  'attrNodeName',
  'textNodeName',
  'ignoreAttributes',
  'cdataTagName',
  'cdataPositionChar',
  'format',
  'indentBy',
  'supressEmptyNode',
  'tagValueProcessor',
  'attrValueProcessor',
];

function Parser(options) {
  this.options = buildOptions(options, defaultOptions, props);
  if (this.options.ignoreAttributes || this.options.attrNodeName) {
    this.isAttribute = function(/*a*/) {
      return false;
    };
  } else {
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }
  if (this.options.cdataTagName) {
    this.isCDATA = isCDATA;
  } else {
    this.isCDATA = function(/*a*/) {
      return false;
    };
  }
  this.replaceCDATAstr = replaceCDATAstr;
  this.replaceCDATAarr = replaceCDATAarr;

  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = '>\n';
    this.newLine = '\n';
  } else {
    this.indentate = function() {
      return '';
    };
    this.tagEndChar = '>';
    this.newLine = '';
  }

  if (this.options.supressEmptyNode) {
    this.buildTextNode = buildEmptyTextNode;
    this.buildObjNode = buildEmptyObjNode;
  } else {
    this.buildTextNode = buildTextValNode;
    this.buildObjNode = buildObjectNode;
  }

  this.buildTextValNode = buildTextValNode;
  this.buildObjectNode = buildObjectNode;
}

Parser.prototype.parse = function(jObj) {
  return this.j2x(jObj, 0).val;
};

Parser.prototype.j2x = function(jObj, level) {
  let attrStr = '';
  let val = '';
  const keys = Object.keys(jObj);
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    if (typeof jObj[key] === 'undefined') {
      // supress undefined node
    } else if (jObj[key] === null) {
      val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
    } else if (jObj[key] instanceof Date) {
      val += this.buildTextNode(jObj[key], key, '', level);
    } else if (typeof jObj[key] !== 'object') {
      //premitive type
      const attr = this.isAttribute(key);
      if (attr) {
        attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
      } else if (this.isCDATA(key)) {
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
        } else {
          val += this.replaceCDATAstr('', jObj[key]);
        }
      } else {
        //tag value
        if (key === this.options.textNodeName) {
          if (jObj[this.options.cdataTagName]) {
            //value will added while processing cdata
          } else {
            val += this.options.tagValueProcessor('' + jObj[key]);
          }
        } else {
          val += this.buildTextNode(jObj[key], key, '', level);
        }
      }
    } else if (Array.isArray(jObj[key])) {
      //repeated nodes
      if (this.isCDATA(key)) {
        val += this.indentate(level);
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
        } else {
          val += this.replaceCDATAarr('', jObj[key]);
        }
      } else {
        //nested nodes
        const arrLen = jObj[key].length;
        for (let j = 0; j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === 'undefined') {
            // supress undefined node
          } else if (item === null) {
            val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
          } else if (typeof item === 'object') {
            const result = this.j2x(item, level + 1);
            val += this.buildObjNode(result.val, key, result.attrStr, level);
          } else {
            val += this.buildTextNode(item, key, '', level);
          }
        }
      }
    } else {
      //nested node
      if (this.options.attrNodeName && key === this.options.attrNodeName) {
        const Ks = Object.keys(jObj[key]);
        const L = Ks.length;
        for (let j = 0; j < L; j++) {
          attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
        }
      } else {
        const result = this.j2x(jObj[key], level + 1);
        val += this.buildObjNode(result.val, key, result.attrStr, level);
      }
    }
  }
  return {attrStr: attrStr, val: val};
};

function replaceCDATAstr(str, cdata) {
  str = this.options.tagValueProcessor('' + str);
  if (this.options.cdataPositionChar === '' || str === '') {
    return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
  } else {
    return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
  }
}

function replaceCDATAarr(str, cdata) {
  str = this.options.tagValueProcessor('' + str);
  if (this.options.cdataPositionChar === '' || str === '') {
    return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
  } else {
    for (let v in cdata) {
      str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
    }
    return str + this.newLine;
  }
}

function buildObjectNode(val, key, attrStr, level) {
  if (attrStr && !val.includes('<')) {
    return (
      this.indentate(level) +
      '<' +
      key +
      attrStr +
      '>' +
      val +
      //+ this.newLine
      // + this.indentate(level)
      '</' +
      key +
      this.tagEndChar
    );
  } else {
    return (
      this.indentate(level) +
      '<' +
      key +
      attrStr +
      this.tagEndChar +
      val +
      //+ this.newLine
      this.indentate(level) +
      '</' +
      key +
      this.tagEndChar
    );
  }
}

function buildEmptyObjNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildObjectNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
    //+ this.newLine
  }
}

function buildTextValNode(val, key, attrStr, level) {
  return (
    this.indentate(level) +
    '<' +
    key +
    attrStr +
    '>' +
    this.options.tagValueProcessor(val) +
    '</' +
    key +
    this.tagEndChar
  );
}

function buildEmptyTextNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildTextValNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
  }
}

function indentate(level) {
  return this.options.indentBy.repeat(level);
}

function isAttribute(name /*, options*/) {
  if (name.startsWith(this.options.attributeNamePrefix)) {
    return name.substr(this.attrPrefixLen);
  } else {
    return false;
  }
}

function isCDATA(name) {
  return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag

module.exports = Parser;


/***/ }),

/***/ 8760:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

const char = function(a) {
  return String.fromCharCode(a);
};

const chars = {
  nilChar: char(176),
  missingChar: char(201),
  nilPremitive: char(175),
  missingPremitive: char(200),

  emptyChar: char(178),
  emptyValue: char(177), //empty Premitive

  boundryChar: char(179),

  objStart: char(198),
  arrStart: char(204),
  arrayEnd: char(185),
};

const charsArr = [
  chars.nilChar,
  chars.nilPremitive,
  chars.missingChar,
  chars.missingPremitive,
  chars.boundryChar,
  chars.emptyChar,
  chars.emptyValue,
  chars.arrayEnd,
  chars.objStart,
  chars.arrStart,
];

const _e = function(node, e_schema, options) {
  if (typeof e_schema === 'string') {
    //premitive
    if (node && node[0] && node[0].val !== undefined) {
      return getValue(node[0].val, e_schema);
    } else {
      return getValue(node, e_schema);
    }
  } else {
    const hasValidData = hasData(node);
    if (hasValidData === true) {
      let str = '';
      if (Array.isArray(e_schema)) {
        //attributes can't be repeated. hence check in children tags only
        str += chars.arrStart;
        const itemSchema = e_schema[0];
        //var itemSchemaType = itemSchema;
        const arr_len = node.length;

        if (typeof itemSchema === 'string') {
          for (let arr_i = 0; arr_i < arr_len; arr_i++) {
            const r = getValue(node[arr_i].val, itemSchema);
            str = processValue(str, r);
          }
        } else {
          for (let arr_i = 0; arr_i < arr_len; arr_i++) {
            const r = _e(node[arr_i], itemSchema, options);
            str = processValue(str, r);
          }
        }
        str += chars.arrayEnd; //indicates that next item is not array item
      } else {
        //object
        str += chars.objStart;
        const keys = Object.keys(e_schema);
        if (Array.isArray(node)) {
          node = node[0];
        }
        for (let i in keys) {
          const key = keys[i];
          //a property defined in schema can be present either in attrsMap or children tags
          //options.textNodeName will not present in both maps, take it's value from val
          //options.attrNodeName will be present in attrsMap
          let r;
          if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
            r = _e(node.attrsMap[key], e_schema[key], options);
          } else if (key === options.textNodeName) {
            r = _e(node.val, e_schema[key], options);
          } else {
            r = _e(node.child[key], e_schema[key], options);
          }
          str = processValue(str, r);
        }
      }
      return str;
    } else {
      return hasValidData;
    }
  }
};

const getValue = function(a /*, type*/) {
  switch (a) {
    case undefined:
      return chars.missingPremitive;
    case null:
      return chars.nilPremitive;
    case '':
      return chars.emptyValue;
    default:
      return a;
  }
};

const processValue = function(str, r) {
  if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
    str += chars.boundryChar;
  }
  return str + r;
};

const isAppChar = function(ch) {
  return charsArr.indexOf(ch) !== -1;
};

function hasData(jObj) {
  if (jObj === undefined) {
    return chars.missingChar;
  } else if (jObj === null) {
    return chars.nilChar;
  } else if (
    jObj.child &&
    Object.keys(jObj.child).length === 0 &&
    (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)
  ) {
    return chars.emptyChar;
  } else {
    return true;
  }
}

const x2j = __nccwpck_require__(1491);
const buildOptions = (__nccwpck_require__(2159).buildOptions);

const convert2nimn = function(node, e_schema, options) {
  options = buildOptions(options, x2j.defaultOptions, x2j.props);
  return _e(node, e_schema, options);
};

exports.convert2nimn = convert2nimn;


/***/ }),

/***/ 8077:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(2159);

const convertToJson = function(node, options, parentTagName) {
  const jObj = {};

  // when no child node or attr is present
  if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
    return util.isExist(node.val) ? node.val : '';
  }

  // otherwise create a textnode if node has some text
  if (util.isExist(node.val) && !(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
    const asArray = util.isTagNameInArrayMode(node.tagname, options.arrayMode, parentTagName)
    jObj[options.textNodeName] = asArray ? [node.val] : node.val;
  }

  util.merge(jObj, node.attrsMap, options.arrayMode);

  const keys = Object.keys(node.child);
  for (let index = 0; index < keys.length; index++) {
    const tagName = keys[index];
    if (node.child[tagName] && node.child[tagName].length > 1) {
      jObj[tagName] = [];
      for (let tag in node.child[tagName]) {
        if (node.child[tagName].hasOwnProperty(tag)) {
          jObj[tagName].push(convertToJson(node.child[tagName][tag], options, tagName));
        }
      }
    } else {
      const result = convertToJson(node.child[tagName][0], options, tagName);
      const asArray = (options.arrayMode === true && typeof result === 'object') || util.isTagNameInArrayMode(tagName, options.arrayMode, parentTagName);
      jObj[tagName] = asArray ? [result] : result;
    }
  }

  //add value
  return jObj;
};

exports.convertToJson = convertToJson;


/***/ }),

/***/ 4905:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(2159);
const buildOptions = (__nccwpck_require__(2159).buildOptions);
const x2j = __nccwpck_require__(1491);

//TODO: do it later
const convertToJsonString = function(node, options) {
  options = buildOptions(options, x2j.defaultOptions, x2j.props);

  options.indentBy = options.indentBy || '';
  return _cToJsonStr(node, options, 0);
};

const _cToJsonStr = function(node, options, level) {
  let jObj = '{';

  //traver through all the children
  const keys = Object.keys(node.child);

  for (let index = 0; index < keys.length; index++) {
    var tagname = keys[index];
    if (node.child[tagname] && node.child[tagname].length > 1) {
      jObj += '"' + tagname + '" : [ ';
      for (var tag in node.child[tagname]) {
        jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
      }
      jObj = jObj.substr(0, jObj.length - 1) + ' ] '; //remove extra comma in last
    } else {
      jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
    }
  }
  util.merge(jObj, node.attrsMap);
  //add attrsMap as new children
  if (util.isEmptyObject(jObj)) {
    return util.isExist(node.val) ? node.val : '';
  } else {
    if (util.isExist(node.val)) {
      if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
        jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
      }
    }
  }
  //add value
  if (jObj[jObj.length - 1] === ',') {
    jObj = jObj.substr(0, jObj.length - 2);
  }
  return jObj + '}';
};

function stringval(v) {
  if (v === true || v === false || !isNaN(v)) {
    return v;
  } else {
    return '"' + v + '"';
  }
}

function indentate(options, level) {
  return options.indentBy.repeat(level);
}

exports.convertToJsonString = convertToJsonString;


/***/ }),

/***/ 2173:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const nodeToJson = __nccwpck_require__(8077);
const xmlToNodeobj = __nccwpck_require__(1491);
const x2xmlnode = __nccwpck_require__(1491);
const buildOptions = (__nccwpck_require__(2159).buildOptions);
const validator = __nccwpck_require__(7521);

exports.parse = function(xmlData, options, validationOption) {
  if( validationOption){
    if(validationOption === true) validationOption = {}
    
    const result = validator.validate(xmlData, validationOption);
    if (result !== true) {
      throw Error( result.err.msg)
    }
  }
  options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
  const traversableObj = xmlToNodeobj.getTraversalObj(xmlData, options)
  //print(traversableObj, "  ");
  return nodeToJson.convertToJson(traversableObj, options);
};
exports.convertTonimn = __nccwpck_require__(8760).convert2nimn;
exports.getTraversalObj = xmlToNodeobj.getTraversalObj;
exports.convertToJson = nodeToJson.convertToJson;
exports.convertToJsonString = __nccwpck_require__(4905).convertToJsonString;
exports.validate = validator.validate;
exports.j2xParser = __nccwpck_require__(9488);
exports.parseToNimn = function(xmlData, schema, options) {
  return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
};


function print(xmlNode, indentation){
  if(xmlNode){
    console.log(indentation + "{")
    console.log(indentation + "  \"tagName\": \"" + xmlNode.tagname + "\", ");
    if(xmlNode.parent){
      console.log(indentation + "  \"parent\": \"" + xmlNode.parent.tagname  + "\", ");
    }
    console.log(indentation + "  \"val\": \"" + xmlNode.val  + "\", ");
    console.log(indentation + "  \"attrs\": " + JSON.stringify(xmlNode.attrsMap,null,4)  + ", ");

    if(xmlNode.child){
      console.log(indentation + "\"child\": {")
      const indentation2 = indentation + indentation;
      Object.keys(xmlNode.child).forEach( function(key) {
        const node = xmlNode.child[key];

        if(Array.isArray(node)){
          console.log(indentation +  "\""+key+"\" :[")
          node.forEach( function(item,index) {
            //console.log(indentation + " \""+index+"\" : [")
            print(item, indentation2);
          })
          console.log(indentation + "],")  
        }else{
          console.log(indentation + " \""+key+"\" : {")
          print(node, indentation2);
          console.log(indentation + "},")  
        }
      });
      console.log(indentation + "},")
    }
    console.log(indentation + "},")
  }
}


/***/ }),

/***/ 2159:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*'
const regexName = new RegExp('^' + nameRegexp + '$');

const getAllMatches = function(string, regex) {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    const allmatches = [];
    const len = match.length;
    for (let index = 0; index < len; index++) {
      allmatches.push(match[index]);
    }
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
};

const isName = function(string) {
  const match = regexName.exec(string);
  return !(match === null || typeof match === 'undefined');
};

exports.isExist = function(v) {
  return typeof v !== 'undefined';
};

exports.isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0;
};

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
exports.merge = function(target, a, arrayMode) {
  if (a) {
    const keys = Object.keys(a); // will return an array of own properties
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      if (arrayMode === 'strict') {
        target[keys[i]] = [ a[keys[i]] ];
      } else {
        target[keys[i]] = a[keys[i]];
      }
    }
  }
};
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

exports.getValue = function(v) {
  if (exports.isExist(v)) {
    return v;
  } else {
    return '';
  }
};

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

exports.buildOptions = function(options, defaultOptions, props) {
  var newOptions = {};
  if (!options) {
    return defaultOptions; //if there are not options
  }

  for (let i = 0; i < props.length; i++) {
    if (options[props[i]] !== undefined) {
      newOptions[props[i]] = options[props[i]];
    } else {
      newOptions[props[i]] = defaultOptions[props[i]];
    }
  }
  return newOptions;
};

/**
 * Check if a tag name should be treated as array
 *
 * @param tagName the node tagname
 * @param arrayMode the array mode option
 * @param parentTagName the parent tag name
 * @returns {boolean} true if node should be parsed as array
 */
exports.isTagNameInArrayMode = function (tagName, arrayMode, parentTagName) {
  if (arrayMode === false) {
    return false;
  } else if (arrayMode instanceof RegExp) {
    return arrayMode.test(tagName);
  } else if (typeof arrayMode === 'function') {
    return !!arrayMode(tagName, parentTagName);
  }

  return arrayMode === "strict";
}

exports.isName = isName;
exports.getAllMatches = getAllMatches;
exports.nameRegexp = nameRegexp;


/***/ }),

/***/ 7521:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(2159);

const defaultOptions = {
  allowBooleanAttributes: false, //A tag can have attributes without any value
};

const props = ['allowBooleanAttributes'];

//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate = function (xmlData, options) {
  options = util.buildOptions(options, defaultOptions, props);

  //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
  //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
  //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
  const tags = [];
  let tagFound = false;

  //indicates that the root tag has been closed (aka. depth 0 has been reached)
  let reachedRoot = false;

  if (xmlData[0] === '\ufeff') {
    // check for byte order mark (BOM)
    xmlData = xmlData.substr(1);
  }

  for (let i = 0; i < xmlData.length; i++) {

    if (xmlData[i] === '<' && xmlData[i+1] === '?') {
      i+=2;
      i = readPI(xmlData,i);
      if (i.err) return i;
    }else if (xmlData[i] === '<') {
      //starting of tag
      //read until you reach to '>' avoiding any '>' in attribute value

      i++;
      
      if (xmlData[i] === '!') {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === '/') {
          //closing tag
          closingTag = true;
          i++;
        }
        //read tagname
        let tagName = '';
        for (; i < xmlData.length &&
          xmlData[i] !== '>' &&
          xmlData[i] !== ' ' &&
          xmlData[i] !== '\t' &&
          xmlData[i] !== '\n' &&
          xmlData[i] !== '\r'; i++
        ) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        //console.log(tagName);

        if (tagName[tagName.length - 1] === '/') {
          //self closing tag without attributes
          tagName = tagName.substring(0, tagName.length - 1);
          //continue;
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if (tagName.trim().length === 0) {
            msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
          } else {
            msg = "Tag '"+tagName+"' is an invalid name.";
          }
          return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
        }

        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject('InvalidAttr', "Attributes for '"+tagName+"' have open quote.", getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;

        if (attrStr[attrStr.length - 1] === '/') {
          //self closing tag
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid = validateAttributeString(attrStr, options);
          if (isValid === true) {
            tagFound = true;
            //continue; //text may presents after self closing tag
          } else {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, i));
          } else {
            const otg = tags.pop();
            if (tagName !== otg) {
              return getErrorObject('InvalidTag', "Closing tag '"+otg+"' is expected inplace of '"+tagName+"'.", getLineNumberForPosition(xmlData, i));
            }

            //when there are no more tags, we reached the root level.
            if (tags.length == 0) {
              reachedRoot = true;
            }
          }
        } else {
          const isValid = validateAttributeString(attrStr, options);
          if (isValid !== true) {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }

          //if the root level has been reached before ...
          if (reachedRoot === true) {
            return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
          } else {
            tags.push(tagName);
          }
          tagFound = true;
        }

        //skip tag text value
        //It may include comments and CDATA value
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === '<') {
            if (xmlData[i + 1] === '!') {
              //comment or CADATA
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else if (xmlData[i+1] === '?') {
              i = readPI(xmlData, ++i);
              if (i.err) return i;
            } else{
              break;
            }
          } else if (xmlData[i] === '&') {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          }
        } //end of reading tag text value
        if (xmlData[i] === '<') {
          i--;
        }
      }
    } else {
      if (xmlData[i] === ' ' || xmlData[i] === '\t' || xmlData[i] === '\n' || xmlData[i] === '\r') {
        continue;
      }
      return getErrorObject('InvalidChar', "char '"+xmlData[i]+"' is not expected.", getLineNumberForPosition(xmlData, i));
    }
  }

  if (!tagFound) {
    return getErrorObject('InvalidXml', 'Start tag expected.', 1);
  } else if (tags.length > 0) {
    return getErrorObject('InvalidXml', "Invalid '"+JSON.stringify(tags, null, 4).replace(/\r?\n/g, '')+"' found.", 1);
  }

  return true;
};

/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */
function readPI(xmlData, i) {
  var start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == '?' || xmlData[i] == ' ') {
      //tagname
      var tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === 'xml') {
        return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
        //check if valid attribut string
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}

function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
    //comment
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  } else if (
    xmlData.length > i + 8 &&
    xmlData[i + 1] === 'D' &&
    xmlData[i + 2] === 'O' &&
    xmlData[i + 3] === 'C' &&
    xmlData[i + 4] === 'T' &&
    xmlData[i + 5] === 'Y' &&
    xmlData[i + 6] === 'P' &&
    xmlData[i + 7] === 'E'
  ) {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === '<') {
        angleBracketsCount++;
      } else if (xmlData[i] === '>') {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (
    xmlData.length > i + 9 &&
    xmlData[i + 1] === '[' &&
    xmlData[i + 2] === 'C' &&
    xmlData[i + 3] === 'D' &&
    xmlData[i + 4] === 'A' &&
    xmlData[i + 5] === 'T' &&
    xmlData[i + 6] === 'A' &&
    xmlData[i + 7] === '['
  ) {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  }

  return i;
}

var doubleQuote = '"';
var singleQuote = "'";

/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */
function readAttributeStr(xmlData, i) {
  let attrStr = '';
  let startChar = '';
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === '') {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) {
        //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
        continue;
      } else {
        startChar = '';
      }
    } else if (xmlData[i] === '>') {
      if (startChar === '') {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== '') {
    return false;
  }

  return {
    value: attrStr,
    index: i,
    tagClosed: tagClosed
  };
}

/**
 * Select all the attributes whether valid or invalid.
 */
const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

function validateAttributeString(attrStr, options) {
  //console.log("start:"+attrStr+":end");

  //if(attrStr.trim().length === 0) return true; //empty string

  const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};

  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      //nospace before attribute name: a="sd"b="saf"
      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' has no space in starting.", getPositionFromMatch(attrStr, matches[i][0]))
    } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
      //independent attribute: ab
      return getErrorObject('InvalidAttr', "boolean attribute '"+matches[i][2]+"' is not allowed.", getPositionFromMatch(attrStr, matches[i][0]));
    }
    /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is an invalid name.", getPositionFromMatch(attrStr, matches[i][0]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      //check for duplicate attribute.
      attrNames[attrName] = 1;
    } else {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is repeated.", getPositionFromMatch(attrStr, matches[i][0]));
    }
  }

  return true;
}

function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === 'x') {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ';')
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}

function validateAmpersand(xmlData, i) {
  // https://www.w3.org/TR/xml/#dt-charref
  i++;
  if (xmlData[i] === ';')
    return -1;
  if (xmlData[i] === '#') {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ';')
      break;
    return -1;
  }
  return i;
}

function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code: code,
      msg: message,
      line: lineNumber,
    },
  };
}

function validateAttrName(attrName) {
  return util.isName(attrName);
}

// const startsWithXML = /^xml/i;

function validateTagName(tagname) {
  return util.isName(tagname) /* && !tagname.match(startsWithXML) */;
}

//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
  var lines = xmlData.substring(0, index).split(/\r?\n/);
  return lines.length;
}

//this function returns the position of the last character of match within attrStr
function getPositionFromMatch(attrStr, match) {
  return attrStr.indexOf(match) + match.length;
}


/***/ }),

/***/ 9772:
/***/ ((module) => {

"use strict";


module.exports = function(tagname, parent, val) {
  this.tagname = tagname;
  this.parent = parent;
  this.child = {}; //child tags
  this.attrsMap = {}; //attributes map
  this.val = val; //text only
  this.addChild = function(child) {
    if (Array.isArray(this.child[child.tagname])) {
      //already presents
      this.child[child.tagname].push(child);
    } else {
      this.child[child.tagname] = [child];
    }
  };
};


/***/ }),

/***/ 1491:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(2159);
const buildOptions = (__nccwpck_require__(2159).buildOptions);
const xmlNode = __nccwpck_require__(9772);
const regx =
  '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
  .replace(/NAME/g, util.nameRegexp);

//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

//polyfill
if (!Number.parseInt && window.parseInt) {
  Number.parseInt = window.parseInt;
}
if (!Number.parseFloat && window.parseFloat) {
  Number.parseFloat = window.parseFloat;
}

const defaultOptions = {
  attributeNamePrefix: '@_',
  attrNodeName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false, //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseNodeValue: true,
  parseAttributeValue: false,
  arrayMode: false,
  trimValues: true, //Trim string values of tag and attributes
  cdataTagName: false,
  cdataPositionChar: '\\c',
  tagValueProcessor: function(a, tagName) {
    return a;
  },
  attrValueProcessor: function(a, attrName) {
    return a;
  },
  stopNodes: []
  //decodeStrict: false,
};

exports.defaultOptions = defaultOptions;

const props = [
  'attributeNamePrefix',
  'attrNodeName',
  'textNodeName',
  'ignoreAttributes',
  'ignoreNameSpace',
  'allowBooleanAttributes',
  'parseNodeValue',
  'parseAttributeValue',
  'arrayMode',
  'trimValues',
  'cdataTagName',
  'cdataPositionChar',
  'tagValueProcessor',
  'attrValueProcessor',
  'parseTrueNumberOnly',
  'stopNodes'
];
exports.props = props;

/**
 * Trim -> valueProcessor -> parse value
 * @param {string} tagName
 * @param {string} val
 * @param {object} options
 */
function processTagValue(tagName, val, options) {
  if (val) {
    if (options.trimValues) {
      val = val.trim();
    }
    val = options.tagValueProcessor(val, tagName);
    val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
  }

  return val;
}

function resolveNameSpace(tagname, options) {
  if (options.ignoreNameSpace) {
    const tags = tagname.split(':');
    const prefix = tagname.charAt(0) === '/' ? '/' : '';
    if (tags[0] === 'xmlns') {
      return '';
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}

function parseValue(val, shouldParse, parseTrueNumberOnly) {
  if (shouldParse && typeof val === 'string') {
    let parsed;
    if (val.trim() === '' || isNaN(val)) {
      parsed = val === 'true' ? true : val === 'false' ? false : val;
    } else {
      if (val.indexOf('0x') !== -1) {
        //support hexa decimal
        parsed = Number.parseInt(val, 16);
      } else if (val.indexOf('.') !== -1) {
        parsed = Number.parseFloat(val);
        val = val.replace(/\.?0+$/, "");
      } else {
        parsed = Number.parseInt(val, 10);
      }
      if (parseTrueNumberOnly) {
        parsed = String(parsed) === val ? parsed : val;
      }
    }
    return parsed;
  } else {
    if (util.isExist(val)) {
      return val;
    } else {
      return '';
    }
  }
}

//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

function buildAttributesMap(attrStr, options) {
  if (!options.ignoreAttributes && typeof attrStr === 'string') {
    attrStr = attrStr.replace(/\r?\n/g, ' ');
    //attrStr = attrStr || attrStr.trim();

    const matches = util.getAllMatches(attrStr, attrsRegx);
    const len = matches.length; //don't make it inline
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = resolveNameSpace(matches[i][1], options);
      if (attrName.length) {
        if (matches[i][4] !== undefined) {
          if (options.trimValues) {
            matches[i][4] = matches[i][4].trim();
          }
          matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
          attrs[options.attributeNamePrefix + attrName] = parseValue(
            matches[i][4],
            options.parseAttributeValue,
            options.parseTrueNumberOnly
          );
        } else if (options.allowBooleanAttributes) {
          attrs[options.attributeNamePrefix + attrName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (options.attrNodeName) {
      const attrCollection = {};
      attrCollection[options.attrNodeName] = attrs;
      return attrCollection;
    }
    return attrs;
  }
}

const getTraversalObj = function(xmlData, options) {
  xmlData = xmlData.replace(/\r\n?/g, "\n");
  options = buildOptions(options, defaultOptions, props);
  const xmlObj = new xmlNode('!xml');
  let currentNode = xmlObj;
  let textData = "";

//function match(xmlData){
  for(let i=0; i< xmlData.length; i++){
    const ch = xmlData[i];
    if(ch === '<'){
      if( xmlData[i+1] === '/') {//Closing Tag
        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.")
        let tagName = xmlData.substring(i+2,closeIndex).trim();

        if(options.ignoreNameSpace){
          const colonIndex = tagName.indexOf(":");
          if(colonIndex !== -1){
            tagName = tagName.substr(colonIndex+1);
          }
        }

        /* if (currentNode.parent) {
          currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue2(tagName, textData , options);
        } */
        if(currentNode){
          if(currentNode.val){
            currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tagName, textData , options);
          }else{
            currentNode.val = processTagValue(tagName, textData , options);
          }
        }

        if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
          currentNode.child = []
          if (currentNode.attrsMap == undefined) { currentNode.attrsMap = {}}
          currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1)
        }
        currentNode = currentNode.parent;
        textData = "";
        i = closeIndex;
      } else if( xmlData[i+1] === '?') {
        i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.")
      } else if(xmlData.substr(i + 1, 3) === '!--') {
        i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.")
      } else if( xmlData.substr(i + 1, 2) === '!D') {
        const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.")
        const tagExp = xmlData.substring(i, closeIndex);
        if(tagExp.indexOf("[") >= 0){
          i = xmlData.indexOf("]>", i) + 1;
        }else{
          i = closeIndex;
        }
      }else if(xmlData.substr(i + 1, 2) === '![') {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2
        const tagExp = xmlData.substring(i + 9,closeIndex);

        //considerations
        //1. CDATA will always have parent node
        //2. A tag with CDATA is not a leaf node so it's value would be string type.
        if(textData){
          currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData , options);
          textData = "";
        }

        if (options.cdataTagName) {
          //add cdata node
          const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
          currentNode.addChild(childNode);
          //for backtracking
          currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar;
          //add rest value to parent node
          if (tagExp) {
            childNode.val = tagExp;
          }
        } else {
          currentNode.val = (currentNode.val || '') + (tagExp || '');
        }

        i = closeIndex + 2;
      }else {//Opening tag
        const result = closingIndexForOpeningTag(xmlData, i+1)
        let tagExp = result.data;
        const closeIndex = result.index;
        const separatorIndex = tagExp.indexOf(" ");
        let tagName = tagExp;
        let shouldBuildAttributesMap = true;
        if(separatorIndex !== -1){
          tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, '');
          tagExp = tagExp.substr(separatorIndex + 1);
        }

        if(options.ignoreNameSpace){
          const colonIndex = tagName.indexOf(":");
          if(colonIndex !== -1){
            tagName = tagName.substr(colonIndex+1);
            shouldBuildAttributesMap = tagName !== result.data.substr(colonIndex + 1);
          }
        }

        //save text to parent node
        if (currentNode && textData) {
          if(currentNode.tagname !== '!xml'){
            currentNode.val = util.getValue(currentNode.val) + '' + processTagValue( currentNode.tagname, textData, options);
          }
        }

        if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){//selfClosing tag

          if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
            tagName = tagName.substr(0, tagName.length - 1);
            tagExp = tagName;
          }else{
            tagExp = tagExp.substr(0, tagExp.length - 1);
          }

          const childNode = new xmlNode(tagName, currentNode, '');
          if(tagName !== tagExp){
            childNode.attrsMap = buildAttributesMap(tagExp, options);
          }
          currentNode.addChild(childNode);
        }else{//opening tag

          const childNode = new xmlNode( tagName, currentNode );
          if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
            childNode.startIndex=closeIndex;
          }
          if(tagName !== tagExp && shouldBuildAttributesMap){
            childNode.attrsMap = buildAttributesMap(tagExp, options);
          }
          currentNode.addChild(childNode);
          currentNode = childNode;
        }
        textData = "";
        i = closeIndex;
      }
    }else{
      textData += xmlData[i];
    }
  }
  return xmlObj;
}

function closingIndexForOpeningTag(data, i){
  let attrBoundary;
  let tagExp = "";
  for (let index = i; index < data.length; index++) {
    let ch = data[index];
    if (attrBoundary) {
        if (ch === attrBoundary) attrBoundary = "";//reset
    } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
    } else if (ch === '>') {
        return {
          data: tagExp,
          index: index
        }
    } else if (ch === '\t') {
      ch = " "
    }
    tagExp += ch;
  }
}

function findClosingIndex(xmlData, str, i, errMsg){
  const closingIndex = xmlData.indexOf(str, i);
  if(closingIndex === -1){
    throw new Error(errMsg)
  }else{
    return closingIndex + str.length - 1;
  }
}

exports.getTraversalObj = getTraversalObj;


/***/ }),

/***/ 4503:
/***/ ((module) => {

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __spreadArray;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __classPrivateFieldIn;
var __createBinding;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if ( true && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

    __extends = function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };

    __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    /** @deprecated */
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    /** @deprecated */
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __spreadArray = function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };

    __classPrivateFieldIn = function (state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    exporter("__classPrivateFieldIn", __classPrivateFieldIn);
});


/***/ }),

/***/ 7735:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(8825);


/***/ }),

/***/ 8825:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 9986:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(9920));

var _v2 = _interopRequireDefault(__nccwpck_require__(3988));

var _v3 = _interopRequireDefault(__nccwpck_require__(8878));

var _v4 = _interopRequireDefault(__nccwpck_require__(4113));

var _nil = _interopRequireDefault(__nccwpck_require__(1785));

var _version = _interopRequireDefault(__nccwpck_require__(8611));

var _validate = _interopRequireDefault(__nccwpck_require__(1744));

var _stringify = _interopRequireDefault(__nccwpck_require__(9254));

var _parse = _interopRequireDefault(__nccwpck_require__(3847));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 8219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 1785:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 3847:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(1744));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 5257:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 2407:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 2382:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 9254:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(1744));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 9920:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(2407));

var _stringify = _interopRequireDefault(__nccwpck_require__(9254));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 3988:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(2761));

var _md = _interopRequireDefault(__nccwpck_require__(8219));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 2761:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(9254));

var _parse = _interopRequireDefault(__nccwpck_require__(3847));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 8878:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(2407));

var _stringify = _interopRequireDefault(__nccwpck_require__(9254));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 4113:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(2761));

var _sha = _interopRequireDefault(__nccwpck_require__(2382));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 1744:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(5257));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 8611:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(1744));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 115:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    maxResults: {
        ListServices: 20,
        ListOperations: 5,
    },
    retryTimeout: 5000,
};


/***/ }),

/***/ 4357:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createClient = void 0;
const client_apprunner_1 = __nccwpck_require__(2556);
const createClient = () => new client_apprunner_1.AppRunnerClient({});
exports.createClient = createClient;


/***/ }),

/***/ 3589:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pauseOrResume = void 0;
const client_apprunner_1 = __nccwpck_require__(2556);
const client_config_1 = __importDefault(__nccwpck_require__(115));
const client_factory_1 = __nccwpck_require__(4357);
const core_1 = __nccwpck_require__(3060);
const client = (0, client_factory_1.createClient)();
function pauseOrResume(name, operation, allowMissingService = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield findService(name);
        if (service != null) {
            (0, core_1.debug)('Found service, attempting operation');
            const operationId = yield doPauseOrResume(service, operation);
            if (operationId != null) {
                yield checkOperationUntilDone(service, operationId);
            }
        }
        else if (!allowMissingService) {
            throw new Error(`No service with name [${name}] could be found`);
        }
    });
}
exports.pauseOrResume = pauseOrResume;
function checkOperationUntilDone(service, operationId) {
    return __awaiter(this, void 0, void 0, function* () {
        let operation = yield findOperation(service, operationId);
        while (operation.Status !== client_apprunner_1.OperationStatus.FAILED &&
            operation.Status !== client_apprunner_1.OperationStatus.SUCCEEDED &&
            operation.Status !== client_apprunner_1.OperationStatus.ROLLBACK_FAILED &&
            operation.Status !== client_apprunner_1.OperationStatus.ROLLBACK_SUCCEEDED) {
            yield new Promise((resolve) => setTimeout(resolve, client_config_1.default.retryTimeout));
            operation = yield findOperation(service, operationId);
        }
        if (operation.Status === client_apprunner_1.OperationStatus.FAILED ||
            operation.Status === client_apprunner_1.OperationStatus.ROLLBACK_FAILED) {
            throw new Error('Pause operation failed!');
        }
    });
}
function findOperation({ ServiceArn }, operationId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.send(new client_apprunner_1.ListOperationsCommand({
            MaxResults: client_config_1.default.maxResults.ListOperations,
            ServiceArn,
        }));
        const operation = (_a = response.OperationSummaryList) === null || _a === void 0 ? void 0 : _a.find((summary) => summary.Id === operationId);
        if (operation == null) {
            throw new Error(`No operation with id [${operationId}] found!`);
        }
        return operation;
    });
}
function doPauseOrResume({ ServiceArn }, operation) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = { ServiceArn };
        const command = operation === 'pause'
            ? new client_apprunner_1.PauseServiceCommand(input)
            : new client_apprunner_1.ResumeServiceCommand(input);
        try {
            (0, core_1.debug)('Sending command');
            (0, core_1.debug)(operation);
            const { OperationId } = yield client.send(command);
            if (OperationId == null) {
                throw new Error('Operation submitted successfully but no OperationId was provided');
            }
            return OperationId;
        }
        catch (e) {
            throw new Error('Failed to submit operation');
        }
    });
}
function findService(name) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var _b = __asyncValues(findAllServices()), _c; _c = yield _b.next(), !_c.done;) {
                const summary = _c.value;
                if (summary.ServiceName === name) {
                    return summary;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    });
}
function findAllServices() {
    var _a, _b;
    return __asyncGenerator(this, arguments, function* findAllServices_1() {
        const MaxResults = client_config_1.default.maxResults.ListServices;
        const command = new client_apprunner_1.ListServicesCommand({ MaxResults });
        let response = yield __await(client.send(command));
        if (!((_a = response.ServiceSummaryList) === null || _a === void 0 ? void 0 : _a.length)) {
            return yield __await(void 0);
        }
        for (const summary of response.ServiceSummaryList) {
            yield yield __await(summary);
        }
        while (response.NextToken != null) {
            const command = new client_apprunner_1.ListServicesCommand({
                MaxResults,
                NextToken: response.NextToken,
            });
            response = yield __await(client.send(command));
            if (!((_b = response.ServiceSummaryList) === null || _b === void 0 ? void 0 : _b.length)) {
                break;
            }
            for (const summary of response.ServiceSummaryList) {
                yield yield __await(summary);
            }
        }
    });
}


/***/ }),

/***/ 8499:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __nccwpck_require__(3060);
const operation_1 = __nccwpck_require__(6176);
const impl_1 = __nccwpck_require__(3589);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = (0, core_1.getInput)('name');
        const operation = (0, core_1.getInput)('operation');
        const allowMissingService = (0, core_1.getInput)('allow-missing-service') === 'true';
        if ((0, operation_1.isOperation)(operation)) {
            yield (0, impl_1.pauseOrResume)(name, operation, allowMissingService);
        }
        else {
            throw new Error('Invalid value provided for operation, valid values are [resume, pause]');
        }
    });
}
run();


/***/ }),

/***/ 6176:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isOperation = void 0;
function isOperation(value) {
    return value === 'pause' || value === 'resume';
}
exports.isOperation = isOperation;


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 4300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5158:
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 7282:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 638:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@aws-sdk/client-apprunner","description":"AWS SDK for JavaScript Apprunner Client for Node.js, Browser and React Native","version":"3.181.0","scripts":{"build":"concurrently \'yarn:build:cjs\' \'yarn:build:es\' \'yarn:build:types\'","build:cjs":"tsc -p tsconfig.cjs.json","build:docs":"typedoc","build:es":"tsc -p tsconfig.es.json","build:include:deps":"lerna run --scope $npm_package_name --include-dependencies build","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"rimraf ./dist-* && rimraf *.tsbuildinfo"},"main":"./dist-cjs/index.js","types":"./dist-types/index.d.ts","module":"./dist-es/index.js","sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"2.0.0","@aws-crypto/sha256-js":"2.0.0","@aws-sdk/client-sts":"3.181.0","@aws-sdk/config-resolver":"3.178.0","@aws-sdk/credential-provider-node":"3.181.0","@aws-sdk/fetch-http-handler":"3.178.0","@aws-sdk/hash-node":"3.178.0","@aws-sdk/invalid-dependency":"3.178.0","@aws-sdk/middleware-content-length":"3.178.0","@aws-sdk/middleware-host-header":"3.178.0","@aws-sdk/middleware-logger":"3.178.0","@aws-sdk/middleware-recursion-detection":"3.178.0","@aws-sdk/middleware-retry":"3.178.0","@aws-sdk/middleware-serde":"3.178.0","@aws-sdk/middleware-signing":"3.179.0","@aws-sdk/middleware-stack":"3.178.0","@aws-sdk/middleware-user-agent":"3.178.0","@aws-sdk/node-config-provider":"3.178.0","@aws-sdk/node-http-handler":"3.178.0","@aws-sdk/protocol-http":"3.178.0","@aws-sdk/smithy-client":"3.180.0","@aws-sdk/types":"3.178.0","@aws-sdk/url-parser":"3.178.0","@aws-sdk/util-base64-browser":"3.170.0","@aws-sdk/util-base64-node":"3.170.0","@aws-sdk/util-body-length-browser":"3.170.0","@aws-sdk/util-body-length-node":"3.170.0","@aws-sdk/util-defaults-mode-browser":"3.180.0","@aws-sdk/util-defaults-mode-node":"3.180.0","@aws-sdk/util-user-agent-browser":"3.178.0","@aws-sdk/util-user-agent-node":"3.178.0","@aws-sdk/util-utf8-browser":"3.170.0","@aws-sdk/util-utf8-node":"3.170.0","tslib":"^2.3.1"},"devDependencies":{"@aws-sdk/service-client-documentation-generator":"3.170.0","@tsconfig/recommended":"1.0.1","@types/node":"^12.7.5","concurrently":"7.0.0","downlevel-dts":"0.10.1","rimraf":"3.0.2","typedoc":"0.19.2","typescript":"~4.6.2"},"overrides":{"typedoc":{"typescript":"~4.6.2"}},"engines":{"node":">=12.0.0"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["dist-*"],"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","browser":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.browser"},"react-native":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.native"},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-apprunner","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-apprunner"}}');

/***/ }),

/***/ 6725:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@aws-sdk/client-sso","description":"AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native","version":"3.181.0","scripts":{"build":"concurrently \'yarn:build:cjs\' \'yarn:build:es\' \'yarn:build:types\'","build:cjs":"tsc -p tsconfig.cjs.json","build:docs":"typedoc","build:es":"tsc -p tsconfig.es.json","build:include:deps":"lerna run --scope $npm_package_name --include-dependencies build","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"rimraf ./dist-* && rimraf *.tsbuildinfo"},"main":"./dist-cjs/index.js","types":"./dist-types/index.d.ts","module":"./dist-es/index.js","sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"2.0.0","@aws-crypto/sha256-js":"2.0.0","@aws-sdk/config-resolver":"3.178.0","@aws-sdk/fetch-http-handler":"3.178.0","@aws-sdk/hash-node":"3.178.0","@aws-sdk/invalid-dependency":"3.178.0","@aws-sdk/middleware-content-length":"3.178.0","@aws-sdk/middleware-host-header":"3.178.0","@aws-sdk/middleware-logger":"3.178.0","@aws-sdk/middleware-recursion-detection":"3.178.0","@aws-sdk/middleware-retry":"3.178.0","@aws-sdk/middleware-serde":"3.178.0","@aws-sdk/middleware-stack":"3.178.0","@aws-sdk/middleware-user-agent":"3.178.0","@aws-sdk/node-config-provider":"3.178.0","@aws-sdk/node-http-handler":"3.178.0","@aws-sdk/protocol-http":"3.178.0","@aws-sdk/smithy-client":"3.180.0","@aws-sdk/types":"3.178.0","@aws-sdk/url-parser":"3.178.0","@aws-sdk/util-base64-browser":"3.170.0","@aws-sdk/util-base64-node":"3.170.0","@aws-sdk/util-body-length-browser":"3.170.0","@aws-sdk/util-body-length-node":"3.170.0","@aws-sdk/util-defaults-mode-browser":"3.180.0","@aws-sdk/util-defaults-mode-node":"3.180.0","@aws-sdk/util-user-agent-browser":"3.178.0","@aws-sdk/util-user-agent-node":"3.178.0","@aws-sdk/util-utf8-browser":"3.170.0","@aws-sdk/util-utf8-node":"3.170.0","tslib":"^2.3.1"},"devDependencies":{"@aws-sdk/service-client-documentation-generator":"3.170.0","@tsconfig/recommended":"1.0.1","@types/node":"^12.7.5","concurrently":"7.0.0","downlevel-dts":"0.10.1","rimraf":"3.0.2","typedoc":"0.19.2","typescript":"~4.6.2"},"overrides":{"typedoc":{"typescript":"~4.6.2"}},"engines":{"node":">=12.0.0"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["dist-*"],"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","browser":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.browser"},"react-native":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.native"},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-sso"}}');

/***/ }),

/***/ 8133:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@aws-sdk/client-sts","description":"AWS SDK for JavaScript Sts Client for Node.js, Browser and React Native","version":"3.181.0","scripts":{"build":"concurrently \'yarn:build:cjs\' \'yarn:build:es\' \'yarn:build:types\'","build:cjs":"tsc -p tsconfig.cjs.json","build:docs":"typedoc","build:es":"tsc -p tsconfig.es.json","build:include:deps":"lerna run --scope $npm_package_name --include-dependencies build","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"rimraf ./dist-* && rimraf *.tsbuildinfo","test":"yarn test:unit","test:unit":"jest"},"main":"./dist-cjs/index.js","types":"./dist-types/index.d.ts","module":"./dist-es/index.js","sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"2.0.0","@aws-crypto/sha256-js":"2.0.0","@aws-sdk/config-resolver":"3.178.0","@aws-sdk/credential-provider-node":"3.181.0","@aws-sdk/fetch-http-handler":"3.178.0","@aws-sdk/hash-node":"3.178.0","@aws-sdk/invalid-dependency":"3.178.0","@aws-sdk/middleware-content-length":"3.178.0","@aws-sdk/middleware-host-header":"3.178.0","@aws-sdk/middleware-logger":"3.178.0","@aws-sdk/middleware-recursion-detection":"3.178.0","@aws-sdk/middleware-retry":"3.178.0","@aws-sdk/middleware-sdk-sts":"3.179.0","@aws-sdk/middleware-serde":"3.178.0","@aws-sdk/middleware-signing":"3.179.0","@aws-sdk/middleware-stack":"3.178.0","@aws-sdk/middleware-user-agent":"3.178.0","@aws-sdk/node-config-provider":"3.178.0","@aws-sdk/node-http-handler":"3.178.0","@aws-sdk/protocol-http":"3.178.0","@aws-sdk/smithy-client":"3.180.0","@aws-sdk/types":"3.178.0","@aws-sdk/url-parser":"3.178.0","@aws-sdk/util-base64-browser":"3.170.0","@aws-sdk/util-base64-node":"3.170.0","@aws-sdk/util-body-length-browser":"3.170.0","@aws-sdk/util-body-length-node":"3.170.0","@aws-sdk/util-defaults-mode-browser":"3.180.0","@aws-sdk/util-defaults-mode-node":"3.180.0","@aws-sdk/util-user-agent-browser":"3.178.0","@aws-sdk/util-user-agent-node":"3.178.0","@aws-sdk/util-utf8-browser":"3.170.0","@aws-sdk/util-utf8-node":"3.170.0","entities":"2.2.0","fast-xml-parser":"3.19.0","tslib":"^2.3.1"},"devDependencies":{"@aws-sdk/service-client-documentation-generator":"3.170.0","@tsconfig/recommended":"1.0.1","@types/node":"^12.7.5","concurrently":"7.0.0","downlevel-dts":"0.10.1","rimraf":"3.0.2","typedoc":"0.19.2","typescript":"~4.6.2"},"overrides":{"typedoc":{"typescript":"~4.6.2"}},"engines":{"node":">=12.0.0"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["dist-*"],"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","browser":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.browser"},"react-native":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.native"},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sts","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-sts"}}');

/***/ }),

/***/ 8974:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}');

/***/ }),

/***/ 5610:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"\'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\\"","QUOT":"\\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}');

/***/ }),

/***/ 664:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\\"","QUOT":"\\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}');

/***/ }),

/***/ 6833:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"amp":"&","apos":"\'","gt":">","lt":"<","quot":"\\""}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(8499);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;