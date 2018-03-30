SendBird Desk SDK Integration Guide for JavaScript
===========
SendBird Desk is a chat customer service platform built on SendBird SDK and API.

Desk JavaScript SDK provides customer-side integration on your own application, so you can easily implement **ticketing system with chat inquiry**. Desk JavaScript SDK requires **SendBird JavaScript SDK 3.0.55 or higher**.

## Table of Contents

  1. [Installation](#installation)
  1. [Authentication](#authentication)
  1. [Creating a new ticket](#creating-a-new-ticket)
  1. [Count of opened tickets](#count-of-opened-tickets)
  1. [Loading ticket list](#loading-ticket-list)
  1. [Confirming end of chat](#confirming-end-of-chat)
  1. [Handling ticket event](#handling-ticket-event)
  1. [Rich messages](#rich-messages)
  
## Installation

Before setup, you need to get SendBird App ID at [SendBird Dashboard](https://dashboard.sendbird.com). For using Desk solution, you may upgrade the plan. For more information, please contact [desk@sendbird.com](mailto:desk@sendbird.com).

Installing the Desk SDK is straightforward if you're familiar with npm. Run the following command at the project path.
```
~$ cd /path/to/your-project
~$ npm install --save sendbird-desk
```

> You can use SendBird SDK along with SendBird Desk SDK (e.g. you can build your own messaging service while you use Desk SDK as well) In that case, you must use **the same APP_ID** for both SDKs. And please note that SendBird SDK version must be 3.0.55 or higher to work with Desk SDK.

> Basically SendBird Desk SDK is a plugin to handle tickets. You have to handle chat messages through SendBird SDK. Ticket is newly introduced in SendBird Desk SDK to support customer service ticketing system. Every ticket will be assigned to the appropriate agents and it will be mapped to a SendBird SDK channel, so you can implement real-time messaging on tickets with SendBird SDK.


## Authentication

Connecting to SendBird platform via SendBird SDK is essential for real-time messaging. The official guide to SendBird SDK authentication is [here](https://docs.sendbird.com/android#authentication_2_authentication).
Authentication in SendBird Desk is done by calling `SendBirdDesk.authenticate()`. The following is an example for SendBird SDK connection and SendBird Desk SDK authentication.
```js
const sb = new SendBird({ appId : 'YOUR_APP_ID' });
sb.connect(userId, accessToken, (res, err) => {
    if(err) throw err;
    SendBirdDesk.init();
    SendBirdDesk.authenticate(userId, accessToken, (res, err) => {
        if(err) throw err;    
        // Now you can use Desk SDK later on
    });
});
```
  
Now your customers are ready to create tickets and start inquiry with your agents!

## Creating a new ticket

Creating a new ticket is as simple as calling `Ticket.create()`. Once you create the ticket, you can access to created ticket and channel in callback. Channel object can be found at `ticket.channel` so that you can send messages to the channel. For more information in sending messages to channel, see [SendBird SDK guide docs](https://docs.sendbird.com/android#group_channel_3_sending_messages).

> Notice that the ticket could be assigned to the agents only when customer sends at least one message to the ticket. Otherwise, agent cannot see the ticket.

```js
Ticket.create(ticketTitle, userName, (ticket, err) =>
    // You can send messages to the ticket channel using SendBird SDK
    // ticket.channel is the channel object
});
```

## Count of opened tickets
When you need to display opened ticket count in your application, use `Ticket.getOpenCount()`.
```js
Ticket.getOpenCount((res, err) => {
    const count = res;
    // do something with the value
});
```

## Loading ticket list
Retrieving ticket list is essential for inbox. SendBird Desk SDK provides `Ticket.getOpenedList()` and `Ticket.getClosedList()` to get the list of open/closed ticket. Open ticket list and closed ticket list can be loaded as below:
```js
Ticket.getOpenedList(offset, (res, err) => {
    const tickets = res;
    // offset += tickets.length; for the next tickets.
    // here is to display tickets on inbox.
});
```

```js
Ticket.getClosedList(offset, (res, err) => {
    const tickets = res;
    // offset += tickets.length; for the next tickets.
    // here is to display tickets on inbox.
});
```

## Handling ticket event
SendBird Desk SDK uses predefined AdminMessage custom type which can be derived by calling `message.customType`. Custom type for Desk AdminMessage is set to `SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE`. And there are sub-types which indicate ticket events: assign, transfer, and close. Each event type is located in `message.data` which looks like below.

```js
{
    "type": "TICKET_ASSIGN" // "TICKET_TRANSFER", "TICKET_CLOSE"
}
```
You can check out these messages in `ChannelHandler.onMessageReceived()`.

## Rich messages

Rich message is a special message that holds custom content. You can distinguish the rich message by checking `message.customType` which is set to `SENDBIRD_DESK_RIGH_MESSAGE`. Currently Desk SDK provides the following types of rich message.

- **`Confirm end of chat`** message notifies that the agent sent a confirm-end-of-chat request. When the user agrees with the closure, the ticket would be closed.
- **`URL preview`** message contains web URL which is filled with image and description.

### Confirm end of chat

Confirm end of chat message is initiated from the agent to inquire closure of ticket. The message has 3 states which are `WAITING`, `CONFIRMED`, `DECLIEND`. When agent sends confirm end of chat message, its state is set to `WAITING`. Customer can answer to the inquiry as `YES` or `NO` which leads to `CONFIRMED` state and `DECLINED` state accordingly. You can check the state by looking `message.data`. The format looks like below:

```js
{
    "type": "SENDBIRD_DESK_INQUIRE_TICKET_CLOSURE",
    "body": {
        "state": "WAITING" // also can have "CONFIRMED", "DECLINED"
    }
}
```

Once customer replies to the inquiry, the message would be updated. `SendBirdDesk.Ticket.confirmEndOfChat(message, yesOrNo, callback)` sends request to update the message. You can catch the change in `channelHandler.onMessageUpdate(channel, message)`.

```js
channelHandler.onMessageUpdated = (channel, message) => {
    SendBirdDesk.Ticket.getByChannelUrl(channel.url, (ticket, err) => {
        if(err) throw err;
        let data = JSON.parse(message.data);
        const isClosureInquired = (data.type === SendBirdDesk.Message.DataType.TICKET_INQUIRE_CLOSURE);
        if(isClosureInquired) {
            const closureInquiry = data.body;
            switch(closureInquiry.state) {
                case SendBirdDesk.Message.ClosureState.WAITING:
                    // do something on WAITING
                    break;
                case SendBirdDesk.Message.ClosureState.CONFIRMED:
                    // do something on CONFIRMED
                    break;
                case SendBirdDesk.Message.ClosureState.DECLIND:
                    // do something on DECLIND
                    break;
            }
        }
    });
}
```

### URL preview

To send URL preview message, you should send a text message with URL, extract preview data, and update it with the preview data. Use `channel.updateUserMessage(messageId, text, messageData, customType, callback)` for the update operation. The format of `messageData` looks like below:

```js
/// give stringified JSON object to channel.updateUserMessage()
{
    "type": "SENDBIRD_DESK_URL_PREVIEW",
    "body": {
        "url": "string",
        "site_name": "string",
        "title": "string",
        "description": "string",
        "image": "string (image url)"
    }
}
```

You may get the preview message in `ChannelHandler.onMessageUpdated()` or `channel.getPreviousMessagesByTimestamp()` for URL preview rendering.