import { Controller, Get, Post, Put, Delete, Route, Body } from 'tsoa';
import { SightReview } from '@mogilev-guide/models';
import { ReviewsConverter } from '@mogilev-guide/api/helpers';
import { Inject } from '@mogilev-guide/api/ioc';
import { ReviewService } from '@mogilev-guide/api/services/Review';

@Route('reviews')
export class ReviewsController extends Controller {
  @Inject() private reviewService!: ReviewService;

  @Get()
  public async getAllReviewRecords(): Promise<SightReview[]> {
    const langRecords = await this.reviewService.getAllReviews();
    return ReviewsConverter.fromDBToFrontArray(langRecords);
  }

  @Get('{id}')
  public async getReviewRecordByID(id: string): Promise<SightReview> {
    const langRecord = await this.reviewService.getReviewByID(id);
    let resultRec: Promise<SightReview> = null;

    if (langRecord) {
      resultRec = ReviewsConverter.fromDBToFront(langRecord);
    }

    return resultRec;
  }

  @Post()
  public async addReviewRecord(
    @Body() langRecord: SightReview
  ): Promise<string> {
    const newLangRec = await ReviewsConverter.fromFrontToDB(langRecord);
    return await this.reviewService.addReview(newLangRec);
  }

  @Put('{id}')
  public async updateReviewRecords(
    id: string,
    @Body() langRecord: SightReview
  ): Promise<SightReview> {
    const newLangRec = await ReviewsConverter.fromFrontToDB(langRecord);
    return this.reviewService.updateReview(id, newLangRec);
  }

  @Delete('{id}')
  public async deleteReviewRecord(id: string): Promise<string> {
    const deleteResult: boolean = await this.reviewService.deleteReviewByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
