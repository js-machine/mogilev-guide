import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { InterestModel } from '@mogilev-guide/api/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';
import { LanguageService } from '@mogilev-guide/api/services/language';

@Injectable()
export class InterestsService {
  @Inject() private firebaseService!: FirebaseService;
  @Inject() private languageService!: LanguageService;

  private collectionName = 'interests';

  public async getInterests(): Promise<InterestModel[]> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }

  public async getInterestByID(id: string): Promise<InterestModel> {
    const interestRef = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();

    const rec = interestRef?.data() || null;
    return rec as InterestModel;
  }

  public async addInterest(interest: InterestModel): Promise<string> {
    const newInterestRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    interest.id = newInterestRef.id; //Sight's ID is equal DB's ID
    await newInterestRef.set(interest);
    return newInterestRef.id;
  }

  public async updateInterestByID(
    id: string,
    interest: InterestModel
  ): Promise<InterestModel> {
    const interestsRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);
    interest.id = id; //ID will never change
    await interestsRef.update(interest);
    return await this.getInterestByID(id);
  }

  public async deleteInterestByID(id: string): Promise<boolean> {
    const interest = await this.getInterestByID(id);
    await this.languageService.deleteLanguageRecordByID(interest.labelID);
    await this.languageService.deleteLanguageRecordByID(interest.descriptionID);
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
    return !!snapshot;
  }
}
