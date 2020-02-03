import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { User } from '@mogilev-guide/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

@Injectable()
export class AuthService {
  @Inject() private firebaseService!: FirebaseService;

  public async getUsersByID(id: string): Promise<User[]> {
    const snapshot = await this.firebaseService.firestore
      .collection('users')
      .where("id","==",id)
      .get();

      return this.firebaseService.mapCollectionFromSnapshot(snapshot);
    /* return this.firebaseService.mapEntityFromSnapshot(snapshot.docs[0]); */
  }

  public async addUsers(user: User): Promise<FirebaseFirestore.WriteResult> {
    const doc = await this.firebaseService.firestore
      .collection('users')
      .doc()
      .set(user);

    return Promise.resolve(doc);
  }
}