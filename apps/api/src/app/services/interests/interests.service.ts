import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { Interest } from '@mogilev-guide/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

@Injectable()
export class InterestsService {
  @Inject() private firebaseService!: FirebaseService;

  public async getInterests(): Promise<Interest[]> {
    const snapshot = await this.firebaseService.firestore
      .collection('interests')
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }
}
