import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { SightModel } from '@mogilev-guide/api/models';
import { Coordinates } from '@mogilev-guide/api/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';
import { LanguageService } from '@mogilev-guide/api/services/language';

@Injectable()
export class SightsService {
  @Inject() private firebaseService!: FirebaseService;
  @Inject() private languageService!: LanguageService;

  private collectionName = 'sights';

  public async getAllSights(): Promise<SightModel[]> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }

  public async getSightByID(id: string): Promise<SightModel> {
    return this.getSightByField('id', id);
  }

  public async addSight(place: SightModel): Promise<string> {
    const newPlaceRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    place.id = newPlaceRef.id; //Sight's ID is equal DB's ID
    await newPlaceRef.set(place);
    return newPlaceRef.id;
  }

  public async updateSightByID(
    id: string,
    sight: SightModel
  ): Promise<SightModel> {
    const sightsRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);
    sight.id = id; //ID will never change
    await sightsRef.update(sight);
    return this.getSightByID(id);
  }

  public async deleteSightByID(id: string): Promise<boolean> {
    const sight = await this.getSightByID(id);

    //delete language records which connect with sigth
    await this.languageService.deleteLanguageRecordByID(sight.nameID);
    await this.languageService.deleteLanguageRecordByID(sight.addressID);
    await this.languageService.deleteLanguageRecordByID(sight.historyID);

    //delete sigth
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
    return !!snapshot;
  }

  public async getSightByCoordinates(
    coordinate: Coordinates
  ): Promise<SightModel> {
    return this.getSightByField('coordinates', coordinate);
  }

  private async getSightByField(
    fieldName: string,
    fieldValue: string | Coordinates
  ): Promise<SightModel> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .where(fieldName, 'in', [fieldValue])
      .get();

    const doc = snapshot.docs[0]?.data() || snapshot[0];
    return doc as SightModel;
  }
}
