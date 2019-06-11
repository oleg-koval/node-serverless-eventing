# Node.js (Serverless + eventing)

Two apps are communicating with each other through events & commands.

### Requirements

-   Node v8.10.0
-   Serverless.com CLI
-   Yarn/Npm

### Getting started

-   Install dependencies: `yarn install`
-   Install local dynamodb (required workaround): `serverless dynamodb install`
-   Run tests: `yarn test`
-   Run for development: `yarn start`
    - If there are any problems with running: `sls dynamodb install --localPath ./bin` should fix them, (`aws-sdk` required to install : `npm i -g aws-sdk`)
-   Check lint issues: `yarn lint`

### Style
- [Commit messages style](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
- Eslint: `babel-eslint`
- Prettier

### Technologies

-   Platform: Node.js
-   Programming language: Javascript (ES6) / TODO: Rewrite to TS
-   Framework: Serverless.com
-   Main AWS Services: Lambda, DybamoDB
