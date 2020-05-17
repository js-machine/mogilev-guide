/* import { Sight } from '@mogilev-guide/models';
import { SightModel } from '@mogilev-guide/api/models';
import { InterestsConverter } from '@mogilev-guide/api/helpers';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { Inject } from '@mogilev-guide/api/ioc';

export class SightsConverter {
  @Inject() private static languageService: LanguageService;

  public static async fromDBToFront(dbSight: SightModel): Promise<Sight> {
    const nameLang = await this.languageService.getLangRecordByID(
      dbSight.nameID
    );
    const addressLang = await this.languageService.getLangRecordByID(
      dbSight.addressID
    );
    const interestFront = await InterestsConverter.fromDBToFront(
      dbSight.interest
    );
    const historyLang = await this.languageService.getLangRecordByID(
      dbSight.historyID
    );

    const frontSight: Sight = {
      id: dbSight.id,
      name: nameLang,
      address: addressLang,
      accessTime: {
        from: dbSight.accessTime.from,
        to: dbSight.accessTime.to
      },
      coordinates: dbSight.coordinates,
      interest: interestFront,
      history: historyLang,
      photos: dbSight.photos,
      photosTotalCount: dbSight.photos.length,
      background: dbSight.background,
      reviews: dbSight.reviewsID,
      reviewsTotalCount: dbSight.reviewsID.length,
      rating: dbSight.rating
    };
    return frontSight;
  }

  public static async fromFrontToDB(frontSight: Sight): Promise<SightModel> {
    const nameLangID = await this.languageService.addLanguageRecord(
      frontSight.name
    );
    const addressLangID = await this.languageService.addLanguageRecord(
      frontSight.address
    );
    const interestDB = await InterestsConverter.fromFrontToDB(
      frontSight.interest
    );
    const historyLangID = await this.languageService.addLanguageRecord(
      frontSight.history
    );

    const dbSight: SightModel = {
      id: frontSight.id,
      nameID: nameLangID,
      addressID: addressLangID,
      accessTime: {
        from: frontSight.accessTime.from,
        to: frontSight.accessTime.to
      },
      coordinates: frontSight.coordinates,
      interest: interestDB,
      historyID: historyLangID,
      photos: frontSight.photos,
      background: frontSight.background,
      reviewsID: frontSight.reviews,
      rating: frontSight.rating
    };
    return dbSight;
  }

  public static async fromDBToFrontArray(
    dbSight: SightModel[]
  ): Promise<Sight[]> {
    const dbSightArr = dbSight.reduce((SightArr, Sight) => {
      const frontSight = this.fromDBToFront(Sight);
      SightArr.push(frontSight);
      return SightArr;
    }, []);

    return await Promise.all(dbSightArr);
  }

  public static async fromFrontToDBArray(
    frontSight: Sight[]
  ): Promise<SightModel[]> {
    const dbSightArr = frontSight.reduce((SightArr, langRec) => {
      const dbSight = this.fromFrontToDB(langRec);
      SightArr.push(dbSight);
      return SightArr;
    }, []);

    return await Promise.all(dbSightArr);
  }
}
 */
