## Change Log

### v1.0.23(Mar 10, 2023)

feat: add Ticket.getList()
Add new API to get by groups, otherwise, we have to modify other methods to
handle callback to the end& JS doesnt really have first class support for polymorphism
```
* @param {integer} filters.offset - list offset.
* @param {object} filters.customFieldFilter - customField filter.
* @param {string} filters.group - group key(to filter tickets by a team).
* @param {string} filters.status - status to get tickets. ('all', 'CLOSED', 'OPEN').
* @param {function} callback - Function(list:Array<Ticket>, err:Error)
Ticket.getList(params, callback)
```

### v1.0.21(Mar 29, 2022)

- Add `getAllTickets` interface in `Ticket`.

### v1.0.20(JAN 11, 2022)

- Bug-fix in sendbird version comparison logic.

### v1.0.19(JUN 2, 2021)

- Minor internal update.

### v1.0.18(MAY 21, 2021)

- Added `botKey` in `Ticket.create()`.
- Added `cancel()` in `Ticket`.
- Added `selectQuestion()` in `Ticket`.

### v1.0.17(JAN 29, 2021)

- (TypeScript) Fixed the type of `status` in `Ticket`.

### v1.0.16(DEC 1, 2020)

- Added `close()` in `Ticket`.

### v1.0.15(Jul 3, 2020)

- `SendBird.Desk.d.ts` to export `SendBirdDesk` as default.

### v1.0.14(Apr 27, 2020)

- Added `setRelatedCHannelUrls(channelUrls, callback)` in `Ticket`.
- Minor bug-fixes in response payload.

### v1.0.13(Feb 21, 2020)

- TypeScript d.ts interface refactoring.

### v1.0.12(Feb 14, 2020)

- TypeScript d.ts interface fix.

### v1.0.11(Feb 6, 2020)

- TypeScript d.ts interface fix.

### v1.0.10(Jan 3, 2020)

- Added `setCustomFields(customFields, callback)` in `Ticket`.
- Added `setPriority(priority, callback)` in `Ticket`.

### v1.0.9(Dec 11, 2019)

- Bug-fix in `Ticket.getOpenedList()` and `Ticket.getClosedList()`.

### v1.0.8(Aug 23, 2019)

- Added `setCustomerCustomFields()` in `SendBirdDesk`.
- Added `submitFeedback()` in `Ticket`.

### v1.0.7(Jul 12, 2019)

- Added `customFields` property to `Ticket`.

### v1.0.6(May 13, 2019)

- Added `reopen()` in `Ticket`
- Added `groupKey` and `customFields` parameters to `Ticket.create()`.
- Added `customFieldFilter` parameter to `getOpenedList()` and `getClosedList()` in `Ticket`.

### v1.0.5(Nov 23, 2018)

- Added SendBird parameter to SendBirdDesk.init().
- Bug-fix in 'SendBird missing' error at init().

### v1.0.4(July 18, 2018)

- Added setApiHost to customize host.

### v1.0.3(July 4, 2018)

- Corrected package.json to fix library path.

### v1.0.2(May 21, 2018)

- Applied ticket assignment update.

### v1.0.1(Mar 30, 2018)

- Added SendBirdDesk.init().
- Added SendBirdDesk.isDeskChannel(channel).
- Added TypeScript interface - SendBird.Desk.d.ts.
- Added console logger in debug mode.

### v1.0.0-zendesk(Mar 16, 2018)

- Zendesk-integrated version release.

