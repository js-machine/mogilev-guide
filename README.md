# MogilevGuide

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@mogilev-guide/mylib`.

## Development server

Run `npm run start:front` for a dev server of frontend application. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Run `npm run start:api` for a dev server of backend application. Navigate to http://localhost:5000/mogilev-guide/us-central1/api. Run `npm run build:api:watch` and the app will automatically reload build if you change any of the source files.
For example, http://localhost:5000/mogilev-guide/us-central1/api/api/interests navigates to interests controller of nodejs server.
To have permissions for firebase, you need api key, contact to Dzianis Pasiukou (dzianispasiukou@gmail.com) or js.machine.team@gmail.com for some details.

## Build

Run `npm run build:api` to build api for this project. The build artifacts will be stored in the `dist/` directory.
Run `npm run build:front` to build frontend for this project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build:front:prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npm run dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
For any assistance with this instruction contact `Dzianis Pasiukou (dzianispasiukou@gmail.com) or js.machine.team@gmail.com`
