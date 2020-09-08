import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { RouteModel } from '@mogilev-guide/api/models';
import { Coordinates } from '@mogilev-guide/api/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';
import { LanguageService } from '@mogilev-guide/api/services/language';

@Injectable()
export class RoutesService {
  @Inject() private firebaseService!: FirebaseService;
  @Inject() private languageService!: LanguageService;

  private collectionName = 'routes';

  public async getAllRoutes(): Promise<RouteModel[]> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }

  public async getRouteByID(id: string): Promise<RouteModel> {
    return this.getRouteByField('id', id);
  }

  public async addRoute(place: RouteModel): Promise<string> {
    const newPlaceRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    place.id = newPlaceRef.id; //Route's ID is equal DB's ID
    await newPlaceRef.set(place);
    return newPlaceRef.id;
  }

  public async updateRouteByID(
    id: string,
    Route: RouteModel
  ): Promise<RouteModel> {
    const RoutesRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);
    Route.id = id; //ID will never change
    await RoutesRef.update(Route);
    return this.getRouteByID(id);
  }

  public async deleteRouteByID(id: string): Promise<boolean> {
    const route = await this.getRouteByID(id);

    const ref = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);

    const db = this.firebaseService.firestore;

    // Run transaction
    const res = db.runTransaction(async t => {
      //delete language records which connect with route
      await this.languageService.deleteLanguageRecordsByID([route.titleID]);

      //delete sight
      const doc = t.delete(ref);
      return doc;
    });

    return !!res;
  }

  private async getRouteByField(
    fieldName: string,
    fieldValue: string | Coordinates
  ): Promise<RouteModel> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .where(fieldName, 'in', [fieldValue])
      .get();

    const doc = snapshot.docs[0]?.data() || snapshot[0];
    return doc as RouteModel;
  }
}
