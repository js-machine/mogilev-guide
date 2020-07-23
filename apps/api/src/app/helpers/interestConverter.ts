import { InterestDto, Language } from '@mogilev-guide/models';
import { InterestModel } from '@mogilev-guide/api/models';
import { LanguagesConverter } from './languageConverter';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { Injectable, Inject } from '@mogilev-guide/api/ioc';

@Injectable()
export class InterestsConverter {
  @Inject() private languageService: LanguageService;

  public async fromDBToFront(dbInterest: InterestModel): Promise<InterestDto> {
    const [labelLang, descrLang] = await Promise.all([
      this.languageService.getLangRecordByID(dbInterest.labelID),
      this.languageService.getLangRecordByID(dbInterest.descriptionID)
    ]);
    return {
      id: dbInterest.id,
      label: labelLang,
      description: descrLang,
      size: dbInterest.size
    };
  }

  public async fromFrontToDB(
    frontInterest: InterestDto
  ): Promise<InterestModel> {
    const [labelLangID, descrLangID] = await Promise.all([
      this.insertNewLangRecord(frontInterest.label),
      this.insertNewLangRecord(frontInterest.description)
    ]);
    return {
      id: frontInterest.id,
      labelID: labelLangID,
      descriptionID: descrLangID,
      size: frontInterest.size
    };
  }

  public async fromDBToFrontArray(
    dbInterest: InterestModel[]
  ): Promise<InterestDto[]> {
    const dbInterestArr = dbInterest.map(interest =>
      this.fromDBToFront(interest)
    );
    return Promise.all(dbInterestArr);
  }

  public async fromFrontToDBArray(
    frontInterest: InterestDto[]
  ): Promise<InterestModel[]> {
    const dbInterestArr = frontInterest.map(langRec =>
      this.fromFrontToDB(langRec)
    );
    return Promise.all(dbInterestArr);
  }

  private async insertNewLangRecord(
    frontLangRecord: Language
  ): Promise<string> {
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
