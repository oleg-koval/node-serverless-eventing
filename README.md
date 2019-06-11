[![CircleCI](https://circleci.com/gh/oleg-koval/node-serverless-eventing/tree/master.svg?style=svg)](https://circleci.com/gh/oleg-koval/node-serverless-eventing/tree/master) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
______


# Node.js (Serverless + eventing)

Two apps are communicating with each other through events & commands.

### Requirements

-   Node v8.10.0
-   Serverless.com CLI
-   Yarn/Npm

### Getting started

-   Install dependencies: `yarn install`
-   Add `.env` file with content similar to provided in [.env.example file](/.env.example)
-   Install local dynamodb (required workaround): `serverless dynamodb install`
-   Run tests: `yarn test`
-   Run for development: `yarn start`
    - If there are any problems with running: `sls dynamodb install --localPath ./bin` should fix them, (`aws-sdk` required to install : `npm i -g aws-sdk`)
-   Check lint issues: `yarn lint`

### Style
-    [Commit messages style](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
-    Eslint: `babel-eslint`
-    Prettier

### Technologies

-   Platform: Node.js
-   Programming language: Javascript (ES6)
-   Framework: Serverless.com
-   Main AWS Services: Lambda, DybamoDB

### TODO:
-    Rewrite to TypeScript
