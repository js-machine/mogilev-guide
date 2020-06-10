import { InterestV2, Language } from '@mogilev-guide/models';
import { InterestModel } from '@mogilev-guide/api/models';
import { LanguagesConverter } from './languageConverter';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { Injectable, Inject } from '@mogilev-guide/api/ioc';

@Injectable()
export class InterestsConverter {
  @Inject() private languageService: LanguageService;

  public async fromDBToFront(dbInterest: InterestModel): Promise<InterestV2> {
    const labelLang = await this.languageService.getLangRecordByID(
      dbInterest.labelID
    );
    const descrLang = await this.languageService.getLangRecordByID(
      dbInterest.descriptionID
    );

    const frontInterest: InterestV2 = {
      id: dbInterest.id,
      label: labelLang,
      description: descrLang,
      size: dbInterest.size
    };
    return frontInterest;
  }

  public async fromFrontToDB(frontInterest: InterestV2): Promise<InterestModel> {
    const labelLangID = await this.insertNewLangRecord(frontInterest.label);
    const descrLangID = await this.insertNewLangRecord(
      frontInterest.description
    );

    const dbInterest: InterestModel = {
      id: frontInterest.id,
      labelID: labelLangID,
      descriptionID: descrLangID,
      size: frontInterest.size
    };
    return dbInterest;
  }

  public async fromDBToFrontArray(
    dbInterest: InterestModel[]
  ): Promise<InterestV2[]> {
    const dbInterestArr = dbInterest.reduce((interestArr, interest) => {
      const frontInterest = this.fromDBToFront(interest);
      interestArr.push(frontInterest);
      return interestArr;
    }, []);

    return Promise.all(dbInterestArr);
  }

  public async fromFrontToDBArray(
    frontInterest: InterestV2[]
  ): Promise<InterestModel[]> {
    const dbInterestArr = frontInterest.reduce((interestArr, langRec) => {
      const dbInterest = this.fromFrontToDB(langRec);
      interestArr.push(dbInterest);
      return interestArr;
    }, []);

    return Promise.all(dbInterestArr);
  }

  private async insertNewLangRecord(
    frontLangRecord: Language
  ): Promise<string> {
    const recLangDB = await LanguagesConverter.fromFrontToDB(frontLangRecord);
    const langRec = await this.languageService.getLangRecordByID(
      frontLangRecord.id
    );
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
