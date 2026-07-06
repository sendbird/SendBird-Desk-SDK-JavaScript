import { GroupChannel, SendbirdGroupChat } from '@sendbird/chat/groupChannel';
import { BaseMessage } from '@sendbird/chat/message';
import { DeviceOsPlatform } from '@sendbird/chat';

/**
 * @since 1.2.0
 * @desc API host type for Desk SDK. Determines the base host when no custom API host is set.
 */
declare enum ApiHostType {
    /** Sendbird default host: `https://desk-api-{APP_ID}.sendbird.com/sapi` */
    DEFAULT = "DEFAULT",
    /** Delight host: `https://desk-api-{APP_ID}.app.delight.ai/sapi` */
    DELIGHT = "DELIGHT"
}

/**
 * @module SendbirdDeskError
 * @ignore
 */
interface IErrorType {
    code: number;
    message: string;
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
declare const ErrorType: Record<string, IErrorType>;
/**
 * An error class for Desk.
 * @extends {Error}
 * @since 1.0.0
 */
declare class SendbirdDeskError extends Error {
    readonly code: number;
    /**
     * @since 1.0.0
     * @param {string} message - Error message.
     * @param {number} code - Error code.
     */
    constructor(message: string, code: number);
    static get Type(): Record<string, IErrorType>;
    /**
     * @static
     * @since 1.0.5
     * @ignore
     * @desc Create an error.
     */
    static create(type?: IErrorType): Error;
    /**
     * @static
     * @since 1.0.0
     * @ignore
     * @desc Throw an error.
     */
    static throw(type: IErrorType): void;
}

declare const error_ErrorType: typeof ErrorType;
type error_IErrorType = IErrorType;
declare namespace error {
  export { error_ErrorType as ErrorType, SendbirdDeskError as default };
  export type { error_IErrorType as IErrorType };
}

/**
 * @module Agent
 * @ignore
 */
type AgentParamsLegacy = {
    user: number;
    displayName?: string;
    photoThumbnailUrl: string;
};
type AgentParams = {
    id: number;
    displayName?: string;
    sendbirdId: string;
    photoThumbnailUrl?: string;
} | AgentParamsLegacy;
/**
 * @since 1.0.0
 */
declare class Agent {
    userId: number;
    name: string;
    profileUrl: string;
    sendbirdId?: string;
    /**
     * @since 1.0.0
     * @private
     * @desc Create an agent.
     */
    constructor(params: AgentParams);
    /**
     * @since 1.0.0
     * @private
     * @desc Parse JSON data and patch Agent object.
     */
    fetchFromJSON(params: AgentParams): void;
}

/**
 * @module RelatedChannel
 * @ignore
 */
interface RelatedChannelParams {
    channel_url: string;
    name: string;
}
/**
 * @classdesc RelatedChannel
 * @since 1.0.14
 */
declare class RelatedChannel {
    channelUrl: string;
    name: string;
    /**
     * @since 1.0.14
     * @private
     * @desc Create a related channel
     */
    constructor(params: RelatedChannelParams);
    /**
     * @since 1.0.14
     * @private
     * @desc Parse JSON data and patch RelatedChannel object.
     */
    fetchFromJSON(params: RelatedChannelParams): void;
}

type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>;
type OverloadUnionRecursive<TOverload, TPartialOverload = unknown> = TOverload extends (...args: infer TArgs) => infer TReturn ? TPartialOverload extends TOverload ? never : OverloadUnionRecursive<TPartialOverload & TOverload, TPartialOverload & ((...args: TArgs) => TReturn) & OverloadProps<TOverload>> | ((...args: TArgs) => TReturn) : never;
type OverloadUnion<TOverload extends (...args: any[]) => any> = Exclude<OverloadUnionRecursive<(() => never) & TOverload>, TOverload extends () => never ? never : () => never>;
/**
  This is to help with overloading optional functions in TypeScript.
  For example CreateTicketParams in src/model/ticketUtils/types.ts
  createTicket(title.required, name.required, groupKey?.optional, customFields?.optional, ..., callback.required)
  in this case, you need union of all possible overloads, and this type helps with that.
  ie: [title, name, callback] | [title, name, groupKey, callback] | [title, name, groupKey, customFields, callback]...
  Slack: https://sendbird.slack.com/archives/G01290GCDCN/p1689903742398759
  example:
  ```
   type SbDeskAuth1 = (userId: string) => void;
   type SbDeskAuth2 = (userId: string, cb: () => void) => void;
   type SbDeskAuth3 = (userId: string, nickname: string, cb: () => void) => void;
   type SbDeskAuth4 = (userId: string, nickname: string, profile: string, cb: () => void) => void;

   type SendbirdDeskAuthType = OverloadParameters<
    SbDeskAuth1
    | SbDeskAuth2
    | SbDeskAuth3
    | SbDeskAuth4
   >;
  ```
 */
type OverloadParameters<T extends (...args: any[]) => any> = Parameters<OverloadUnion<T>>;
type OverloadReturnType<T extends (...args: any[]) => any> = ReturnType<OverloadUnion<T>>;

type OverloadParams_OverloadParameters<T extends (...args: any[]) => any> = OverloadParameters<T>;
type OverloadParams_OverloadReturnType<T extends (...args: any[]) => any> = OverloadReturnType<T>;
declare namespace OverloadParams {
  export type { OverloadParams_OverloadParameters as OverloadParameters, OverloadParams_OverloadReturnType as OverloadReturnType };
}

declare const TicketPriorityMap: {
    readonly URGENT: "URGENT";
    readonly HIGH: "HIGH";
    readonly MEDIUM: "MEDIUM";
    readonly LOW: "LOW";
};
type TicketPriority = (typeof TicketPriorityMap)[keyof typeof TicketPriorityMap];
type Customer = {
    id: number;
    sendbirdId: string;
    project: number;
    createdAt: string;
    displayName: string;
    photoThumbnailUrl: string;
};
declare const TicketStatusMap: {
    readonly INITIALIZED: "INITIALIZED";
    readonly PROACTIVE: "PROACTIVE";
    readonly UNASSIGNED: "UNASSIGNED";
    readonly ASSIGNED: "ASSIGNED";
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
};
type TicketStatus = (typeof TicketStatusMap)[keyof typeof TicketStatusMap];
interface TicketCreateParams {
    title: string;
    name: string;
    groupKey?: string;
    customFields?: object;
    priority?: TicketPriority;
    relatedChannelUrls?: string[];
    botKey?: string;
}
interface TicketParams {
    id: number;
    channelUrl: string;
    channelName: string;
    status?: TicketStatus;
    info?: string;
    priority?: TicketPriority;
    recentAssignment?: {
        agent?: AgentParams;
    };
    proactiveChatCreatedBy?: AgentParams;
    customer?: Customer;
    customFields?: {
        key: string;
        value: any;
    }[];
    group?: number;
    firstResponseTime?: number;
    relatedChannels?: string;
    updatedAt?: number;
}
interface RawTicketListParams {
    offset?: number;
    limit?: number;
    order?: string;
    channelUrl?: string;
    customFieldFilter?: object;
    group?: string;
    status?: 'ALL' | 'OPEN' | 'CLOSED';
}
interface TicketListFilter {
    limit?: number;
    customFieldFilter?: object;
    group?: string;
}
interface TicketListParams extends TicketListFilter {
    status?: 'ALL' | 'OPEN' | 'CLOSED';
}
type CloseTicketCb = (succes: TicketClass | null, error: Error | null) => void;
type CloseTicketParams1 = () => void;
type CloseTicketParams2 = (comment: string) => void;
type CloseTicketParams3 = (cb: CloseTicketCb) => void;
type CloseTicketParams4 = (comment: string, cb: CloseTicketCb) => void;
type CloseTicketParams = OverloadParameters<CloseTicketParams1 | CloseTicketParams2 | CloseTicketParams3 | CloseTicketParams4>;
type CloseTicketParamsMap = {
    comment: string;
    cb: CloseTicketCb;
};
type CreateTicketCb = (succes: TicketClass | null, error: Error | null) => void;
type CreateTicketParams1 = (title: string, name: string, cb: CreateTicketCb) => void;
type CreateTicketParams2 = (title: string, name: string, groupKey: string | null, cb: CreateTicketCb) => void;
type CreateTicketParams3 = (title: string, name: string, groupKey: string | null, customFields: object | null, cb: CreateTicketCb) => void;
type CreateTicketParams4 = (title: string, name: string, groupKey: string | null, customFields: object | null, priority: TicketPriority | null, cb: CreateTicketCb) => void;
type CreateTicketParams5 = (title: string, name: string, groupKey: string | null, customFields: object | null, priority: TicketPriority | null, relatedChannelUrls: string[] | null, cb: CreateTicketCb) => void;
type CreateTicketParams6 = (title: string, name: string, groupKey: string | null, customFields: object | null, priority: TicketPriority | null, relatedChannelUrls: string[] | null, botKey: string | null, cb: CreateTicketCb) => void;
type CreateTicketParams7 = (title: string, name: string, groupKey: string | null, customFields: object | null, priority: TicketPriority | null, relatedChannelUrls: string[] | null, botKey: string | null, cb: CreateTicketCb) => void;
type CreateTicketParams = OverloadParameters<CreateTicketParams1 | CreateTicketParams2 | CreateTicketParams3 | CreateTicketParams4 | CreateTicketParams5 | CreateTicketParams6>;
type CreateTicketArgsMap = {
    title: string;
    name: string;
    groupKey?: string | null;
    customFields?: object | null;
    priority?: TicketPriority | null;
    relatedChannelUrls?: string[] | null;
    botKey?: string | null;
    cb: CreateTicketCb;
};
type RefreshTicketCb = (ticket: TicketClass | null, error: Error | null) => void;
type Reopencb = (ticket: TicketClass | null, error: Error | null) => void;
type CancelTicketCb = (ticket: TicketClass | null, error: Error | null) => void;
type CancelTicketParams1 = (cb: CancelTicketCb) => void;
type CancelTicketParams2 = (groupKeyForTransfer: string, cb: CancelTicketCb) => void;
type CancelTicketParams = OverloadParameters<CancelTicketParams1 | CancelTicketParams2>;
type CancelTicketParamsMap = {
    groupKeyForTransfer: string;
    cb: CancelTicketCb;
};
type ConfirmEndOfChatCb = (ticket: TicketClass | null, error: Error | null) => void;
type SelectQuestionCb = (ticket: TicketClass | null, error: Error | null) => void;
type SetPriorityCb = (ticket: TicketClass | null, error: Error | null) => void;
type SetRelatedChannelUrlsCb = (ticket: TicketClass | null, error: Error | null) => void;
type SetCustomFieldsCb = (ticket: TicketClass | null, error: Error | null) => void;
type GetOpenCountResponse = {
    ACTIVE: number;
    ASSIGNED: number;
    CLOSED: number;
    IDLE: number;
    PENDING: number;
    UNASSIGNED: number;
    WORK_IN_PROGRESS: number;
};
type GetOpenCountCb = (data: GetOpenCountResponse | null, error: Error | null) => void;
type GetUrlPreviewResponse = {
    url: string;
    title: string;
    siteName: string;
    description: string;
    image: string;
};
type GetUrlPreviewCb = (data: GetUrlPreviewResponse | null, error: Error | null) => void;
type GetListCb = (tickets: TicketClass[] | null, error: Error | null) => void;
type GetAllTicketsCb = (tickets: TicketClass[] | null, error: Error | null) => void;
type GetAllTicketsParams1 = (offset: number, filter: TicketListFilter, cb: GetAllTicketsCb) => void;
type GetAllTicketsParams2 = (offset: number, cb: GetAllTicketsCb) => void;
type GetAllTicketsParams = OverloadParameters<GetAllTicketsParams1 | GetAllTicketsParams2>;
type GetAllTicketsParamsMap = {
    offset: number;
    filter: TicketListFilter;
    cb: GetAllTicketsCb;
};
interface OpenedTicketClass extends TicketClass {
    status: 'OPEN' | 'UNASSIGNED' | 'ASSIGNED' | 'PROACTIVE';
}
type GetOpenedListCb = (tickets: OpenedTicketClass[] | null, error: Error | null) => void;
type GetOpenedListParams1 = (offset: number, filter: TicketListFilter, cb: GetOpenedListCb) => void;
type GetOpenedListParams2 = (offset: number, cb: GetOpenedListCb) => void;
type GetOpenedListParams = OverloadParameters<GetOpenedListParams1 | GetOpenedListParams2>;
type GetOpenedListParamsMap = {
    offset: number;
    filter: TicketListFilter;
    cb: GetOpenedListCb;
};
interface ClosedTicketClass extends TicketClass {
    status: 'CLOSED';
}
type GetClosedListCb = (tickets: ClosedTicketClass[] | null, error: Error | null) => void;
type GetClosedListParams1 = (offset: number, filter: TicketListFilter, cb: GetClosedListCb) => void;
type GetClosedListParams2 = (offset: number, cb: GetClosedListCb) => void;
type GetClosedListParams = OverloadParameters<GetClosedListParams1 | GetClosedListParams2>;
type GetClosedListParamsMap = {
    offset: number;
    filter: TicketListFilter;
    cb: GetClosedListCb;
};
type GetByChannelUrlParamsMap = {
    channelUrl: string;
    cachingEnabled: boolean;
    cb: GetByChannelUrlCb;
};
type GetByChannelUrlCb = (tickets: TicketClass | null, error: Error | null) => void;
type GetByChannelUrlParams1 = (channelUrl: string, cachingEnabled: boolean, callback: GetByChannelUrlCb) => void;
type GetByChannelUrlParams2 = (channelUrl: string, callback: GetByChannelUrlCb) => void;
type GetByChannelUrlParams = OverloadParameters<GetByChannelUrlParams1 | GetByChannelUrlParams2>;
type SubmitFeedbackCb = (ticket: TicketClass | null, error: Error | null) => void;
/**
 * Note to devs: This class defines a Ticket object.
 * And as a Class to create tickets
 * static methods are used to create tickets
 * and instance methods are used to do updates on Ticket Instance
 */
declare class TicketClass {
    id: number;
    title: string;
    status: TicketStatus;
    info: object | null;
    priority: TicketPriority;
    agent: Agent | null;
    customer: Customer | null;
    customFields: object;
    group: number;
    relatedChannels: RelatedChannel[];
    channel: GroupChannel;
    channelUrl: string;
    updatedAt: number;
    static create(...params: CreateTicketParams): void;
    static isDeskCustomType(customType: string): boolean;
    static defaultLimit(): number;
    static clearCache(): void;
    static getOpenCount(cb: GetOpenCountCb): void;
    static getUrlPreview(url: string, cb: GetUrlPreviewCb): void;
    static getList(params: RawTicketListParams, cb: GetListCb): void;
    static getAllTickets(...params: GetAllTicketsParams): void;
    static getOpenedList(...params: GetOpenedListParams): void;
    static getClosedList(...params: GetClosedListParams): void;
    static getByChannelUrl(...params: GetByChannelUrlParams): void;
    static submitFeedback(message: BaseMessage, score: number, comment: string, cb: SubmitFeedbackCb): void;
    static confirmEndOfChat(message: BaseMessage, confirm: 'yes' | 'no', cb: ConfirmEndOfChatCb): void;
    instanceSubmitFeedback(message: BaseMessage, score: number, comment: string, cb: SubmitFeedbackCb): void;
    instanceConfirmEndOfChat(message: BaseMessage, confirm: 'yes' | 'no', cb: ConfirmEndOfChatCb): void;
    close(...params: CloseTicketParams): void;
    refresh(cb: RefreshTicketCb): void;
    reopen(cb: Reopencb): void;
    cancel(...params: CancelTicketParams): void;
    fetchFromJSON(json: TicketParams): void;
    selectQuestion(faqFileId: number, question: string, cb: SelectQuestionCb): void;
    setPriority(priority: TicketPriority, cb: SetPriorityCb): void;
    setRelatedChannelUrls(relatedChannelUrls: string[], cb: SetRelatedChannelUrlsCb): void;
    setCustomFields(customFields: object, cb: SetCustomFieldsCb): void;
}

type TicketTypes_CancelTicketCb = CancelTicketCb;
type TicketTypes_CancelTicketParams = CancelTicketParams;
type TicketTypes_CancelTicketParams1 = CancelTicketParams1;
type TicketTypes_CancelTicketParams2 = CancelTicketParams2;
type TicketTypes_CancelTicketParamsMap = CancelTicketParamsMap;
type TicketTypes_CloseTicketCb = CloseTicketCb;
type TicketTypes_CloseTicketParams = CloseTicketParams;
type TicketTypes_CloseTicketParams1 = CloseTicketParams1;
type TicketTypes_CloseTicketParams2 = CloseTicketParams2;
type TicketTypes_CloseTicketParams3 = CloseTicketParams3;
type TicketTypes_CloseTicketParams4 = CloseTicketParams4;
type TicketTypes_CloseTicketParamsMap = CloseTicketParamsMap;
type TicketTypes_ClosedTicketClass = ClosedTicketClass;
type TicketTypes_ConfirmEndOfChatCb = ConfirmEndOfChatCb;
type TicketTypes_CreateTicketArgsMap = CreateTicketArgsMap;
type TicketTypes_CreateTicketCb = CreateTicketCb;
type TicketTypes_CreateTicketParams = CreateTicketParams;
type TicketTypes_CreateTicketParams1 = CreateTicketParams1;
type TicketTypes_CreateTicketParams2 = CreateTicketParams2;
type TicketTypes_CreateTicketParams3 = CreateTicketParams3;
type TicketTypes_CreateTicketParams4 = CreateTicketParams4;
type TicketTypes_CreateTicketParams5 = CreateTicketParams5;
type TicketTypes_CreateTicketParams6 = CreateTicketParams6;
type TicketTypes_CreateTicketParams7 = CreateTicketParams7;
type TicketTypes_Customer = Customer;
type TicketTypes_GetAllTicketsCb = GetAllTicketsCb;
type TicketTypes_GetAllTicketsParams = GetAllTicketsParams;
type TicketTypes_GetAllTicketsParams1 = GetAllTicketsParams1;
type TicketTypes_GetAllTicketsParams2 = GetAllTicketsParams2;
type TicketTypes_GetAllTicketsParamsMap = GetAllTicketsParamsMap;
type TicketTypes_GetByChannelUrlCb = GetByChannelUrlCb;
type TicketTypes_GetByChannelUrlParams = GetByChannelUrlParams;
type TicketTypes_GetByChannelUrlParams1 = GetByChannelUrlParams1;
type TicketTypes_GetByChannelUrlParams2 = GetByChannelUrlParams2;
type TicketTypes_GetByChannelUrlParamsMap = GetByChannelUrlParamsMap;
type TicketTypes_GetClosedListCb = GetClosedListCb;
type TicketTypes_GetClosedListParams = GetClosedListParams;
type TicketTypes_GetClosedListParams1 = GetClosedListParams1;
type TicketTypes_GetClosedListParams2 = GetClosedListParams2;
type TicketTypes_GetClosedListParamsMap = GetClosedListParamsMap;
type TicketTypes_GetListCb = GetListCb;
type TicketTypes_GetOpenCountCb = GetOpenCountCb;
type TicketTypes_GetOpenCountResponse = GetOpenCountResponse;
type TicketTypes_GetOpenedListCb = GetOpenedListCb;
type TicketTypes_GetOpenedListParams = GetOpenedListParams;
type TicketTypes_GetOpenedListParams1 = GetOpenedListParams1;
type TicketTypes_GetOpenedListParams2 = GetOpenedListParams2;
type TicketTypes_GetOpenedListParamsMap = GetOpenedListParamsMap;
type TicketTypes_GetUrlPreviewCb = GetUrlPreviewCb;
type TicketTypes_GetUrlPreviewResponse = GetUrlPreviewResponse;
type TicketTypes_OpenedTicketClass = OpenedTicketClass;
type TicketTypes_RawTicketListParams = RawTicketListParams;
type TicketTypes_RefreshTicketCb = RefreshTicketCb;
type TicketTypes_Reopencb = Reopencb;
type TicketTypes_SelectQuestionCb = SelectQuestionCb;
type TicketTypes_SetCustomFieldsCb = SetCustomFieldsCb;
type TicketTypes_SetPriorityCb = SetPriorityCb;
type TicketTypes_SetRelatedChannelUrlsCb = SetRelatedChannelUrlsCb;
type TicketTypes_SubmitFeedbackCb = SubmitFeedbackCb;
type TicketTypes_TicketClass = TicketClass;
declare const TicketTypes_TicketClass: typeof TicketClass;
type TicketTypes_TicketCreateParams = TicketCreateParams;
type TicketTypes_TicketListFilter = TicketListFilter;
type TicketTypes_TicketListParams = TicketListParams;
type TicketTypes_TicketParams = TicketParams;
type TicketTypes_TicketPriority = TicketPriority;
declare const TicketTypes_TicketPriorityMap: typeof TicketPriorityMap;
type TicketTypes_TicketStatus = TicketStatus;
declare const TicketTypes_TicketStatusMap: typeof TicketStatusMap;
declare namespace TicketTypes {
  export { TicketTypes_TicketClass as TicketClass, TicketTypes_TicketPriorityMap as TicketPriorityMap, TicketTypes_TicketStatusMap as TicketStatusMap };
  export type { TicketTypes_CancelTicketCb as CancelTicketCb, TicketTypes_CancelTicketParams as CancelTicketParams, TicketTypes_CancelTicketParams1 as CancelTicketParams1, TicketTypes_CancelTicketParams2 as CancelTicketParams2, TicketTypes_CancelTicketParamsMap as CancelTicketParamsMap, TicketTypes_CloseTicketCb as CloseTicketCb, TicketTypes_CloseTicketParams as CloseTicketParams, TicketTypes_CloseTicketParams1 as CloseTicketParams1, TicketTypes_CloseTicketParams2 as CloseTicketParams2, TicketTypes_CloseTicketParams3 as CloseTicketParams3, TicketTypes_CloseTicketParams4 as CloseTicketParams4, TicketTypes_CloseTicketParamsMap as CloseTicketParamsMap, TicketTypes_ClosedTicketClass as ClosedTicketClass, TicketTypes_ConfirmEndOfChatCb as ConfirmEndOfChatCb, TicketTypes_CreateTicketArgsMap as CreateTicketArgsMap, TicketTypes_CreateTicketCb as CreateTicketCb, TicketTypes_CreateTicketParams as CreateTicketParams, TicketTypes_CreateTicketParams1 as CreateTicketParams1, TicketTypes_CreateTicketParams2 as CreateTicketParams2, TicketTypes_CreateTicketParams3 as CreateTicketParams3, TicketTypes_CreateTicketParams4 as CreateTicketParams4, TicketTypes_CreateTicketParams5 as CreateTicketParams5, TicketTypes_CreateTicketParams6 as CreateTicketParams6, TicketTypes_CreateTicketParams7 as CreateTicketParams7, TicketTypes_Customer as Customer, TicketTypes_GetAllTicketsCb as GetAllTicketsCb, TicketTypes_GetAllTicketsParams as GetAllTicketsParams, TicketTypes_GetAllTicketsParams1 as GetAllTicketsParams1, TicketTypes_GetAllTicketsParams2 as GetAllTicketsParams2, TicketTypes_GetAllTicketsParamsMap as GetAllTicketsParamsMap, TicketTypes_GetByChannelUrlCb as GetByChannelUrlCb, TicketTypes_GetByChannelUrlParams as GetByChannelUrlParams, TicketTypes_GetByChannelUrlParams1 as GetByChannelUrlParams1, TicketTypes_GetByChannelUrlParams2 as GetByChannelUrlParams2, TicketTypes_GetByChannelUrlParamsMap as GetByChannelUrlParamsMap, TicketTypes_GetClosedListCb as GetClosedListCb, TicketTypes_GetClosedListParams as GetClosedListParams, TicketTypes_GetClosedListParams1 as GetClosedListParams1, TicketTypes_GetClosedListParams2 as GetClosedListParams2, TicketTypes_GetClosedListParamsMap as GetClosedListParamsMap, TicketTypes_GetListCb as GetListCb, TicketTypes_GetOpenCountCb as GetOpenCountCb, TicketTypes_GetOpenCountResponse as GetOpenCountResponse, TicketTypes_GetOpenedListCb as GetOpenedListCb, TicketTypes_GetOpenedListParams as GetOpenedListParams, TicketTypes_GetOpenedListParams1 as GetOpenedListParams1, TicketTypes_GetOpenedListParams2 as GetOpenedListParams2, TicketTypes_GetOpenedListParamsMap as GetOpenedListParamsMap, TicketTypes_GetUrlPreviewCb as GetUrlPreviewCb, TicketTypes_GetUrlPreviewResponse as GetUrlPreviewResponse, TicketTypes_OpenedTicketClass as OpenedTicketClass, TicketTypes_RawTicketListParams as RawTicketListParams, TicketTypes_RefreshTicketCb as RefreshTicketCb, TicketTypes_Reopencb as Reopencb, TicketTypes_SelectQuestionCb as SelectQuestionCb, TicketTypes_SetCustomFieldsCb as SetCustomFieldsCb, TicketTypes_SetPriorityCb as SetPriorityCb, TicketTypes_SetRelatedChannelUrlsCb as SetRelatedChannelUrlsCb, TicketTypes_SubmitFeedbackCb as SubmitFeedbackCb, TicketTypes_TicketCreateParams as TicketCreateParams, TicketTypes_TicketListFilter as TicketListFilter, TicketTypes_TicketListParams as TicketListParams, TicketTypes_TicketParams as TicketParams, TicketTypes_TicketPriority as TicketPriority, TicketTypes_TicketStatus as TicketStatus };
}

/**
 * @module Ticket
 * @ignore
 */

/**
 * @since 1.0.0
 */
declare class Ticket implements TicketClass {
    id: number;
    title: string;
    status: TicketStatus;
    info: object | null;
    priority: TicketPriority;
    agent: Agent | null;
    proactiveChatCreatedBy: Agent | null;
    customer: Customer | null;
    customFields: object;
    group: number;
    firstResponseTime: number;
    relatedChannels: RelatedChannel[];
    channel: GroupChannel;
    channelUrl: string;
    updatedAt: number;
    /**
     * @since 1.0.0
     * @private
     * @desc Create a ticket.
     */
    constructor(params: TicketParams);
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
    static get Status(): {
        readonly INITIALIZED: "INITIALIZED";
        readonly PROACTIVE: "PROACTIVE";
        readonly UNASSIGNED: "UNASSIGNED";
        readonly ASSIGNED: "ASSIGNED";
        readonly OPEN: "OPEN";
        readonly CLOSED: "CLOSED";
    };
    /**
     * @since 1.0.0
     * @private
     * @desc Parse JSON data and patch Ticket object.
     */
    fetchFromJSON(params: TicketParams): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _fetchChannel(): Promise<void>;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _getTicketList<T extends TicketClass | OpenedTicketClass | ClosedTicketClass>(params: RawTicketListParams): Promise<T[]>;
    /**
     * @since 1.0.0
     * @desc Refresh ticket info.
     * @param {function(ticket:Ticket, err:Error)} cb - cb function.
     */
    refresh(cb: RefreshTicketCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _refresh(): Promise<TicketClass>;
    /**
     * @since 1.0.6
     * @desc Reopen closed ticket.
     * @param {function} cb - Function(res:Ticket, err:Error).
     */
    reopen(cb: Reopencb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _reopen(): Promise<TicketClass>;
    /**
     * @since 1.0.18
     * @desc Cancel the assignment and set it to open.
     * @param {string} groupKeyForTransfer - Group key for transfer(optional)
     * @param {function} cb - Function(res:Ticket, err:Error).
     */
    cancel(...params: CancelTicketParams): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _cancel(args: CancelTicketParamsMap): Promise<TicketClass>;
    /**
     * @since 1.0.16
     * @desc Force close an assigned ticket.
     * @param {string} comment - Comment for closing the ticket.
     */
    close(...params: CloseTicketParams): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _close(args: CloseTicketParamsMap): Promise<TicketClass>;
    /**
     * @since 1.0.18
     * @desc Select a question.
     * @param {number} faqFileId - FAQ file ID.
     * @param {string} question - Question text.
     * @param {function} callback - Function(res:object, err:Error).
     */
    selectQuestion(faqFileId: number, question: string, cb: SelectQuestionCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _selectQuestion(faqFileId: number, question: string): Promise<TicketClass>;
    /**
     * @since 1.0.10
     * @desc Set ticket priority.
     * @param {string} priority - priority.
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    setPriority(priority: TicketPriority, cb: SetPriorityCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _setPriority(priority: TicketPriority): Promise<TicketClass>;
    /**
     * @since 1.0.14
     * @desc Set ticket related channel URLs.
     * @param {array<string>} relatedChannelUrls - related channel URLs.
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    setRelatedChannelUrls(relatedChannelUrls: string[], cb: SetRelatedChannelUrlsCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _setRelatedChannelUrls(relatedChannelUrls: string[]): Promise<TicketClass>;
    /**
     * @since 1.0.10
     * @desc Set ticket customFields.
     * @param {object} customFields - customFields object (key-value).
     * @param {function} callback - Function(res:Ticket, err:Error).
     */
    setCustomFields(customFields: object, cb: SetCustomFieldsCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    _setCustomFields(customFields: object): Promise<TicketClass>;
    /**
     * @ignore
     */
    static isDeskCustomType(customType: string): boolean;
    /**
     * @ignore
     */
    static get defaultLimit(): number;
    /**
     * @static
     * @since 1.0.0
     * @desc Clear cached ticket. Clear all if channelUrl is not specified.
     */
    static clearCache(channelUrl?: string): void;
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
    static create(...params: CreateTicketParams): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _create(args: CreateTicketArgsMap): Promise<TicketClass>;
    /**
     * @static
     * @since 1.0.0
     * @desc Get ticket count for each state: UNASSIGNED, ASSIGNED, CLOSED.
     * @param {function} callback - Function(result:GetOpenCountResponse, err:Error).
     */
    static getOpenCount(cb: GetOpenCountCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _getOpenCount(): Promise<GetOpenCountResponse>;
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
    static getByChannelUrl(...params: GetByChannelUrlParams): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _getByChannelUrl(args: Omit<GetByChannelUrlParamsMap, 'cb'>): Promise<TicketClass>;
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
    static getList(params: RawTicketListParams, cb: GetListCb): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Load opened ticket list.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    static getOpenedList(...params: GetOpenedListParams): void;
    /**
     * @static
     * @since 1.0.21
     * @desc Lists all tickets.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    static getAllTickets(...params: GetAllTicketsParams): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Load closed ticket list.
     * @param {integer} offset - list offset.
     * @param {object} customFieldFilter - customField filter.
     * @param {function} callback - Function(list:Array<Ticket>, err:Error)
     */
    static getClosedList(...params: GetClosedListParams): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Get URL preview info from URL.
     * @param {string} url - URL to load preview metadata.
     * @param {function} callback - Function(result:Object, err:Error).
     */
    static getUrlPreview(url: string, cb: GetUrlPreviewCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _getUrlPreview(url: string): Promise<GetUrlPreviewResponse>;
    /**
     * @since 1.0.0
     * @desc Reply to confirm-end-of-chat request in yes or no.
     */
    static confirmEndOfChat(message: BaseMessage, confirm: 'yes' | 'no', cb: ConfirmEndOfChatCb): void;
    /**
     * @since 1.0.0
     * @desc Reply to confirm-end-of-chat request in yes or no.
     * This shouldnt be static, but it is for backwards compatibility
     */
    instanceConfirmEndOfChat(message: BaseMessage, confirm: 'yes' | 'no', cb: ConfirmEndOfChatCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _confirmEndOfChat(message: BaseMessage, confirm: 'yes' | 'no'): Promise<TicketClass>;
    /**
     * @since 1.0.8
     * @desc Submit feedback with a score and a comment.
     */
    static submitFeedback(message: BaseMessage, score: number, comment: string | undefined, cb: SubmitFeedbackCb): void;
    /**
     * @since 1.0.8
     * @desc Submit feedback with a score and a comment.
     */
    instanceSubmitFeedback(message: BaseMessage, score: number, comment: string | undefined, cb: SubmitFeedbackCb): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     * This shouldnt be static, but it is for backwards compatibility
     */
    static _submitFeedback(message: BaseMessage, score: number, comment?: string): Promise<TicketClass>;
}

/**
 * @module Message
 * @ignore
 */
/**
 * @since 1.0.0
 */
declare class Message {
    /**
     * @static
     * @since 1.0.0
     * @desc message custom type.
     * @property {string} RICH_MESSAGE - SENDBIRD_DESK_RICH_MESSAGE
     * @property {string} ADMIN_MESSAGE - SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE
     */
    static get CustomType(): {
        RICH_MESSAGE: string;
        ADMIN_MESSAGE: string;
    };
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
    static get DataType(): {
        TICKET_INQUIRE_CLOSURE: string;
        TICKET_ASSIGN: string;
        TICKET_TRANSFER: string;
        TICKET_CLOSE: string;
        TICKET_FEEDBACK: string;
        URL_PREVIEW: string;
    };
    /**
     * @static
     * @since 1.0.0
     * @desc closure inquiry messsage state.
     * @property {string} WAITING - WAITING
     * @property {string} CONFIRMED - CONFIRMED
     * @property {string} DECLINED - DECLINED
     */
    static get ClosureState(): {
        WAITING: string;
        CONFIRMED: string;
        DECLINED: string;
    };
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
    static get FeedbackState(): {
        WAITING: string;
        CONFIRMED: string;
    };
    /**
     * @ignore
     */
    static get UrlRegExp(): RegExp;
}

type AuthCallback = () => void;
type SbDeskAuthUserIdCb = (userId: string, cb?: AuthCallback) => void;
type SbDeskAuthUserIdTokenCb = (userId: string, accessToken: string, cb?: AuthCallback) => void;
type SbDeskAuthUserIdTokenLangCb = (userId: string, accessToken: string, language: string, cb?: AuthCallback) => void;
type SendbirdDeskAuthParams = Parameters<SbDeskAuthUserIdCb> | Parameters<SbDeskAuthUserIdTokenCb> | Parameters<SbDeskAuthUserIdTokenLangCb>;
type SendbirdAuthParamsMap = {
    userId: string;
    accessToken: string;
    language?: string;
    cb: AuthCallback;
};
declare function parseAuthArgs(params: SendbirdDeskAuthParams): SendbirdAuthParamsMap;
declare function validateAuthArgs(params: SendbirdAuthParamsMap): void;

type appInit_SendbirdAuthParamsMap = SendbirdAuthParamsMap;
type appInit_SendbirdDeskAuthParams = SendbirdDeskAuthParams;
declare const appInit_parseAuthArgs: typeof parseAuthArgs;
declare const appInit_validateAuthArgs: typeof validateAuthArgs;
declare namespace appInit {
  export { appInit_parseAuthArgs as parseAuthArgs, appInit_validateAuthArgs as validateAuthArgs };
  export type { appInit_SendbirdAuthParamsMap as SendbirdAuthParamsMap, appInit_SendbirdDeskAuthParams as SendbirdDeskAuthParams };
}

type types_AgentParams = AgentParams;
type types_Message = Message;
declare const types_Message: typeof Message;
declare const types_TicketTypes: typeof TicketTypes;
declare namespace types {
  export { appInit as AuthTypes, error as Errors, types_Message as Message, OverloadParams as OverloadParameters, types_TicketTypes as TicketTypes };
  export type { types_AgentParams as AgentParams };
}

type CustomerResponseRaw = {
    id: number;
    key: string;
    value: string;
};
type CustomerResponseFormatted = {
    [key: string]: string;
};
interface InitParams {
    platform?: DeviceOsPlatform;
    hostType?: ApiHostType | null;
}
/** SendbirdDesk SDK
 */
declare class SendbirdDesk {
    /**
     * @static
     * @since 1.0.0
     * @desc Get Desk SDK version.
     */
    static get version(): string;
    /**
     * @static
     * @since 1.0.0
     * @desc SendBirdDeskError class reference.
     * @type {module:SendBirdDeskError}
     */
    static get Error(): typeof SendbirdDeskError;
    /**
     * @static
     * @since 1.0.0
     * @desc Agent class reference.
     * @type {module:Agent}
     */
    static get Agent(): typeof Agent;
    /**
     * @static
     * @since 1.0.0
     * @desc Ticket class reference.
     * @type {module:Ticket}
     */
    static get Ticket(): typeof Ticket;
    /**
     * @static
     * @since 1.0.0
     * @desc Message class reference.
     * @type {module:Message} - BaseMessage in Sendbird Messaging SDK
     */
    static get Message(): typeof Message;
    /**
     * @static
     * @since 1.0.14
     * @desc RelatedChannel class reference.
     * @type {module:RelatedChannel}
     */
    static get RelatedChannel(): typeof RelatedChannel;
    /**
     * @ignore
     */
    static get UrlRegExp(): RegExp;
    /**
     * @static
     * @since 1.0.1
     * @desc Initialize SDK.
     */
    static init(sendbird: SendbirdGroupChat, platform?: DeviceOsPlatform): void;
    /**
     * @static
     * @since 1.2.0
     * @desc Initialize SDK with options.
     * @param {SendbirdGroupChat} sendbird - Sendbird Chat instance.
     * @param {InitParams} [params] - Init options (platform, hostType).
     */
    static init(sendbird: SendbirdGroupChat, params?: InitParams): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Authenticate and connect to Desk server.
     * @param {string} userId - User ID.
     * @param {function} [callback] - Optional callback function.
     */
    static authenticate(userId: string, callback?: () => void): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Authenticate and connect to Desk server.
     * @param {string} userId - User ID.
     * @param {string} accessToken - Access token.
     * @param {function} [callback] - Optional callback function.
     */
    static authenticate(userId: string, accessToken: string, callback?: () => void): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Authenticate and connect to Desk server.
     * @param {string} userId - User ID.
     * @param {string} accessToken - Access token.
     * @param {string} language - Language preference in IETF BCP 47 format (e.g., "ko", "en").
     * @param {function} [callback] - Optional callback function with user object and error.
     */
    static authenticate(userId: string, accessToken: string, language: string, callback?: () => void): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _authenticate(params: SendbirdAuthParamsMap): Promise<void>;
    /**
     * @static
     * @since 1.0.1
     * @desc Check if the channel belongs to Desk.
     */
    static isDeskChannel(channel: GroupChannel): boolean;
    /**
     * @ignore
     * @desc Set a fully custom API host. null/empty clears it and reverts to the hostType-based host.
     */
    static setApiHost(host: string | null): void;
    /**
     * @static
     * @since 1.0.0
     * @desc Set SDK to debug mode which adds internal logging on desk event.
     */
    static setDebugMode(): void;
    /**
     * @static
     * @since 1.0.8
     * @desc Set customer customFields(Must be defined in dashboard).
     * @param {object} customFields - customFields object (key-value).
     * @param {function} callback - Function(res: object, err: Error).
     */
    static setCustomerCustomFields<T extends object>(customFields: T, cb: (res: Partial<T> | null, err: Error | null) => void): void;
    /**
     * @ignore
     * @private
     * @since 1.1.0
     */
    static _setCustomerCustomFields<T extends object>(customFields: T): Promise<Partial<T>>;
    static _resToCustomFields(data: CustomerResponseRaw[]): CustomerResponseFormatted;
    /**
     * @param {string} language - Language preference in IETF BCP 47 format (e.g., "ko", "en").
     * @param {function} callback - Function(err: Error | null).
     * */
    static setCustomerLanguage(language: string, callback: (err: Error | null) => void): void;
    static _setCustomerLanguage(language: string): Promise<void>;
}

export { Agent, ApiHostType, types as DeskHelperTypes, RelatedChannel, SendbirdDeskError, Ticket, SendbirdDesk as default };
export type { CustomerResponseFormatted, CustomerResponseRaw, InitParams, TicketCreateParams, TicketListFilter, TicketListParams, TicketPriority, TicketStatus };
