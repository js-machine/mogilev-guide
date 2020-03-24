import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { User } from '@mogilev-guide/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

@Injectable()
export class AuthService {
  @Inject() private firebaseService!: FirebaseService;

  public async getUserByID(id: string): Promise<User> {
    const snapshot = await this.firebaseService.firestore
      .collection('users')
      .where('id', '==', id)
      .get();
    const doc = snapshot.docs[0]?.data() || snapshot[0];
    return doc as User;
  }

  public async addUsers(user: User): Promise<FirebaseFirestore.WriteResult> {
    const doc = await this.firebaseService.firestore
      .collection('users')
      .doc()
      .set(user);

    return doc;
  }
}
