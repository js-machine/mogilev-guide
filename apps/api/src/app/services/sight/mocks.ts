export const sightMock = {
    id: 'sightId',
    name: 'Mogilev Town Hall',
    address: 'Leninskaya St. 1a',
    accessTime: {
        from: 10,
        to: 18,
    },
    history: `Development server
Run npm run start:front for a dev server of frontend application. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Install firebase CLI to run server locally: npm install -g firebase-tools and then firebase use default

Run npm run start:api for a dev server of backend application. Navigate to http://localhost:5000/mogilev-guide/us-central1/api. Run npm run build:api:watch and the app will automatically reload build if you change any of the source files.

For example, http://localhost:5000/mogilev-guide/us-central1/api/api/interests navigates to interests controller of nodejs server.

To have permissions for firebase, you need api key, contact to Dzianis Pasiukou (dzianispasiukou@gmail.com) or js.machine.team@gmail.com for some details.

Build
Run npm run build:api to build api for this project. The build artifacts will be stored in the dist/ directory.

Run npm run build:front to build frontend for this project. The build artifacts will be stored in the dist/ directory. Use the npm run build:front:prod flag for a production build.

Running unit tests
Run npm run test to execute the unit tests via Jest.

Run npm run affected:test to execute the unit tests affected by a change.

Running end-to-end tests
Run npm run e2e to execute the end-to-end tests via Cypress.

Run npm run affected:e2e to execute the end-to-end tests affected by a change.

Understand your workspace
Run npm run dep-graph to see a diagram of the dependencies of your projects.

Further help
Visit the Nx Documentation to learn more.

For any assistance with this instruction contact Dzianis Pasiukou (dzianispasiukou@gmail.com) or js.machine.team@gmail.com`,
    photos: ['https://www.belarus.by/nimages/s002333_205230.jpg', 'https://www.fotex.biz/images/foto/3752200020.jpg', 'https://lh3.googleusercontent.com/p/AF1QipNjd4bWZC1YNkzXvHBGjA6qfkVTJzs8Q6oT7JHv=w660-h440-c', 'https://media-cdn.tripadvisor.com/media/photo-s/0e/31/46/63/city-hall-in-mogilev.jpg'],
    photosTotalCount: 5,
    background: 'https://4.bp.blogspot.com/-aNVzeUaeE7c/UAklcoZGc_I/AAAAAAAABGQ/rlGcFCzz3ZY/s1600/P1100055.jpg',
    reviews: [
        {
            id: 'reviewId',
            user: {
                id: 'user1',
                login: 'login1',
                email: 'email1',
                firstName: 'Donald',
                lastName: 'Tramp',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxbJ-KNiELvIR_0q42fjBldG89LLI6869wq_hmVVmccZN3BDn4',
            },
            date: Date.now(),
            rating: 5,
            message: 'Lorem ipsum dolro sit amet. Consectetur adipiscin elit. Lorem ipsum dolro sit amet. Consectetur adipiscin elit.\nLorem ipsum dolro sit amet. Consectetur adipiscin elit.',
        },
        {
            id: 'reviewId1',
            user: {
                id: 'user2',
                login: 'login2',
                email: 'email2',
                firstName: 'Lorem',
                lastName: 'Ipsum',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCQPCSEaefh55a1bFOnjNhY6SLPM_TsPVjq56FWm0U9s7s-44k',
            },
            date: Date.now(),
            rating: 4,
            message: `Run npm run start:front for a dev server of frontend application. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Install firebase CLI to run server locally: npm install -g firebase-tools and then firebase use default`,
        },
        {
            id: 'reviewId2',
            user: {
                id: 'user3',
                login: 'login3',
                email: 'email3',
                firstName: 'Blinking',
                lastName: 'Guy',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSc1q756xV7_9onWCEXfDvUbp7MIsYfjqSQsPsxyIxRqYiL7BMU',
            },
            date: Date.now(),
            rating: 4,
            message: 'ео я расскажу о своём опыте обучения в Hellscream Academy, перечислю преимущества и недостатки, а также проведу анализ чистого вокала Леоса. Приглашаю к обсуждению в ком',
        },
    ],
    reviewsTotalCount: 5,
    rating: [5, 4, 4, 3, 4],
}
