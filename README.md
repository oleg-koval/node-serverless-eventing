# Node.js Assignment (Serverless + eventing)

> We are going to (re)write a simple loan application, that will be split in two apps and communicate with each other through events & commands. The main goal of this assignment is to test your skills understanding, implementing new functionality, refactoring and writing tests. The current code is full of bad practices and inconsistencies, and it's your goal to make it shine, keeping it simple enough.

### Requirements

-   Node v8.10.0
-   Serverless.com CLI
-   Yarn (optional)

### Getting started

-   Install dependencies: `yarn install`
-   Install local dynamodb (required workaround): `serverless dynamodb install`
-   Run tests: `yarn test`
-   Run for development: `yarn start`
-   Check lint issues: `yarn lint`

### Technologies

-   Platform: Node.js
-   Programming language: Javascript (ES6) / Typescript
-   Framework: Serverless.com
-   Main AWS Services: Lambda, DybamoDB

## The assignment

-   To make it easy for you and for us, almost everything should run locally (note that serverless-offline and dynamodb-local are already in place)
-   Feel free to move, delete and create as many files as you need
-   The `app1` has most of the API that needs to be refactored and extended. The `app2` is the application responsible for the disbursement. No logic is required for the disbursement, it's only about sending the message back to `app1`. But feel free and creative if you have extra time.
-   We expect that you write unit tests for most of your code, but be pragmatic and don't try to cover 100%
-   Task 1: redesign the API and implement proper validations on inputs, with proper error messages and status code
-   Task 2: extend the create loan endpoint to also receive the `id` of the company on [openkvk](https://overheid.io/documentatie/openkvk). Only `active` companies should be allowed and you should store all information about the company on DynamoDB.
-   Task 3: implement asyncronous disburse functionality (see instructions below)

### Disbursement

You can use any queue/stream tools that you feel it fits best for an asyncronous communication of microservices / lambdas. At New10 we use Kinesis, so we can leverage triggers and security roles, but this is not required for this assignment.
This is how the flow should work:

-   app1: publishes `DisburseLoan` command
-   app2: consume `DisburseLoan` command
-   app2: publishes `LoanDisbursed` event
-   app1: consume `LoanDisbursed` event
-   app1: update status of disbursed loan to `disbursed`
