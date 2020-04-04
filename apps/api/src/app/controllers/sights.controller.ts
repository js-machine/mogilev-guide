import { Controller, Get, Route, Post, Body, Put, Delete } from 'tsoa';
import { SightDto } from '@mogilev-guide/models';
import { SightReview } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { SightsService } from '@mogilev-guide/api/services/sights';
import { SightsConverter } from '@mogilev-guide/api/helpers';
import { ReviewsController } from './reviews.controller';

@Route('sights')
export class SightsController extends Controller {
  @Inject() private sightsService!: SightsService;
  @Inject() private sightsConverter!: SightsConverter;
  @Inject() private reviewsController!: ReviewsController;

  @Get()
  public async getSights(): Promise<SightDto[]> {
    const dbSights = await this.sightsService.getAllSights();
    return this.sightsConverter.fromDBToFrontArray(dbSights);
  }

  @Get('{id}')
  public async getOneSight(id: string): Promise<SightDto> {
    const dbSight = await this.sightsService.getSightByID(id);
    return this.sightsConverter.fromDBToFront(dbSight);
  }

  @Post()
  public async addSight(@Body() place: SightDto): Promise<string> {
    const dbSight = await this.sightsConverter.fromFrontToDB(place);
    return this.sightsService.addSight(dbSight);
  }

  @Put('{id}')
  public async updateSights(
    id: string,
    @Body() place: SightDto
  ): Promise<SightDto> {
    const dbSight = await this.sightsConverter.fromFrontToDB(place);
    const updatedSight = await this.sightsService.updateSightByID(id, dbSight);
    return this.sightsConverter.fromDBToFront(updatedSight);
  }

  @Delete('{id}')
  public async deleteSight(id: string): Promise<string> {
    const deleteResult: boolean = await this.sightsService.deleteSightByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }

  ///////   Sight reviews methods

  @Get('{id}/reviews')
  public async getSightReviews(id: string): Promise<SightReview[]> {
    const dbSight = await this.sightsService.getSightByID(id);
    return this.reviewsController.getReviewRecordsByID(dbSight.reviewsID);
  }

  @Get('{id}/reviews/{reviewID}')
  public async getSightReview(
    id: string,
    reviewID: string
  ): Promise<SightReview> {
    return this.reviewsController.getReviewRecordByID(reviewID);
  }

  @Post('{id}/reviews')
  public async addSightReview(
    id: string,
    @Body() review: SightReview
  ): Promise<SightReview[]> {
    const reviewID = await this.reviewsController.addReviewRecord(review);
    const sight = await this.getOneSight(id);
    sight.reviews.push(reviewID);
    await this.updateSights(id, sight);
    return this.getSightReviews(id);
  }

  @Put('{id}/reviews/{reviewID}')
  public async updateSightReview(
    id: string,
    reviewID: string,
    @Body() newReview: SightReview
  ): Promise<SightReview> {
    await this.reviewsController.updateReviewRecords(reviewID, newReview);
    return this.getSightReview(id, reviewID);
  }

  @Delete('{id}/reviews/{reviewID}')
  public async deleteSightReview(
    id: string,
    reviewID: string
  ): Promise<string> {
    const sight = await this.getOneSight(id);
    const indexReview = sight.reviews.indexOf(reviewID);
    sight.reviews.splice(indexReview, 1);
    await this.updateSights(id, sight);
    return this.reviewsController.deleteReviewRecord(reviewID);
  }
}
