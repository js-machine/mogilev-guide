import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { LanguageModel } from '@mogilev-guide/api/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

@Injectable()
export class LanguageService {
  @Inject() private firebaseService!: FirebaseService;
  private collectionName = 'languages';

  public async getAllLangRecords(): Promise<LanguageModel[]> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }

  public async getLangRecordByID(id: string): Promise<LanguageModel> {
    const langRecRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();
    const rec = (await langRecRef)?.data() || null;
    return rec as LanguageModel;
  }

  public async addLanguageRecord(record: LanguageModel): Promise<string> {
    const newLangRec = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    record.id = newLangRec.id;
    await newLangRec.set(record);
    return newLangRec.id;
  }

  public async updateLanguageRecord(
    id: string,
    newLangRec: LanguageModel
  ): Promise<LanguageModel> {
    try {
      const langRecRef = this.firebaseService.firestore
        .collection(this.collectionName)
        .doc(id);
      await langRecRef.update(newLangRec);
      return await this.getLangRecordByID(id);
    } catch (error) {
      console.error(
        `[LanguageService.updateLanguageRecord]\n Error with ID ${id} \n ${error}`
      );
      return null;
    }
  }

  public async deleteLanguageRecordByID(id: string): Promise<boolean> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
    return !!snapshot;
  }

  public async deleteLanguageRecordsByID(idArray: string[]): Promise<boolean> {
    try {
      const allResults = idArray.map(async (id) => {
        await this.firebaseService.firestore
          .collection(this.collectionName)
          .doc(id)
          .delete();
      });

      return !!allResults;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
