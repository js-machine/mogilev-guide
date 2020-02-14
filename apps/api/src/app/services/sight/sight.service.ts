import { Injectable, Inject } from '@mogilev-guide/api/ioc'
import { Sight } from '@mogilev-guide/models'
import { FirebaseService } from '@mogilev-guide/api/services/firebase'
import { sightMock } from './mocks'

@Injectable()
export class SightService {
//   @Inject() private firebaseService!: FirebaseService;

  public getSight(id: string): Promise<Sight> {
    return new Promise(resolve => {
        setTimeout(() => resolve())
    })
  }
}
