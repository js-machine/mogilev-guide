import { Language } from '@mogilev-guide/models';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { LanguagesConverter } from './languageConverter';
import { Inject, Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class LanguageHelper {
  @Inject() private languageService: LanguageService;

  public async insertLangRecord(frontLangRecord: Language): Promise<string> {
    const langRec = await this.languageService.getLangRecordByID(frontLangRecord.id);
    let langRecID: string;
    if (langRec) {
      langRecID = langRec.id;
      await this.languageService.updateLanguageRecord(
        langRec.id,
        frontLangRecord
      );
    } else {
      const recLangDB = await LanguagesConverter.fromFrontToDB(frontLangRecord);
      langRecID = await this.languageService.addLanguageRecord(recLangDB);
    }
    return langRecID;
  }
}
