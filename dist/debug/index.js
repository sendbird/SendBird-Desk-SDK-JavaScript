/* Copyright(c) 2023 SendBird, Inc.
SendBird Desk JavaScript SDK v1.1.0 */
import { DeviceOsPlatform, SendbirdProduct, SendbirdPlatform } from '@sendbird/chat';

var version = "1.1.0";

let _debug = false;
let _sendbird;
let _platform = DeviceOsPlatform.WEB;
let _deskApiHost;
const DESK_SDK_VERSION = version;
const MIN_SENDBIRD_VERSION = '4.9.6';
/**
 * @since 1.0.0
 * @ignore
 */
class Config {
    /**
     * @static
     * @since 1.0.5
     * @ignore
     * @desc Get Sendbird instance.
     */
    static get sendbird() {
        return _sendbird;
    }
    /**
     * @static
     * @since 1.0.5
     * @ignore
     * @desc Set Sendbird instance.
     */
    static set sendbird(sb) {
        _sendbird = sb;
    }
    /**
     * @static
     * @since 1.1.0
     * @ignore
     * @desc Get platform for setting in SendbirdInstance.
     * @default DeviceOsPlatform.WEB
     */
    static get platform() {
        return _platform;
    }
    /**
     * @static
     * @since 1.1.0
     * @ignore
     * @desc Set platform for setting in SendbirdInstance.
     */
    static set platform(platform) {
        _platform = platform;
    }
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Check if SDK is in debug mode.
     */
    static get isDebugMode() {
        return _debug;
    }
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Set SDK to debug mode which leads to change API endpoint and app ID into development server.
     */
    static setDebugMode() {
        _debug = true;
    }
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Set SDK to production mode which leads to change API endpoint and app ID into production server.
     */
    static unsetDebugMode() {
        _debug = false;
    }
    /**
     * @ignore
     */
    static get apiHost() {
        if (!_deskApiHost) {
            const sb = _sendbird;
            _deskApiHost = `https://desk-api-${sb.appId}.sendbird.com/sapi`;
        }
        return _deskApiHost;
    }
    /**
     * @ignore
     */
    static set apiHost(val) {
        _deskApiHost = val;
    }
    /**
     * @ignore
     */
    static get sdkVersion() {
        return DESK_SDK_VERSION;
    }
    /**
     * @ignore
     */
    static get minSendbirdVersion() {
        return MIN_SENDBIRD_VERSION;
    }
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Check if Sendbird SDK version meets the min supported version.
     * @returns {boolean} - true if it's compatible.
     */
    static isSendbirdSdkCompatible(version) {
        const _minSupportedVersion = MIN_SENDBIRD_VERSION.split('.');
        const _targetVersion = version.split('.');
        if (_minSupportedVersion.length === _targetVersion.length) {
            for (const i in _minSupportedVersion) {
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
    }
}

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
const ErrorType = {
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
class SendbirdDeskError extends Error {
    code;
    /**
     * @since 1.0.0
     * @param {string} message - Error message.
     * @param {number} code - Error code.
     */
    constructor(message, code) {
        super(message);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = new Error(message).stack;
        }
        this.name = 'SendbirdDeskError';
        this.code = code;
    }
    static get Type() {
        return ErrorType;
    }
    /**
     * @static
     * @since 1.0.5
     * @ignore
     * @desc Create an error.
     */
    static create(type) {
        return type ? new SendbirdDeskError(type.message, type.code) : new Error('SendbirdDeskError type missing.');
    }
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Throw an error.
     */
    static throw(type) {
        throw new SendbirdDeskError(type.message, type.code);
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @since 1.0.1
 * @ignore
 */
class Logger {
    static write(...args) {
        if (Config.isDebugMode) {
            // eslint-disable-next-line no-console
            console.log(...args);
        }
    }
    static error(...args) {
        if (Config.isDebugMode) {
            // eslint-disable-next-line no-console
            console.error(...args);
        }
    }
}

const _privateData = {};
/**
 * @since 1.0.0
 * @ignore
 */
class Auth {
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Authenticate and connect to Desk server.
     */
    static async connect(userId, accessToken) {
        // this method is internal, so its okay to keep it async
        const sb = Config.sendbird;
        sb.addSendbirdExtensions([
            {
                product: SendbirdProduct.DESK,
                version: version,
                platform: SendbirdPlatform.JS,
            },
        ], {
            platform: Config.platform,
        });
        if (sb) {
            const res = await fetch(`${Config.apiHost}/customers/auth/`, {
                method: 'POST',
                headers: {
                    sendbirdAccessToken: accessToken || '',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    sendbirdAppId: sb.appId,
                    sendbirdId: userId,
                }),
            });
            const data = await res.json();
            _privateData.deskToken = data.token;
            Logger.write('[REQ] connection established');
        }
        else {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_SDK_MISSING);
        }
    }
    /**
     * @ignore
     */
    static get header() {
        if (_privateData.deskToken) {
            return {
                sendbirdDeskToken: _privateData.deskToken,
                'content-type': 'application/json',
                'user-agent': `desk-js@${version}`,
            };
        }
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_DESK_INIT_MISSING);
    }
    /**
     * @ignore
     */
    static get getParam() {
        const sb = Config.sendbird;
        return sb ? `sendbirdAppId=${sb.appId}` : '';
    }
    /**
     * @ignore
     */
    static get postParam() {
        const sb = Config.sendbird;
        return sb ? { sendbirdAppId: sb.appId } : {};
    }
}

/**
 * @module Agent
 * @ignore
 */
/**
 * @since 1.0.0
 */
class Agent {
    userId;
    name;
    profileUrl;
    sendbirdId;
    /**
     * @since 1.0.0
     * @private
     * @desc Create an agent.
     */
    constructor(params) {
        this.fetchFromJSON(params);
    }
    /**
     * @since 1.0.0
     * @private
     * @desc Parse JSON data and patch Agent object.
     */
    fetchFromJSON(params) {
        if ('id' in params) {
            this.userId = params.id;
            this.name = params.displayName ?? '';
            this.profileUrl = params.photoThumbnailUrl ?? '';
            this.sendbirdId = params.sendbirdId;
            return;
        }
        // legacy
        this.userId = params.user ?? 0;
        this.name = params.displayName ?? '';
        this.profileUrl = params.photoThumbnailUrl ?? '';
    }
}

/**
 * @classdesc RelatedChannel
 * @since 1.0.14
 */
class RelatedChannel {
    channelUrl;
    name;
    /**
     * @since 1.0.14
     * @private
     * @desc Create a related channel
     */
    constructor(params) {
        this.fetchFromJSON(params);
    }
    /**
     * @since 1.0.14
     * @private
     * @desc Parse JSON data and patch RelatedChannel object.
     */
    fetchFromJSON(params) {
        this.channelUrl = params.channel_url ?? '';
        this.name = params.name ?? '';
    }
}

// --------- Misc Types --------- //
// Enums arent good match for runtime values.
// Would they work? Yeah.. but they would be annoying for customer
// to use. They just need to call create(..., 'URGENT', ...) instead of
// create(..., TicketPriority.URGENT, ...)
// to use. So we use const-enums instead.
const TicketPriorityMap = {
    URGENT: 'URGENT',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
};
const TicketStatusMap = {
    INITIALIZED: 'INITIALIZED',
    PROACTIVE: 'PROACTIVE',
    UNASSIGNED: 'UNASSIGNED',
    ASSIGNED: 'ASSIGNED',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
};

function mapCreateTicketArgs(args) {
    if (args?.length < 3 || args?.length > 8) {
        Logger.error('[REQ] Close ticket should have at least 1 param.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (args.length === 3) {
        const [title, name, cb] = args;
        return { title, name, cb };
    }
    if (args.length === 4) {
        const [title, name, groupKey, cb] = args;
        return { title, name, groupKey, cb };
    }
    if (args.length === 5) {
        const [title, name, groupKey, customFields, cb] = args;
        return { title, name, groupKey, customFields, cb };
    }
    if (args.length === 6) {
        const [title, name, groupKey, customFields, priority, cb] = args;
        return { title, name, groupKey, customFields, priority, cb };
    }
    if (args.length === 7) {
        const [title, name, groupKey, customFields, priority, relatedChannelUrls, cb] = args;
        return { title, name, groupKey, customFields, priority, relatedChannelUrls, cb };
    }
    if (args.length === 8) {
        const [title, name, groupKey, customFields, priority, relatedChannelUrls, botKey, cb] = args;
        return { title, name, groupKey, customFields, priority, relatedChannelUrls, botKey, cb };
    }
    // TS dont know that we have checked for length
    Logger.error('[REQ] Create ticket should have between 3 to 8 paramters.');
    throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
}
function validateCreateTicketArgs(params) {
    const { title, name, groupKey, customFields, relatedChannelUrls, botKey, priority } = params;
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
        || relatedChannelUrls.some((channelUrl) => typeof channelUrl !== 'string'))) {
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
    let comment = '';
    let cb = noop;
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
        comment,
        cb,
    };
}
function validateCloseArgs(params) {
    const { comment, cb } = params;
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
class Message {
    /**
     * @static
     * @since 1.0.0
     * @desc message custom type.
     * @property {string} RICH_MESSAGE - SENDBIRD_DESK_RICH_MESSAGE
     * @property {string} ADMIN_MESSAGE - SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE
     */
    static get CustomType() {
        return {
            RICH_MESSAGE: 'SENDBIRD_DESK_RICH_MESSAGE',
            ADMIN_MESSAGE: 'SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE',
        };
    }
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
    static get DataType() {
        return {
            TICKET_INQUIRE_CLOSURE: 'SENDBIRD_DESK_INQUIRE_TICKET_CLOSURE',
            TICKET_ASSIGN: 'TICKET_ASSIGN',
            TICKET_TRANSFER: 'TICKET_TRANSFER',
            TICKET_CLOSE: 'TICKET_CLOSE',
            TICKET_FEEDBACK: 'SENDBIRD_DESK_CUSTOMER_SATISFACTION',
            URL_PREVIEW: 'SENDBIRD_DESK_URL_PREVIEW',
        };
    }
    /**
     * @static
     * @since 1.0.0
     * @desc closure inquiry messsage state.
     * @property {string} WAITING - WAITING
     * @property {string} CONFIRMED - CONFIRMED
     * @property {string} DECLINED - DECLINED
     */
    static get ClosureState() {
        return {
            WAITING: 'WAITING',
            CONFIRMED: 'CONFIRMED',
            DECLINED: 'DECLINED',
        };
    }
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
    static get FeedbackState() {
        return {
            WAITING: 'WAITING',
            CONFIRMED: 'CONFIRMED',
        };
    }
    /**
     * @ignore
     */
    static get UrlRegExp() {
        return /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi;
    }
}

function mapCancelArgs(params) {
    if (params?.length < 1) {
        Logger.error('Cancel ticket should have at least 1 param.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    if (params.length > 2) {
        Logger.error('Cancel ticket should have only 2 params.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    let groupKeyForTransfer = '';
    let cb = noop;
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
        groupKeyForTransfer,
        cb,
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
    if (params?.length < 2 || params?.length > 3) {
        Logger.error('[REQ] Get ticket should have 2 or 3 paramters.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
    }
    // order of params is important
    const channelUrl = params[0];
    const cachingEnabled = params[1];
    // last param is callback
    const cb = params[params.length - 1] || noop;
    // @ts-expect-error This will be validated in validateGetByChannelUrlArgs
    return { channelUrl, cachingEnabled, cb };
}

const TICKET_CUSTOM_TYPE = 'SENDBIRD_DESK_CHANNEL_CUSTOM_TYPE';
const DEFAULT_LIMIT = 10;

const _getByChannelUrls = async (channelUrls) => {
    const sb = Config.sendbird;
    if (sb) {
        const query = sb.groupChannel.createMyGroupChannelListQuery({
            customTypesFilter: [TICKET_CUSTOM_TYPE],
            channelUrlsFilter: channelUrls,
            includeEmpty: true,
        });
        try {
            return await query.next();
        }
        catch (error) {
            Logger.error('[REQ] ticket get by channel urls failed:', error);
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
        }
    }
    else {
        Logger.error('[REQ] ticket get by channel urls failed: chat SDK is not initialized.');
        throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_SDK_MISSING);
    }
};

function generatePath(apiHost, authParam, params) {
    const { offset = 0, limit = DEFAULT_LIMIT, order = '-updated_at', channelUrl, customFieldFilter, group, status = 'ALL', } = params;
    const statusQuery = status !== TicketStatusMap.CLOSED ? 'status=ASSIGNED&status=UNASSIGNED' : 'status=CLOSED';
    let path = `${apiHost}/tickets/` +
        `?${authParam}&limit=${limit}&offset=${offset}` +
        `${status === 'ALL' ? '' : `&${statusQuery}`}&order=${order}`;
    if (channelUrl) {
        path += `&channelUrl=${channelUrl}`;
    }
    if (group) {
        path += `&group=${group}`;
    }
    if (customFieldFilter && typeof customFieldFilter === 'object') {
        path +=
            '&customFields=' +
                encodeURIComponent(Object.keys(customFieldFilter)
                    .map((key) => `${key}:${encodeURIComponent(customFieldFilter[key])}`)
                    .join(','));
    }
    return path;
}

function mapGetTicketArgs(args) {
    if (args?.length < 2 || args?.length > 3) {
        throw new Error('Get ticket should have 2 or 3 paramters.');
    }
    let offset = 0;
    let filter = {};
    let cb = noop;
    if (args.length === 2) {
        offset = args[0];
        cb = args[1];
    }
    if (args.length === 3) {
        offset = args[0];
        filter = args[1];
        cb = args[2];
    }
    return { offset, filter, cb };
}
function validateGetTicketArgs(arg) {
    const { offset, filter, cb } = arg;
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
let _cachedTicket = {};
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
class Ticket {
    id;
    title;
    status;
    info;
    priority;
    agent;
    customer;
    customFields;
    group;
    relatedChannels;
    channel;
    channelUrl;
    updatedAt;
    /**
     * @since 1.0.0
     * @private
     * @desc Create a ticket.
     */
    constructor(params) {
        this.fetchFromJSON(params);
    }
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
    static get Status() {
        return TicketStatusMap;
    }
    /**
     * @since 1.0.0
     * @private
     * @desc Parse JSON data and patch Ticket object.
     */
    fetchFromJSON(params) {
        this.id = params.id;
        this.title = params.channelName ?? '';
        this.status = params.status ?? TicketStatusMap.UNASSIGNED;
        this.info = params.info ? JSON.parse(params.info) : null;
        this.priority = params.priority ?? TicketPriorityMap.MEDIUM;
        this.agent = params.recentAssignment?.agent ? new Agent(params.recentAssignment.agent) : null;
        this.customer = params.customer ?? null;
        this.customFields = {};
        this.group = params.group ?? 0;
        this.relatedChannels = [];
        this.channelUrl = params.channelUrl ?? null;
        this.updatedAt = params.updatedAt ?? 0;
        if (params.customFields) {
            const customFields = params.customFields;
            for (let i = 0; i < customFields.length; i++) {
                const key = customFields[i].key;
                const value = customFields[i].value;
                this.customFields[key] = value;
            }
        }
        if (params.relatedChannels) {
            try {
                const relatedChannelsPayload = JSON.parse(params.relatedChannels);
                if (Array.isArray(relatedChannelsPayload)) {
                    this.relatedChannels = relatedChannelsPayload.map((item) => new RelatedChannel(item));
                }
            }
            catch (e) {
                // DO NOTHING
            }
        }
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _fetchChannel() {
        const [channel] = await _getByChannelUrls([this.channelUrl]);
        this.channel = channel;
        _cachedTicket[this.channelUrl] = this;
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _getTicketList(params) {
        const path = generatePath(Config.apiHost, Auth.getParam, params);
        const res = await fetch(path, {
            method: 'GET',
            headers: Auth.header,
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket list failed:', data);
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
        }
        const tickets = [];
        const channelUrls = [];
        if (Array.isArray(data.results)) {
            for (const i in data.results) {
                const ticket = new Ticket(data.results[i]);
                _cachedTicket[ticket.channelUrl] = ticket;
                channelUrls.push(ticket.channelUrl);
                tickets.push(ticket);
            }
            const channels = await _getByChannelUrls(channelUrls);
            tickets.forEach((ticket) => {
                for (const i in channels) {
                    const channel = channels[i];
                    if (ticket.channelUrl === channel.url) {
                        ticket.channel = channel;
                        break;
                    }
                }
            });
            Logger.write(`[REQ] ${status} ticket list:`, tickets);
        }
        return tickets;
    }
    /**
     * @since 1.0.0
     * @desc Refresh ticket info.
     * @param {function(ticket:Ticket, err:Error)} cb - cb function.
     */
    refresh(cb) {
        this._refresh()
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _refresh() {
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}/?${Auth.getParam}`, {
            method: 'GET',
            headers: Auth.header,
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket refresh failed:', res);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        this.fetchFromJSON(data);
        await this._fetchChannel();
        Logger.write('[REQ] ticket refresh:', this);
        return this;
    }
    /**
     * @since 1.0.6
     * @desc Reopen closed ticket.
     * @param {function} cb - Function(res:Ticket, err:Error).
     */
    reopen(cb) {
        this._reopen()
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _reopen() {
        try {
            const res = await fetch(`${Config.apiHost}/tickets/${this.id}/reopen/`, {
                method: 'PATCH',
                headers: Auth.header,
                body: JSON.stringify(Auth.postParam),
            });
            const data = await res.json();
            if (!res.ok) {
                Logger.error('[REQ] ticket reopen failed:', data);
                const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
                throw err;
            }
            if (data.channelUrl) {
                this.fetchFromJSON(data);
                await this._fetchChannel();
                Logger.write('[REQ] ticket reopen:', this);
            }
            return this;
        }
        catch (e) {
            Logger.error('[REQ] ticket reopen failed:', e);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
    }
    /**
     * @since 1.0.18
     * @desc Cancel the assignment and set it to open.
     * @param {string} groupKeyForTransfer - Group key for transfer(optional)
     * @param {function} cb - Function(res:Ticket, err:Error).
     */
    cancel(...params) {
        const args = mapCancelArgs(params);
        const { cb } = args;
        this._cancel(args)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _cancel(args) {
        validateCancelArgs(args);
        const { groupKeyForTransfer } = args;
        const requestBody = {
            ...Auth.postParam,
        };
        if (groupKeyForTransfer) {
            requestBody['groupKeyForTransfer'] = groupKeyForTransfer;
        }
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}/cancel`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify(requestBody),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket cancel failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        if (data.channelUrl) {
            this.fetchFromJSON(data);
            await this._fetchChannel();
            Logger.write('[REQ] ticket cancel:', this);
        }
        return this;
    }
    /**
     * @since 1.0.16
     * @desc Force close an assigned ticket.
     * @param {string} comment - Comment for closing the ticket.
     */
    close(...params) {
        const args = mapCloseArgs(params);
        const { cb } = args;
        this._close(args)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _close(args) {
        validateCloseArgs(args);
        const { comment } = args;
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}/close`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                closeComment: comment,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket close failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        if (data.channelUrl) {
            this.fetchFromJSON(data);
            await this._fetchChannel();
            Logger.write('[REQ] ticket close:', this);
        }
        return this;
    }
    /**
     * @since 1.0.18
     * @desc Select a question.
     * @param {number} faqFileId - FAQ file ID.
     * @param {string} question - Question text.
     * @param {function} callback - Function(res:object, err:Error).
     */
    selectQuestion(faqFileId, question, cb) {
        this._selectQuestion(faqFileId, question)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _selectQuestion(faqFileId, question) {
        if (typeof faqFileId !== 'number' || typeof question !== 'string') {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}/select_question`, {
            method: 'POST',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                faqFileId,
                question,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket select question failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        Logger.write('[REQ] ticket select option:', this);
        return this;
    }
    /**
     * @since 1.0.10
     * @desc Set ticket priority.
     * @param {string} priority - priority.
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    setPriority(priority, cb) {
        this._setPriority(priority)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _setPriority(priority) {
        if (Object.keys(TicketPriorityMap)
            .map((key) => TicketPriorityMap[key])
            .indexOf(priority) < 0) {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                priority,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket set priority failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        this.fetchFromJSON(data);
        Logger.write('[REQ] ticket set priority:', this);
        return this;
    }
    /**
     * @since 1.0.14
     * @desc Set ticket related channel URLs.
     * @param {array<string>} relatedChannelUrls - related channel URLs.
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    setRelatedChannelUrls(relatedChannelUrls, cb) {
        this._setRelatedChannelUrls(relatedChannelUrls)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _setRelatedChannelUrls(relatedChannelUrls) {
        if (!Array.isArray(relatedChannelUrls) || relatedChannelUrls.some((channelUrl) => typeof channelUrl !== 'string')) {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                relatedChannelUrls: relatedChannelUrls.join(','),
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket set related channel URLs failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        this.fetchFromJSON(data);
        Logger.write('[REQ] ticket set related channel URLs:', this);
        return this;
    }
    /**
     * @since 1.0.10
     * @desc Set ticket customFields.
     * @param {object} customFields - customFields object (key-value).
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    setCustomFields(customFields, cb) {
        this._setCustomFields(customFields)
            .then((data) => {
            cb(data, null);
        })
            .catch((err) => {
            cb(null, err);
        });
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    async _setCustomFields(customFields) {
        if (typeof customFields !== 'object' || customFields === null || Array.isArray(customFields)) {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const formattedCustomFields = {};
        for (const key in customFields) {
            formattedCustomFields[key] =
                typeof customFields[key] === 'string' ? customFields[key] : JSON.stringify(customFields[key]);
        }
        const res = await fetch(`${Config.apiHost}/tickets/${this.id}/custom_fields/`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                customFields: JSON.stringify(formattedCustomFields),
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket set custom fields failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        this.fetchFromJSON(data);
        Logger.write('[REQ] ticket set custom fields:', this);
        return this;
    }
    /**
     * @ignore
     */
    static isDeskCustomType(customType) {
        return customType === TICKET_CUSTOM_TYPE;
    }
    /**
     * @ignore
     */
    static get defaultLimit() {
        // ^^ This method probably exist because of some old OOP dogma
        return DEFAULT_LIMIT;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Clear cached ticket. Clear all if channelUrl is not specified.
     */
    static clearCache(channelUrl) {
        if (channelUrl) {
            delete _cachedTicket[channelUrl];
            Logger.write(`[SYS] cached ticket for ${channelUrl} cleared`);
        }
        else {
            _cachedTicket = {};
            Logger.write('[SYS] all cached ticket cleared');
        }
    }
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
    static create(...params) {
        const args = mapCreateTicketArgs(params);
        const { cb } = args;
        this._create(args)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _create(args) {
        const { title, name, groupKey, customFields, priority, relatedChannelUrls, botKey } = args;
        const sb = Config.sendbird;
        if (!sb) {
            Logger.error('[REQ] ticket create chat SDK is not initalized.');
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_SENDBIRD_SDK_MISSING);
            throw err;
        }
        validateCreateTicketArgs(args);
        const formattedCustomFields = {};
        for (const key in customFields) {
            formattedCustomFields[key] =
                typeof customFields[key] === 'string' ? customFields[key] : JSON.stringify(customFields[key]);
        }
        // todo: move the fetch-body body to a separate function
        // and add tests
        const fetchBody = {
            ...Auth.postParam,
            channelName: title,
            channelType: 'SENDBIRD_JAVASCRIPT',
            groupKey,
            customFields: customFields ? JSON.stringify(formattedCustomFields) : undefined,
            relatedChannelUrls: relatedChannelUrls?.join(','),
            botKey,
            info: JSON.stringify({
                // FIXME: Zendesk version only
                ticket: {
                    subject: title,
                    requester: {
                        name,
                        email: sb?.currentUser?.userId || '',
                    },
                },
            }),
        };
        if (priority) {
            fetchBody['priority'] = priority;
        }
        const res = await fetch(`${Config.apiHost}/tickets/`, {
            method: 'POST',
            headers: Auth.header,
            body: JSON.stringify(fetchBody),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] ticket create failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        const ticket = new Ticket(data);
        const [channel] = await _getByChannelUrls([ticket.channelUrl]);
        ticket.channel = channel;
        _cachedTicket[channel.url] = ticket;
        Logger.write('[REQ] ticket create success:', ticket);
        return ticket;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Get ticket count for each state: UNASSIGNED, ASSIGNED, CLOSED.
     * @param {function} callback - Function(result:GetOpenCountResponse, err:Error).
     */
    static getOpenCount(cb) {
        this._getOpenCount()
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _getOpenCount() {
        const res = await fetch(`${Config.apiHost}/tickets/count/?${Auth.getParam}`, {
            method: 'GET',
            headers: Auth.header,
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] get open ticket count failed:', data);
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
        }
        Logger.write('[REQ] get open ticket count:', data);
        return data;
    }
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
    static getByChannelUrl(...params) {
        const args = mapGetByChannelUrlArgs(params);
        const { cb } = args;
        this._getByChannelUrl(args)
            .then((data) => cb?.(data, null))
            .catch((err) => cb?.(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _getByChannelUrl(args) {
        const { channelUrl, cachingEnabled } = args;
        // cachingEnabled is a workaround to use cache
        if (!!_cachedTicket[channelUrl] && cachingEnabled) {
            Logger.write(`[REQ] get ticket for channel ${channelUrl} from cache:`, _cachedTicket[channelUrl]);
            return _cachedTicket[channelUrl];
        }
        else {
            let ticket;
            const res = await fetch(`${Config.apiHost}/tickets/?${Auth.getParam}&limit=10&channelUrl=${channelUrl}`, {
                method: 'GET',
                headers: Auth.header,
            });
            const data = await res.json();
            if (!res.ok) {
                Logger.error('[REQ] get ticket for channel failed:', data);
                throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            }
            if (Array.isArray(data.results) && data.results.length > 0) {
                ticket = new Ticket(data.results[0]);
                const [channel] = await _getByChannelUrls([ticket.channelUrl]);
                ticket.channel = channel;
                _cachedTicket[channel.url] = ticket;
                Logger.write(`[REQ] get ticket for channel ${channelUrl}:`, ticket);
                return ticket;
            }
            else {
                throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_DATA_NOT_FOUND);
            }
        }
    }
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
    static getList(params, cb) {
        // note to developers - Always recommend this method to customer
        // and getrid of getOpenedList and getClosedList etc etc
        Ticket._getTicketList(params)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Load opened ticket list.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    static getOpenedList(...params) {
        const { offset, filter, cb } = mapGetTicketArgs(params);
        validateGetTicketArgs({ offset, filter, cb });
        Ticket._getTicketList({
            ...filter,
            offset: offset,
            status: 'OPEN',
        })
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @static
     * @since 1.0.21
     * @desc Lists all tickets.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    static getAllTickets(...params) {
        const { offset, filter, cb } = mapGetTicketArgs(params);
        validateGetTicketArgs({ offset, filter, cb });
        Ticket._getTicketList({
            ...filter,
            offset: offset,
            status: 'ALL',
        })
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Load closed ticket list.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    static getClosedList(...params) {
        const { offset, filter, cb } = mapGetTicketArgs(params);
        validateGetTicketArgs({ offset, filter, cb });
        Ticket._getTicketList({
            ...filter,
            offset: offset,
            status: 'CLOSED',
        })
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Get URL preview info from URL.
     * @param {string} url - URL to load preview metadata.
     * @param {function} callback - Function(result:Object, err:Error).
     */
    static getUrlPreview(url, cb) {
        this._getUrlPreview(url)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _getUrlPreview(url) {
        if (typeof url !== 'string') {
            Logger.error('[REQ] get url preview failed: url should be a string');
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const res = await fetch(`${Config.apiHost}/tickets/url_preview/`, {
            method: 'POST',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                url,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] get url preview failed:', data);
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
        }
        Logger.write('[REQ] get url preview:', data);
        return data;
    }
    /**
     * @since 1.0.0
     * @desc Reply to confirm-end-of-chat request in yes or no.
     */
    static confirmEndOfChat(message, confirm, cb) {
        this._confirmEndOfChat(message, confirm)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @since 1.0.0
     * @desc Reply to confirm-end-of-chat request in yes or no.
     * This shouldnt be static, but it is for backwards compatibility
     */
    instanceConfirmEndOfChat(message, confirm, cb) {
        Ticket._confirmEndOfChat(message, confirm)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _confirmEndOfChat(message, confirm) {
        // FIXME: specify return type
        if (!(typeof confirm === 'string' && ['yes', 'no'].indexOf(confirm) > -1)) {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const ticket = await Ticket._getByChannelUrl({
            channelUrl: message.channelUrl,
            cachingEnabled: true,
        });
        const res = await fetch(`${Config.apiHost}/tickets/${ticket.id}/edit_message/`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                messageId: message.messageId,
                messageData: JSON.stringify({
                    type: Message.DataType.TICKET_INQUIRE_CLOSURE,
                    body: {
                        state: confirm === 'yes' ? Message.ClosureState.CONFIRMED : Message.ClosureState.DECLINED,
                        ticketId: ticket.id,
                    },
                }),
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] confirm end of chat failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        Logger.write('[REQ] confirmed end of chat:', ticket);
        return ticket;
    }
    /**
     * @since 1.0.8
     * @desc Submit feedback with a score and a comment.
     */
    static submitFeedback(message, score, comment = '', cb) {
        this._submitFeedback(message, score, comment)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @since 1.0.8
     * @desc Submit feedback with a score and a comment.
     */
    instanceSubmitFeedback(message, score, comment = '', cb) {
        Ticket._submitFeedback(message, score, comment)
            .then((data) => cb(data, null))
            .catch((err) => cb(null, err));
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     * This shouldnt be static, but it is for backwards compatibility
     */
    static async _submitFeedback(message, score, comment = '') {
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
        const ticket = await Ticket._getByChannelUrl({
            channelUrl: message.channelUrl,
            cachingEnabled: true,
        });
        const res = await fetch(`${Config.apiHost}/tickets/${ticket.id}/edit_message/`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                messageId: message.messageId,
                messageData: JSON.stringify({
                    type: Message.DataType.TICKET_FEEDBACK,
                    body: {
                        state: Message.FeedbackState.CONFIRMED,
                        customerSatisfactionScore: score,
                        customerSatisfactionComment: comment,
                        ticketId: ticket.id,
                    },
                }),
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            Logger.error('[REQ] submit feedback failed:', data);
            const err = SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_REQUEST);
            throw err;
        }
        Logger.write('[REQ] customer feedback:', ticket);
        return data;
    }
}

function parseAuthArgs(params) {
    let userId = '';
    let accessToken = '';
    let cb = noop;
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
        userId,
        accessToken,
        cb,
    };
}
function validateAuthArgs(params) {
    const { userId, accessToken, cb } = params;
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

let _initialized = false;
/** SendbirdDesk SDK
 */
class SendbirdDesk {
    /**
     * @static
     * @since 1.0.0
     * @desc Get Desk SDK version.
     */
    static get version() {
        return Config.sdkVersion;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc SendBirdDeskError class reference.
     * @type {module:SendBirdDeskError}
     */
    static get Error() {
        return SendbirdDeskError;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Agent class reference.
     * @type {module:Agent}
     */
    static get Agent() {
        return Agent;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Ticket class reference.
     * @type {module:Ticket}
     */
    static get Ticket() {
        return Ticket;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Message class reference.
     * @type {module:Message} - BaseMessage in Sendbird Messaging SDK
     */
    static get Message() {
        return Message;
    }
    /**
     * @static
     * @since 1.0.14
     * @desc RelatedChannel class reference.
     * @type {module:RelatedChannel}
     */
    static get RelatedChannel() {
        return RelatedChannel;
    }
    /**
     * @ignore
     */
    static get UrlRegExp() {
        return Message.UrlRegExp;
    }
    /**
     * @static
     * @since 1.0.1
     * @desc Initialize SDK.
     */
    static init(sendbird, platform) {
        Config.sendbird = sendbird;
        if (platform) {
            Config.platform = platform;
        }
        _initialized = true;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Authenticate and connect to Desk server.
     * @param {string} userId - User ID.
     * @param {string=} accessToken - Access token(Optional).
     * @param {function} callback - Function() => void.
     */
    static authenticate(...params) {
        const { userId, accessToken, cb } = parseAuthArgs(params);
        validateAuthArgs({ userId, accessToken, cb });
        this._authenticate({ userId, accessToken, cb }).finally(() => {
            cb();
        });
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _authenticate(params) {
        const { userId, accessToken } = params;
        if (_initialized) {
            try {
                await Auth.connect(userId, accessToken);
            }
            catch (err) {
                SendbirdDeskError.throw(SendbirdDeskError.Type.ERROR_SENDBIRD_DESK_AUTH_FAILED);
            }
        }
        else {
            SendbirdDeskError.throw(SendbirdDeskError.Type.ERROR_SENDBIRD_DESK_INIT_MISSING);
        }
    }
    /**
     * @static
     * @since 1.0.1
     * @desc Check if the channel belongs to Desk.
     */
    static isDeskChannel(channel) {
        return Ticket.isDeskCustomType(channel.customType);
    }
    /**
     * @ignore
     */
    static setApiHost(host) {
        Config.apiHost = host;
    }
    /**
     * @static
     * @since 1.0.0
     * @desc Set SDK to debug mode which adds internal logging on desk event.
     */
    static setDebugMode() {
        Config.setDebugMode();
    }
    /**
     * @static
     * @since 1.0.8
     * @desc Set customer customFields(Must be defined in dashboard).
     * @param {object} customFields - customFields object (key-value).
     * @param {function} callback - Function(res: object, err: Error).
     */
    static setCustomerCustomFields(customFields, cb) {
        this._setCustomerCustomFields(customFields).then((res) => {
            cb(res, null);
        }).catch((err) => {
            cb(null, err);
        });
    }
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static async _setCustomerCustomFields(customFields) {
        if (typeof customFields !== 'object' || customFields === null || Array.isArray(customFields)) {
            throw SendbirdDeskError.create(SendbirdDeskError.Type.ERROR_INVALID_PARAMETER);
        }
        const formattedCustomFields = {};
        for (const key in customFields) {
            // all this conversion is to make sure that ts doesnt whine about the type
            // for somereason formattedCustomFields[key] = customFields[key] is not allowed
            const val = customFields[key];
            if (typeof val === 'string') {
                formattedCustomFields[key] = val;
            }
            else {
                formattedCustomFields[key] = JSON.stringify(val);
            }
        }
        const res = await fetch(`${Config.apiHost}/customers/custom_fields/`, {
            method: 'PATCH',
            headers: Auth.header,
            body: JSON.stringify({
                ...Auth.postParam,
                customFields: JSON.stringify(formattedCustomFields),
            }),
        });
        const data = await res.json();
        // handle errors
        if (!res.ok) {
            throw new Error(JSON.stringify(data));
        }
        // handle success
        return this._resToCustomFields(data.customFields);
    }
    static _resToCustomFields(data) {
        const customFields = {};
        for (const item of data) {
            customFields[item.key] = item.value;
        }
        return customFields;
    }
}

export { Agent, RelatedChannel, SendbirdDeskError, Ticket, SendbirdDesk as default };
