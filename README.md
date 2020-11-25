# [Sendbird](https://sendbird.com) Desk SDK for JavaScript

![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)
![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)


## Table of contents

  1. [Introduction](#introduction)
  1. [Before getting started](#before-getting-started)
  1. [Getting started](#getting-started)
  1. [Creating your first ticket](#creating-your-first-ticket)
  1. [Implementation guide](#implementation-guide)

<br />

## Introduction

**Sendbird Desk** enables strong customer engagement through live, in-app support. The Desk SDK lets you easily initialize, configure, and build customer support-related functionality into your JavaScript applications.

### How it works

Sendbird Desk is a plugin of the [Sendbird Chat Platform](https://sendbird.com/docs/chat) for managing tickets, and thus Desk events are handled by event handlers through the [Chat SDK](https://github.com/sendbird/Sendbird-JavaScript). 

Every ticket is assigned appropriate agents and will be directed to a chat's group channel, which implements real-time messaging on tickets with Sendbird Chat SDK. 

### Concepts

These are a few of the main components of Desk SDK. 

- **Channels**: The various ways through which support can be requested e.g. in-app chats from different OS platforms or social media like Facebook and Instagram.
- **Tickets**: A ticket is created when a customer and agent start a conversation and is seen as a unit of customer’s inquiry. There are five types of tickets.
- **Agents**: An agent receives the requests and also handles the conversation in the [Sendbird Dashboard](https://dashboard.sendbird.com/auth/signin). 
- **Admins**: Admins are agents who are granted the additional privileges of managing the overall dashboard settings and the tickets. 
- **Messages**: Desk has two types of messages that fall into further subtypes. The following table shows the hierarchical structure of messages. 

||Sender|Subtypes|
|---|---|---|
| User message| Agent or customer|Rich messages |
| Admin message |Sent from the Desk server without a specific sender |Notification messages and System messages |

> **Note**: Rich messages are further classified into [URL preview](#add-url-previews), [confirmation request for ticket closing](#request-confirmation-to-close-a-ticket), and [feedback request](#request-customer-feedback) messages. 

### More about Sendbird Desk SDK for JavaScript

Find out more about Sendbird Desk SDK for JavaScript on [Desk SDK for JavaScript doc](https://sendbird.com/docs/desk/v1/javascript/getting-started/about-desk-sdk). If you have any comments or questions regarding bugs and feature requests, visit [Sendbird community](https://community.sendbird.com).

<br />

## Before getting started

This section shows the prerequisites you need to check to use Sendbird Desk SDK for JavaScript.

### Requirements

- `NodeJS 10.13.x+ along with npm`
- [`Sendbird JavaScript SDK 3.0.55 or later`](https://github.com/sendbird/Sendbird-JavaScript)

### Supported browsers

- `All modern versions of Chrome, FireFox, Edge, Safari, and etc. supporting ES6+`
- `IE 11+`
- `Mobile browsers (Android/iOS)`

<br />

## Getting started

This section gives you information you need to get started with Sendbird Desk SDK for JavaScript. 

### Try the sample app

Our sample app demonstrates the core features of Sendbird Desk SDK. Download the app from our GitHub repository to get an idea of what you can do with the actual SDK and to get started building your own project.
 
- https://github.com/sendbird/quickstart-desk-javascript

### Step 1: Create a Sendbird application from your dashboard

A Sendbird application comprises everything required in a chat service including users, message, and channels. To create an application:

1. Go to the Sendbird Dashboard and enter your email and password, and create a new account. You can also sign up with a Google account.
2. When prompted by the setup wizard, enter your organization information to manage Sendbird applications.
3. Lastly, when your dashboard home appears after completing setup, click **Create +** at the top-right corner.

Regardless of the platform, only one Sendbird application can be integrated per app; however, the application supports communication across all Sendbird’s provided platforms without any additional setup. 

> **Note**: All the data is limited to the scope of a single application, thus users in different Sendbird applications are unable to chat with each other.

### Step 2: Download and install the Desk SDK

Installing the Desk SDK is simple if you’re familiar with using external libraries or SDK’s in your projects. These are the following three methods for Desk SDK implementation: 

Install the Desk SDK with npm by entering the command below on the command line.

```bash
# npm
~$ cd /path/to/your-project
~$ npm install --save sendbird-desk
```

Automatically download our Desk SDK with just an `npm` install command by adding `sendbird-desk` dependency to the `package.json` file of your project.
 
Download the latest Desk SDK for JavaScript, copy the Desk SDK to your project classpath (most commonly the lib/ directory), and then include the Desk SDK file to your working file.

```javascript
<script src="lib/SendBird.Desk.min.js"></script>
```

<br />

## Creating your first ticket

After installation has been completed, a ticket can be created for communication between an agent and customer. Follow the step-by-step instructions below to create your first ticket. 

### Step 1: Initialize the Desk SDK 

First, a SendBirdDesk instance must be initialized when launching a client app. Before initializing `SendBirdDesk` instance, you need to initialize Sendbird with the `APP_ID` of your Sendbird application from the dashboard. Pass the initialized `SendBird` instance as an argument as a parameter in the `SendBirdDesk.init()` method. 

Implement the following command in your project path.

```javascript
SendBirdDesk.init(SendBird);
```

> **Note**: The same `APP_ID` should be used for both Desk and Chat SDKs. If you initiate the Sendbird Desk with a `SendBird` instance of another `App_ID`, all existing data in the client app will be cleared. 

It is possible to use the Chat SDK only or both Chat and Desk SDKs together in your client app depending on the chat service you want to provide.

|SDK|Used for|
|---|---|
|Chat SDK|In-app messenger where customers can chat with each other.|
|Chat and Desk SDKs|Tickets where customers can chat with agents.|

### Step 2: Authenticate to Sendbird server 

Customers can request support from various types of channels: in-app chats or social media such as Facebook, Instagram and Twitter. To use these support features of Desk SDK, the `SendBirdDesk` instance should be connected with Sendbird server depending on which channel the request is from: 

- **Sendbird Chat Platform**: Authenticate using the `authenticate()` method with their user IDs. 
- **Social media platforms**: No authentication needed as customers are automatically registered in the dashboard with their social media accounts.

Once authenticated, customers can live-chat with agents based on Sendbird Chat platform.

```javascript
const sb = new SendBird({ appId: APP_ID });
sb.connect(USER_ID, ACCESS_TOKEN, (user, error) => {
    if (error) throw error;
    SendBirdDesk.init(SendBird);
    SendBirdDesk.authenticate(USER_ID, ACCESS_TOKEN, (user, error) => {
        if (error) throw error;
        // SendBirdDesk is now initialized, and the customer is authenticated.
    });
}
```

> **Note**: **Customers from Sendbird Chat platform** signifies users who are already authenticated with the Chat SDK. If you’re implementing Chat SDK and Desk SDK at the same time, [connect a user to Sendbird server with their user ID and access token](https://sendbird.com/docs/chat/v3/javascript/guides/authentication) first.

### Step 3: Create a ticket

Implement the `Ticket.create()` method to create a new ticket either before or after the customer’s initial message. 

```javascript
Ticket.create(TICKET_TITLE, USER_NAME, (ticket, error) => {
    // The ticket.channel property indicates the group channel object within the ticket.
});
```

Once a ticket is successfully created on the Sendbird server, you can access the ticket and its channel in the `ticket.getChannel()` through the callback from the server. 

Before a customer sends the first message, agents can’t see the ticket in the dashboard and ticket assignment does not occur. When conversation starts, the ticket is assigned to an available agent by the Desk Dashboard while messages are sent and received through the Chat SDK.

You can use the following parameters when creating a ticket.

> **Note**: Only Groupkey and customFields need to be defined and are only accessible from the Dashboard. 

|Argument|Type|Description|
|---|---|---|
|TICKET_TITLE|string |Specifies the title of the ticket.|
|USER_NAME|string |Specifies the name of the user who submits or receives the ticket.|
|GROUP_KEY|string | Specifies the identifier of a specific team.|
|CUSTOM_FILEDS|nested object|Specifies additional information of the ticket that consists of **key-value** custom items. Only custom fields already registered in **Settings** > **Ticket** fields in your dashboard can be used as a key. |
|PRIORITY |string |Specifies the priority value of the ticket. Higher values stand for higher priority. Valid values are **LOW**, **MEDIUM**, **HIGH** and **URGENT**. |
|RELATED_CHANNEL_URLS|array | Specifies group channels in Sendbird Chat platform that are related to this ticket and consists of channel URLs and channel names. Up to 3 related channels can be added.|

<br />

## Implementation guide

This section details the procedure to handle and close a ticket from your client app. 

### Add custom information to a ticket

Use the `ticket.setCustomFields()` method to add additional information about a ticket.

```javascript
const customFields = {  
    'Product type': 'Desk',
    'line': '3'
}; 

ticket.setCustomFields(customFields, (ticket, error) => {
    if (error) throw error;
    // The 'customFields' property of a ticket has been updated.
});
```

> **Note**: Only custom fields registered in **Desk** > **Settings** > **Ticket fields** of your dashboard can be used as a key.

### Add custom information to a customer

Use the `setCustomerCustomFields()` method of the `SendBirdDesk` to make your customers add additional information about themselves.

```javascript
SendBirdDesk.setCustomerCustomFields(
    {
        gender: "male",
        age: 20
    },
    (error) => {
        if (!error) {
            // Custom fields for the customer are set.
            // Some fields can be ignored if their keys aren't registered in the dashboard.
        }
    }
);
```

> **Note**: Only custom fields registered in **Desk** > **Settings** > **Customer fields** of your dashboard can be used as a key.

### Add related channels

Related channels indicate group channels in Sendbird Chat platform that are related to a ticket. When creating a ticket, pass the `channel_url`s of the related group channels as an argument to the `relatedChannelUrls` parameter in the `Ticket.create()` method. To update the related channels, use the `ticket.setRelatedChannelUrls()` instead. The `ticket.relatedChannels` property in the callback indicates the group channel object of related channels and it contains channel names and their URLs.

```javascript
Ticket.create(TICKET_TITLE, USER_NAME, GROUP_KEY, CUSTOM_FIELDS, PRIORITY, RELATED_CHANNEL_URLS, (ticket, error) => {
});

ticket.setRelatedChannelUrls(RELATED_CHANNEL_URLS, (ticket, error) => {
    // The ticket's 'relatedChannels' property has been updated.
});
```

> **Note**: Up to 3 related channels can be added per ticket. 

### Add URL previews

With URL previews, your application users can meet their expectations of what they’re going to get before they open the link during the conversations.

To preview URLs, every text message should be checked if it includes any URLs. When a text message including a URL is successfully sent, the URL should be extracted and passed to Sendbird server using the `getUrlPreview()` method. Set the parsed data received from the server as a `JSON` object and stringify the object to pass it as an argument to a parameter in the `updateUserMessage()` method. Then the updated message with URL preview is delivered to the client apps through the `onMessageUpdated()` method of the channel event handler.

```javascript
ticket.channel.sendUserMessage(TEXT, (message, error) => {
    if (!error) {
        const message = message;
        if (SendBirdDesk.Message.UrlRegExp.test(message.message)) {
            const urlInMessage = SendBirdDesk.Message.UrlRegExp.exec(message.message)[0];
            SendBirdDesk.Ticket.getUrlPreview(urlInMessage, (response, error) => {
                if (error) throw error;
                this.ticket.channel.updateUserMessage(
                    message.messageId,
                    message.message,
                    JSON.stringify({
                        type: SendBirdDesk.Message.DataType.URL_PREVIEW,
                        body: {
                            url: urlInMessage,
                            site_name: response.data.siteName,
                            title: response.data.title,
                            description: response.data.description,
                            image: response.data.image
                        }
                    }),
                    message.customType,
                    (response, error) => {
                        if (error) throw error;
                        this.updateMessage(response);
                });
            });
        }
    }
});
```

In the `onMessageUpdated()` method of the channel event handler, you can find the data for URL preview in the `message.data` property as below.

```json
{
    "type": "SENDBIRD_DESK_URL_PREVIEW",
    "body": {
        "url": "https://sendbird.com/",
        "site_name": "Sendbird",
        "title": "Sendbird - A Complete Chat Platform, Messaging and Chat SDK and API",
        "description": "Sendbird's chat, voice and video APIs and SDKs connect users through immersive, modern communication solutions that drive better user experiences and engagement.",
        "image": "https://6cro14eml0v2yuvyx3v5j11j-wpengine.netdna-ssl.com/wp-content/uploads/sendbird_thumbnail.png"
    }
}
```

### Receive system messages

Admin messages are customizable messages that are sent by the system, and there are 2 types of admin messages. **Notifications** are messages that are sent and displayed to both customers and agents, such as welcome messages or delay messages. **System messages** are messages sent and displayed to agents in the Ticket details view when a ticket has some changes, such as changes in ticket status and assignee.

> **Note**: You can customize notifications in **Desk** > **Settings** > **Triggers**, and system messages in **Desk** > **Settings** > **System messages** in your dashboard.

When the client app receives the message through the ‘onMessageReceived()’ method of the channel event handler, system messages are distinguished from notification messages by the value of the ‘message.custom_type’, and their subtype is specified in the ‘message.data’ as below.

```json
{
    "message_id" : 40620745,
    "type": "ADMM",
    "custom_type": "SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE",
    "data": "{\"type\": \"SYSTEM_MESSAGE_TICKET_ASSIGNED_BY_SYSTEM\", \"ticket\": <Ticket Object>}",
    "message": "The ticket is automatically assigned to Cindy."
}
```

> **Note**: The `transfer` appears only when the `data` has `SYSTEM_MESSAGE_TICKET_TRANSFERRED_BY_AGENT`.

System messages are intended to be displayed for agents only. Refer to the following sample code to avoid displaying them to your customers.

```javascript
function isVisible(message) {
    let data = {};
    try {
        data = message.data ? JSON.parse(message.data) : null;
    } catch (e) {
        throw e;
    }

    message.isSystemMessage = message.customType === 'SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE';
    message.isAssigned = data.type === SendBirdDesk.Message.DataType.TICKET_ASSIGN;
    message.isTransferred = data.type === SendBirdDesk.Message.DataType.TICKET_TRANSFER;
    message.isClosed = data.type === SendBirdDesk.Message.DataType.TICKET_CLOSE;

    return !message.isSystemMessage
        && !message.isAssigned
        && !message.isTransferred
        && !message.isClosed;
}
```

### Request confirmation to close a ticket

While admins have permission to directly close a ticket, agents can either close a ticket as admins or ask customers to close a ticket, which will depend on the agent permission settings. The confirmation request message can have 3 types of states as below.

|State|Description|
|---|---|
|WAITING |Set when an agent sends a confirmation request message. |
|CONFIRMED| Set when a customer agrees to close the ticket. (Default: **true**)|
|DECLINED |Set when a customer declines to close the ticket. (Default: **false**)|

When agents send confirmation request messages, the state is set to `WAITING`. The customer can reply **Yes** or **No** by calling `Ticket.confirmEndofChat()`, and the state will change to `CONFIRMED` or `DECLINED` according to this answer. 

```javascript
Ticket.confirmEndOfChat(USER_MESSAGE, 'yes'|'no', (ticket, error) => {
    if (error) throw error;
});
```

Sendbird Desk server notifies the customer’s client app of updates through the `onMessageUpdate()` method of the channel event handler.

```javascript
channelHandler.onMessageUpdated = (channel, message) => {
    SendBirdDesk.Ticket.getByChannelUrl(channel.url, (ticket, error) => {
        if (error) throw error;
        
        let data = JSON.parse(message.data);
        const isClosureInquired = data.type === SendBirdDesk.Message.DataType.TICKET_INQUIRE_CLOSURE;
        if (isClosureInquired) {
            const closureInquiry = data.body;
            switch (closureInquiry.state) {
                case SendBirdDesk.Message.ClosureState.WAITING:
                    // TODO: Implement your code for the UI when there is no response from the customer.
                    break;
                case SendBirdDesk.Message.ClosureState.CONFIRMED:
                    // TODO: Implement your code for the UI when the customer confirms to close the ticket.
                    break;
                case SendBirdDesk.Message.ClosureState.DECLINED:
                    // TODO: Implement your code for the UI when the customer declines to close the ticket.
                    break;
            }
        }
    });
};
```

> **Note**: You can find the stringified `JSON` object of the following in the `message.data` property within the `onMessageUpdate()` of the channel event handler.

```json
{
    "type": "SENDBIRD_DESK_INQUIRE_TICKET_CLOSURE",
    "body": {
        "state": "CONFIRMED"
    }
}
```

### Request customer feedback 

You can send a message to customers right after closing a ticket to ask about their satisfaction level with the support. When the **Customer satisfaction rating** feature is turned on in your dashboard, customers will get a message asking to give a score and leave a comment as feedback. The message can have 2 states as below.

|State|Description|
|---|---|
|WAITING|Set when an agent sends a customer feedback request message.|
|CONFIRMED|Set when a customer sends a response.|

When a customer replies to the message, their score and comment for the ticket are sent to Sendbird server by calling the `ticket.submitFeedback()` method. Then, the state of the confirmation request message is changed to `CONFIRMED`.

```javascript
ticket.submitFeedback(USER_MESSAGE, SCORE, COMMENT, (ticket, error) => {
    if (error) throw error;
});
```

Sendbird Desk server notifies the customer’s client app of updates through the `onMessageUpdate()` method of the channel event handler.

```javascript
channelHandler.onMessageUpdated = (channel, message) => {
    SendBirdDesk.Ticket.getByChannelUrl(channel.url, (ticket, error) => {
        if (error) throw error;
        
        let data = JSON.parse(message.data);
        const isFeedbackMessage = data.type === SendBirdDesk.Message.DataType.TICKET_FEEDBACK;
        if (isFeedbackMessage) {
            const feedback = data.body;
            switch (feedback.state) {
                case SendBirdDesk.Message.FeedbackState.WAITING:
                    // TODO: Implement your code for the UI when there is no response from the customer.
                    break;
                case SendBirdDesk.Message.FeedbackState.CONFIRMED:
                    // TODO: Implement your code for the UI when there is a response from the customer.
                    break;
            }
        }
    });
};
```

> **Note**: You can find the stringified `JSON` object of the following in the `message.data` property within the `onMessageUpdate()` of the channel event handler.

```json
{
    "type": "SENDBIRD_DESK_CUSTOMER_SATISFACTION",
    "body": {
        "state": "CONFIRMED",
        "customerSatisfactionScore": 3,
        "customerSatisfactionComment": "It was really helpful :)" 
}
```

### Reopen a closed ticket

A closed ticket can be reopened by using the `reopen()` method in the `Ticket`.

```javascript
closedTicket.reopen((openTicket, error) => {
    if (error) throw error;
    // Implement your code to update the ticket list with the 'openTicket' object.
});
```

### Retrieve a list of tickets 

You can retrieve a list of the current customer’s open and closed tickets by using the `Ticket.getOpenedList()` and `Ticket.getClosedList()`. 

> **Note**: Only 10 tickets can be retrieved per request by message creation time in descending order.

```javascript
// getOpenedList()
Ticket.getOpenedList(OFFSET, (openedTickets, error) => {
    if (error) throw error;
    
    const tickets = openedTickets;
    // offset += tickets.length; for the next tickets.
    // Implement your code to display the ticket list.
});
```

```javascript
// getClosedList()’
Ticket.getClosedList(OFFSET, (closedTickets, error) => {
    if (error) throw error;
    
    const tickets = closedTickets;
    // offset += tickets.length; for the next tickets.
    // Implement your code to display the ticket list.
});
```

For tickets set with custom fields, you can add a filter to the `getOpenList()` and `getClosedList()` to sort tickets by keys and values of custom fields.

```javascript
const customFieldFilter = {'subject' : 'doggy_doggy'};
Ticket.getOpenedList(OFFSET, customFieldFilter, (openedTickets, error) => {
    if (error) throw error;
    
    const tickets = openedTickets;
    // offset += tickets.length; for the next tickets.
    // Implement your code to display the ticket list.
});
```

### Retrieve a ticket 

You can retrieve a specific ticket with its channel URL. 

```javascript
Ticket.getByChannelUrl(CHANNEL_URL, (ticket, error) => {
    if (error) throw error;
});
```

### Display open ticket count

You can display the number of open tickets on your client app by using the `Ticket.getOpenCount()`.

```javascript
Ticket.getOpenCount((count, error) => {
    if (error) throw error;
    
    const numberOfOpenTickets = count;
    // Implement your code with the returned value.
});
```
