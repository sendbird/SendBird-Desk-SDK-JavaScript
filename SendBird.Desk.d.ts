/**
 * Type Definitions for SendBird Desc SDK v1.0.12
 * homepage: https://sendbird.com/
 */
export default SendBirdDesk;

declare const SendBirdDesk: SendBirdDeskStatic;

interface SendBirdDeskStatic {
  version: string;
  Agent: SendBirdDeskInstance.AgentStatic;
  Ticket: SendBirdDeskInstance.TicketStatic;
  Message: SendBirdDeskInstance.MessageStatic;
  Error: SendBirdDeskInstance.SendBirdDeskErrorStatic;

  init(SendBird: object): void;
  authenticate(userId: string, callback: SendBirdDeskInstance.Callback): void;
  authenticate(userId: string, accessToken: string, callback: SendBirdDeskInstance.Callback): void;
  isDeskChannel(channel: SendBirdDeskInstance.GroupChannel): boolean;
  setDebugMode(): void;
  setCustomerCustomFields(customFields: object, callback: SendBirdDeskInstance.Callback): void;
}

declare namespace SendBirdDeskInstance {
  interface GroupChannel {
    url: string;
    name: string;
    customType: string;
  }
  type Callback = (res: object, error: Error) => void;
  type TicketCallback = (ticket: TicketInstance, error: Error) => void;
  type TicketArrayCallback = (list: Array<TicketInstance>, error: Error) => void;

  interface AgentStatic {
    new (json: object): AgentInstance;
  }
  interface AgentInstance {
    userId: string;
    name: string;
    profileUrl: string;
    fetchFromJSON(json: object): void;
  }
  interface TicketStatic {
    Status: TicketStatus;
    isStatus(val: string): boolean;
    clearCache(channelUrl: string): void;
    create(title: string, name: string, callback: TicketCallback): void;
    create(title: string, name: string, groupKey: string, callback: TicketCallback): void;
    create(title: string, name: string, groupKey: string, customFields: object, callback: TicketCallback): void;
    create(title: string, name: string, groupKey: string, customFields: object, priority: TicketPriority, callback: TicketCallback): void;
    getOpenCount(callback: Callback): void;
    getByChannelUrl(channelUrl: string, callback: TicketCallback): void;
    getOpenedList(offset: number, callback: TicketArrayCallback): void;
    getOpenedList(offset: number, customFieldFilter: object, callback: TicketArrayCallback): void;
    getClosedList(offset: number, callback: TicketArrayCallback): void;
    getClosedList(offset: number, customFieldFilter: object, callback: TicketArrayCallback): void;
    getUrlPreview(url: string, callback: Callback): void;
    confirmEndOfChat(message: object, confirmYN: string, callback: Callback): void;
    submitFeedback(message: object, score: number, comment: string, callback: Callback): void;
    new (json: object): TicketInstance;
  }
  enum TicketStatus {
    INITIALIZED = "INITIALIZED",
    PROACTIVE = "PROACTIVE",
    UNASSIGNED = "UNASSIGNED",
    ASSIGNED = "ASSIGNED",
    OPEN = "OPEN",
    CLOSED = "CLOSED"
  }
  enum TicketPriority {
    URGENT = "URGENT",
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
  }
  interface TicketInstance {
    id: string;
    title: string;
    status: TicketStatus;
    info: object;
    priority: TicketPriority;
    agent: AgentInstance;
    customer: object;
    channel: object;
    channelUrl: string;
    customFields: object;
    updatedAt: number;
    fetchFromJSON(json: object): void;
    refresh(callback: TicketCallback): void;
    reopen(callback: TicketCallback): void;
    setPriority(priority: TicketPriority, callback: SendBirdDeskInstance.Callback): void;
    setCustomFields(customFields: object, callback: SendBirdDeskInstance.Callback): void;
  }
  type MessageStatic = {
    CustomType: MessageCustomType;
    DataType: MessageDataType;
    ClosureState: MessageClosureState;
    FeedbackState: MessageFeedbackState;
  };
  type MessageCustomType = {
    RICH_MESSAGE: string;
    ADMIN_MESSAGE: string;
  };
  type MessageDataType = {
    TICKET_INQUIRE_CLOSURE: string;
    TICKET_ASSIGN: string;
    TICKET_TRANSFER: string;
    TICKET_CLOSE: string;
    TICKET_FEEDBACK: string;
    URL_PREVIEW: string;
  };
  type MessageClosureState = {
    WAITING: string;
    CONFIRMED: string;
    DECLINED: string;
  };
  type MessageFeedbackState = {
    WAITING: string;
    CONFIRMED: string;
  };
  interface SendBirdDeskErrorStatic {}
}
