/**
 * Type Definitions for SendBird Desc SDK v1.0.15
 * homepage: https://sendbird.com/
 */
import SendBird from 'sendbird';

export default SendBirdDesk;
export { Ticket, Agent, RelatedChannel };

declare const SendBirdDesk: SendBirdDeskStatic;
declare const Ticket: SendBirdDesk.TicketStatic;
declare const Agent: SendBirdDesk.AgentStatic;
declare const RelatedChannel: SendBirdDesk.RelatedChannelStatic;

interface SendBirdDeskStatic {
  version: string;
  Ticket: SendBirdDesk.TicketStatic;
  Agent: SendBirdDesk.AgentStatic;
  Message: SendBirdDesk.MessageStatic;
  RelatedChannel: SendBirdDesk.RelatedChannelStatic;
  Error: SendBirdDesk.SendBirdDeskErrorStatic;

  init(SendBird: object): void;
  authenticate(userId: string, callback: SendBirdDesk.CommonCallback): void;
  authenticate(userId: string, accessToken: string, callback: SendBirdDesk.CommonCallback): void;
  isDeskChannel(channel: SendBird.GroupChannel): boolean;
  setDebugMode(): void;
  setCustomerCustomFields(customFields: object, callback: SendBirdDesk.CommonCallback): void;
}

declare namespace SendBirdDesk {
  type TicketStatus = {
    INITIALIZED: string;
    PROACTIVE: string;
    UNASSIGNED: string;
    ASSIGNED: string;
    OPEN: string;
    CLOSED: string;
  };
  type TicketPriority = {
    URGENT: string;
    HIGH: string;
    MEDIUM: string;
    LOW: string;
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
  type CommonCallback = (res: object, error: Error) => void;
  type TicketCallback = (ticket: Ticket, error: Error) => void;
  type TicketArrayCallback = (list: Array<Ticket>, error: Error) => void;

  interface TicketStatic {
    Status: TicketStatus;
    isStatus(val: string): boolean;
    clearCache(channelUrl: string): void;
    create(title: string, name: string, callback: TicketCallback): void;
    create(title: string, name: string, groupKey: string, callback: TicketCallback): void;
    create(title: string, name: string, groupKey: string, customFields: object, callback: TicketCallback): void;
    create(
      title: string,
      name: string,
      groupKey: string,
      customFields: object,
      priority: TicketPriority,
      callback: TicketCallback
    ): void;
    create(
      title: string,
      name: string,
      groupKey: string,
      customFields: object,
      priority: TicketPriority,
      relatedChannelUrls: Array<string>,
      callback: TicketCallback
    ): void;
    getOpenCount(callback: CommonCallback): void;
    getByChannelUrl(channelUrl: string, callback: TicketCallback): void;
    getOpenedList(offset: number, callback: TicketArrayCallback): void;
    getOpenedList(offset: number, customFieldFilter: object, callback: TicketArrayCallback): void;
    getClosedList(offset: number, callback: TicketArrayCallback): void;
    getClosedList(offset: number, customFieldFilter: object, callback: TicketArrayCallback): void;
    getUrlPreview(url: string, callback: CommonCallback): void;
    confirmEndOfChat(
      message: SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage,
      confirmYN: string,
      callback: CommonCallback
    ): void;
    submitFeedback(
      message: SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage,
      score: number,
      comment: string,
      callback: CommonCallback
    ): void;
    new(json: object): Ticket;
  }
  interface Ticket {
    id: string;
    title: string;
    status: TicketStatus;
    agent: Agent;
    customer: object;
    info: object;
    priority: TicketPriority;
    relatedChannels: Array<RelatedChannel>;
    channel: object;
    channelUrl: string;
    customFields: object;
    updatedAt: number;
    fetchFromJSON(json: object): void;
    refresh(callback: TicketCallback): void;
    reopen(callback: TicketCallback): void;
    setPriority(priority: TicketPriority, callback: CommonCallback): void;
    setRelatedChannelUrls(relatedChannelUrls: Array<string>, callback: CommonCallback): void;
    setCustomFields(customFields: object, callback: CommonCallback): void;
  }
  interface AgentStatic {
    new(json: object): Agent;
  }
  interface Agent {
    userId: string;
    name: string;
    profileUrl: string;
    fetchFromJSON(json: object): void;
  }
  interface RelatedChannelStatic {
    new(json: object): Agent;
  }
  interface RelatedChannel {
    name: string;
    channelUrl: string;
    fetchFromJSON(json: object): void;
  }
  interface MessageStatic {
    CustomType: MessageCustomType;
    DataType: MessageDataType;
    ClosureState: MessageClosureState;
    FeedbackState: MessageFeedbackState;
  }
  interface SendBirdDeskErrorStatic { }
}
