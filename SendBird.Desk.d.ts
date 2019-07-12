/**
 * Type Definitions for SendBird Desc SDK v1.0.7
 * homepage: https://sendbird.com/
 */
export = SendBirdDesk;
export as namespace SendBirdDesk;

declare const SendBirdDesk: SendBirdDeskStatic;

interface SendBirdDeskStatic {
  version: String;
  Agent: SendBirdDesk.AgentStatic;
  Ticket: SendBirdDesk.TicketStatic;
  Message: SendBirdDesk.MessageStatic;
  Error: SendBirdDesk.SendBirdDeskErrorStatic;

  init(SendBird: Object): void;
  authenticate(userId: String, callback: SendBirdDesk.Callback): void;
  authenticate(userId: String, accessToken: String, callback: SendBirdDesk.Callback): void;
  isDeskChannel(channel: SendBirdDesk.GroupChannel): Boolean;
  setDebugMode(): void;
}

declare namespace SendBirdDesk {
  interface GroupChannel {
    url: String;
    name: String;
    customType: String;
  }
  type Callback = (res: Object, error: Error) => void;
  type TicketCallback = (ticket: TicketInstance, error: Error) => void;
  type TicketArrayCallback = (list: Array<TicketInstance>, error: Error) => void;

  interface AgentStatic {
    new (json: Object): AgentInstance;
  }
  interface AgentInstance {
    userId: String;
    name: String;
    profileUrl: String;
    fetchFromJSON(json: Object): void;
  }
  interface TicketStatic {
    Status: TicketStatus;
    isStatus(val: String): Boolean;
    clearCache(channelUrl: String): void;
    create(title: String, name: String, callback: TicketCallback): void;
    create(title: String, name: String, groupKey: String, customFields: Object, callback: TicketCallback): void;
    getOpenCount(callback: Callback): void;
    getByChannelUrl(channelUrl: String, callback: TicketCallback): void;
    getOpenedList(offset: Number, callback: TicketArrayCallback): void;
    getOpenedList(offset: Number, customFieldFilter: Object, callback: TicketArrayCallback): void;
    getClosedList(offset: Number, callback: TicketArrayCallback): void;
    getClosedList(offset: Number, customFieldFilter: Object, callback: TicketArrayCallback): void;
    getUrlPreview(url: String, callback: Callback): void;
    confirmEndOfChat(message: Object, confirmYN: String, callback: Callback): void;
    new (json: Object): TicketInstance;
  }
  type TicketStatus = {
    INITIALIZED: String;
    UNASSIGNED: String;
    ASSIGNED: String;
    OPEN: String;
    CLOSED: String;
  };
  interface TicketInstance {
    id: String;
    title: String;
    status: TicketStatus;
    info: Object;
    agent: AgentInstance;
    customer: Object;
    channel: Object;
    channelUrl: String;
    customFields: Object;
    updatedAt: Number;
    fetchFromJSON(json: Object): void;
    refresh(callback: TicketCallback): void;
    reopen(callback: TicketCallback): void;
  }
  type MessageStatic = {
    CustomType: MessageCustomType;
    DataType: MessageDataType;
    ClosureState: MessageClosureState;
  };
  type MessageCustomType = {
    RICH_MESSAGE: String;
    ADMIN_MESSAGE: String;
  };
  type MessageDataType = {
    TICKET_INQUIRE_CLOSURE: String;
    TICKET_ASSIGN: String;
    TICKET_TRANSFER: String;
    TICKET_CLOSE: String;
    URL_PREVIEW: String;
  };
  type MessageClosureState = {
    WAITING: String;
    CONFIRMED: String;
    DECLINED: String;
  };
  interface SendBirdDeskErrorStatic {}
}
