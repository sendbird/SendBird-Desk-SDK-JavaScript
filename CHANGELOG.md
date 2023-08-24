## Change Log

### v1.1.0(Aug 23, 2023)

- Convert all sourcecode to TS
- Upgrade ChatSDK to v4
- No more IE support
- No error first callbacks
- Use jest for testing
- Use rollup for bundling

Add new methods:

- Add new optional parameter platform to Desk.init
DeviceOsPlatform comes from ChatSDK.
We recommend you set it as `MOBILE_WEB`, in case you are using ReactNative
Link -> https://sendbird.com/docs/chat/sdk/v4/javascript/ref/enums/_sendbird_chat.DeviceOsPlatform.html

`init(sendbird: SendbirdGroupChat, platform?: DeviceOsPlatform)`

- instanceConfirmEndOfChat to Ticket instances
```
// confirmEndOfChat
Ticket.confirmEndOfChat(msg, 'yes', (ticket, error) => {
  console.log(ticket, error);
});

// instanceConfirmEndOfChat
const t = new Ticket();
t.instanceConfirmEndOfChat(msg, 'yes', (ticket, error) => {
  console.log(ticket, error);
});
```
- instanceSubmitFeedback to Ticket instances
instanceSubmitFeedback has same functionality and signature as submitFeedback
Only difference is, instanceSubmitFeedback is a method on ticket instance

```
// submitFeedback
Ticket.submitFeedback(message, score, comment, () => { /* callback */ });

// instanceSubmitFeedback
const t = new Ticket();
t.instanceSubmitFeedback(msg, 'yes', (ticket, error) => {
  console.log(ticket, error);
});
```
