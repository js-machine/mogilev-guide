import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { ReviewModel } from '@mogilev-guide/api/models';
import { FirebaseService } from '@mogilev-guide/api/services/firebase';

@Injectable()
export class ReviewService {
  @Inject() private firebaseService!: FirebaseService;
  private collectionName = 'reviews';

  public async getAllReviews(): Promise<ReviewModel[]> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .get();

    return this.firebaseService.mapCollectionFromSnapshot(snapshot);
  }

  public async getReviewByID(id: string): Promise<ReviewModel> {
    const reviewRecRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();
    const rec = (await reviewRecRef)?.data() || null;
    return rec as ReviewModel;
  }

  public async addReview(record: ReviewModel): Promise<string> {
    const newReviewRec = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc();
    record.id = newReviewRec.id;
    await newReviewRec.set(record);
    return newReviewRec.id;
  }

  public async updateReview(
    id: string,
    newReviewRec: ReviewModel
  ): Promise<ReviewModel> {
    const reviewRecRef = this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id);
    await reviewRecRef.update(newReviewRec);
    return await this.getReviewByID(id);
  }

  public async deleteReviewByID(id: string): Promise<boolean> {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
    return !!snapshot;
  }
}
