
# SendBird Desk SDK for JavaScript

This project provides SendBird Desk SDK for JavaScript which includes
SendBird messaging SDK for JavaScript, SendBird Desk SDK Core,
and SendBird Desk Widget sample

## **Install**

> Note: Make sure you have node-js 18 and npm v9 or higher installed

```
npm install
npm run build
```

Note: We use `dts-bundle-generator` because we need a single
`d.ts` file for the SDK. `rollup-plugin-typescript2` errors out
when we try to use `declaration: true` in `tsconfig.json`.

## **Setting up Tests**

Copy `.env.example` to `.env` and fill in the values.

These variables should be setup in circle-ci as well.
https://app.circleci.com/settings/project/github/sendbird/desk-js/environment-variables

> Note: env variables can be found in 1password - engineering/desk_staging_e2e_test
> To login as admin in dashboard use `E2E Admin - Dev` in 1password


## **Test**

We use jest with js-dom for testing
Test cases are located in `test/cases` directory and are named `*.test.ts

> Note: Try not to run tests in auto-watch mode. We would be connecting
> and disconnecting to the server for each test case

### Local test
```
npm run test
```

## **Publish** not implemented yet / maybe use github action

1. Make sure main branch is up-to-date.
2. Cut a release branch - `release/v#.#.##`.
3. On release branch:
  * Prepare changelog
  * Update version in `package.json` file.
4. Make PR to main branch.
{ optional steps
  5. Make release -> `npm run build; npm publish --tag beta`
  6. Check release candidate is good to go.
}
7. Merge PR to main branch.
8. Make release -> `npm run build; npm publish`
9. Add release note to github release.
10. Copy `CHANGELOG`, `LICENSE`, `dist` & `package.json` to `https://github.com/sendbird/SendBird-Desk-SDK-JavaScript` repo main branch.

## **Prettier**

```
npm run format
```
or
(in Visual Studio Code)
Install `Prettier - Code formatter` plugin.
Open file to adjust prettier, select all(`cmd+a`), and `cmd+k, cmd+f`.

## **Linting**

```
npm run lint
```

## **Browser Support**

- Modern browsers supporting ES6+ (Chrome, FireFox, Edge, Safari, etc)
- Mobile browsers (Android/iOS)
