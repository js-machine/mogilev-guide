import { SightReview } from '@mogilev-guide/models';
import { ReviewsConverter } from '@mogilev-guide/api/helpers';
import { Inject, Injectable } from '@mogilev-guide/api/ioc';
import { ReviewService } from '@mogilev-guide/api/services/review';

@Injectable()
export class ReviewsController {
  @Inject() private reviewService!: ReviewService;
  @Inject() private reviewsConverter!: ReviewsConverter;

  public async getReviewRecordsByID(id: string[]): Promise<SightReview[]> {
    const dbReviews = id.map(reviewID => this.reviewService.getReviewByID(reviewID));
    const reviews = await Promise.all(dbReviews);
    return this.reviewsConverter.fromDBToFrontArray(reviews);
  }

  public async getReviewRecordByID(id: string): Promise<SightReview> {
    const langRecord = await this.reviewService.getReviewByID(id);
    return (langRecord) ? this.reviewsConverter.fromDBToFront(langRecord) : null;
  }

  public async addReviewRecord(sightReview: SightReview): Promise<string> {
    const newReviewRec = await this.reviewsConverter.fromFrontToDB(sightReview);
    return this.reviewService.addReview(newReviewRec);
  }

  public async updateReviewRecords(
    id: string,
    langRecord: SightReview
  ): Promise<SightReview> {
    const newLangRec = await this.reviewsConverter.fromFrontToDB(langRecord);
    return this.reviewService.updateReview(id, newLangRec);
  }

  public async deleteReviewRecord(id: string): Promise<string> {
    const deleteResult: boolean = await this.reviewService.deleteReviewByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
