import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { Sight } from '@mogilev-guide/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

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
                from: 0,
                to: 24,
            },
            history: 'Lorem ipsum dolor sit amet consectetur, dolor adipiscin elit. Lorem ipsum dolor sit amet consectetur, dolor adipiscin elit. Lorem ipsum dolor sit amet consectetur, dolor adipiscin elit. Lorem ipsum dolor sit amet consectetur, dolor adipiscin elit. Lorem ipsum dolor sit amet consectetur, dolor adipiscin elit. Lorem ipsum dolor sit amet consectetur, dolor adipiscin elit.',
            photos: ['https://www.belarus.by/nimages/s002333_205230.jpg', 'https://www.fotex.biz/images/foto/3752200020.jpg'],
            photosTotalCount: 2,
            background: 'https://www.belarus.by/nimages/s002333_205230.jpg',
            reviews: [
                {
                    userId: 'userId',
                    sightId: 'sightId',
                    date: new Date(),
                    rating: 5,
                    message: 'message',
                }
            ],
            reviewsTotalCount: 1,
            rating: [5],
            isFavourite: false,
        }))
    })
  }
}
