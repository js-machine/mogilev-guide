import { Injectable, Inject } from '@mogilev-guide/api/ioc'
import { Sight } from '@mogilev-guide/models'
import { FirebaseService } from '@mogilev-guide/api/services/firebase'

@Injectable()
export class SightService {
//   @Inject() private firebaseService!: FirebaseService;

  public getSight(id: string): Promise<Sight> {
    return new Promise(resolve => {
        setTimeout(() => resolve({
            id: 'sightId',
            name: 'Ratusha',
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
            background: 'https://www.belarus.by/nimages/s002333_205230.jpg',
            reviews: [
                {
                    id: 'reviewId',
                    userId: 'userId',
                    sightId: 'sightId',
                    date: new Date(),
                    rating: 5,
                    message: 'Lorem ipsum dolro sit amet. Consectetur adipiscin elit. Lorem ipsum dolro sit amet. Consectetur adipiscin elit.\nLorem ipsum dolro sit amet. Consectetur adipiscin elit.',
                },
                {
                    id: 'reviewId1',
                    userId: 'userId1',
                    sightId: 'sightId1',
                    date: new Date(),
                    rating: 4,
                    message: `Run npm run start:front for a dev server of frontend application. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Install firebase CLI to run server locally: npm install -g firebase-tools and then firebase use default`,
                },
                {
                    id: 'reviewId2',
                    userId: 'userId1',
                    sightId: 'sightId1',
                    date: new Date(),
                    rating: 4,
                    message: 'ео я расскажу о своём опыте обучения в Hellscream Academy, перечислю преимущества и недостатки, а также проведу анализ чистого вокала Леоса. Приглашаю к обсуждению в ком',
                },
            ],
            reviewsTotalCount: 3,
            rating: [5, 4, 4],
        }))
    })
  }
}
