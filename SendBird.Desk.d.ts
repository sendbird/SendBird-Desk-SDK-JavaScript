/**
 * Type Definitions for SendBird Desc SDK v1.0.4
 * homepage: https://sendbird.com/
 */
declare const SendBirdDesk: SendBirdDeskStatic;
export = SendBirdDesk;

interface GroupChannel {
  url: String;
  name: String;
  customType: String;
}
type Callback = (res: Object, error: Error) => void;
type TicketCallback = (ticket: TicketInstance, error: Error) => void;
type TicketArrayCallback = (list: Array<TicketInstance>, error: Error) => void;

interface SendBirdDeskStatic {
  version: String;
  Agent: AgentStatic;
  Ticket: TicketStatic;
  Message: MessageStatic;
  Error: SendBirdDeskErrorStatic;

  init();
  authenticate(userId: String, callback: Callback);
  authenticate(userId: String, accessToken: String, callback: Callback);
  isDeskChannel(channel: GroupChannel): Boolean;
  setDebugMode();
}
interface AgentStatic {
  new (json: Object): AgentInstance;
}
interface AgentInstance {
  userId: String;
  name: String;
  profileUrl: String;
  fetchFromJSON(json: Object);
}
interface TicketStatic {
  Status: TicketStatus;
  isStatus(val: String): Boolean;
  clearCache(channelUrl: String);
  create(title: String, name: String, callback: TicketCallback);
  getOpenCount(callback: Callback);
  getByChannelUrl(channelUrl: String, callback: TicketCallback);
  getOpenedList(offset: Number, callback: TicketArrayCallback);
  getClosedList(offset: Number, callback: TicketArrayCallback);
  getUrlPreview(url: String, callback: Callback);
  confirmEndOfChat(message: Object, confirmYN: String, callback: Callback);
  new (json: Object): TicketInstance;
}
type TicketStatus = {
  INITIALIZED: String;
  UNASSIGNED: String;
  ASSIGNED: String;
  OPEN: String;
  CLOSED: String;
}
interface TicketInstance {
  id: String;
  title: String;
  status: TicketStatus;
  info: Object;
  agent: AgentInstance;
  customer: Object;
  channel: Object;
  channelUrl: String;
  updatedAt: Number;
  fetchFromJSON(json: Object);
  refresh(callback: TicketCallback);
}
type MessageStatic = {
  CustomType: MessageCustomType;
  DataType: MessageDataType;
  ClosureState : MessageClosureState;
}
type MessageCustomType = {
  RICH_MESSAGE: String;
  ADMIN_MESSAGE: String;
}
type MessageDataType = {
  TICKET_INQUIRE_CLOSURE: String;
  TICKET_ASSIGN: String;
  TICKET_TRANSFER: String;
  TICKET_CLOSE: String;
  URL_PREVIEW: String;
}
type MessageClosureState = {
  WAITING: String;
  CONFIRMED: String;
  DECLINED: String;
}
interface SendBirdDeskErrorStatic {}
