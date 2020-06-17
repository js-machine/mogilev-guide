import { SightV2, Language } from '@mogilev-guide/models';
import { SightModel } from '@mogilev-guide/api/models';
import { InterestsConverter } from './interestConverter';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { InterestsService } from '@mogilev-guide/api/services/interests';
import { LanguagesConverter } from './languageConverter';
import { Inject, Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class SightsConverter {
  @Inject() private languageService: LanguageService;
  @Inject() private interestsService: InterestsService;
  @Inject() private interestsConverter: InterestsConverter;

  public async fromDBToFront(dbSight: SightModel): Promise<SightV2> {
    //prepare languages fields
    const [nameLang, addressLang, historyLang] = await Promise.all([
      this.languageService.getLangRecordByID(dbSight.nameID),
      this.languageService.getLangRecordByID(dbSight.addressID),
      this.languageService.getLangRecordByID(dbSight.historyID),
    ]);

    //prepare another fields
    const interestDB = await this.interestsService.getInterestByID(
      dbSight.interestID
    );
    const interestFront = await this.interestsConverter.fromDBToFront(
      interestDB
    );

    return {
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
  }

  public async fromFrontToDB(frontSight: SightV2): Promise<SightModel> {
    //prepare languages fields
    const [nameLangID, addressLangID, historyLangID] = await Promise.all([
      this.insertLangRecord(frontSight.name),
      this.insertLangRecord(frontSight.address),
      this.insertLangRecord(frontSight.history)
    ]);

    //prepare another fields
    const interestDBID = frontSight.interest.id;

    return {
      id: frontSight.id,
      nameID: nameLangID,
      addressID: addressLangID,
      accessTime: {
        from: frontSight.accessTime.from,
        to: frontSight.accessTime.to
      },
      coordinates: frontSight.coordinates,
      interestID: interestDBID,
      historyID: historyLangID,
      photos: frontSight.photos,
      background: frontSight.background,
      reviewsID: frontSight.reviews,
      rating: frontSight.rating
    };
  }

  public async fromDBToFrontArray(dbSight: SightModel[]): Promise<SightV2[]> {
    const dbSightArr = dbSight.map((Sight) => this.fromDBToFront(Sight));
    return Promise.all(dbSightArr);
  }

  public async fromFrontToDBArray(frontSight: SightV2[]): Promise<SightModel[]> {
    const dbSightArr = frontSight.map((langRec) => this.fromFrontToDB(langRec));
    return Promise.all(dbSightArr);
  }

  private async insertLangRecord(frontLangRecord: Language): Promise<string> {
    const [recLangDB, langRec] = await Promise.all([
      LanguagesConverter.fromFrontToDB(frontLangRecord),
      this.languageService.getLangRecordByID(frontLangRecord.id)
    ]);
    let langRecID: string;
    if (langRec) {
      langRecID = langRec.id;
      await this.languageService.updateLanguageRecord(
        langRec.id,
        frontLangRecord
      );
    } else {
      langRecID = await this.languageService.addLanguageRecord(recLangDB);
    }
    return langRecID;
  }
}
