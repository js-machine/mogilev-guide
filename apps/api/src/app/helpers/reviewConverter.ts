import { SightReview } from '@mogilev-guide/models';
import { ReviewModel } from '@mogilev-guide/api/models';
import { UsersConverter } from './userConverter';
import { Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class ReviewsConverter {
  public async fromDBToFront(dbReview: ReviewModel): Promise<SightReview> {
    const frontUser = await UsersConverter.fromDBToFront(dbReview.user);

    const frontReview: SightReview = {
      id: dbReview.id,
      user: frontUser,
      date: dbReview.date,
      rating: dbReview.rating,
      message: dbReview?.message || null
    };
    return frontReview;
  }

  public async fromFrontToDB(frontReview: SightReview): Promise<ReviewModel> {
    const dbUser = await UsersConverter.fromFrontToDB(frontReview.user);
    const dbReview: ReviewModel = {
      id: frontReview.id,
      user: dbUser,
      date: frontReview.date,
      rating: frontReview.rating,
      message: frontReview?.message || null
    };
    return dbReview;
  }

  public async fromDBToFrontArray(
    langRecs: ReviewModel[]
  ): Promise<SightReview[]> {
    const langRecArr = langRecs.reduce((langArr, langRec) => {
      const frontLangRec = this.fromDBToFront(langRec);
      langArr.push(frontLangRec);
      return langArr;
    }, []);

    return Promise.all(langRecArr);
  }

  public async fromFrontToDBArray(
    langRecs: SightReview[]
  ): Promise<ReviewModel[]> {
    const langRecArr = langRecs.reduce((langArr, langRec) => {
      const frontLangRec = this.fromFrontToDB(langRec);
      langArr.push(frontLangRec);
      return langArr;
    }, []);

    return Promise.all(langRecArr);
  }
}
