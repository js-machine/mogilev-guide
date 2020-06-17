import { Language } from '@mogilev-guide/models';
import { LanguageModel } from '@mogilev-guide/api/models';
import { Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class LanguagesConverter {
  public static async fromDBToFront(langRec: LanguageModel): Promise<Language> {
    return {
      id: langRec.id,
      itemID: langRec.itemID,
      ru: langRec.ru,
      en: langRec.en
    };
  }

  public static async fromFrontToDB(langRec: Language): Promise<LanguageModel> {
    return {
      id: langRec.id,
      itemID: langRec.itemID,
      ru: langRec.ru,
      en: langRec.en
    };
  }

  public static async fromDBToFrontArray(
    langRecs: LanguageModel[]
  ): Promise<Language[]> {
    const langRecArr = langRecs.map((langRec) =>this.fromDBToFront(langRec));
    return Promise.all(langRecArr);
  }

  public static async fromFrontToDBArray(
    langRecs: Language[]
  ): Promise<LanguageModel[]> {
    const langRecArr = langRecs.map((langRec) =>this.fromFrontToDB(langRec));
    return Promise.all(langRecArr);
  }
}
