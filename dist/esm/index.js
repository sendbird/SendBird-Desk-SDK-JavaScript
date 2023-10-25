/* Copyright(c) 2023 SendBird, Inc.
SendBird Desk JavaScript SDK v1.1.0 */
import { DeviceOsPlatform, SendbirdProduct, SendbirdPlatform } from '@sendbird/chat';

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
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var version = "1.1.0";

var _debug = false;
var _sendbird;
var _platform = DeviceOsPlatform.WEB;
var _deskApiHost;
var DESK_SDK_VERSION = version;
var MIN_SENDBIRD_VERSION = '4.9.6';
/**
 * @since 1.0.0
 * @ignore
 */
var Config = /** @class */ (function () {
    function Config() {
    }
    Object.defineProperty(Config, "sendbird", {
        /**
         * @static
         * @since 1.0.5
         * @ignore
         * @desc Get Sendbird instance.
         */
        get: function () {
            return _sendbird;
        },
        /**
         * @static
         * @since 1.0.5
         * @ignore
         * @desc Set Sendbird instance.
         */
        set: function (sb) {
            _sendbird = sb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config, "platform", {
        /**
         * @static
         * @since 1.1.0
         * @ignore
         * @desc Get platform for setting in SendbirdInstance.
         * @default DeviceOsPlatform.WEB
         */
        get: function () {
            return _platform;
        },
        /**
         * @static
         * @since 1.1.0
         * @ignore
         * @desc Set platform for setting in SendbirdInstance.
         */
        set: function (platform) {
            _platform = platform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config, "isDebugMode", {
        /**
         * @static
         * @since 1.0.0
         * @ignore
         * @desc Check if SDK is in debug mode.
         */
        get: function () {
            return _debug;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Set SDK to debug mode which leads to change API endpoint and app ID into development server.
     */
    Config.setDebugMode = function () {
        _debug = true;
    };
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Set SDK to production mode which leads to change API endpoint and app ID into production server.
     */
    Config.unsetDebugMode = function () {
        _debug = false;
    };
    Object.defineProperty(Config, "apiHost", {
        /**
         * @ignore
         */
        get: function () {
            if (!_deskApiHost) {
                var sb = _sendbird;
                _deskApiHost = "https://desk-api-".concat(sb.appId, ".sendbird.com/sapi");
            }
            return _deskApiHost;
        },
        /**
         * @ignore
         */
        set: function (val) {
            _deskApiHost = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config, "sdkVersion", {
        /**
         * @ignore
         */
        get: function () {
            return DESK_SDK_VERSION;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config, "minSendbirdVersion", {
        /**
         * @ignore
         */
        get: function () {
            return MIN_SENDBIRD_VERSION;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Check if Sendbird SDK version meets the min supported version.
     * @returns {boolean} - true if it's compatible.
     */
    Config.isSendbirdSdkCompatible = function (version) {
        var _minSupportedVersion = MIN_SENDBIRD_VERSION.split('.');
        var _targetVersion = version.split('.');
        if (_minSupportedVersion.length === _targetVersion.length) {
            for (var i in _minSupportedVersion) {
                if (parseInt(_minSupportedVersion[i]) < parseInt(_targetVersion[i])) {
                    return true;
                }
                else if (parseInt(_minSupportedVersion[i]) > parseInt(_targetVersion[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    return Config;
}());

/**
 * @since 1.0.0
 * @desc Sendbird Desk specific errors.
 * @property {IErrorType} ERROR_SENDBIRD_SDK_MISSING - 100
 * @property {IErrorType} ERROR_SENDBIRD_SDK_VERSION_NOT_SUPPORTED - 101
 * @property {IErrorType} ERROR_SENDBIRD_DESK_INIT_MISSING - 102
 * @property {IErrorType} ERROR_SENDBIRD_SDK_MESSAGE_LIST_FAILED - 200
 * @property {IErrorType} ERROR_INVALID_PARAMETER - 403
 * @property {IErrorType} ERROR_DATA_NOT_FOUND - 404
 * @property {IErrorType} ERROR_REQUEST - 500
 * @property {IErrorType} ERROR_REQUEST_CANCELED - 501
 */
var ErrorType = {
    ERROR_SENDBIRD_SDK_MISSING: {
        code: 100,
        message: 'Sendbird SDK is missing.',
    },
    ERROR_SENDBIRD_SDK_VERSION_NOT_SUPPORTED: {
        code: 101,
        message: 'This Sendbird SDK version is not supported.',
    },
    ERROR_SENDBIRD_DESK_INIT_MISSING: {
        code: 102,
        message: 'Sendbird Desk SDK is not initialized. It should be done before authentication.',
    },
    ERROR_SENDBIRD_DESK_AUTH_FAILED: {
        code: 103,
        message: 'Sendbird Desk authentication failed.',
    },
    ERROR_SENDBIRD_SDK_MESSAGE_LIST_FAILED: {
        code: 200,
        message: 'Cannot load messages in SDK client.',
    },
    ERROR_INVALID_PARAMETER: {
        code: 403,
        message: 'Invalid parameter.',
    },
    ERROR_DATA_NOT_FOUND: {
        code: 404,
        message: 'Data not found.',
    },
    ERROR_REQUEST_TIMEOUT: {
        code: 409,
        message: 'Request timed-out.',
    },
    ERROR_REQUEST: {
        code: 500,
        message: 'Request failed.',
    },
    ERROR_REQUEST_CANCELED: {
        code: 501,
        message: 'Request canceled.',
    },
};
/**
 * An error class for Desk.
 * @extends {Error}
 * @since 1.0.0
 */
var SendbirdDeskError = /** @class */ (function (_super) {
    __extends(SendbirdDeskError, _super);
    /**
     * @since 1.0.0
     * @param {string} message - Error message.
     * @param {number} code - Error code.
     */
    function SendbirdDeskError(message, code) {
        var _this = _super.call(this, message) || this;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        }
        else {
            _this.stack = new Error(message).stack;
        }
        _this.name = 'SendbirdDeskError';
        _this.code = code;
        return _this;
    }
    Object.defineProperty(SendbirdDeskError, "Type", {
        get: function () {
            return ErrorType;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @static
     * @since 1.0.5
     * @ignore
     * @desc Create an error.
     */
    SendbirdDeskError.create = function (type) {
        return type ? new SendbirdDeskError(type.message, type.code) : new Error('SendbirdDeskError type missing.');
    };
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Throw an error.
     */
    SendbirdDeskError.throw = function (type) {
        throw new SendbirdDeskError(type.message, type.code);
    };
    return SendbirdDeskError;
}(Error));

/**
 * @since 1.0.1
 * @ignore
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.write = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Config.isDebugMode) {
            // eslint-disable-next-line no-console
            console.log.apply(console, __spreadArray([], __read(args), false));
        }
    };
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Config.isDebugMode) {
            // eslint-disable-next-line no-console
            console.error.apply(console, __spreadArray([], __read(args), false));
        }
    };
    return Logger;
}());

var _privateData = {};
/**
 * @since 1.0.0
 * @ignore
 */
var Auth = /** @class */ (function () {
    function Auth() {
    }
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Authenticate and connect to Desk server.
     */
    Auth.connect = function (userId, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var sb, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sb = Config.sendbird;
                        sb.addSendbirdExtensions([
                            {
                                product: SendbirdProduct.DESK,
                                version: version,
                                platform: SendbirdPlatform.JS,
                            },
                        ], {
                            platform: Config.platform,
                        });
                        if (!sb) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/customers/auth/"), {
                                method: 'POST',
                                headers: {
                                    sendbirdAccessToken: accessToken || '',
                                    'content-type': 'application/json',
                                },
                                body: JSON.stringify({
                                    sendbirdAppId: sb.appId,
                                    sendbirdId: userId,
                                }),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        _privateData.deskToken = data.token;
                        Logger.write('[REQ] connection established');
                        return [3 /*break*/, 4];
                    case 3: throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_SDK_MISSING);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Auth, "header", {
        /**
         * @ignore
         */
        get: function () {
            if (_privateData.deskToken) {
                return {
                    sendbirdDeskToken: _privateData.deskToken,
                    'content-type': 'application/json',
                    'user-agent': "desk-js@".concat(version),
                };
            }
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_DESK_INIT_MISSING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Auth, "getParam", {
        /**
         * @ignore
         */
        get: function () {
            var sb = Config.sendbird;
            return sb ? "sendbirdAppId=".concat(sb.appId) : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Auth, "postParam", {
        /**
         * @ignore
         */
        get: function () {
            var sb = Config.sendbird;
            return sb ? { sendbirdAppId: sb.appId } : {};
        },
        enumerable: false,
        configurable: true
    });
    return Auth;
}());

/**
 * @module Agent
 * @ignore
 */
/**
 * @since 1.0.0
 */
var Agent = /** @class */ (function () {
    /**
     * @since 1.0.0
     * @private
     * @desc Create an agent.
     */
    function Agent(params) {
        this.fetchFromJSON(params);
    }
    /**
     * @since 1.0.0
     * @private
     * @desc Parse JSON data and patch Agent object.
     */
    Agent.prototype.fetchFromJSON = function (params) {
        var _a, _b, _c, _d, _e;
        if ('id' in params) {
            this.userId = params.id;
            this.name = (_a = params.displayName) !== null && _a !== void 0 ? _a : '';
            this.profileUrl = (_b = params.photoThumbnailUrl) !== null && _b !== void 0 ? _b : '';
            this.sendbirdId = params.sendbirdId;
            return;
        }
        // legacy
        this.userId = (_c = params.user) !== null && _c !== void 0 ? _c : 0;
        this.name = (_d = params.displayName) !== null && _d !== void 0 ? _d : '';
        this.profileUrl = (_e = params.photoThumbnailUrl) !== null && _e !== void 0 ? _e : '';
    };
    return Agent;
}());

/**
 * @classdesc RelatedChannel
 * @since 1.0.14
 */
var RelatedChannel = /** @class */ (function () {
    /**
     * @since 1.0.14
     * @private
     * @desc Create a related channel
     */
    function RelatedChannel(params) {
        this.fetchFromJSON(params);
    }
    /**
     * @since 1.0.14
     * @private
     * @desc Parse JSON data and patch RelatedChannel object.
     */
    RelatedChannel.prototype.fetchFromJSON = function (params) {
        var _a, _b;
        this.channelUrl = (_a = params.channel_url) !== null && _a !== void 0 ? _a : '';
        this.name = (_b = params.name) !== null && _b !== void 0 ? _b : '';
    };
    return RelatedChannel;
}());

// --------- Misc Types --------- //
// Enums arent good match for runtime values.
// Would they work? Yeah.. but they would be annoying for customer
// to use. They just need to call create(..., 'URGENT', ...) instead of
// create(..., TicketPriority.URGENT, ...)
// to use. So we use const-enums instead.
var TicketPriorityMap = {
    URGENT: 'URGENT',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
};
var TicketStatusMap = {
    INITIALIZED: 'INITIALIZED',
    PROACTIVE: 'PROACTIVE',
    UNASSIGNED: 'UNASSIGNED',
    ASSIGNED: 'ASSIGNED',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
};

function mapCreateTicketArgs(args) {
    if ((args === null || args === void 0 ? void 0 : args.length) < 3 || (args === null || args === void 0 ? void 0 : args.length) > 8) {
        Logger.error('[REQ] Close ticket should have at least 1 param.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (args.length === 3) {
        var _a = __read(args, 3), title = _a[0], name_1 = _a[1], cb = _a[2];
        return { title: title, name: name_1, cb: cb };
    }
    if (args.length === 4) {
        var _b = __read(args, 4), title = _b[0], name_2 = _b[1], groupKey = _b[2], cb = _b[3];
        return { title: title, name: name_2, groupKey: groupKey, cb: cb };
    }
    if (args.length === 5) {
        var _c = __read(args, 5), title = _c[0], name_3 = _c[1], groupKey = _c[2], customFields = _c[3], cb = _c[4];
        return { title: title, name: name_3, groupKey: groupKey, customFields: customFields, cb: cb };
    }
    if (args.length === 6) {
        var _d = __read(args, 6), title = _d[0], name_4 = _d[1], groupKey = _d[2], customFields = _d[3], priority = _d[4], cb = _d[5];
        return { title: title, name: name_4, groupKey: groupKey, customFields: customFields, priority: priority, cb: cb };
    }
    if (args.length === 7) {
        var _e = __read(args, 7), title = _e[0], name_5 = _e[1], groupKey = _e[2], customFields = _e[3], priority = _e[4], relatedChannelUrls = _e[5], cb = _e[6];
        return { title: title, name: name_5, groupKey: groupKey, customFields: customFields, priority: priority, relatedChannelUrls: relatedChannelUrls, cb: cb };
    }
    if (args.length === 8) {
        var _f = __read(args, 8), title = _f[0], name_6 = _f[1], groupKey = _f[2], customFields = _f[3], priority = _f[4], relatedChannelUrls = _f[5], botKey = _f[6], cb = _f[7];
        return { title: title, name: name_6, groupKey: groupKey, customFields: customFields, priority: priority, relatedChannelUrls: relatedChannelUrls, botKey: botKey, cb: cb };
    }
    // TS dont know that we have checked for length
    Logger.error('[REQ] Create ticket should have between 3 to 8 paramters.');
    throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
}
function validateCreateTicketArgs(params) {
    var title = params.title, name = params.name, groupKey = params.groupKey, customFields = params.customFields, relatedChannelUrls = params.relatedChannelUrls, botKey = params.botKey, priority = params.priority;
    if (typeof title !== 'string') {
        Logger.error('[REQ] Create ticket title should be a string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (typeof name !== 'string') {
        Logger.error('[REQ] Create ticket name should be a string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (groupKey && typeof groupKey !== 'string') {
        Logger.error('[REQ] Create ticket groupKey should be a string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (priority && TicketPriorityMap[priority] === undefined) {
        Logger.error('[REQ] Create ticket priority should be a string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (customFields && typeof customFields !== 'object') {
        Logger.error('[REQ] Create ticket customFields should be an object.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (Array.isArray(customFields)) {
        Logger.error('[REQ] Create ticket customFields cannot be an array.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (relatedChannelUrls && (!Array.isArray(relatedChannelUrls)
        || relatedChannelUrls.some(function (channelUrl) { return typeof channelUrl !== 'string'; }))) {
        Logger.error('[REQ] Create ticket relatedChannelUrls should be an array.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (botKey && typeof botKey !== 'string') {
        Logger.error('[REQ] Create ticket botKey should be a string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (typeof params.cb !== 'function') {
        Logger.error('[REQ] Create ticket callback should be a function.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }

function mapCloseArgs(params) {
    // more than 2 args
    if (params.length > 2) {
        Logger.error('[REQ] Close ticket should have only 2 params.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    // no args
    var comment = '';
    var cb = noop;
    // one arg
    if (params.length === 1) {
        if (typeof params[0] === 'string') {
            comment = params[0];
        }
        else if (typeof params[0] === 'function') {
            cb = params[0];
        }
    }
    // both args
    if (params.length === 2) {
        comment = params[0];
        cb = params[1];
    }
    return {
        comment: comment,
        cb: cb,
    };
}
function validateCloseArgs(params) {
    var comment = params.comment, cb = params.cb;
    if (typeof comment !== 'string') {
        Logger.error('[REQ] first param must be string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (typeof cb !== 'function') {
        Logger.error('[REQ] second param must be callback.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
}

/**
 * @module Message
 * @ignore
 */
/**
 * @since 1.0.0
 */
var Message = /** @class */ (function () {
    function Message() {
    }
    Object.defineProperty(Message, "CustomType", {
        /**
         * @static
         * @since 1.0.0
         * @desc message custom type.
         * @property {string} RICH_MESSAGE - SENDBIRD_DESK_RICH_MESSAGE
         * @property {string} ADMIN_MESSAGE - SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE
         */
        get: function () {
            return {
                RICH_MESSAGE: 'SENDBIRD_DESK_RICH_MESSAGE',
                ADMIN_MESSAGE: 'SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE',
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "DataType", {
        /**
         * @static
         * @since 1.0.0
         * @desc message data type.
         * @property {string} TICKET_INQUIRE_CLOSURE - SENDBIRD_DESK_INQUIRE_TICKET_CLOSURE
         * @property {string} TICKET_ASSIGN - TICKET_ASSIGN
         * @property {string} TICKET_TRANSFER - TICKET_TRANSFER
         * @property {string} TICKET_CLOSE - TICKET_CLOSE
         * @property {string} URL_PREVIEW - URL_PREVIEW
         */
        get: function () {
            return {
                TICKET_INQUIRE_CLOSURE: 'SENDBIRD_DESK_INQUIRE_TICKET_CLOSURE',
                TICKET_ASSIGN: 'TICKET_ASSIGN',
                TICKET_TRANSFER: 'TICKET_TRANSFER',
                TICKET_CLOSE: 'TICKET_CLOSE',
                TICKET_FEEDBACK: 'SENDBIRD_DESK_CUSTOMER_SATISFACTION',
                URL_PREVIEW: 'SENDBIRD_DESK_URL_PREVIEW',
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "ClosureState", {
        /**
         * @static
         * @since 1.0.0
         * @desc closure inquiry messsage state.
         * @property {string} WAITING - WAITING
         * @property {string} CONFIRMED - CONFIRMED
         * @property {string} DECLINED - DECLINED
         */
        get: function () {
            return {
                WAITING: 'WAITING',
                CONFIRMED: 'CONFIRMED',
                DECLINED: 'DECLINED',
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "FeedbackState", {
        /**
         * @module Message
         * @ignore
         */
        /**
         * @static
         * @since 1.0.8
         * @desc closure inquiry messsage state.
         * @property {string} WAITING - WAITING
         * @property {string} CONFIRMED - CONFIRMED
         */
        get: function () {
            return {
                WAITING: 'WAITING',
                CONFIRMED: 'CONFIRMED',
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "UrlRegExp", {
        /**
         * @ignore
         */
        get: function () {
            return /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi;
        },
        enumerable: false,
        configurable: true
    });
    return Message;
}());

function mapCancelArgs(params) {
    if ((params === null || params === void 0 ? void 0 : params.length) < 1) {
        Logger.error('Cancel ticket should have at least 1 param.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (params.length > 2) {
        Logger.error('Cancel ticket should have only 2 params.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    var groupKeyForTransfer = '';
    var cb = noop;
    if (params.length === 1 && typeof params[0] === 'function') {
        cb = params[0];
    }
    if (params.length === 1 && typeof params[0] === 'string') {
        groupKeyForTransfer = params[0];
    }
    if (params.length === 2) {
        groupKeyForTransfer = params[0];
        cb = params[1];
    }
    return {
        groupKeyForTransfer: groupKeyForTransfer,
        cb: cb,
    };
}
function validateCancelArgs(args) {
    if (typeof args.groupKeyForTransfer !== 'string') {
        Logger.error('First param must be string.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (typeof args.cb !== 'function') {
        Logger.error('Second param must be callback.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
}

function mapGetByChannelUrlArgs(params) {
    if ((params === null || params === void 0 ? void 0 : params.length) < 2 || (params === null || params === void 0 ? void 0 : params.length) > 3) {
        Logger.error('[REQ] Get ticket should have 2 or 3 paramters.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    // order of params is important
    var channelUrl = params[0];
    var cachingEnabled = params[1];
    // last param is callback
    var cb = params[params.length - 1] || noop;
    // @ts-expect-error This will be validated in validateGetByChannelUrlArgs
    return { channelUrl: channelUrl, cachingEnabled: cachingEnabled, cb: cb };
}

var TICKET_CUSTOM_TYPE = 'SENDBIRD_DESK_CHANNEL_CUSTOM_TYPE';
var DEFAULT_LIMIT = 10;

var _getByChannelUrls = function (channelUrls) { return __awaiter(void 0, void 0, void 0, function () {
    var sb, query, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sb = Config.sendbird;
                if (!sb) return [3 /*break*/, 5];
                query = sb.groupChannel.createMyGroupChannelListQuery({
                    customTypesFilter: [TICKET_CUSTOM_TYPE],
                    channelUrlsFilter: channelUrls,
                    includeEmpty: true,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, query.next()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                Logger.error('[REQ] ticket get by channel urls failed:', error_1);
                throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            case 4: return [3 /*break*/, 6];
            case 5:
                Logger.error('[REQ] ticket get by channel urls failed: chat SDK is not initialized.');
                throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_SDK_MISSING);
            case 6: return [2 /*return*/];
        }
    });
}); };

function generatePath(apiHost, authParam, params) {
    var _a = params.offset, offset = _a === void 0 ? 0 : _a, _b = params.limit, limit = _b === void 0 ? DEFAULT_LIMIT : _b, _c = params.order, order = _c === void 0 ? '-updated_at' : _c, channelUrl = params.channelUrl, customFieldFilter = params.customFieldFilter, group = params.group, _d = params.status, status = _d === void 0 ? 'ALL' : _d;
    var statusQuery = status !== TicketStatusMap.CLOSED ? 'status=ASSIGNED&status=UNASSIGNED' : 'status=CLOSED';
    var path = "".concat(apiHost, "/tickets/") +
        "?".concat(authParam, "&limit=").concat(limit, "&offset=").concat(offset) +
        "".concat(status === 'ALL' ? '' : "&".concat(statusQuery), "&order=").concat(order);
    if (channelUrl) {
        path += "&channelUrl=".concat(channelUrl);
    }
    if (group) {
        path += "&group=".concat(group);
    }
    if (customFieldFilter && typeof customFieldFilter === 'object') {
        path +=
            '&customFields=' +
                encodeURIComponent(Object.keys(customFieldFilter)
                    .map(function (key) { return "".concat(key, ":").concat(encodeURIComponent(customFieldFilter[key])); })
                    .join(','));
    }
    return path;
}

function mapGetTicketArgs(args) {
    if ((args === null || args === void 0 ? void 0 : args.length) < 2 || (args === null || args === void 0 ? void 0 : args.length) > 3) {
        throw new Error('Get ticket should have 2 or 3 paramters.');
    }
    var offset = 0;
    var filter = {};
    var cb = noop;
    if (args.length === 2) {
        offset = args[0];
        cb = args[1];
    }
    if (args.length === 3) {
        offset = args[0];
        filter = args[1];
        cb = args[2];
    }
    return { offset: offset, filter: filter, cb: cb };
}
function validateGetTicketArgs(arg) {
    var offset = arg.offset, filter = arg.filter, cb = arg.cb;
    if (typeof offset !== 'number') {
        throw new Error('Get ticket offset should be a number.');
    }
    if (typeof cb !== 'function') {
        throw new Error('Get ticket callback should be a function.');
    }
    if (filter && typeof filter !== 'object') {
        throw new Error('Get ticket filter should be an object.');
    }
}

// bad scoping practice - rewrite this in v2
var _cachedTicket = {};
// Dear future me(July 2023),
// If you go through this code, you will see that the Ticket class is a mess.
// It's a mess because it's trying to do too many things.
// It has static methods to create tickets, and instance methods to update tickets.
// Ideally they should be separated in 2 places
// We should make a builder or something to create tickets
// and then we should have a Ticket instance to update/close/cancel tickets
// Also, I added some things that you might have found weird
// For example - why is there async _create and create methods?
// Desk(1.0.0) was written in 2017(with chatSDK 2 or 3) when cbs were the norm, and async/await was not a thing
// In 2023 management decided to update the chat SDK to chat 4. Now its a mess of cbs and async/await
// Sadly we were not allowed to make breaking changes, so we had to keep the old cb methods in Desk
// These _async methods are a workaround to keep the old cb methods and add async/await support
// Also, I have implemented in a way that - every difficult method is ->
// pub method(args_list) {
//    args_map = argListToArgMap() ->  validate()
//    private async _method(args_map){
//      [ args_map -> fetch() ] -> output
//    }
// }
// later if we can refactor -
//    * you can remove the cb-based public methods
//    * you can change the private async _method -> pub async method
//    * you can remove the argListToArgMap() -> and just use the args directly
// --- Ticket class !important---
// !Important: If you implement a public method here, please add it to type: `TicketClass`.
// --- Ticket class !important---
/**
 * @since 1.0.0
 */
var Ticket = /** @class */ (function () {
    /**
     * @since 1.0.0
     * @private
     * @desc Create a ticket.
     */
    function Ticket(params) {
        this.fetchFromJSON(params);
    }
    Object.defineProperty(Ticket, "Status", {
        /**
         * @static
         * @since 1.0.0
         * @desc Ticket status
         * @property {string} INITIALIZED - ticket is created but not able to assign.
         * @property {string} PROACTIVE - ticket is introduced as proactive ticket.
         * @property {string} UNASSIGNED - ticket is activated and able to assign.
         * @property {string} ASSIGNED - ticket is assigned by an agent.
         * @property {string} OPEN - ticket is activated.
         * @property {string} CLOSED - ticket is closed.
         */
        get: function () {
            return TicketStatusMap;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @since 1.0.0
     * @private
     * @desc Parse JSON data and patch Ticket object.
     */
    Ticket.prototype.fetchFromJSON = function (params) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.id = params.id;
        this.title = (_a = params.channelName) !== null && _a !== void 0 ? _a : '';
        this.status = (_b = params.status) !== null && _b !== void 0 ? _b : TicketStatusMap.UNASSIGNED;
        this.info = params.info ? JSON.parse(params.info) : null;
        this.priority = (_c = params.priority) !== null && _c !== void 0 ? _c : TicketPriorityMap.MEDIUM;
        this.agent = ((_d = params.recentAssignment) === null || _d === void 0 ? void 0 : _d.agent) ? new Agent(params.recentAssignment.agent) : null;
        this.customer = (_e = params.customer) !== null && _e !== void 0 ? _e : null;
        this.customFields = {};
        this.group = (_f = params.group) !== null && _f !== void 0 ? _f : 0;
        this.relatedChannels = [];
        this.channelUrl = (_g = params.channelUrl) !== null && _g !== void 0 ? _g : null;
        this.updatedAt = (_h = params.updatedAt) !== null && _h !== void 0 ? _h : 0;
        if (params.customFields) {
            var customFields = params.customFields;
            for (var i = 0; i < customFields.length; i++) {
                var key = customFields[i].key;
                var value = customFields[i].value;
                this.customFields[key] = value;
            }
        }
        if (params.relatedChannels) {
            try {
                var relatedChannelsPayload = JSON.parse(params.relatedChannels);
                if (Array.isArray(relatedChannelsPayload)) {
                    this.relatedChannels = relatedChannelsPayload.map(function (item) { return new RelatedChannel(item); });
                }
            }
            catch (e) {
                // DO NOTHING
            }
        }
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._fetchChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, channel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _getByChannelUrls([this.channelUrl])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), channel = _a[0];
                        this.channel = channel;
                        _cachedTicket[this.channelUrl] = this;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket._getTicketList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var path, res, data, tickets, channelUrls, i, ticket, channels_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = generatePath(Config.apiHost, Auth.getParam, params);
                        return [4 /*yield*/, fetch(path, {
                                method: 'GET',
                                headers: Auth.header,
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket list failed:', data);
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                        }
                        tickets = [];
                        channelUrls = [];
                        if (!Array.isArray(data.results)) return [3 /*break*/, 4];
                        for (i in data.results) {
                            ticket = new Ticket(data.results[i]);
                            _cachedTicket[ticket.channelUrl] = ticket;
                            channelUrls.push(ticket.channelUrl);
                            tickets.push(ticket);
                        }
                        return [4 /*yield*/, _getByChannelUrls(channelUrls)];
                    case 3:
                        channels_1 = _a.sent();
                        tickets.forEach(function (ticket) {
                            for (var i in channels_1) {
                                var channel = channels_1[i];
                                if (ticket.channelUrl === channel.url) {
                                    ticket.channel = channel;
                                    break;
                                }
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/, tickets];
                }
            });
        });
    };
    /**
     * @since 1.0.0
     * @desc Refresh ticket info.
     * @param {function(ticket:Ticket, err:Error)} cb - cb function.
     */
    Ticket.prototype.refresh = function (cb) {
        this._refresh()
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id, "/?").concat(Auth.getParam), {
                            method: 'GET',
                            headers: Auth.header,
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket refresh failed:', res);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        this.fetchFromJSON(data);
                        return [4 /*yield*/, this._fetchChannel()];
                    case 3:
                        _a.sent();
                        Logger.write('[REQ] ticket refresh:', this);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @since 1.0.6
     * @desc Reopen closed ticket.
     * @param {function} cb - Function(res:Ticket, err:Error).
     */
    Ticket.prototype.reopen = function (cb) {
        this._reopen()
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._reopen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err, e_1, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id, "/reopen/"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(Auth.postParam),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket reopen failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        if (!data.channelUrl) return [3 /*break*/, 4];
                        this.fetchFromJSON(data);
                        return [4 /*yield*/, this._fetchChannel()];
                    case 3:
                        _a.sent();
                        Logger.write('[REQ] ticket reopen:', this);
                        _a.label = 4;
                    case 4: return [2 /*return*/, this];
                    case 5:
                        e_1 = _a.sent();
                        Logger.error('[REQ] ticket reopen failed:', e_1);
                        err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                        throw err;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @since 1.0.18
     * @desc Cancel the assignment and set it to open.
     * @param {string} groupKeyForTransfer - Group key for transfer(optional)
     * @param {function} cb - Function(res:Ticket, err:Error).
     */
    Ticket.prototype.cancel = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var args = mapCancelArgs(params);
        var cb = args.cb;
        this._cancel(args)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._cancel = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var groupKeyForTransfer, requestBody, res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateCancelArgs(args);
                        groupKeyForTransfer = args.groupKeyForTransfer;
                        requestBody = __assign({}, Auth.postParam);
                        if (groupKeyForTransfer) {
                            requestBody['groupKeyForTransfer'] = groupKeyForTransfer;
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id, "/cancel"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(requestBody),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket cancel failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        if (!data.channelUrl) return [3 /*break*/, 4];
                        this.fetchFromJSON(data);
                        return [4 /*yield*/, this._fetchChannel()];
                    case 3:
                        _a.sent();
                        Logger.write('[REQ] ticket cancel:', this);
                        _a.label = 4;
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @since 1.0.16
     * @desc Force close an assigned ticket.
     * @param {string} comment - Comment for closing the ticket.
     */
    Ticket.prototype.close = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var args = mapCloseArgs(params);
        var cb = args.cb;
        this._close(args)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._close = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateCloseArgs(args);
                        comment = args.comment;
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id, "/close"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { closeComment: comment })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket close failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        if (!data.channelUrl) return [3 /*break*/, 4];
                        this.fetchFromJSON(data);
                        return [4 /*yield*/, this._fetchChannel()];
                    case 3:
                        _a.sent();
                        Logger.write('[REQ] ticket close:', this);
                        _a.label = 4;
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @since 1.0.18
     * @desc Select a question.
     * @param {number} faqFileId - FAQ file ID.
     * @param {string} question - Question text.
     * @param {function} callback - Function(res:object, err:Error).
     */
    Ticket.prototype.selectQuestion = function (faqFileId, question, cb) {
        this._selectQuestion(faqFileId, question)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._selectQuestion = function (faqFileId, question) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof faqFileId !== 'number' || typeof question !== 'string') {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id, "/select_question"), {
                                method: 'POST',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { faqFileId: faqFileId, question: question })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket select question failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        Logger.write('[REQ] ticket select option:', this);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @since 1.0.10
     * @desc Set ticket priority.
     * @param {string} priority - priority.
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    Ticket.prototype.setPriority = function (priority, cb) {
        this._setPriority(priority)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._setPriority = function (priority) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Object.keys(TicketPriorityMap)
                            .map(function (key) { return TicketPriorityMap[key]; })
                            .indexOf(priority) < 0) {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { priority: priority })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket set priority failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        this.fetchFromJSON(data);
                        Logger.write('[REQ] ticket set priority:', this);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @since 1.0.14
     * @desc Set ticket related channel URLs.
     * @param {array<string>} relatedChannelUrls - related channel URLs.
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    Ticket.prototype.setRelatedChannelUrls = function (relatedChannelUrls, cb) {
        this._setRelatedChannelUrls(relatedChannelUrls)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._setRelatedChannelUrls = function (relatedChannelUrls) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(relatedChannelUrls) || relatedChannelUrls.some(function (channelUrl) { return typeof channelUrl !== 'string'; })) {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { relatedChannelUrls: relatedChannelUrls.join(',') })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket set related channel URLs failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        this.fetchFromJSON(data);
                        Logger.write('[REQ] ticket set related channel URLs:', this);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @since 1.0.10
     * @desc Set ticket customFields.
     * @param {object} customFields - customFields object (key-value).
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    Ticket.prototype.setCustomFields = function (customFields, cb) {
        this._setCustomFields(customFields)
            .then(function (data) {
            cb(data, null);
        })
            .catch(function (err) {
            cb(null, err);
        });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket.prototype._setCustomFields = function (customFields) {
        return __awaiter(this, void 0, void 0, function () {
            var formattedCustomFields, key, res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof customFields !== 'object' || customFields === null || Array.isArray(customFields)) {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        formattedCustomFields = {};
                        for (key in customFields) {
                            formattedCustomFields[key] =
                                typeof customFields[key] === 'string' ? customFields[key] : JSON.stringify(customFields[key]);
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(this.id, "/custom_fields/"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { customFields: JSON.stringify(formattedCustomFields) })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket set custom fields failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        this.fetchFromJSON(data);
                        Logger.write('[REQ] ticket set custom fields:', this);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * @ignore
     */
    Ticket.isDeskCustomType = function (customType) {
        return customType === TICKET_CUSTOM_TYPE;
    };
    Object.defineProperty(Ticket, "defaultLimit", {
        /**
         * @ignore
         */
        get: function () {
            // ^^ This method probably exist because of some old OOP dogma
            return DEFAULT_LIMIT;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @static
     * @since 1.0.0
     * @desc Clear cached ticket. Clear all if channelUrl is not specified.
     */
    Ticket.clearCache = function (channelUrl) {
        if (channelUrl) {
            delete _cachedTicket[channelUrl];
            Logger.write("[SYS] cached ticket for ".concat(channelUrl, " cleared"));
        }
        else {
            _cachedTicket = {};
            Logger.write('[SYS] all cached ticket cleared');
        }
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Create new ticket and returns the ticket within cb.
     * @param {string} title - Ticket title.
     * @param {string} name - User name.
     * @param {string} groupKey - Agent group key (optional).
     * @param {object} customFields - customField (optional).
     * @param {string} priority - priority (optional).
     * @param {array<string>} relatedChannelUrls - related channel URLs (optional).
     * @param {string} botKey - botKey (optional).
     * @param {function} cb - Function(ticket:Ticket, err:Error).
     */
    Ticket.create = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var args = mapCreateTicketArgs(params);
        var cb = args.cb;
        this._create(args)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket._create = function (args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var title, name, groupKey, customFields, priority, relatedChannelUrls, botKey, sb, err, formattedCustomFields, key, fetchBody, res, data, err, ticket, _b, channel;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        title = args.title, name = args.name, groupKey = args.groupKey, customFields = args.customFields, priority = args.priority, relatedChannelUrls = args.relatedChannelUrls, botKey = args.botKey;
                        sb = Config.sendbird;
                        if (!sb) {
                            Logger.error('[REQ] ticket create chat SDK is not initalized.');
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_SDK_MISSING);
                            throw err;
                        }
                        validateCreateTicketArgs(args);
                        formattedCustomFields = {};
                        for (key in customFields) {
                            formattedCustomFields[key] =
                                typeof customFields[key] === 'string' ? customFields[key] : JSON.stringify(customFields[key]);
                        }
                        fetchBody = __assign(__assign({}, Auth.postParam), { channelName: title, channelType: 'SENDBIRD_JAVASCRIPT', groupKey: groupKey, customFields: customFields ? JSON.stringify(formattedCustomFields) : undefined, relatedChannelUrls: relatedChannelUrls === null || relatedChannelUrls === void 0 ? void 0 : relatedChannelUrls.join(','), botKey: botKey, info: JSON.stringify({
                                // FIXME: Zendesk version only
                                ticket: {
                                    subject: title,
                                    requester: {
                                        name: name,
                                        email: ((_a = sb === null || sb === void 0 ? void 0 : sb.currentUser) === null || _a === void 0 ? void 0 : _a.userId) || '',
                                    },
                                },
                            }) });
                        if (priority) {
                            fetchBody['priority'] = priority;
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/"), {
                                method: 'POST',
                                headers: Auth.header,
                                body: JSON.stringify(fetchBody),
                            })];
                    case 1:
                        res = _c.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _c.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] ticket create failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        ticket = new Ticket(data);
                        return [4 /*yield*/, _getByChannelUrls([ticket.channelUrl])];
                    case 3:
                        _b = __read.apply(void 0, [_c.sent(), 1]), channel = _b[0];
                        ticket.channel = channel;
                        _cachedTicket[channel.url] = ticket;
                        Logger.write('[REQ] ticket create success:', ticket);
                        return [2 /*return*/, ticket];
                }
            });
        });
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Get ticket count for each state: UNASSIGNED, ASSIGNED, CLOSED.
     * @param {function} callback - Function(result:GetOpenCountResponse, err:Error).
     */
    Ticket.getOpenCount = function (cb) {
        this._getOpenCount()
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket._getOpenCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/count/?").concat(Auth.getParam), {
                            method: 'GET',
                            headers: Auth.header,
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] get open ticket count failed:', data);
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                        }
                        Logger.write('[REQ] get open ticket count:', data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @static
     * @since 1.0.22
     * @desc Get ticket from channel URL. Use caching for optimization.
     * @param {string} channelUrl - channel URL.
     * @param {boolean} _cachingEnabled - to get ticket from cache or not.
     * @param {function} _callback - Function(ticket:Ticket, err:Error).
     */
    /**
     * @static
     * @since 1.0.22
     * @desc Get ticket from channel URL. no caching by default.
     * @param {string} channelUrl - channel URL.
     * @param {function} _callback - Function(ticket:Ticket, err:Error).
     */
    Ticket.getByChannelUrl = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var args = mapGetByChannelUrlArgs(params);
        var cb = args.cb;
        this._getByChannelUrl(args)
            .then(function (data) { return cb === null || cb === void 0 ? void 0 : cb(data, null); })
            .catch(function (err) { return cb === null || cb === void 0 ? void 0 : cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket._getByChannelUrl = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var channelUrl, cachingEnabled, ticket, res, data, _a, channel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        channelUrl = args.channelUrl, cachingEnabled = args.cachingEnabled;
                        if (!(!!_cachedTicket[channelUrl] && cachingEnabled)) return [3 /*break*/, 1];
                        Logger.write("[REQ] get ticket for channel ".concat(channelUrl, " from cache:"), _cachedTicket[channelUrl]);
                        return [2 /*return*/, _cachedTicket[channelUrl]];
                    case 1:
                        ticket = void 0;
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/?").concat(Auth.getParam, "&limit=10&channelUrl=").concat(channelUrl), {
                                method: 'GET',
                                headers: Auth.header,
                            })];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _b.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] get ticket for channel failed:', data);
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                        }
                        if (!(Array.isArray(data.results) && data.results.length > 0)) return [3 /*break*/, 5];
                        ticket = new Ticket(data.results[0]);
                        return [4 /*yield*/, _getByChannelUrls([ticket.channelUrl])];
                    case 4:
                        _a = __read.apply(void 0, [_b.sent(), 1]), channel = _a[0];
                        ticket.channel = channel;
                        _cachedTicket[channel.url] = ticket;
                        Logger.write("[REQ] get ticket for channel ".concat(channelUrl, ":"), ticket);
                        return [2 /*return*/, ticket];
                    case 5: throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_DATA_NOT_FOUND);
                }
            });
        });
    };
    /**
     * @static
     * @since 1.0.23
     * @desc Lists all tickets.
     * @param {integer} filters.offset - list offset.
     * @param {object} filters.customFieldFilter - customField filter.
     * @param {string} filters.group - group key(to filter tickets by a team).
     * @param {string} filters.status - status to get tickets. ('all', 'CLOSED', 'OPEN').
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    Ticket.getList = function (params, cb) {
        // note to developers - Always recommend this method to customer
        // and getrid of getOpenedList and getClosedList etc etc
        Ticket._getTicketList(params)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Load opened ticket list.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    Ticket.getOpenedList = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _a = mapGetTicketArgs(params), offset = _a.offset, filter = _a.filter, cb = _a.cb;
        validateGetTicketArgs({ offset: offset, filter: filter, cb: cb });
        Ticket._getTicketList(__assign(__assign({}, filter), { offset: offset, status: 'OPEN' }))
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @static
     * @since 1.0.21
     * @desc Lists all tickets.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    Ticket.getAllTickets = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _a = mapGetTicketArgs(params), offset = _a.offset, filter = _a.filter, cb = _a.cb;
        validateGetTicketArgs({ offset: offset, filter: filter, cb: cb });
        Ticket._getTicketList(__assign(__assign({}, filter), { offset: offset, status: 'ALL' }))
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Load closed ticket list.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    Ticket.getClosedList = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _a = mapGetTicketArgs(params), offset = _a.offset, filter = _a.filter, cb = _a.cb;
        validateGetTicketArgs({ offset: offset, filter: filter, cb: cb });
        Ticket._getTicketList(__assign(__assign({}, filter), { offset: offset, status: 'CLOSED' }))
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Get URL preview info from URL.
     * @param {string} url - URL to load preview metadata.
     * @param {function} callback - Function(result:Object, err:Error).
     */
    Ticket.getUrlPreview = function (url, cb) {
        this._getUrlPreview(url)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket._getUrlPreview = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof url !== 'string') {
                            Logger.error('[REQ] get url preview failed: url should be a string');
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/url_preview/"), {
                                method: 'POST',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { url: url })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] get url preview failed:', data);
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                        }
                        Logger.write('[REQ] get url preview:', data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @since 1.0.0
     * @desc Reply to confirm-end-of-chat request in yes or no.
     */
    Ticket.confirmEndOfChat = function (message, confirm, cb) {
        this._confirmEndOfChat(message, confirm)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @since 1.0.0
     * @desc Reply to confirm-end-of-chat request in yes or no.
     * This shouldnt be static, but it is for backwards compatibility
     */
    Ticket.prototype.instanceConfirmEndOfChat = function (message, confirm, cb) {
        Ticket._confirmEndOfChat(message, confirm)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    Ticket._confirmEndOfChat = function (message, confirm) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // FIXME: specify return type
                        if (!(typeof confirm === 'string' && ['yes', 'no'].indexOf(confirm) > -1)) {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        return [4 /*yield*/, Ticket._getByChannelUrl({
                                channelUrl: message.channelUrl,
                                cachingEnabled: true,
                            })];
                    case 1:
                        ticket = _a.sent();
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(ticket.id, "/edit_message/"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { messageId: message.messageId, messageData: JSON.stringify({
                                        type: Message.DataType.TICKET_INQUIRE_CLOSURE,
                                        body: {
                                            state: confirm === 'yes' ? Message.ClosureState.CONFIRMED : Message.ClosureState.DECLINED,
                                            ticketId: ticket.id,
                                        },
                                    }) })),
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] confirm end of chat failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        Logger.write('[REQ] confirmed end of chat:', ticket);
                        return [2 /*return*/, ticket];
                }
            });
        });
    };
    /**
     * @since 1.0.8
     * @desc Submit feedback with a score and a comment.
     */
    Ticket.submitFeedback = function (message, score, comment, cb) {
        if (comment === void 0) { comment = ''; }
        this._submitFeedback(message, score, comment)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @since 1.0.8
     * @desc Submit feedback with a score and a comment.
     */
    Ticket.prototype.instanceSubmitFeedback = function (message, score, comment, cb) {
        if (comment === void 0) { comment = ''; }
        Ticket._submitFeedback(message, score, comment)
            .then(function (data) { return cb(data, null); })
            .catch(function (err) { return cb(null, err); });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     * This shouldnt be static, but it is for backwards compatibility
     */
    Ticket._submitFeedback = function (message, score, comment) {
        if (comment === void 0) { comment = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var ticket, res, data, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // FIXME: specify return type
                        if (!(message &&
                            message.messageId > 0 &&
                            message.channelUrl &&
                            typeof score === 'number' &&
                            1 <= score &&
                            score <= 5 &&
                            typeof comment === 'string')) {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        return [4 /*yield*/, Ticket._getByChannelUrl({
                                channelUrl: message.channelUrl,
                                cachingEnabled: true,
                            })];
                    case 1:
                        ticket = _a.sent();
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/tickets/").concat(ticket.id, "/edit_message/"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { messageId: message.messageId, messageData: JSON.stringify({
                                        type: Message.DataType.TICKET_FEEDBACK,
                                        body: {
                                            state: Message.FeedbackState.CONFIRMED,
                                            customerSatisfactionScore: score,
                                            customerSatisfactionComment: comment,
                                            ticketId: ticket.id,
                                        },
                                    }) })),
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (!res.ok) {
                            Logger.error('[REQ] submit feedback failed:', data);
                            err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                            throw err;
                        }
                        Logger.write('[REQ] customer feedback:', ticket);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return Ticket;
}());

function parseAuthArgs(params) {
    var userId = '';
    var accessToken = '';
    var cb = noop;
    if (!Array.isArray(params)) {
        Logger.write('Arguments passed to SendbirdDesk.authenticate() must be an array');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (params.length < 1) {
        Logger.write('Too few arguments passed to SendbirdDesk.authenticate()');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (params.length > 3) {
        Logger.write('Too many arguments passed to SendbirdDesk.authenticate()');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    userId = params[0];
    // connect(userId: string, token: string)
    if (typeof params[1] === 'string') {
        accessToken = params[1];
    }
    // connect(userId: string, cb: () => void)
    if (typeof params[1] === 'function') {
        cb = params[1];
    }
    // connect(userId: string, token: string, cb: () => void)
    if (typeof params[2] === 'function') {
        cb = params[2];
    }
    return {
        userId: userId,
        accessToken: accessToken,
        cb: cb,
    };
}
function validateAuthArgs(params) {
    var userId = params.userId, accessToken = params.accessToken, cb = params.cb;
    if (typeof userId !== 'string') {
        Logger.write('UserId to SendbirdDesk.authenticate(userId) must be a string');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (typeof accessToken !== 'string') {
        Logger.write('AccessToken to SendbirdDesk.authenticate(userId, accessToken) must be a string');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (typeof cb !== 'function') {
        Logger.write('Callback to SendbirdDesk.authenticate(userId, accessToken, cb) must be a function');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
}

var _initialized = false;
/** SendbirdDesk SDK
 */
var SendbirdDesk = /** @class */ (function () {
    function SendbirdDesk() {
    }
    Object.defineProperty(SendbirdDesk, "version", {
        /**
         * @static
         * @since 1.0.0
         * @desc Get Desk SDK version.
         */
        get: function () {
            return Config.sdkVersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendbirdDesk, "Error", {
        /**
         * @static
         * @since 1.0.0
         * @desc SendBirdDeskError class reference.
         * @type {module:SendBirdDeskError}
         */
        get: function () {
            return SendbirdDeskError;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendbirdDesk, "Agent", {
        /**
         * @static
         * @since 1.0.0
         * @desc Agent class reference.
         * @type {module:Agent}
         */
        get: function () {
            return Agent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendbirdDesk, "Ticket", {
        /**
         * @static
         * @since 1.0.0
         * @desc Ticket class reference.
         * @type {module:Ticket}
         */
        get: function () {
            return Ticket;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendbirdDesk, "Message", {
        /**
         * @static
         * @since 1.0.0
         * @desc Message class reference.
         * @type {module:Message} - BaseMessage in Sendbird Messaging SDK
         */
        get: function () {
            return Message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendbirdDesk, "RelatedChannel", {
        /**
         * @static
         * @since 1.0.14
         * @desc RelatedChannel class reference.
         * @type {module:RelatedChannel}
         */
        get: function () {
            return RelatedChannel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendbirdDesk, "UrlRegExp", {
        /**
         * @ignore
         */
        get: function () {
            return Message.UrlRegExp;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @static
     * @since 1.0.1
     * @desc Initialize SDK.
     */
    SendbirdDesk.init = function (sendbird, platform) {
        Config.sendbird = sendbird;
        if (platform) {
            Config.platform = platform;
        }
        _initialized = true;
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Authenticate and connect to Desk server.
     * @param {string} userId - User ID.
     * @param {string=} accessToken - Access token(Optional).
     * @param {function} callback - Function() => void.
     */
    SendbirdDesk.authenticate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _a = parseAuthArgs(params), userId = _a.userId, accessToken = _a.accessToken, cb = _a.cb;
        validateAuthArgs({ userId: userId, accessToken: accessToken, cb: cb });
        this._authenticate({ userId: userId, accessToken: accessToken, cb: cb }).finally(function () {
            cb();
        });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    SendbirdDesk._authenticate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = params.userId, accessToken = params.accessToken;
                        if (!_initialized) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Auth.connect(userId, accessToken)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a.sent();
                        SendbirdDeskError.throw(SendbirdDeskError.Type.ERROR_SENDBIRD_DESK_AUTH_FAILED);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        SendbirdDeskError.throw(SendbirdDeskError.Type.ERROR_SENDBIRD_DESK_INIT_MISSING);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @static
     * @since 1.0.1
     * @desc Check if the channel belongs to Desk.
     */
    SendbirdDesk.isDeskChannel = function (channel) {
        return Ticket.isDeskCustomType(channel.customType);
    };
    /**
     * @ignore
     */
    SendbirdDesk.setApiHost = function (host) {
        Config.apiHost = host;
    };
    /**
     * @static
     * @since 1.0.0
     * @desc Set SDK to debug mode which adds internal logging on desk event.
     */
    SendbirdDesk.setDebugMode = function () {
        Config.setDebugMode();
    };
    /**
     * @static
     * @since 1.0.8
     * @desc Set customer customFields(Must be defined in dashboard).
     * @param {object} customFields - customFields object (key-value).
     * @param {function} callback - Function(res: object, err: Error).
     */
    SendbirdDesk.setCustomerCustomFields = function (customFields, cb) {
        this._setCustomerCustomFields(customFields).then(function (res) {
            cb(res, null);
        }).catch(function (err) {
            cb(null, err);
        });
    };
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    SendbirdDesk._setCustomerCustomFields = function (customFields) {
        return __awaiter(this, void 0, void 0, function () {
            var formattedCustomFields, key, val, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof customFields !== 'object' || customFields === null || Array.isArray(customFields)) {
                            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
                        }
                        formattedCustomFields = {};
                        for (key in customFields) {
                            val = customFields[key];
                            if (typeof val === 'string') {
                                formattedCustomFields[key] = val;
                            }
                            else {
                                formattedCustomFields[key] = JSON.stringify(val);
                            }
                        }
                        return [4 /*yield*/, fetch("".concat(Config.apiHost, "/customers/custom_fields/"), {
                                method: 'PATCH',
                                headers: Auth.header,
                                body: JSON.stringify(__assign(__assign({}, Auth.postParam), { customFields: JSON.stringify(formattedCustomFields) })),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        // handle errors
                        if (!res.ok) {
                            throw new Error(JSON.stringify(data));
                        }
                        // handle success
                        return [2 /*return*/, this._resToCustomFields(data.customFields)];
                }
            });
        });
    };
    SendbirdDesk._resToCustomFields = function (data) {
        var e_1, _a;
        var customFields = {};
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                customFields[item.key] = item.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return customFields;
    };
    return SendbirdDesk;
}());

export { Agent, RelatedChannel, SendbirdDeskError, Ticket, SendbirdDesk as default };
