# MogilevGuide

This project was generated using [Nx](https://nx.dev).

## Development server

Run `npm run start:front` for a dev server of frontend application. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Install firebase CLI to run server locally: `npm install -g firebase-tools` and then `firebase use default`

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
