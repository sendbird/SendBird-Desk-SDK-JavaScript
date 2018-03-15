SendBird Desk SDK Integration Guide for JavaScript
===========
SendBird Desk is Zendesk-integrated chat customer service platform built on SendBird SDK and API. It provides customer-side integration on your own application, so that you can easily implement **chat inquiry, inquiries inbox with UI theming**. Desk JavaScript SDK requires **SendBird JavaScript SDK 3.0.47 or higher**.

## Table of Contents

  1. [Installation](#installation)
  1. [Initialization](#initialization)
  1. [Creating a new ticket](#creating-a-new-ticket)
  1. [Loading inbox](#loading-inbox)
  1. [Receiving events](#receiving-events)
  
## Installation

Before setup, you need to get SendBird App ID at [SendBird Dashboard](https://dashboard.sendbird.com). For using Desk solution, you may upgrade the plan. For more information, please contact [desk@sendbird.com](mailto:desk@sendbird.com).

Installing the Desk SDK is straightforward if you're familiar with npm. Run the following command at the project path.
```
~$ cd /path/to/your-project
~$ npm install --save sendbird-desk
```

> You can use SendBird SDK along with SendBird Desk SDK (e.g. you can build your own messaging service while you use Desk SDK as well) In that case, you must use **the same APP_ID** for both SDKs. And please note that SendBird SDK version must be 3.0.47 or higher to work with Desk SDK.

## Initialization

SendBird Desk SDK is a kind of plugin for SendBird SDK, which means that initialization should be both in SendBird SDK and Desk SDK. The following demonstrates the way to connect.

```javascript
const sb = new SendBird({ appId : 'YOUR_APP_ID' });
sb.connect(userId, accessToken, (res, err) => {
    const desk = new SendBirdDesk();
    desk.authenticate(userId, accessToken, (res, err) => {
        /// ...
    });
});
```

It is highly recommended to follow the order:
1. new SendBird()
2. sb.connect()
3. new SendBirdDesk()
4. desk.authenticate()
