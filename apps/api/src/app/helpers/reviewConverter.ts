import { SightReview } from '@mogilev-guide/models';
import { ReviewModel } from '@mogilev-guide/api/models';
import { UsersConverter } from './userConverter';
import { Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class ReviewsConverter {
  public async fromDBToFront(dbReview: ReviewModel): Promise<SightReview> {
    const frontUser = await UsersConverter.fromDBToFront(dbReview.user);
    return {
      id: dbReview.id,
      user: frontUser,
      date: dbReview.date,
      rating: dbReview.rating,
      message: dbReview?.message || null
    };
  }

  public async fromFrontToDB(frontReview: SightReview): Promise<ReviewModel> {
    const dbUser = await UsersConverter.fromFrontToDB(frontReview.user);
    return {
      id: frontReview.id,
      user: dbUser,
      date: frontReview.date,
      rating: frontReview.rating,
      message: frontReview?.message || null
    };
  }

  public async fromDBToFrontArray(
    langRecs: ReviewModel[]
  ): Promise<SightReview[]> {
    const langRecArr = langRecs.map((langRec) => this.fromDBToFront(langRec));
    return Promise.all(langRecArr);
  }

  public async fromFrontToDBArray(
    langRecs: SightReview[]
  ): Promise<ReviewModel[]> {
    const langRecArr = langRecs.map((langRec) => this.fromFrontToDB(langRec));
    return Promise.all(langRecArr);
  }
}
