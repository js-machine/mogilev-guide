import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { Sight } from '@mogilev-guide/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';
import * as admin from 'firebase-admin';

@Injectable()
export class SightsService {
  @Inject() private firebaseService!: FirebaseService;
  private collectionName = 'sights';

  public async getAllSights(): Promise<Sight[]> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }

  public async getSightByID(id: string): Promise<Sight> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .where('id', '==', id)
      .get();
    if (!snapshot.docs[0]){
      return Promise.resolve(snapshot[0]);
    }
    return Promise.resolve(snapshot.docs[0].data() as Sight);
  }

  public async addSight(place: Sight): Promise<string> {
    let newPlaceRef = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    place.id = newPlaceRef.id; //Sight's ID is equal DB's ID
    const doc = await newPlaceRef.set(place);
    return Promise.resolve(newPlaceRef.id);
  }

  public async updateSightByID(id: string, sight: Sight): Promise<Sight> {
    const sightsRef = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);
    sight.id = id; //ID will never change
    let updateSingleSights = await sightsRef.update(sight);
    let sights = await this.getSightByID(id);
    return Promise.resolve(sights);
  }

  public async deleteSightByID(id: string): Promise<boolean> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
    if (!snapshot) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
}
