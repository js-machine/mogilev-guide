import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { Sight, Coordinates } from '@mogilev-guide/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

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
    return await this.getSigthByField('id', id);
  }

  public async addSight(place: Sight): Promise<string> {
    const newPlaceRef = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    place.id = newPlaceRef.id; //Sight's ID is equal DB's ID
    await newPlaceRef.set(place);
    return newPlaceRef.id;
  }

  public async updateSightByID(id: string, sight: Sight): Promise<Sight> {
    const sightsRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);
    sight.id = id; //ID will never change
    await sightsRef.update(sight);
    const sights = await this.getSightByID(id);
    return sights;
  }

  public async deleteSightByID(id: string): Promise<boolean> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
    return !!snapshot;
  }

  public async getSightByCoordinates(coordinate: Coordinates): Promise<Sight> {
    return await this.getSigthByField('coordinates', coordinate);
  }

  private async getSigthByField(
    fieldName: string,
    fieldValue: string | Coordinates
  ): Promise<Sight> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .where(fieldName, 'in', [fieldValue])
      .get();

    const doc = snapshot.docs[0]?.data() || snapshot[0];
    return doc as Sight;
  }
}
